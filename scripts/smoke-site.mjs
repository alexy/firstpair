import { chromium } from '@playwright/test'

const target = process.env.FIRSTPAIR_SITE_URL ?? 'http://127.0.0.1:5183/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
await page.goto(target, { waitUntil: 'networkidle' })
await page.screenshot({ path: 'dist-prod/firstpair-site-smoke.png', fullPage: true })

const checks = await page.evaluate(() => {
  const links = [...document.querySelectorAll('a')].map((link) => link.getAttribute('href') ?? '')
  const stage = document.querySelector('.press-stage')?.getBoundingClientRect()
  const cardCount = document.querySelectorAll('.book-card').length

  return {
    title: document.title,
    hasPdfLink: links.some((href) => href.endsWith('.pdf')),
    hasEpubLink: links.some((href) => href.endsWith('.epub')),
    cardCount,
    stageWidth: Math.round(stage?.width ?? 0),
    stageHeight: Math.round(stage?.height ?? 0),
  }
})

await browser.close()

if (checks.title !== 'First Pair') {
  throw new Error(`Unexpected title: ${checks.title}`)
}

if (!checks.hasPdfLink || !checks.hasEpubLink) {
  throw new Error(`Missing book artifact links: ${JSON.stringify(checks)}`)
}

if (checks.cardCount < 2 || checks.stageWidth < 300 || checks.stageHeight < 400) {
  throw new Error(`Layout smoke failed: ${JSON.stringify(checks)}`)
}

console.log(JSON.stringify(checks, null, 2))
