import { describe, it, expect } from 'vitest'
import { themePresets, buildThemeCss, neutralPalette } from '@/config/theme-presets'
import { auditContrast } from '../../scripts/audit-contrast'

// Pairs derived entirely from the neutral palette (not brand primary/secondary/
// accent, which are the author's color choices). These must be legible in both
// modes for every preset.
const NEUTRAL_PAIRS = new Set([
  'foreground/background',
  'card-foreground/card',
  'popover-foreground/popover',
  'muted-foreground/background',
  'muted-foreground/muted',
  'border/background',
])

describe('theme preset neutral palettes', () => {
  it('every preset derives a neutral palette', () => {
    for (const preset of themePresets) {
      const n = neutralPalette(preset)
      expect(n.light.background).toBeTruthy()
      expect(n.dark.background).toBeTruthy()
    }
  })

  it('tints neutrals toward the preset hue (Coral is warm, Ocean is cool)', () => {
    const coral = neutralPalette(themePresets.find((p) => p.slug === 'coral')!)
    const ocean = neutralPalette(themePresets.find((p) => p.slug === 'ocean')!)
    // Coral primary hue is 0 (red), Ocean is 199 (blue) — backgrounds differ.
    expect(coral.light.background).not.toBe(ocean.light.background)
  })

  it('Mono stays grayscale (neutralSat 0)', () => {
    const mono = neutralPalette(themePresets.find((p) => p.slug === 'mono')!)
    expect(mono.light.background).toContain(' 0% ')
  })

  for (const preset of themePresets) {
    it(`${preset.name} neutral pairs pass WCAG contrast in both modes`, () => {
      const results = auditContrast(buildThemeCss(preset)).filter((r) =>
        NEUTRAL_PAIRS.has(r.pair)
      )
      const failures = results.filter((r) => !r.pass)
      expect(
        failures.map((f) => `${preset.slug} ${f.mode} ${f.pair} ${f.ratio}`)
      ).toEqual([])
    })
  }
})
