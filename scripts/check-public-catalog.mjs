import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const publicDir = join(root, 'public')
const catalogPath = join(publicDir, 'catalog.json')
const vercelPath = join(root, 'vercel.json')

const catalog = JSON.parse(await readFile(catalogPath, 'utf8'))
const vercel = JSON.parse(await readFile(vercelPath, 'utf8'))
const routeDestinations = new Map(
  (vercel.routes ?? []).filter((route) => route.src).map((route) => [route.src, route.dest]),
)
const hasReaderProxyRoute = routeDestinations.get('^/read(?:/(.*))?$') === '/api/reader?path=$1'
const hasFilesystemRoute = (vercel.routes ?? []).some((route) => route.handle === 'filesystem')
const hasAppFallbackRoute = routeDestinations.get('^/(.*)$') === '/index.html'
const { readerBooks } = await import('../reader-map.mjs')
const readerMapEntries = new Map(readerBooks.map((book) => [book.slug, book]))
const catalogSlugs = new Set(catalog.books.map((book) => book.slug))
const publicEntries = await readdir(publicDir)
const publicBookSlugs = []

for (const entry of publicEntries) {
  const entryPath = join(publicDir, entry)

  if ((await stat(entryPath)).isDirectory()) {
    publicBookSlugs.push(entry)
  }
}

publicBookSlugs.sort()

const missingFromCatalog = publicBookSlugs.filter((slug) => !catalogSlugs.has(slug))
const staleCatalogEntries = [...catalogSlugs].filter((slug) => !publicBookSlugs.includes(slug))
const requiredFields = ['pdf', 'epub', 'html', 'htmlChapters', 'htmlSource', 'htmlChaptersSource']
const missingFields = Object.fromEntries(
  requiredFields.map((field) => [
    field,
    catalog.books.filter((book) => !book[field]).map((book) => book.slug),
  ]),
)
const missingLocalPaths = []
const invalidReaderRoutes = []
const staleReaderMap = []
const invalidSourceUrls = []

for (const book of catalog.books) {
  if (book.html !== `/read/${book.slug}/`) {
    invalidReaderRoutes.push({ slug: book.slug, field: 'html', path: book.html })
  }

  if (book.htmlChapters !== `/read/${book.slug}/chapters/`) {
    invalidReaderRoutes.push({ slug: book.slug, field: 'htmlChapters', path: book.htmlChapters })
  }

  for (const field of ['htmlSource', 'htmlChaptersSource']) {
    if (!book[field]?.startsWith('https://')) {
      invalidSourceUrls.push({ slug: book.slug, field, url: book[field] })
    }
  }

  const expectedChaptersIndex = book.htmlChaptersSource
  const expectedChaptersBase = expectedChaptersIndex.replace(/\/index\.html$/, '')

  const readerMapEntry = readerMapEntries.get(book.slug)

  if (
    !readerMapEntry ||
    readerMapEntry.htmlSource !== book.htmlSource ||
    readerMapEntry.htmlChaptersSource !== expectedChaptersIndex ||
    readerMapEntry.htmlChaptersBase !== expectedChaptersBase
  ) {
    staleReaderMap.push({
      slug: book.slug,
      expected: {
        htmlSource: book.htmlSource,
        htmlChaptersSource: expectedChaptersIndex,
        htmlChaptersBase: expectedChaptersBase,
      },
      actual: readerMapEntry,
    })
  }

  for (const field of ['homepage', ...requiredFields]) {
    const value = book[field]

    if (!value || !value.startsWith('/')) {
      continue
    }

    if (value.startsWith('/read/')) {
      continue
    }

    const publicPath = join(publicDir, value.replace(/^\/+/, ''))

    try {
      await stat(publicPath)
    } catch {
      missingLocalPaths.push({ slug: book.slug, field, path: value })
    }
  }
}

const hasMissingFields = Object.values(missingFields).some((slugs) => slugs.length > 0)

if (
  missingFromCatalog.length ||
  staleCatalogEntries.length ||
  hasMissingFields ||
  missingLocalPaths.length ||
  invalidReaderRoutes.length ||
  staleReaderMap.length ||
  invalidSourceUrls.length ||
  !hasReaderProxyRoute ||
  !hasFilesystemRoute ||
  !hasAppFallbackRoute
) {
  console.error(
    JSON.stringify(
      {
        missingFromCatalog,
        staleCatalogEntries,
        missingFields,
        missingLocalPaths,
        invalidReaderRoutes,
        staleReaderMap,
        invalidSourceUrls,
        hasReaderProxyRoute,
        hasFilesystemRoute,
        hasAppFallbackRoute,
      },
      null,
      2,
    ),
  )
  process.exit(1)
}

console.log(
  JSON.stringify(
    {
      publicBooks: publicBookSlugs,
      catalogBooks: catalog.books.map((book) => book.slug),
      count: catalog.books.length,
    },
    null,
    2,
  ),
)
