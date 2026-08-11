#!/usr/bin/env node
/**
 * Heuristic sweep for icon-only interactive controls with no text equivalent.
 *
 * Flags an element when ALL hold:
 *   - it's interactive (<button>, or role="button"/"tab"/"option"/"menuitem")
 *   - its children contain a capitalised icon component (lucide et al) or <svg>
 *   - there is NO bare text node, {expression}, {{ mustache }}, sr-only span,
 *     aria-label, aria-labelledby, or title on the element
 *
 * Deliberately dumb: it over-reports (slot/children-based components look
 * empty). Output is a review list, not a verdict — vet each hit, then either
 * add a name or add it to ALLOWED below with the reason.
 *
 * Why this exists: unnamed icon-only controls were found in three consecutive
 * audit passes (comparison-table cells, accent swatches, then 20 across the
 * templates and blocks). Exits non-zero so CI catches the next one.
 *
 *   node scripts/audit-icon-labels.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Vetted false positives: `file:line` → why it's fine. */
const ALLOWED = {
  'packages/vue/src/components/ui/DataTable.vue:274':
    'FlexRender renders the column header text into the button',
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '__tests__' || entry.name === 'node_modules') continue
    const p = join(dir, entry.name)
    if (entry.isDirectory()) walk(p, out)
    else if (/\.(tsx|vue)$/.test(entry.name)) out.push(p)
  }
  return out
}

const files = [
  ...walk(join(root, 'src/components')),
  ...walk(join(root, 'packages/vue/src/components')),
]

const OPEN = /<(button|a)\b|role=["']{1,2}(button|tab|option|menuitem|switch|checkbox)/i
const ICON = /<[A-Z][A-Za-z0-9]*\s|<svg\b/
const HAS_NAME = /aria-label|aria-labelledby|:aria-label|sr-only|\btitle=/

/** True if the element body has any human-visible text or interpolation. */
function hasText(body) {
  if (/\{\{|\{\s*[a-zA-Z_$]/.test(body)) return true // {{ vue }} / {jsx}
  if (/<slot\b|\{children\}/.test(body)) return true // content comes from outside
  const stripped = body.replace(/<[^>]*>/g, ' ') // drop all tags
  return /[A-Za-z0-9]/.test(stripped)
}

const findings = []

for (const file of files) {
  const src = readFileSync(file, 'utf-8')
  const lines = src.split('\n')

  for (let i = 0; i < lines.length; i++) {
    if (!OPEN.test(lines[i])) continue
    // Grab the element: from the opening tag to its closing tag or self-close.
    const chunk = lines.slice(i, i + 18).join('\n')
    const tagMatch = chunk.match(/^\s*<([A-Za-z][\w.]*)/)
    if (!tagMatch) continue
    const tag = tagMatch[1]
    const closeIdx = chunk.indexOf(`</${tag}>`)
    const selfClose = chunk.search(/\/>/)
    const end =
      closeIdx !== -1 ? closeIdx : selfClose !== -1 ? selfClose : chunk.length
    const el = chunk.slice(0, end)

    if (!ICON.test(el)) continue
    if (HAS_NAME.test(el)) continue
    // Strip the opening tag's attributes before looking for child text.
    const body = el.slice(el.indexOf('>') + 1)
    if (hasText(body)) continue

    const rel = relative(root, file)
    if (ALLOWED[`${rel}:${i + 1}`]) continue

    findings.push({ file: rel, line: i + 1, snippet: lines[i].trim().slice(0, 90) })
  }
}

if (findings.length === 0) {
  console.log(
    `✓ no unnamed icon-only controls (${files.length} files, ${Object.keys(ALLOWED).length} vetted exception(s))`
  )
  process.exit(0)
}

const byFile = {}
for (const f of findings) (byFile[f.file] ??= []).push(f)

console.error(
  `✗ ${findings.length} icon-only control(s) with no accessible name, across ${Object.keys(byFile).length} file(s):\n`
)
for (const [file, hits] of Object.entries(byFile).sort()) {
  console.error(file)
  for (const h of hits) console.error(`  :${h.line}  ${h.snippet}`)
}
console.error(
  '\nAdd aria-label (or visible text / an sr-only span), or record a vetted\nexception in ALLOWED at the top of scripts/audit-icon-labels.mjs.'
)
process.exit(1)
