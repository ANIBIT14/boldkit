#!/usr/bin/env node
/**
 * Sync registry/default/* from src/* — the canonical source of truth.
 *
 * Why: every fix landed in src/ historically had to be hand-copied into the
 * registry mirror, and over time most weren't. By 2026-05-26 ~36 UI mirrors
 * and the utils.ts lib had drifted, in some cases by entire API surfaces.
 * Consumers installing components via shadcn CLI were getting stale code
 * months behind src/.
 *
 * This script runs as a pre-step before `shadcn build` so the registry can
 * never drift again. It copies:
 *   - src/components/ui/*.tsx              → registry/default/ui/*.tsx
 *   - src/lib/utils.ts                     → registry/default/lib/utils.ts
 *   - src/lib/math-curves.ts               → registry/default/lib/math-curves.ts
 *
 * Excluded (structural divergence — needs manual handling):
 *   - src/components/ui/chart/*            (split-file source vs flat registry
 *                                          with different import shapes)
 *   - src/components/ui/chart.tsx          (src is a re-export barrel pointing
 *                                          to './chart/index'; registry uses
 *                                          a self-contained flat chart.tsx
 *                                          that bundles the family)
 *   - src/components/ui/__tests__/*        (test files)
 *
 * Only files that already exist in registry/default/ get overwritten.
 * New src/ files don't auto-create registry entries — that requires an
 * explicit registry.json entry, which is what the registry actually ships.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const UI_SRC = join(root, 'src/components/ui')
const UI_DST = join(root, 'registry/default/ui')
const LIB_SRC = join(root, 'src/lib')
const LIB_DST = join(root, 'registry/default/lib')

// Files to sync from src/lib → registry/default/lib (only these, by name)
const LIB_FILES = ['utils.ts', 'math-curves.ts']

// UI files to skip even though they live flat in src/components/ui/.
// chart.tsx is a barrel re-export in src — registry needs its own flat copy.
const UI_SKIP = new Set(['chart.tsx'])

let copied = 0
let skippedMissing = 0
let unchanged = 0

function syncFile(src, dst) {
  if (!existsSync(src) || !existsSync(dst)) {
    skippedMissing++
    return
  }
  const sContent = readFileSync(src, 'utf-8')
  const dContent = readFileSync(dst, 'utf-8')
  if (sContent === dContent) {
    unchanged++
    return
  }
  writeFileSync(dst, sContent)
  copied++
  console.log(`  sync: ${dst.replace(root + '/', '')}`)
}

console.log('Syncing registry mirrors from src/ source of truth...')

// UI components — flat src/components/ui/*.tsx only (not chart/ subdir, not __tests__)
for (const entry of readdirSync(UI_SRC, { withFileTypes: true })) {
  if (!entry.isFile()) continue           // skip chart/, __tests__/
  if (!entry.name.endsWith('.tsx')) continue
  if (UI_SKIP.has(entry.name)) continue
  syncFile(join(UI_SRC, entry.name), join(UI_DST, entry.name))
}

// Lib helpers
for (const name of LIB_FILES) {
  syncFile(join(LIB_SRC, name), join(LIB_DST, name))
}

// Verify post-sync state
let drifted = 0
function check(src, dst) {
  if (!existsSync(src) || !existsSync(dst)) return
  if (readFileSync(src, 'utf-8') !== readFileSync(dst, 'utf-8')) {
    console.warn(`  STILL DRIFTED: ${dst.replace(root + '/', '')}`)
    drifted++
  }
}
for (const entry of readdirSync(UI_SRC, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.tsx') && !UI_SKIP.has(entry.name)) {
    check(join(UI_SRC, entry.name), join(UI_DST, entry.name))
  }
}
for (const name of LIB_FILES) check(join(LIB_SRC, name), join(LIB_DST, name))

console.log(`Sync complete: ${copied} copied, ${unchanged} already in sync, ${skippedMissing} skipped (no registry mirror).`)
if (drifted) {
  console.error(`✗ ${drifted} files STILL drifted after sync — bailing.`)
  process.exit(1)
}
console.log('All in-scope mirrors in sync. (Charts excluded — structural divergence; see registry/default/ui/<chart>.tsx)')
