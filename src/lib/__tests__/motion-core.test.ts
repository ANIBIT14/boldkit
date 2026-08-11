/**
 * Tests for the framework-agnostic motion-core.
 * These cover the contract every L3 adapter (React/Vue/Svelte) relies on.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  prefersReducedMotion,
  observeReveal,
  staggerChildren,
  triggerAnimation,
  startViewTransition,
} from '../motion-core'

// jsdom doesn't ship IntersectionObserver. Patch a minimal mock so we can
// assert the observer is wired correctly and the callback path works.
class MockIntersectionObserver {
  callback: IntersectionObserverCallback
  observed: Element[] = []
  disconnected = false
  static instances: MockIntersectionObserver[] = []

  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb
    MockIntersectionObserver.instances.push(this)
  }
  observe(el: Element) { this.observed.push(el) }
  unobserve(el: Element) { this.observed = this.observed.filter((e) => e !== el) }
  disconnect() { this.disconnected = true }
  takeRecords(): IntersectionObserverEntry[] { return [] }

  /** Helper for tests to simulate an intersection event. */
  fire(el: Element, isIntersecting = true) {
    this.callback(
      [{ target: el, isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }
}

beforeEach(() => {
  MockIntersectionObserver.instances = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).IntersectionObserver = MockIntersectionObserver
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('motion-core', () => {
  describe('prefersReducedMotion', () => {
    it('returns a boolean', () => {
      expect(typeof prefersReducedMotion()).toBe('boolean')
    })
  })

  describe('observeReveal', () => {
    it('adds bk-reveal-in when element intersects', () => {
      const el = document.createElement('div')
      el.classList.add('bk-reveal', 'bk-reveal-up')

      const cleanup = observeReveal(el)
      const obs = MockIntersectionObserver.instances[0]
      expect(obs).toBeDefined()
      expect(obs.observed).toContain(el)

      obs.fire(el, true)
      expect(el.classList.contains('bk-reveal-in')).toBe(true)
      cleanup()
    })

    it('does not add class when not intersecting', () => {
      const el = document.createElement('div')
      observeReveal(el)
      const obs = MockIntersectionObserver.instances[0]
      obs.fire(el, false)
      expect(el.classList.contains('bk-reveal-in')).toBe(false)
    })

    it('unobserves after first reveal when once=true (default)', () => {
      const el = document.createElement('div')
      observeReveal(el)
      const obs = MockIntersectionObserver.instances[0]
      obs.fire(el, true)
      expect(obs.observed).not.toContain(el)
    })

    it('keeps observing when once=false', () => {
      const el = document.createElement('div')
      observeReveal(el, { once: false })
      const obs = MockIntersectionObserver.instances[0]
      obs.fire(el, true)
      expect(obs.observed).toContain(el)
    })

    it('respects delay before adding the class', async () => {
      vi.useFakeTimers()
      const el = document.createElement('div')
      observeReveal(el, { delay: 100 })
      const obs = MockIntersectionObserver.instances[0]
      obs.fire(el, true)
      expect(el.classList.contains('bk-reveal-in')).toBe(false)
      vi.advanceTimersByTime(100)
      expect(el.classList.contains('bk-reveal-in')).toBe(true)
      vi.useRealTimers()
    })

    it('cleanup function disconnects observer', () => {
      const el = document.createElement('div')
      const cleanup = observeReveal(el)
      const obs = MockIntersectionObserver.instances[0]
      cleanup()
      expect(obs.disconnected).toBe(true)
    })
  })

  describe('staggerChildren', () => {
    it('applies incrementing animation-delay to direct children', () => {
      const root = document.createElement('div')
      const c1 = document.createElement('span')
      const c2 = document.createElement('span')
      const c3 = document.createElement('span')
      root.append(c1, c2, c3)
      document.body.appendChild(root)

      staggerChildren(root, { delay: 50 })
      expect(c1.style.animationDelay).toBe('0ms')
      expect(c2.style.animationDelay).toBe('50ms')
      expect(c3.style.animationDelay).toBe('100ms')

      document.body.removeChild(root)
    })

    it('honors initialDelay', () => {
      const root = document.createElement('div')
      const c1 = document.createElement('span')
      root.appendChild(c1)
      document.body.appendChild(root)

      staggerChildren(root, { delay: 50, initialDelay: 200 })
      expect(c1.style.animationDelay).toBe('200ms')
      document.body.removeChild(root)
    })

    it('cleanup clears the animation-delay', () => {
      const root = document.createElement('div')
      const c1 = document.createElement('span')
      root.appendChild(c1)
      document.body.appendChild(root)

      const cleanup = staggerChildren(root)
      expect(c1.style.animationDelay).not.toBe('')
      cleanup()
      expect(c1.style.animationDelay).toBe('')
      document.body.removeChild(root)
    })

    it('only affects direct children, not deep descendants', () => {
      const root = document.createElement('div')
      const wrapper = document.createElement('div')
      const deep = document.createElement('span')
      wrapper.appendChild(deep)
      root.appendChild(wrapper)
      document.body.appendChild(root)

      staggerChildren(root, { delay: 50 })
      expect(wrapper.style.animationDelay).toBe('0ms')
      expect(deep.style.animationDelay).toBe('')
      document.body.removeChild(root)
    })
  })

  describe('triggerAnimation', () => {
    it('adds the class and resolves on animationend', async () => {
      const el = document.createElement('div')
      document.body.appendChild(el)

      const promise = triggerAnimation(el, 'bk-shake-x')
      // Class should be applied synchronously
      expect(el.classList.contains('bk-shake-x')).toBe(true)

      // Fire animationend
      el.dispatchEvent(new Event('animationend'))
      await promise
      expect(el.classList.contains('bk-shake-x')).toBe(false)
      document.body.removeChild(el)
    })
  })

  describe('startViewTransition', () => {
    it('invokes callback and returns null when API unsupported', () => {
      const cb = vi.fn()
      const result = startViewTransition(cb)
      // jsdom doesn't implement startViewTransition → falls back
      expect(result).toBe(null)
      expect(cb).toHaveBeenCalled()
    })

    it('uses document.startViewTransition when available', () => {
      const finished = Promise.resolve()
      const fake = vi.fn((cb: () => void) => {
        cb()
        return { ready: finished, finished, updateCallbackDone: finished }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(document as any).startViewTransition = fake

      const cb = vi.fn()
      const result = startViewTransition(cb)
      expect(fake).toHaveBeenCalled()
      expect(cb).toHaveBeenCalled()
      expect(result).not.toBe(null)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (document as any).startViewTransition
    })

    it('scopes a recipe to one transition and restores the previous value', async () => {
      let seenDuringCallback: string | null = null
      const finished = Promise.resolve()
      const fake = vi.fn((cb: () => void) => {
        cb()
        seenDuringCallback = document.documentElement.getAttribute('data-bk-transition')
        return { ready: finished, finished, updateCallbackDone: finished }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(document as any).startViewTransition = fake

      startViewTransition(() => {}, 'hard-wipe')
      expect(seenDuringCallback).toBe('hard-wipe')

      // Sticky attributes bleed the recipe into every later transition —
      // including the theme toggle's circular reveal.
      await finished
      await Promise.resolve()
      expect(document.documentElement.hasAttribute('data-bk-transition')).toBe(false)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (document as any).startViewTransition
    })
  })
})
