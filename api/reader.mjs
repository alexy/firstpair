import { Readable } from 'node:stream'
import { readerBooks } from '../reader-map.mjs'

const books = new Map(readerBooks.map((book) => [book.slug, book]))
const hopByHopHeaders = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
])

function requestPathParts(requestUrl) {
  const url = new URL(requestUrl, 'https://firstpair.org')
  const path = url.searchParams.get('path') ?? url.pathname.replace(/^\/(?:api\/reader|read)\/?/, '')

  return path
    .split('/')
    .filter(Boolean)
    .map((part) => decodeURIComponent(part))
}

function encodePathParts(parts) {
  return parts.map((part) => encodeURIComponent(part)).join('/')
}

function targetUrl(parts, search) {
  const [slug, area, ...rest] = parts
  const book = books.get(slug)

  if (!book) {
    return null
  }

  if (!area) {
    return `${book.htmlSource}${search}`
  }

  if (area !== 'chapters') {
    return null
  }

  if (rest.length === 0) {
    return `${book.htmlChaptersSource}${search}`
  }

  return `${book.htmlChaptersBase}/${encodePathParts(rest)}${search}`
}

function contentSecurityPolicy() {
  return [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "media-src 'self' data:",
    "font-src 'self' data:",
  ].join('; ')
}

function setResponseHeaders(upstream, response) {
  for (const [key, value] of upstream.headers.entries()) {
    const normalizedKey = key.toLowerCase()

    if (
      hopByHopHeaders.has(normalizedKey) ||
      normalizedKey === 'content-disposition' ||
      normalizedKey === 'content-security-policy' ||
      normalizedKey === 'content-encoding' ||
      normalizedKey === 'content-length'
    ) {
      continue
    }

    response.setHeader(key, value)
  }

  response.setHeader('Content-Disposition', 'inline')
  response.setHeader('Content-Security-Policy', contentSecurityPolicy())
}

export default async function handler(request, response) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.setHeader('Allow', 'GET, HEAD')
    response.statusCode = 405
    response.end('Method not allowed')
    return
  }

  let parts

  try {
    parts = requestPathParts(request.url)
  } catch {
    response.statusCode = 400
    response.end('Malformed reader path')
    return
  }

  const url = new URL(request.url, 'https://firstpair.org')
  const upstreamSearch = new URLSearchParams(url.searchParams)
  upstreamSearch.delete('path')

  const target = targetUrl(parts, upstreamSearch.size ? `?${upstreamSearch}` : '')

  if (!target) {
    response.statusCode = 404
    response.end('Reader page not found')
    return
  }

  const headers = {
    'accept-encoding': 'identity',
  }

  if (request.headers.range) {
    headers.range = request.headers.range
  }

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    redirect: 'follow',
  })

  response.statusCode = upstream.status
  setResponseHeaders(upstream, response)

  if (request.method === 'HEAD' || !upstream.body) {
    response.end()
    return
  }

  Readable.fromWeb(upstream.body).pipe(response)
}
