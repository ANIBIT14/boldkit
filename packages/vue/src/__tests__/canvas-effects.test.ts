/**
 * Smoke test for every Vue CanvasEffect.
 *
 * Mirrors src/components/CanvasEffects/__tests__/react-effects.test.tsx. The
 * Vue effects live in the website tree (src/components/CanvasEffects/vue —
 * the source the canvas registry builder reads) rather than in this package,
 * so they had no automated coverage at all and shipped to consumers unverified.
 *
 * The 2D context is mocked because happy-dom returns null from getContext,
 * which would let every effect no-op and the test pass having drawn nothing.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import * as Effects from '../../../../src/components/CanvasEffects/vue/index'

const EFFECT_NAMES = Object.keys(Effects)

// ── Canvas 2D test double ────────────────────────────────────────────────
function makeGradient() {
  return { addColorStop: () => {} }
}
function makeImageData(w: number, h: number) {
  const width = Math.max(1, Math.floor(w))
  const height = Math.max(1, Math.floor(h))
  return { width, height, colorSpace: 'srgb', data: new Uint8ClampedArray(width * height * 4) }
}
function createContext(canvas: HTMLCanvasElement) {
  const overrides: Record<string, unknown> = {
    canvas,
    createLinearGradient: makeGradient,
    createRadialGradient: makeGradient,
    createConicGradient: makeGradient,
    createPattern: () => null,
    createImageData: (w: number, h: number) => makeImageData(w, h),
    getImageData: (_x: number, _y: number, w: number, h: number) => makeImageData(w, h),
    measureText: () => ({ width: 0 }),
    getLineDash: () => [],
  }
  const store = new Map<string, unknown>()
  return new Proxy({} as CanvasRenderingContext2D, {
    get: (_t, p: string) => (p in overrides ? overrides[p] : store.has(p) ? store.get(p) : () => {}),
    set: (_t, p: string, v) => (store.set(p, v), true),
    has: () => true,
  })
}

let resizeCbs: Array<(e: unknown[]) => void> = []
let intersectCbs: Array<(e: unknown[]) => void> = []
let queued: FrameRequestCallback[] = []
let now = 0

const originals = {
  getContext: HTMLCanvasElement.prototype.getContext,
  raf: globalThis.requestAnimationFrame,
  cancel: globalThis.cancelAnimationFrame,
  ro: globalThis.ResizeObserver,
  io: globalThis.IntersectionObserver,
  perfNow: performance.now.bind(performance),
}

beforeEach(() => {
  resizeCbs = []
  intersectCbs = []
  queued = []
  now = 0

  ;(HTMLCanvasElement.prototype as unknown as Record<string, unknown>).getContext = function (
    this: HTMLCanvasElement,
    kind: string
  ) {
    return kind === '2d' ? createContext(this) : null
  }
  for (const prop of ['offsetWidth', 'offsetHeight'] as const) {
    Object.defineProperty(HTMLCanvasElement.prototype, prop, {
      configurable: true,
      get: () => (prop === 'offsetWidth' ? 400 : 300),
    })
  }

  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    queued.push(cb)) as typeof requestAnimationFrame
  globalThis.cancelAnimationFrame = ((id: number) => {
    queued[id - 1] = () => {}
  }) as typeof cancelAnimationFrame
  performance.now = () => now

  globalThis.ResizeObserver = class {
    constructor(private cb: (e: unknown[]) => void) {
      resizeCbs.push(cb)
    }
    observe() {}
    unobserve() {}
    disconnect() {
      resizeCbs = resizeCbs.filter((c) => c !== this.cb)
    }
  } as unknown as typeof ResizeObserver

  globalThis.IntersectionObserver = class {
    constructor(cb: (e: unknown[]) => void) {
      intersectCbs.push(cb)
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  } as unknown as typeof IntersectionObserver
})

afterEach(() => {
  ;(HTMLCanvasElement.prototype as unknown as Record<string, unknown>).getContext =
    originals.getContext
  globalThis.requestAnimationFrame = originals.raf
  globalThis.cancelAnimationFrame = originals.cancel
  globalThis.ResizeObserver = originals.ro
  globalThis.IntersectionObserver = originals.io
  performance.now = originals.perfNow
})

const emitResize = (w: number, h: number) =>
  resizeCbs.forEach((cb) =>
    cb([
      {
        borderBoxSize: [{ inlineSize: w, blockSize: h }],
        devicePixelContentBoxSize: [{ inlineSize: w, blockSize: h }],
      },
    ])
  )
const setVisible = (v: boolean) => intersectCbs.forEach((cb) => cb([{ isIntersecting: v }]))
const step = (ms = 16.667) => {
  now += ms
  queued.splice(0, queued.length).forEach((cb) => cb(now))
}

describe('Vue CanvasEffects', () => {
  it('exports every effect in the catalogue', () => {
    // 19 original + 4 added in v3.5.2 — must match the React catalogue.
    expect(EFFECT_NAMES.length).toBe(23)
    for (const name of ['MeshGradient', 'GodRays', 'Swirl', 'PulsingBorder']) {
      expect(EFFECT_NAMES).toContain(name)
    }
  })

  it.each(EFFECT_NAMES)('%s mounts and renders frames without throwing', (name) => {
    const Comp = (Effects as Record<string, Component>)[name]
    const wrapper = mount(Comp, { attachTo: document.body })

    const canvas = wrapper.find('canvas')
    expect(canvas.exists(), `${name} should render a <canvas>`).toBe(true)

    emitResize(400, 300)
    setVisible(true)
    expect(() => {
      for (let i = 0; i < 12; i++) step()
    }, `${name} threw while drawing`).not.toThrow()

    const el = canvas.element as HTMLCanvasElement
    expect(el.width).toBeGreaterThan(0)
    expect(el.height).toBeGreaterThan(0)
    wrapper.unmount()
  })

  it.each(EFFECT_NAMES)('%s survives a resize mid-animation', (name) => {
    const Comp = (Effects as Record<string, Component>)[name]
    const wrapper = mount(Comp, { attachTo: document.body })
    emitResize(400, 300)
    setVisible(true)
    step()

    expect(() => {
      emitResize(900, 200)
      step()
      step()
      emitResize(120, 640)
      step()
    }, `${name} threw after a resize`).not.toThrow()
    wrapper.unmount()
  })

  it('stops drawing once unmounted', () => {
    const wrapper = mount((Effects as Record<string, Component>).Plasma, { attachTo: document.body })
    emitResize(400, 300)
    setVisible(true)
    step()
    wrapper.unmount()
    expect(() => {
      step()
      step()
    }).not.toThrow()
  })
})
