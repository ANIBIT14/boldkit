/**
 * Smoke test for every React CanvasEffect.
 *
 * Each effect is mounted, sized, made visible, and driven for several frames
 * with a real (mock-backed) 2D context, so the frame callback genuinely
 * executes. This is what catches a bad array index, an undefined colour, or a
 * stale variable left behind by a refactor — none of which typechecking sees,
 * because they only surface when the draw code runs.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { installCanvasMock, installFrameControl, installObservers } from '@/test/canvas-mock'
import * as Effects from '../react'

const EFFECT_NAMES = Object.keys(Effects).filter(
  (k) => typeof (Effects as Record<string, unknown>)[k] === 'function'
)

let restoreCanvas: () => void
let frames: ReturnType<typeof installFrameControl>
let observers: ReturnType<typeof installObservers>

beforeEach(() => {
  restoreCanvas = installCanvasMock()
  frames = installFrameControl()
  observers = installObservers()
})

afterEach(() => {
  cleanup()
  observers.restore()
  frames.restore()
  restoreCanvas()
})

describe('React CanvasEffects', () => {
  it('exports every effect in the catalogue', () => {
    // 19 original + 4 added in v3.5.2.
    expect(EFFECT_NAMES.length).toBe(23)
    for (const name of ['MeshGradient', 'GodRays', 'Swirl', 'PulsingBorder']) {
      expect(EFFECT_NAMES).toContain(name)
    }
  })

  it.each(EFFECT_NAMES)('%s mounts and renders frames without throwing', (name) => {
    const Component = (Effects as Record<string, React.ComponentType>)[name]
    const errors: unknown[] = []
    const onError = (e: ErrorEvent) => errors.push(e.error ?? e.message)
    window.addEventListener('error', onError)

    const { container } = render(<Component />)
    const canvas = container.querySelector('canvas')
    expect(canvas, `${name} should render a <canvas>`).not.toBeNull()

    observers.emitResize(400, 300)
    observers.setVisible(true)

    // Several frames: effects that accumulate state (trails, particle respawn,
    // lightning bolts firing on a timer) only exercise those paths over time.
    expect(() => {
      for (let i = 0; i < 12; i++) frames.step()
    }, `${name} threw while drawing`).not.toThrow()

    expect(canvas!.width).toBeGreaterThan(0)
    expect(canvas!.height).toBeGreaterThan(0)

    window.removeEventListener('error', onError)
    expect(errors).toEqual([])
  })

  it.each(EFFECT_NAMES)('%s survives a resize mid-animation', (name) => {
    const Component = (Effects as Record<string, React.ComponentType>)[name]
    render(<Component />)

    observers.emitResize(400, 300)
    observers.setVisible(true)
    frames.step()

    // Resizing clears the backing store and re-seeds anything size-dependent.
    expect(() => {
      observers.emitResize(900, 200)
      frames.step()
      frames.step()
      observers.emitResize(120, 640)
      frames.step()
    }, `${name} threw after a resize`).not.toThrow()
  })

  it('stops drawing once unmounted', () => {
    const { unmount } = render(<Effects.Plasma />)
    observers.emitResize(400, 300)
    observers.setVisible(true)
    frames.step()

    unmount()
    expect(() => {
      frames.step()
      frames.step()
    }).not.toThrow()
  })
})
