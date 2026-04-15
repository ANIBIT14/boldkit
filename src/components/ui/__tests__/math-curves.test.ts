import { describe, it, expect } from 'vitest'
import { getPoint, buildPath, getCurvePulseDuration } from '@/lib/math-curves'
import type { LoaderCurveKey } from '@/lib/math-curves'

const NEW_CURVES = ['astroid', 'deltoid', 'nephroid', 'epicycloid', 'superellipse', 'triskelion', 'involute'] as const

describe('new math curves', () => {
  NEW_CURVES.forEach((curve) => {
    describe(curve, () => {
      it('getPoint returns x,y in [0, 100] at progress=0', () => {
        const { x, y } = getPoint(curve, 0, 1.0)
        expect(x).toBeGreaterThanOrEqual(0)
        expect(x).toBeLessThanOrEqual(100)
        expect(y).toBeGreaterThanOrEqual(0)
        expect(y).toBeLessThanOrEqual(100)
      })

      it('getPoint returns x,y in [0, 100] at progress=0.5', () => {
        const { x, y } = getPoint(curve, 0.5, 0.52)
        expect(x).toBeGreaterThanOrEqual(0)
        expect(x).toBeLessThanOrEqual(100)
        expect(y).toBeGreaterThanOrEqual(0)
        expect(y).toBeLessThanOrEqual(100)
      })

      it('getPoint returns x,y in [0, 100] at progress=1', () => {
        const { x, y } = getPoint(curve, 1, 1.0)
        expect(x).toBeGreaterThanOrEqual(0)
        expect(x).toBeLessThanOrEqual(100)
        expect(y).toBeGreaterThanOrEqual(0)
        expect(y).toBeLessThanOrEqual(100)
      })

      it('buildPath returns a non-empty SVG path string', () => {
        const path = buildPath(curve, 1.0)
        expect(path).toMatch(/^M [\d.]+/)
        expect(path.length).toBeGreaterThan(10)
      })

      it('getCurvePulseDuration returns a positive number', () => {
        const dur = getCurvePulseDuration(curve)
        expect(dur).toBeGreaterThan(0)
      })

      it('is accepted as a LoaderCurveKey type', () => {
        const key: LoaderCurveKey = curve
        expect(key).toBe(curve)
      })
    })
  })

  it('samples 20 evenly-spaced points for each new curve — all in [0, 100]', () => {
    NEW_CURVES.forEach((curve) => {
      for (let i = 0; i <= 20; i++) {
        const { x, y } = getPoint(curve, i / 20, 0.76)
        expect(x, `${curve} x at progress=${i/20}`).toBeGreaterThanOrEqual(0)
        expect(x, `${curve} x at progress=${i/20}`).toBeLessThanOrEqual(100)
        expect(y, `${curve} y at progress=${i/20}`).toBeGreaterThanOrEqual(0)
        expect(y, `${curve} y at progress=${i/20}`).toBeLessThanOrEqual(100)
      }
    })
  })
})
