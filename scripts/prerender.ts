// scripts/prerender.ts
// Post-SSG step: render each route in headless Chrome and inject the real rendered
// DOM into that route's dist HTML. generate-html.ts only injects an sr-only <h1>+<p>
// stub; this replaces it with the full page body so crawlers — including JS-less AI
// crawlers (ChatGPT, Perplexity, Bing) — get the actual content (prose, code samples,
// prop tables). React's createRoot() re-renders on mount, so users never see the
// static copy for more than a paint.
//
// ponytail: runs ONCE, immediately after `ssg`, against generate-html's fresh stubs.
// The stub has no nested block elements, so the non-greedy #root regex matches it
// exactly. Re-running against an already-prerendered dist would mis-match — always
// regenerate stubs (full `build`) first. If Chrome can't launch, we warn and exit 0
// so the build never breaks: the sr-only stub remains as the fallback.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview, type PreviewServer } from 'vite'
import type { Browser } from 'puppeteer'
import { getAllRoutes } from '../src/config/routes-meta.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const CONCURRENCY = 5

function routeFile(routePath: string): string {
  if (routePath === '/') return join(DIST, 'index.html')
  return join(DIST, ...routePath.split('/').filter(Boolean), 'index.html')
}

async function renderRoute(
  browser: Browser,
  baseUrl: string,
  routePath: string,
): Promise<boolean> {
  const file = routeFile(routePath)
  if (!existsSync(file)) return false

  const page = await browser.newPage()
  try {
    await page.goto(baseUrl + routePath, {
      waitUntil: 'networkidle0',
      timeout: 30_000,
    })
    // Wait for the app to actually mount something into #root.
    await page.waitForSelector('#root > *', { timeout: 15_000 }).catch(() => {})
    const body = await page.$eval('#root', el => el.innerHTML)
    // A real render is large; a near-empty body means the route failed to hydrate —
    // keep the stub rather than overwrite it with nothing.
    if (!body || body.length < 200) return false

    // JSON-LD that only the client injects (SEO.tsx). The SSG step writes the
    // BreadcrumbList itself, but FAQPage and custom schema existed solely in the
    // live DOM — so no crawler reading the served HTML ever saw them, and FAQ
    // rich results could never fire. Lift them into the static file.
    const clientSchema: string[] = await page.$$eval(
      'head script[type="application/ld+json"][data-schema]',
      nodes => nodes.map(n => n.outerHTML),
    )

    const html = readFileSync(file, 'utf-8')
    let injected = html.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${body}</div>`,
    )
    if (injected === html) return false

    // Only add schema types the SSG step didn't already emit, so breadcrumbs
    // aren't duplicated.
    const missing = clientSchema.filter(tag => {
      const kind = /data-schema="([^"]+)"/.exec(tag)?.[1]
      return kind ? !injected.includes(`data-schema="${kind}"`) : false
    })
    if (missing.length > 0) {
      injected = injected.replace('</head>', `${missing.join('')}</head>`)
    }

    writeFileSync(file, injected)
    return true
  } catch (err) {
    console.warn(`  ⚠ ${routePath}: ${(err as Error).message}`)
    return false
  } finally {
    await page.close()
  }
}

async function main(): Promise<void> {
  const routes = getAllRoutes()

  // puppeteer is imported lazily so a missing/failed Chrome only skips prerender.
  let browser: Browser
  try {
    const puppeteer = (await import('puppeteer')).default
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
  } catch (err) {
    console.warn(
      `⚠ prerender skipped (Chrome unavailable): ${(err as Error).message}`,
    )
    console.warn('  Falling back to sr-only stubs from generate-html.ts.')
    return
  }

  let server: PreviewServer | undefined
  try {
    server = await preview({ preview: { port: 4188, strictPort: false } })
    const resolved = server.resolvedUrls?.local?.[0]?.replace(/\/$/, '')
    if (!resolved) throw new Error('preview server has no local URL')
    const baseUrl: string = resolved

    console.log(`Prerendering ${routes.length} routes via ${baseUrl} ...`)

    let done = 0
    let injected = 0
    // Simple concurrency pool.
    const queue = [...routes]
    async function worker(): Promise<void> {
      for (;;) {
        const route = queue.shift()
        if (!route) return
        const ok = await renderRoute(browser, baseUrl, route.path)
        done++
        if (ok) injected++
      }
    }
    await Promise.all(
      Array.from({ length: CONCURRENCY }, () => worker()),
    )

    console.log(
      `✓ Prerendered ${injected}/${done} routes (rest kept sr-only stubs).`,
    )
  } finally {
    await browser.close()
    await server?.close()
  }
}

main().catch(err => {
  console.error('prerender failed:', err)
  process.exit(1)
})
