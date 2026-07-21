import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadCatalog, searchCatalog } from './catalog.js'
import { buildInstallCommand } from './commands.js'
import { detectFramework } from './detect.js'

describe('catalog', () => {
  it('loads all registry items with both frameworks represented', () => {
    const items = loadCatalog()
    expect(items.length).toBeGreaterThan(100)
    expect(items.some((i) => i.frameworks.includes('react'))).toBe(true)
    expect(items.some((i) => i.frameworks.includes('vue'))).toBe(true)
  })

  it('every item has a name, type, and at least one framework entry', () => {
    for (const item of loadCatalog()) {
      expect(item.name).toBeTruthy()
      expect(item.type).toMatch(/^registry:/)
      expect(item.react ?? item.vue).toBeTruthy()
    }
  })
})

describe('searchCatalog', () => {
  it('ranks exact name matches first', () => {
    expect(searchCatalog('button')[0].name).toBe('button')
  })

  it('finds components by natural-language description', () => {
    const names = searchCatalog('toast notification').map((r) => r.name)
    expect(names).toContain('sonner')
  })

  it('filters by framework', () => {
    for (const r of searchCatalog('card', 'vue')) {
      expect(r.frameworks).toContain('vue')
    }
  })

  it('returns empty for gibberish', () => {
    expect(searchCatalog('xyzzy quux')).toEqual([])
  })
})

describe('buildInstallCommand', () => {
  it('builds a shadcn command with hosted URLs for react', () => {
    const cmd = buildInstallCommand(['button', 'card'], 'react')
    expect(cmd.display).toBe(
      'npx shadcn@latest add "https://boldkit.dev/r/button.json" "https://boldkit.dev/r/card.json"'
    )
    expect(cmd.unknown).toEqual([])
  })

  it('builds a shadcn-vue command for vue', () => {
    const cmd = buildInstallCommand(['button'], 'vue')
    expect(cmd.display).toContain('shadcn-vue@latest add "https://boldkit.dev/r/vue/button.json"')
  })

  it('separates unknown and framework-unavailable names', () => {
    const cmd = buildInstallCommand(['button', 'not-a-thing'], 'react')
    expect(cmd.unknown).toEqual(['not-a-thing'])
    expect(cmd.items.map((i) => i.name)).toEqual(['button'])
  })
})

describe('detectFramework', () => {
  function projectWith(deps: Record<string, string>) {
    const dir = mkdtempSync(join(tmpdir(), 'boldkit-detect-'))
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 't', dependencies: deps }))
    return dir
  }

  it('detects vue', () => {
    expect(detectFramework(projectWith({ vue: '^3.0.0' })).framework).toBe('vue')
  })

  it('detects nuxt as vue', () => {
    expect(detectFramework(projectWith({ nuxt: '^4.0.0' })).framework).toBe('vue')
  })

  it('detects react', () => {
    expect(detectFramework(projectWith({ react: '^19.0.0' })).framework).toBe('react')
  })
})
