/**
 * Lifecycle guarantees for canvas-effect-core.
 *
 * These are the behaviours the 23 effects rely on and that a browser can't
 * easily prove (CDP reports an automated tab as hidden, and Chrome suspends
 * rAF there, so "did it animate?" is unmeasurable from outside).
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { installCanvasMock, installFrameControl } from '@/test/canvas-mock'

// Reduced-motion state is read through motion-core; control it per test.
const reduced = { value: false }
const listeners = new Set<(r: boolean) => void>()
vi.mock('@/lib/motion-core', () => ({
  prefersReducedMotion: () => reduced.value,
  onReducedMotionChange: (fn: (r: boolean) => void) => {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}))

const { mountCanvasEffect, DEFAULT_MAX_PIXEL_COUNT } = await import('@/lib/canvas-effect-core')

/** Drive the ResizeObserver the core installed, which nothing fires in jsdom. */
let observers: Array<(entries: unknown[]) => void> = []

class FakeResizeObserver {
  cb: (entries: unknown[]) => void
  constructor(cb: (entries: unknown[]) => void) {
    this.cb = cb
    observers.push(cb)
  }
  observe() {}
  disconnect() {
    observers = observers.filter((o) => o !== this.cb)
  }
}

let intersectionCallbacks: Array<(entries: unknown[]) => void> = []
class FakeIntersectionObserver {
  constructor(cb: (entries: unknown[]) => void) {
    intersectionCallbacks.push(cb)
  }
  observe() {}
  disconnect() {}
}

function emitResize(width: number, height: number, devicePixel = true) {
  const entry = {
    borderBoxSize: [{ inlineSize: width, blockSize: height }],
    devicePixelContentBoxSize: devicePixel
      ? [{ inlineSize: width * 2, blockSize: height * 2 }]
      : undefined,
  }
  observers.forEach((cb) => cb([entry]))
}

function setVisible(visible: boolean) {
  intersectionCallbacks.forEach((cb) => cb([{ isIntersecting: visible }]))
}

function setTabHidden(hidden: boolean) {
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden })
  document.dispatchEvent(new Event('visibilitychange'))
}

let restoreCanvas: () => void
let frames: ReturnType<typeof installFrameControl>

beforeEach(() => {
  reduced.value = false
  listeners.clear()
  observers = []
  intersectionCallbacks = []
  restoreCanvas = installCanvasMock()
  frames = installFrameControl()
  vi.stubGlobal('ResizeObserver', FakeResizeObserver)
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
  setTabHidden(false)
})

afterEach(() => {
  frames.restore()
  restoreCanvas()
  vi.unstubAllGlobals()
})

function mount(options = {}) {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  const draw = vi.fn()
  const handle = mountCanvasEffect(canvas, () => draw, options)
  return { canvas, draw, handle }
}

describe('sizing', () => {
  it('sizes the backing store from devicePixelContentBoxSize', () => {
    const { canvas, handle } = mount()
    emitResize(400, 300)
    expect(canvas.width).toBe(800)
    expect(canvas.height).toBe(600)
    handle.dispose()
  })

  it('caps total pixels at maxPixelCount, preserving aspect ratio', () => {
    const { canvas, handle } = mount({ maxPixelCount: 100_000 })
    emitResize(2000, 1000)
    const area = canvas.width * canvas.height
    expect(area).toBeLessThanOrEqual(100_000)
    // 2:1 box stays 2:1 after clamping.
    expect(canvas.width / canvas.height).toBeCloseTo(2, 1)
    handle.dispose()
  })

  it('clamps a 4K-sized box under the default ceiling', () => {
    const { canvas, handle } = mount()
    emitResize(3840, 2160)
    expect(canvas.width * canvas.height).toBeLessThanOrEqual(DEFAULT_MAX_PIXEL_COUNT)
    handle.dispose()
  })

  it('ignores a zero-size box instead of producing NaN', () => {
    const { canvas, handle } = mount()
    emitResize(400, 300)
    const before = canvas.width
    emitResize(0, 0)
    expect(canvas.width).toBe(before)
    expect(Number.isFinite(canvas.width)).toBe(true)
    handle.dispose()
  })
})

