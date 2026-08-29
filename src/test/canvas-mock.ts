/**
 * Canvas 2D test double.
 *
 * happy-dom returns `null` from `canvas.getContext('2d')`, which makes every
 * CanvasEffect silently no-op — a smoke test against it would pass without
 * ever executing a line of drawing code. This installs a context that answers
 * the whole 2D surface, so effect draw bodies really run and a bad index,
 * undefined colour or bogus gradient stop throws where a test can see it.
 *
 * Deliberately not a renderer: it records nothing and draws nothing. It exists
 * so the *JavaScript* in a frame callback is exercised.
 */

/** Methods that must return a real object rather than undefined. */
function makeGradient() {
  return { addColorStop: () => {} }
}

function makeImageData(w: number, h: number): ImageData {
  const width = Math.max(1, Math.floor(w))
  const height = Math.max(1, Math.floor(h))
  return {
    width,
    height,
    colorSpace: 'srgb',
    data: new Uint8ClampedArray(width * height * 4),
  } as ImageData
}

function createContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
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
    isPointInPath: () => false,
    isPointInStroke: () => false,
  }

  // Everything else: a settable property that also works as a no-op method.
  const store = new Map<string, unknown>()
  return new Proxy({} as CanvasRenderingContext2D, {
    get(_t, prop: string) {
      if (prop in overrides) return overrides[prop]
      if (store.has(prop)) return store.get(prop)
      return () => {}
    },
    set(_t, prop: string, value) {
      store.set(prop, value)
      return true
    },
    has: () => true,
  })
}

/**
 * Install the mock for the current test file. Also gives the canvas a non-zero
 * layout size, since the lifecycle refuses to size a zero-box element.
 */
export function installCanvasMock({ width = 400, height = 300 } = {}) {
  const proto = HTMLCanvasElement.prototype as unknown as Record<string, unknown>
  const originalGetContext = proto.getContext

  proto.getContext = function (this: HTMLCanvasElement, kind: string) {
    return kind === '2d' ? createContext(this) : null
  }

  // happy-dom reports 0 for offset* on detached layout; the lifecycle uses
  // these as its CSS-pixel fallback when devicePixelContentBoxSize is absent.
  const defineSize = (prop: 'offsetWidth' | 'offsetHeight', value: number) =>
    Object.defineProperty(HTMLCanvasElement.prototype, prop, {
      configurable: true,
      get: () => value,
    })
  defineSize('offsetWidth', width)
  defineSize('offsetHeight', height)

  return () => {
    proto.getContext = originalGetContext
  }
}

/**
 * Fake ResizeObserver / IntersectionObserver.
 *
 * Neither fires in happy-dom, so without these the lifecycle never sizes the
 * canvas and never marks it visible — the frame callback would never run and a
 * smoke test would pass having executed nothing.
 */
export function installObservers() {
  let resizeCbs: Array<(entries: unknown[]) => void> = []
  let intersectCbs: Array<(entries: unknown[]) => void> = []

  const originalResize = globalThis.ResizeObserver
  const originalIntersect = globalThis.IntersectionObserver

  class FakeResizeObserver {
    cb: (entries: unknown[]) => void
    constructor(cb: (entries: unknown[]) => void) {
      this.cb = cb
      resizeCbs.push(cb)
    }
    observe() {}
    unobserve() {}
    disconnect() {
      resizeCbs = resizeCbs.filter((c) => c !== this.cb)
    }
  }
  class FakeIntersectionObserver {
    cb: (entries: unknown[]) => void
    constructor(cb: (entries: unknown[]) => void) {
      this.cb = cb
      intersectCbs.push(cb)
    }
    observe() {}
    unobserve() {}
    disconnect() {
      intersectCbs = intersectCbs.filter((c) => c !== this.cb)
    }
    takeRecords() {
      return []
    }
  }

  globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver
  globalThis.IntersectionObserver =
    FakeIntersectionObserver as unknown as typeof IntersectionObserver

  return {
    emitResize(width: number, height: number) {
      const entry = {
        borderBoxSize: [{ inlineSize: width, blockSize: height }],
        devicePixelContentBoxSize: [{ inlineSize: width, blockSize: height }],
      }
      resizeCbs.forEach((cb) => cb([entry]))
    },
    setVisible(visible: boolean) {
      intersectCbs.forEach((cb) => cb([{ isIntersecting: visible }]))
    },
    restore() {
      globalThis.ResizeObserver = originalResize
      globalThis.IntersectionObserver = originalIntersect
      resizeCbs = []
      intersectCbs = []
    },
  }
}

/**
 * Deterministic requestAnimationFrame. Returns a `step(ms)` that runs exactly
 * one queued frame, so a test can advance a loop without real timers.
 */
export function installFrameControl() {
  const queued: FrameRequestCallback[] = []
  let now = 0

  const originalRaf = globalThis.requestAnimationFrame
  const originalCancel = globalThis.cancelAnimationFrame
  const originalNow = performance.now.bind(performance)

  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
    queued.push(cb)
    return queued.length
  }) as typeof requestAnimationFrame
  globalThis.cancelAnimationFrame = ((id: number) => {
    queued[id - 1] = () => {}
  }) as typeof cancelAnimationFrame
  performance.now = () => now

  return {
    /** Run every currently-queued frame once, advancing the clock by `ms`. */
    step(ms = 16.667) {
      now += ms
      const batch = queued.splice(0, queued.length)
      batch.forEach((cb) => cb(now))
    },
    get pending() {
      return queued.length
    },
    restore() {
      globalThis.requestAnimationFrame = originalRaf
      globalThis.cancelAnimationFrame = originalCancel
      performance.now = originalNow
    },
  }
}
