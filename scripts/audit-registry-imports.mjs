#!/usr/bin/env node
/**
 * Audit every file that ships via a registry entry (React + Vue) for
 * cross-folder `from '@/...'` imports that aren't covered by
 * registryDependencies.
 *
 * Each violation means: a consumer installing this entry will get a
 * "Cannot find module" error because we ship the file but not its dep.
 *
 * Run:   bun run registry:audit
 * Exits: 0 if clean, 1 if any violations found (CI-friendly).
 *
 * History — this scanner has caught:
 *   • math-curve-* missing @boldkit/error-boundary           (issue #5)
 *   • sonner missing @boldkit/use-theme                      (issue #5)
 *   • Vue CommandDialog importing the barrel @/components/ui (post-3.3.7)
 *   • 9 chart demos importing from wrong install paths       (post-3.3.7)
 *   • 10 demos missing sibling cascade deps                  (post-3.3.7)
 *
 * To extend coverage: this only looks at `from '@/...'` imports.
 * `require('@/...')`, dynamic `import('@/...')`, and pure relative
 * imports (`from '../x'`) are not yet checked.
 */
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

// ─────────────────────────────────────────────────────────────────────
// React side — registry.json drives everything
// ─────────────────────────────────────────────────────────────────────
const reactReg = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf-8'))

const reactProvider = {} // consumerTarget → [registry item names]
for (const it of reactReg.items) {
  for (const f of (it.files || [])) {
    if (!f.target) continue
    ;(reactProvider[f.target] = reactProvider[f.target] || []).push(it.name)
  }
}

function resolveAliasReact(aliasPath) {
  const stripped = aliasPath.replace(/^@\//, '')
  for (const ext of ['.tsx', '.ts', '/index.tsx', '/index.ts']) {
    const c = stripped + ext
    if (reactProvider[c]) return { target: c, providers: reactProvider[c] }
  }
  return null
}

const reactViolations = []
for (const item of reactReg.items) {
  const declared = new Set((item.registryDependencies || []).map(d => d.replace(/^@boldkit\//, '')))
  for (const f of (item.files || [])) {
    if (!existsSync(f.path)) continue
    if (!/\.(tsx|ts)$/.test(f.path)) continue
    const content = readFileSync(f.path, 'utf-8')
    const re = /from\s+['"](@\/[^'"]+)['"]/g
    let m
    while ((m = re.exec(content)) !== null) {
      const aliasPath = m[1]
      if (aliasPath.startsWith('@/components/ui/')) continue   // siblings
      if (aliasPath === '@/lib/utils') continue                // assume utils dep is always set; we'll separately verify
      const resolved = resolveAliasReact(aliasPath)
      if (!resolved) {
        reactViolations.push({ item: item.name, file: f.path, aliasPath, status: 'NO_REGISTRY_ENTRY' })
      } else if (!resolved.providers.some(p => declared.has(p))) {
        reactViolations.push({ item: item.name, file: f.path, aliasPath, status: 'MISSING_DEP', providers: resolved.providers })
      }
    }
  }
}

// Also report @/lib/utils import without @boldkit/utils registryDep
const utilsViolations = []
for (const item of reactReg.items) {
  const declared = new Set((item.registryDependencies || []).map(d => d.replace(/^@boldkit\//, '')))
  for (const f of (item.files || [])) {
    if (!existsSync(f.path)) continue
    if (!/\.(tsx|ts)$/.test(f.path)) continue
    if (/from\s+['"]@\/lib\/utils['"]/.test(readFileSync(f.path, 'utf-8'))) {
      if (!declared.has('utils')) {
        utilsViolations.push({ item: item.name, file: f.path, missing: '@boldkit/utils' })
      }
    }
  }
}

console.log('=== REACT VIOLATIONS ===')
if (!reactViolations.length && !utilsViolations.length) console.log('✓ none')
for (const v of reactViolations) console.log(' ', v.item, '⇒', v.aliasPath, '(' + v.status + (v.providers ? ' provided by ' + v.providers.join('/') : '') + ')')
for (const v of utilsViolations) console.log(' ', v.item, '⇒ missing @boldkit/utils')

// ─────────────────────────────────────────────────────────────────────
// Vue side — need to derive what each entry ships from public/r/vue/*.json
// (the build script's componentMeta is the source-of-truth but we can
// read the actual generated JSONs which are richer and already include
// siblingFiles etc.)
// ─────────────────────────────────────────────────────────────────────
const vueRDir = join(root, 'public/r/vue')
const vueProvider = {}
const vueItems = []
if (existsSync(vueRDir)) {
  for (const f of readdirSync(vueRDir)) {
    if (!f.endsWith('.json') || f === 'index.json') continue
    const j = JSON.parse(readFileSync(join(vueRDir, f), 'utf-8'))
    vueItems.push(j)
    for (const file of (j.files || [])) {
      if (file.target) (vueProvider[file.target] = vueProvider[file.target] || []).push(j.name)
    }
  }
}

function resolveAliasVue(aliasPath) {
  const stripped = aliasPath.replace(/^@\//, '')
  for (const ext of ['.ts', '.vue', '.tsx', '/index.ts', '/index.vue']) {
    const c = stripped + ext
    if (vueProvider[c]) return { target: c, providers: vueProvider[c] }
  }
  return null
}

const vueViolations = []
const vueUtilsViolations = []
for (const item of vueItems) {
  const declared = new Set((item.registryDependencies || []).map(d => d.replace(/^@boldkit\//, '')))
  for (const file of (item.files || [])) {
    const content = file.content || ''
    if (!content) continue
    const re = /from\s+['"](@\/[^'"]+)['"]/g
    let m
    while ((m = re.exec(content)) !== null) {
      const aliasPath = m[1]
      if (aliasPath.startsWith('@/components/ui')) continue
      if (aliasPath === '@/lib/utils') {
        if (!declared.has('utils')) vueUtilsViolations.push({ item: item.name, file: file.target })
        continue
      }
      const resolved = resolveAliasVue(aliasPath)
      if (!resolved) {
        vueViolations.push({ item: item.name, file: file.target, aliasPath, status: 'NO_REGISTRY_ENTRY' })
      } else if (!resolved.providers.some(p => declared.has(p))) {
        vueViolations.push({ item: item.name, file: file.target, aliasPath, status: 'MISSING_DEP', providers: resolved.providers })
      }
    }
  }
}

console.log('')
console.log('=== VUE VIOLATIONS ===')
if (!vueViolations.length && !vueUtilsViolations.length) console.log('✓ none')
for (const v of vueViolations) console.log(' ', v.item, '⇒', v.aliasPath, '(' + v.status + (v.providers ? ' provided by ' + v.providers.join('/') : '') + ')')
for (const v of vueUtilsViolations) console.log(' ', v.item, '⇒ missing @boldkit/utils')

const total =
  reactViolations.length + utilsViolations.length +
  vueViolations.length + vueUtilsViolations.length

console.log('')
console.log('Summary: React', reactViolations.length + utilsViolations.length, '/ Vue', vueViolations.length + vueUtilsViolations.length)

if (total > 0) {
  console.error('')
  console.error(`✗ ${total} registry import violation(s) — registry installs will break for affected entries.`)
  process.exit(1)
}
