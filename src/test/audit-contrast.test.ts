import { describe, it, expect } from 'vitest'
import {
  contrastRatio,
  parseTokens,
  auditContrast,
  type HSL,
} from '../../scripts/audit-contrast'

describe('contrastRatio', () => {
  it('black on white is ~21:1', () => {
    const black: HSL = [0, 0, 0]
    const white: HSL = [0, 0, 100]
    expect(contrastRatio(black, white)).toBeCloseTo(21, 0)
  })

  it('white on white is 1:1', () => {
    const white: HSL = [0, 0, 100]
    expect(contrastRatio(white, white)).toBeCloseTo(1, 5)
  })

  it('flags a low-contrast pair as below AA', () => {
    const lightGrey: HSL = [0, 0, 90]
    const paleGrey: HSL = [0, 0, 95]
    expect(contrastRatio(lightGrey, paleGrey)).toBeLessThan(4.5)
  })
})

describe('parseTokens', () => {
  it('extracts HSL token values from a block', () => {
    const css = `:root { --foreground: 240 10% 10%; --background: 60 9% 98%; }`
    const tokens = parseTokens(css, ':root')
    expect(tokens.foreground).toEqual([240, 10, 10])
    expect(tokens.background).toEqual([60, 9, 98])
  })

  it('scopes to the given selector', () => {
    const css = `:root { --foreground: 0 0% 0%; } .dark { --foreground: 0 0% 100%; }`
    expect(parseTokens(css, '.dark').foreground).toEqual([0, 0, 100])
  })
})

describe('auditContrast', () => {
  it('reports pass/fail per token pair for both modes', () => {
    const css = `
      :root { --foreground: 240 10% 10%; --background: 0 0% 100%; --border: 240 10% 10%; }
      .dark { --foreground: 0 0% 100%; --background: 240 10% 10%; --border: 0 0% 20%; }
    `
    const results = auditContrast(css)
    const light = results.find((r) => r.mode === 'light' && r.pair === 'foreground/background')
    expect(light?.pass).toBe(true)
    // both modes represented
    expect(results.some((r) => r.mode === 'dark')).toBe(true)
  })

  it('the real globals.css passes every contrast check after fixes', () => {
    const failures = auditContrast().filter((r) => !r.pass)
    expect(failures.map((f) => `${f.mode} ${f.pair} ${f.ratio}`)).toEqual([])
  })
})
