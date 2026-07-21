import { readFileSync } from 'node:fs'

export type Framework = 'react' | 'vue'

export interface FrameworkEntry {
  url: string
  dependencies: string[]
  registryDependencies: string[]
  files: string[]
}

export interface CatalogItem {
  name: string
  type: string
  description: string
  frameworks: Framework[]
  docsUrl?: string
  react?: FrameworkEntry
  vue?: FrameworkEntry
}

let cached: CatalogItem[] | null = null

export function loadCatalog(): CatalogItem[] {
  if (!cached) {
    const raw = readFileSync(new URL('../catalog.json', import.meta.url), 'utf8')
    cached = (JSON.parse(raw) as { items: CatalogItem[] }).items
  }
  return cached
}

export function getItem(name: string): CatalogItem | undefined {
  return loadCatalog().find((item) => item.name === name.toLowerCase())
}

export interface SearchResult extends CatalogItem {
  score: number
}

/**
 * Plain scored keyword search. The calling agent is the LLM — this only needs
 * decent ranking over ~115 items, not semantics.
 */
export function searchCatalog(query: string, framework?: Framework, limit = 10): SearchResult[] {
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1)

  let items = loadCatalog()
  if (framework) items = items.filter((item) => item.frameworks.includes(framework))
  if (tokens.length === 0) return []

  const results: SearchResult[] = []
  for (const item of items) {
    const name = item.name.toLowerCase()
    const nameParts = name.split('-')
    const description = item.description.toLowerCase()
    let score = 0
    for (const token of tokens) {
      if (name === token) score += 100
      else if (nameParts.includes(token)) score += 40
      else if (name.includes(token)) score += 25
      if (description.includes(token)) score += 10
      if (item.type.includes(token)) score += 5
    }
    if (score > 0) results.push({ ...item, score })
  }

  return results.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, limit)
}
