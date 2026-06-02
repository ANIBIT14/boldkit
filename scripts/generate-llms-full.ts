// scripts/generate-llms-full.ts
// Pre-build script: generates public/llms-full.txt — the MAXIMUM-coverage LLM
// reference. Unlike the curated public/llms.txt (hand-written priorities), this
// file is generated from the single source of truth (routes-meta + the built
// registry) so it can never silently go stale the way llms.txt did.
//
// Output = the curated llms.txt, followed by a complete page index (every public
// route with its title + description) and a complete install index (every
// registry item for React and Vue). Run before `vite build` so dist/ includes it.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAllRoutes, COUNTS, SITE_URL } from '../src/config/routes-meta.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC = join(ROOT, 'public')

function listRegistryIds(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace(/\.json$/, ''))
    .sort()
}

function buildPageIndex(): string {
  const routes = getAllRoutes()
  const lines = routes.map(r => {
    const title = r.meta.title.replace(' | BoldKit', '')
    return `### ${title}\n${r.meta.canonical}\n${r.meta.description}\n`
  })
  return `## Complete Page Index (${routes.length} pages)\n\nEvery indexable page on boldkit.dev with its meta title and description.\n\n${lines.join('\n')}`
}

function buildInstallIndex(): string {
  const reactIds = listRegistryIds(join(PUBLIC, 'r'))
  const vueIds = listRegistryIds(join(PUBLIC, 'r', 'vue'))

  const react = reactIds
    .map(id => `npx shadcn@latest add "${SITE_URL}/r/${id}.json"`)
    .join('\n')
  const vue = vueIds
    .map(id => `npx shadcn-vue@latest add "${SITE_URL}/r/vue/${id}.json"`)
    .join('\n')

  return [
    `## Complete Install Index`,
    ``,
    `Every BoldKit registry item is installed via the shadcn CLI — the source is`,
    `copied directly into your project (there is no npm package to import).`,
    ``,
    `### React (${reactIds.length} items)`,
    ``,
    '```bash',
    react,
    '```',
    ``,
    `### Vue 3 / Nuxt (${vueIds.length} items)`,
    ``,
    '```bash',
    vue,
    '```',
    ``,
  ].join('\n')
}

function main(): void {
  const curated = readFileSync(join(PUBLIC, 'llms.txt'), 'utf-8')

  const header = `# BoldKit — Full LLM Reference (llms-full.txt)

> BoldKit is a free, open-source neubrutalism (neobrutalism) UI component library for React, Vue 3 & Nuxt. Components are copied into your project via the shadcn CLI — not imported from an npm package. This is the MAXIMUM-coverage reference: the curated summary, followed by a complete index of every page and every installable component. For the concise version see ${SITE_URL}/llms.txt

This file is generated from BoldKit's source of truth (route metadata + the built registry). Counts: ${COUNTS.components}+ components, ${COUNTS.charts} charts, ${COUNTS.shapes} shapes, ${COUNTS.blocks} blocks, ${COUNTS.templates} templates, 19 canvas effects.

---

`

  const out = [
    header,
    curated.trim(),
    '\n\n---\n',
    buildPageIndex().trim(),
    '\n\n---\n',
    buildInstallIndex().trim(),
    '\n',
  ].join('\n')

  writeFileSync(join(PUBLIC, 'llms-full.txt'), out)
  const routes = getAllRoutes()
  console.log(`✓ llms-full.txt generated: ${routes.length} pages indexed`)
}

main()
