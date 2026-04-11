// scripts/generate-html.ts
// Post-build script: generates per-route HTML files with injected meta tags.
// Run after `vite build`. Reads dist/index.html and writes per-route copies.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  getAllRoutes,
  DEFAULT_OG_IMAGE,
  type RouteMeta,
} from '../src/config/routes-meta.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function injectMeta(html: string, meta: RouteMeta): string {
  let result = html

  // Title
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`,
  )
  result = result.replace(
    /(<meta name="title" content=")[^"]*(")/,
    `$1${escapeHtml(meta.title)}$2`,
  )

  // Description
  result = result.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${escapeHtml(meta.description)}$2`,
  )

  // Canonical
  result = result.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${meta.canonical}$2`,
  )

  // OG tags
  result = result.replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${meta.canonical}$2`,
  )
  result = result.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${escapeHtml(meta.title)}$2`,
  )
  result = result.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${escapeHtml(meta.description)}$2`,
  )
  const ogImage = meta.ogImage ?? DEFAULT_OG_IMAGE
  result = result.replace(
    /(<meta property="og:image" content=")[^"]*(")/,
    `$1${ogImage}$2`,
  )

  // Twitter tags
  result = result.replace(
    /(<meta name="twitter:url" content=")[^"]*(")/,
    `$1${meta.canonical}$2`,
  )
  result = result.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${escapeHtml(meta.title)}$2`,
  )
  result = result.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${escapeHtml(meta.description)}$2`,
  )
  result = result.replace(
    /(<meta name="twitter:image" content=")[^"]*(")/,
    `$1${ogImage}$2`,
  )

  return result
}

function writeRouteHtml(routePath: string, html: string): void {
  if (routePath === '/') {
    writeFileSync(join(DIST, 'index.html'), html)
    return
  }
  const dir = join(DIST, ...routePath.split('/').filter(Boolean))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

async function main(): Promise<void> {
  const template = readFileSync(join(DIST, 'index.html'), 'utf-8')
  const routes = getAllRoutes()

  console.log(`Generating HTML for ${routes.length} routes...`)

  for (const route of routes) {
    const html = injectMeta(template, route.meta)
    writeRouteHtml(route.path, html)
  }

  console.log(`✓ Done. ${routes.length} HTML files written to dist/`)
}

main().catch(err => {
  console.error('generate-html failed:', err)
  process.exit(1)
})
