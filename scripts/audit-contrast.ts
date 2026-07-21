#!/usr/bin/env tsx
/**
 * Dark-mode contrast audit. Parses the semantic HSL tokens from
 * src/styles/globals.css (:root and .dark), computes WCAG contrast ratios for
 * every meaningful token pair, and flags failures (4.5:1 text / 3:1 UI).
 *
 * Run directly to audit + emit the report (exits non-zero on any failure):
 *   tsx scripts/audit-contrast.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const GLOBALS = join(ROOT, 'src/styles/globals.css')

export type HSL = [number, number, number]
export type Mode = 'light' | 'dark'

// ---------------------------------------------------------------------------
// Color math (WCAG 2.1)
// ---------------------------------------------------------------------------
export function hslToRgb([h, s, l]: HSL): [number, number, number] {
  const sat = s / 100
  const lig = l / 100
  const c = (1 - Math.abs(2 * lig - 1)) * sat
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lig - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255]
}

function relativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((v) => {
    const cs = v / 255
    return cs <= 0.03928 ? cs / 12.92 : ((cs + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(a: HSL, b: HSL): number {
  const la = relativeLuminance(hslToRgb(a))
  const lb = relativeLuminance(hslToRgb(b))
  const lighter = Math.max(la, lb)
  const darker = Math.min(la, lb)
  return (lighter + 0.05) / (darker + 0.05)
}

// ---------------------------------------------------------------------------
// Token parsing
// ---------------------------------------------------------------------------
/** Parse `--name: H S% L%;` declarations inside the first block matching selector. */
export function parseTokens(css: string, selector: string): Record<string, HSL> {
  // Grab the block body for the selector (`:root {...}` or `.dark {...}`).
  const re = new RegExp(`${selector.replace('.', '\\.')}\\s*\\{([^}]*)\\}`)
  const body = css.match(re)?.[1] ?? ''
  const tokens: Record<string, HSL> = {}
  const decl = /--([\w-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/g
  let m: RegExpExecArray | null
  while ((m = decl.exec(body))) {
    tokens[m[1]] = [parseFloat(m[2]), parseFloat(m[3]), parseFloat(m[4])]
  }
  return tokens
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------
export interface ContrastCheck {
  pair: string
  fg: string
  bg: string
  kind: 'text' | 'ui'
}

// fg/bg token pairs to check, with the WCAG threshold class.
const TEXT_PAIRS: [string, string][] = [
  ['foreground', 'background'],
  ['card-foreground', 'card'],
  ['popover-foreground', 'popover'],
  ['primary-foreground', 'primary'],
  ['secondary-foreground', 'secondary'],
  ['accent-foreground', 'accent'],
  ['destructive-foreground', 'destructive'],
  ['success-foreground', 'success'],
  ['warning-foreground', 'warning'],
  ['info-foreground', 'info'],
  ['muted-foreground', 'background'],
  ['muted-foreground', 'muted'],
]
const UI_PAIRS: [string, string][] = [['border', 'background']]

export const CHECKS: ContrastCheck[] = [
  ...TEXT_PAIRS.map(([fg, bg]) => ({ pair: `${fg}/${bg}`, fg, bg, kind: 'text' as const })),
  ...UI_PAIRS.map(([fg, bg]) => ({ pair: `${fg}/${bg}`, fg, bg, kind: 'ui' as const })),
]

export interface ContrastResult extends ContrastCheck {
  mode: Mode
  ratio: number
  threshold: number
  pass: boolean
}

export function auditContrast(css: string = readFileSync(GLOBALS, 'utf8')): ContrastResult[] {
  const modes: Record<Mode, Record<string, HSL>> = {
    light: parseTokens(css, ':root'),
    dark: parseTokens(css, '.dark'),
  }
  const results: ContrastResult[] = []
  for (const mode of ['light', 'dark'] as Mode[]) {
    const tokens = modes[mode]
    for (const check of CHECKS) {
      const fg = tokens[check.fg]
      const bg = tokens[check.bg]
      if (!fg || !bg) continue
      const ratio = contrastRatio(fg, bg)
      const threshold = check.kind === 'text' ? 4.5 : 3.0
      results.push({
        ...check,
        mode,
        ratio: Math.round(ratio * 100) / 100,
        threshold,
        pass: ratio >= threshold,
      })
    }
  }
  return results
}

// ---------------------------------------------------------------------------
// Runner (only when executed directly, not on import)
// ---------------------------------------------------------------------------
function isMain(): boolean {
  return process.argv[1] === fileURLToPath(import.meta.url)
}

if (isMain()) {
  const results = auditContrast()
  const failures = results.filter((r) => !r.pass)
  const report = {
    tool: 'WCAG 2.1 contrast audit over src/styles/globals.css tokens (4.5 text / 3.0 UI)',
    generatedPairs: CHECKS.length,
    results,
  }
  const body = JSON.stringify(report, null, 2) + '\n'
  writeFileSync(join(ROOT, 'public/contrast-report.json'), body)
  writeFileSync(join(ROOT, 'src/config/contrast-report.json'), body)

  for (const f of failures) {
    console.error(
      `✗ [${f.mode}] ${f.pair}: ${f.ratio}:1 (needs ${f.threshold}:1)`
    )
  }
  if (failures.length) {
    console.error(`\n${failures.length} contrast failure(s).`)
    process.exit(1)
  }
  console.log(`✓ All ${results.length} token-pair contrast checks pass.`)
}
