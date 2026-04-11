// scripts/generate-sitemap.ts
// Pre-build script: generates public/sitemap.xml from routes-meta.
// Run before `vite build` so the fresh sitemap gets included in dist/.

import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAllRoutes } from '../src/config/routes-meta.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

function generateSitemap(): { xml: string; count: number } {
  const routes = getAllRoutes()
  const urlEntries = routes
    .map(
      r => `  <url>
    <loc>${r.meta.canonical}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`
  return { xml, count: routes.length }
}

mkdirSync(PUBLIC, { recursive: true })
const { xml, count } = generateSitemap()
writeFileSync(join(PUBLIC, 'sitemap.xml'), xml)
console.log(`✓ Sitemap generated: ${count} URLs written to public/sitemap.xml`)
