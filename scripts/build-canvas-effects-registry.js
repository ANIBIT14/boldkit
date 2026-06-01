/**
 * build-canvas-effects-registry.js
 *
 * The CanvasEffects components ship as installable shadcn registry items
 * (advertised on the CanvasEffects page as `npx shadcn add .../r/<effect>.json`),
 * but they are NOT part of registry.json — so `shadcn build` never regenerates
 * them. They were originally hand-written (commit edb3d90) and silently went
 * STALE: the served JSON froze at v3.2.2 while src/ kept evolving, and the
 * `registry/default/ui/canvas-effects/` source dir referenced by `files[].path`
 * was deleted.
 *
 * This script closes that gap: for every existing canvas-effect registry item
 * under public/r/ (React) and public/r/vue/ (Vue), it re-reads the CURRENT
 * component source from src/components/CanvasEffects/{react,vue}/ and refreshes
 * the embedded `content`. Curated metadata (name, description, target, type) is
 * preserved as-is. Run as part of `registry:build`, before the content-stripping
 * step (scripts/build-registry.js), so the public/ mirrors update too.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.join(__dirname, '..')

const CANVAS_TARGET_PREFIX = 'components/ui/canvas-effects/'

// (registry dir, source dir) pairs to refresh.
const targets = [
  { rDir: path.join(root, 'public/r'), srcDir: path.join(root, 'src/components/CanvasEffects/react') },
  { rDir: path.join(root, 'public/r/vue'), srcDir: path.join(root, 'src/components/CanvasEffects/vue') },
]

let refreshed = 0
let missing = 0

for (const { rDir, srcDir } of targets) {
  if (!fs.existsSync(rDir)) continue
  const files = fs.readdirSync(rDir).filter(f => f.endsWith('.json'))

  for (const file of files) {
    const jsonPath = path.join(rDir, file)
    const item = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    if (!Array.isArray(item.files)) continue

    // Only touch canvas-effect items (leave any future co-located items alone).
    const isCanvasEffect = item.files.some(
      f => typeof f.target === 'string' && f.target.startsWith(CANVAS_TARGET_PREFIX)
    )
    if (!isCanvasEffect) continue

    let changed = false
    for (const f of item.files) {
      if (!f.target || !f.target.startsWith(CANVAS_TARGET_PREFIX)) continue
      const srcPath = path.join(srcDir, path.basename(f.target))
      if (!fs.existsSync(srcPath)) {
        console.warn(`  ⚠ source missing for ${path.relative(root, jsonPath)}: ${path.relative(root, srcPath)}`)
        missing++
        continue
      }
      const content = fs.readFileSync(srcPath, 'utf-8')
      if (f.content !== content) {
        f.content = content
        changed = true
      }
    }

    if (changed) {
      fs.writeFileSync(jsonPath, JSON.stringify(item, null, 2) + '\n')
      console.log(`  ↻ refreshed ${path.relative(root, jsonPath)}`)
      refreshed++
    }
  }
}

console.log(`\nCanvas-effects registry: ${refreshed} refreshed, ${missing} missing source.`)
if (missing > 0) {
  process.exitCode = 1
}