describe('pausing', () => {
  it('stops the loop when scrolled out of view and resumes on return', () => {
    const { draw, handle } = mount()
    emitResize(400, 300)
    setVisible(true)

    frames.step()
    const ranWhileVisible = draw.mock.calls.length
    expect(ranWhileVisible).toBeGreaterThan(0)

    setVisible(false)
    frames.step()
    frames.step()
    // No rAF is queued at all while hidden — not a no-op frame.
    expect(draw.mock.calls.length).toBe(ranWhileVisible)

    setVisible(true)
    frames.step()
    expect(draw.mock.calls.length).toBeGreaterThan(ranWhileVisible)
    handle.dispose()
  })

  it('stops the loop while the tab is hidden', () => {
    const { draw, handle } = mount()
    emitResize(400, 300)
    setVisible(true)
    frames.step()
    const before = draw.mock.calls.length

    setTabHidden(true)
    frames.step()
    frames.step()
    expect(draw.mock.calls.length).toBe(before)

    setTabHidden(false)
    frames.step()
    expect(draw.mock.calls.length).toBeGreaterThan(before)
    handle.dispose()
  })
})

describe('reduced motion', () => {
  it('paints one static frame and never loops', () => {
    reduced.value = true
    const { draw, handle } = mount()
    emitResize(400, 300)
    setVisible(true)

    const afterSetup = draw.mock.calls.length
    expect(afterSetup).toBeGreaterThan(0)                 // painted something
    // Every static paint reports a zero delta, so nothing advances.
    draw.mock.calls.forEach((c) => expect(c).toEqual([0, 0]))

    frames.step()
    frames.step()
    expect(draw.mock.calls.length).toBe(afterSetup)
    handle.dispose()
  })

  it('honours the preference turning on mid-session', () => {
    const { draw, handle } = mount()
    emitResize(400, 300)
    setVisible(true)
    frames.step()
    expect(draw.mock.calls.length).toBeGreaterThan(1)

    reduced.value = true
    listeners.forEach((fn) => fn(true))
    const afterToggle = draw.mock.calls.length

    frames.step()
    frames.step()
    expect(draw.mock.calls.length).toBe(afterToggle)
    handle.dispose()
  })

  it('can be opted out of', () => {
    reduced.value = true
    const { draw, handle } = mount({ respectReducedMotion: false })
    emitResize(400, 300)
    setVisible(true)
    const before = draw.mock.calls.length
    frames.step()
    expect(draw.mock.calls.length).toBeGreaterThan(before)
    handle.dispose()
  })
})

describe('frame delta', () => {
  it('reports the delta in both ms and 60fps frames', () => {
    const { draw, handle } = mount()
    emitResize(400, 300)
    setVisible(true)
    draw.mockClear()

    frames.step(33.334)                 // two 60fps frames' worth
    const [dt, f] = draw.mock.calls.at(-1)!
    expect(dt).toBeCloseTo(33.334, 1)
    expect(f).toBeCloseTo(2, 1)
    handle.dispose()
  })

  it('clamps a long stall so a resumed tab cannot jump', () => {
    const { draw, handle } = mount()
    emitResize(400, 300)
    setVisible(true)
    draw.mockClear()

    frames.step(5000)
    const [dt] = draw.mock.calls.at(-1)!
    expect(dt).toBeLessThanOrEqual(100)
    handle.dispose()
  })
})

describe('teardown', () => {
  it('stops drawing and aborts the setup signal on dispose', () => {
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    const draw = vi.fn()
    let signal: AbortSignal | undefined
    const handle = mountCanvasEffect(canvas, (_ctx, _el, s) => {
      signal = s
      return draw
    })
    emitResize(400, 300)
    setVisible(true)
    frames.step()
    const before = draw.mock.calls.length

    handle.dispose()
    frames.step()
    frames.step()
    expect(draw.mock.calls.length).toBe(before)
    expect(signal?.aborted).toBe(true)
  })

  it('is a no-op for a null canvas rather than throwing', () => {
    expect(() => mountCanvasEffect(null, () => () => {}).dispose()).not.toThrow()
  })
})

describe('coordinates', () => {
  it("applies a scale transform on every resize in 'css' mode", () => {
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    const setTransform = vi.fn()
    const ctx = new Proxy({} as CanvasRenderingContext2D, {
      get: (_t, prop) => (prop === 'setTransform' ? setTransform : () => {}),
      set: () => true,
    })
    vi.spyOn(canvas, 'getContext').mockReturnValue(ctx as never)

    const handle = mountCanvasEffect(canvas, () => () => {}, { coordinates: 'css' })
    emitResize(400, 300)
    emitResize(800, 600)
    expect(setTransform).toHaveBeenCalled()
    handle.dispose()
  })
})
