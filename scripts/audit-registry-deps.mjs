#!/usr/bin/env node
/**
 * Audit the BUILT registries (public/r/*.json, public/r/vue/*.json) for npm
 * imports a consumer would not get installed.
 *
 * For every item, each bare `from 'pkg'` / `import 'pkg'` / CSS `@import 'pkg'`
 * in a shipped file must be declared in the item's dependencies/devDependencies
 * or in those of an item it pulls in through registryDependencies (the CLI
 * installs the whole closure). Anything else installs fine and then fails to
 * resolve in the consumer's build.
 *
 * Also reports packages whose LATEST major no longer matches the major the
 * repo builds against, when the registry leaves them unpinned — that is how
 * TanStack Table 9 and vue-sonner 2 broke fresh installs. That check needs the
 * network, so it only runs with --latest.
 *
 * Run:   bun run registry:audit        (both audits)
 *        node scripts/audit-registry-deps.mjs --latest
 * Exits: 1 on any undeclared import (or unpinned major drift with --latest).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()
// Host-project packages every shadcn + Tailwind v4 consumer already has.
const PROVIDED = new Set(['react', 'react-dom', 'vue', 'tailwindcss'])

const pkgName = (spec) => {
  const parts = spec.split('/')
  return spec.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
}
// "name@^1.2" / "@scope/name@^1.2" → name
const stripVersion = (dep) => (dep.startsWith('@') ? '@' + dep.slice(1).split('@')[0] : dep.split('@')[0])
const itemRef = (dep) => dep.replace(/^@boldkit\//, '').replace(/^https?:\/\/.*\/(?:vue\/)?/, '').replace(/\.json$/, '')

function load(dir) {
  const items = new Map()
  if (!existsSync(dir)) return items
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.json') || f === 'index.json' || f === 'registry.json') continue
    const item = JSON.parse(readFileSync(join(dir, f), 'utf8'))
    if (item.name) items.set(item.name, item)
  }
  return items
}

function importsOf(file) {
  const src = file.content || ''
  const out = new Set()
  const add = (s) => {
    if (/^(\.|\/|@\/|~|node:|#|virtual:|https?:)/.test(s)) return
    out.add(pkgName(s))
  }
  if (/\.css$/.test(file.path)) {
    for (const m of src.matchAll(/@import\s+(?:url\()?['"]([^'"]+)['"]/g)) add(m[1])
    for (const m of src.matchAll(/@plugin\s+['"]([^'"]+)['"]/g)) add(m[1])
    return out
  }
  // Drop comments so commented-out imports don't count.
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')
  for (const m of code.matchAll(/(?:^|[;\s])(?:import|export)\s[^'"`;]*?from\s*['"]([^'"]+)['"]/g)) add(m[1])
  for (const m of code.matchAll(/(?:^|[;\s])import\s*['"]([^'"]+)['"]/g)) add(m[1])
  for (const m of code.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g)) add(m[1])
  return out
}

function audit(label, items) {
  const closureCache = new Map()
  const declaredFor = (name, seen = new Set()) => {
    if (closureCache.has(name)) return closureCache.get(name)
    const item = items.get(name)
    const set = new Set()
    if (!item || seen.has(name)) return set
    seen.add(name)
    for (const d of [...(item.dependencies || []), ...(item.devDependencies || [])]) set.add(stripVersion(d))
    for (const r of item.registryDependencies || []) for (const d of declaredFor(itemRef(r), seen)) set.add(d)
    closureCache.set(name, set)
    return set
  }
  const violations = []
  for (const [name, item] of items) {
    // A bare name resolves against shadcn's default registry, not BoldKit's.
    for (const r of item.registryDependencies || [])
      if (!/^(@|https?:)/.test(r)) violations.push(`${label} ${name}: registryDependency '${r}' is unscoped — use '@boldkit/${r}'`)
    const declared = declaredFor(name)
    for (const f of item.files || []) {
      // A bare process.env reference needs @types/node, which Vite's default
      // tsconfig doesn't load — the consumer's `tsc -b` fails on install.
      if (/\.(tsx?|vue)$/.test(f.path) && /\bprocess\.env\b/.test(f.content || '') && !/declare const process\b/.test(f.content || ''))
        violations.push(`${label} ${name}: ${f.path} uses process.env without a local \`declare const process\` (breaks tsc without @types/node)`)
      for (const pkg of importsOf(f)) {
        if (PROVIDED.has(pkg) || declared.has(pkg)) continue
        violations.push(`${label} ${name}: ${f.path} imports '${pkg}' — not in dependencies (or a registryDependency's)`)
      }
    }
  }
  return violations
}

const react = load(join(root, 'public/r'))
const vue = load(join(root, 'public/r/vue'))
const violations = [...audit('[react]', react), ...audit('[vue]', vue)]

if (process.argv.includes('--latest')) {
  const local = (p) => {
    for (const base of [root, join(root, 'packages/vue')]) {
      const f = join(base, 'node_modules', p, 'package.json')
      if (existsSync(f)) return JSON.parse(readFileSync(f, 'utf8')).version
    }
    return null
  }
  const unpinned = new Set()
  for (const items of [react, vue])
    for (const item of items.values())
      for (const d of item.dependencies || []) if (stripVersion(d) === d) unpinned.add(d)
  for (const p of [...unpinned].sort()) {
    const have = local(p)
    if (!have) continue
    let latest
    try { latest = execFileSync('npm', ['view', p, 'version'], { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() } catch { continue }
    if (have.split('.')[0] !== latest.split('.')[0])
      violations.push(`[latest] '${p}' is unpinned; repo builds against ${have} but a fresh install gets ${latest} — pin it or upgrade`)
  }
}

if (violations.length) {
  console.error(`✖ ${violations.length} registry dependency problem(s):`)
  for (const v of violations) console.error('  ' + v)
  process.exit(1)
}
console.log(`✓ registry deps: every shipped import is declared (${react.size} react + ${vue.size} vue items)`)
