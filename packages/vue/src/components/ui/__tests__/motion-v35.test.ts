/**
 * Motion System v3.5 — loading states (Vue parity).
 *
 * Mirrors src/components/ui/__tests__/motion-v35.test.tsx on the React side.
 * ChartContainer is not mounted here — it pulls in echarts/vue-echarts, which
 * needs a real canvas; ChartLoading is tested directly instead.
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from '@/components/ui/Skeleton.vue'
import Progress from '@/components/ui/Progress.vue'
import ChartLoading from '@/components/ui/ChartLoading.vue'

describe('Skeleton.vue (v3.5 variants)', () => {
  it('defaults to the pre-v3.5 pulse behaviour', () => {
    expect(mount(Skeleton).classes()).toContain('animate-pulse')
  })

  it.each([
    ['stamp', 'bk-skeleton-stamp'],
    ['blocks', 'bk-skeleton-blocks'],
    ['scan', 'bk-skeleton-scan'],
  ] as const)('maps variant=%s to .%s', (variant, cls) => {
    expect(mount(Skeleton, { props: { variant } }).classes()).toContain(cls)
  })

  it('variant=none applies no animation class', () => {
    const classes = mount(Skeleton, { props: { variant: 'none' } }).classes()
    expect(classes.some((c) => c === 'animate-pulse' || c.startsWith('bk-skeleton-'))).toBe(false)
  })

  it('is hidden from assistive tech', () => {
    expect(mount(Skeleton).attributes('aria-hidden')).toBe('true')
  })
})

describe('Progress.vue (v3.5 variants)', () => {
  const indicatorOf = (w: ReturnType<typeof mount>) =>
    w.element.firstElementChild as HTMLElement

  it('smooth is the default and drives the indicator transform', () => {
    const w = mount(Progress, { props: { modelValue: 40 } })
    expect(indicatorOf(w).style.transform).toBe('translateX(-60%)')
    expect(indicatorOf(w).className).not.toContain('bk-progress-marquee')
  })

  it('stepped keeps the transform but adds the stepped timing class', () => {
    const w = mount(Progress, { props: { modelValue: 40, variant: 'stepped' } })
    expect(indicatorOf(w).className).toContain('bk-progress-stepped')
    expect(indicatorOf(w).style.transform).toBe('translateX(-60%)')
  })

  it('marquee is indeterminate — no transform, no aria-valuenow', () => {
    const w = mount(Progress, { props: { modelValue: 40, variant: 'marquee' } })
    expect(indicatorOf(w).className).toContain('bk-progress-marquee')
    expect(indicatorOf(w).style.transform).toBe('')
    expect(w.attributes('aria-valuenow')).toBeUndefined()
  })

  it('clamps an out-of-range value instead of overshooting the track', () => {
    const w = mount(Progress, { props: { modelValue: 150 } })
    expect(indicatorOf(w).style.transform).toBe('translateX(-0%)')
    expect(w.attributes('aria-valuenow')).toBe('100')
  })

  it('does not leak `variant` or `class` onto the primitive as DOM attributes', () => {
    const w = mount(Progress, { props: { modelValue: 40, variant: 'stepped' } })
    expect(w.attributes('variant')).toBeUndefined()
  })

  it('clamps and fills against max, not a hard 100', () => {
    const w = mount(Progress, { props: { modelValue: 150, max: 200 } })
    // The bar is 75% full and AT agrees — before the fix modelValue was clamped
    // to 100, so a full-looking bar reported "50%" against max=200.
    expect(indicatorOf(w).style.transform).toBe('translateX(-25%)')
    expect(w.attributes('aria-valuenow')).toBe('150')
    expect(w.attributes('aria-valuemax')).toBe('200')
  })

  it('forwards primitive props the whitelist used to drop', () => {
    const w = mount(Progress, {
      props: { modelValue: 40, getValueText: () => 'forty of a hundred' },
    })
    expect(w.attributes('aria-valuetext')).toBe('forty of a hundred')
  })
})

describe('ChartLoading.vue', () => {
  it('announces itself and renders the default bar count', () => {
    const w = mount(ChartLoading)
    expect(w.attributes('role')).toBe('status')
    expect(w.attributes('aria-busy')).toBe('true')
    expect(w.text()).toContain('Loading chart')
    expect(w.findAll('.bk-skeleton-stamp')).toHaveLength(7)
  })

  it('staggers each bar so they do not stamp in unison', () => {
    const w = mount(ChartLoading, { props: { bars: 3 } })
    const bars = w.findAll('.bk-skeleton-stamp')
    expect(bars).toHaveLength(3)
    expect(bars.map((b) => (b.element as HTMLElement).style.animationDelay)).toEqual([
      '0ms',
      '90ms',
      '180ms',
    ])
  })

  it('forwards a custom label', () => {
    expect(mount(ChartLoading, { props: { label: 'Crunching numbers' } }).text()).toContain(
      'Crunching numbers'
    )
  })
})
