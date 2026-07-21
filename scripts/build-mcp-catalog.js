#!/usr/bin/env node

/**
 * Build MCP Catalog Script
 * Merges the built React (public/r/*.json) and Vue (public/r/vue/*.json) registry
 * items into a single packages/mcp/catalog.json consumed by @boldkit/mcp and the
 * boldkit CLI. Must run AFTER both registry builds (last step of registry:build).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const REACT_DIR = path.join(ROOT, 'public/r')
const VUE_DIR = path.join(ROOT, 'public/r/vue')
const OUT_FILE = path.join(ROOT, 'packages/mcp/catalog.json')

const BASE_URL = 'https://boldkit.dev'

function readItems(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json') && f !== 'registry.json')
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
    // registry index files (e.g. vue/boldkit-vue.json) have no item type — skip
    .filter((item) => item.name && item.type)
}

function frameworkEntry(item, urlPrefix) {
  return {
    url: `${BASE_URL}${urlPrefix}/${item.name}.json`,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files: (item.files ?? []).map((f) => f.path).filter(Boolean),
  }
}

const catalog = new Map()

for (const item of readItems(REACT_DIR)) {
  catalog.set(item.name, {
    name: item.name,
    type: item.type,
    description: item.description ?? '',
    react: frameworkEntry(item, '/r'),
  })
}

for (const item of readItems(VUE_DIR)) {
  const existing = catalog.get(item.name)
  if (existing) {
    existing.vue = frameworkEntry(item, '/r/vue')
    if (!existing.description) existing.description = item.description ?? ''
  } else {
    catalog.set(item.name, {
      name: item.name,
      type: item.type,
      description: item.description ?? '',
      vue: frameworkEntry(item, '/r/vue'),
    })
  }
}

const items = [...catalog.values()]
  .map((item) => ({
    ...item,
    frameworks: [item.react && 'react', item.vue && 'vue'].filter(Boolean),
    docsUrl: item.type === 'registry:ui' ? `${BASE_URL}/components/${item.name}` : undefined,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify({ generatedFrom: 'public/r', items }, null, 2) + '\n')

console.log(
  `✓ MCP catalog: ${items.length} items (${items.filter((i) => i.react).length} react, ${items.filter((i) => i.vue).length} vue) → packages/mcp/catalog.json`
)
