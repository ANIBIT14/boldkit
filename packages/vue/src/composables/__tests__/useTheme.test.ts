import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useThemeProvider, useTheme, circularReveal } from '@/composables/useTheme'

// Host that installs the provider and re-exposes it for assertions.
function mountProvider() {
  let api!: ReturnType<typeof useThemeProvider>
  const Comp = defineComponent({
    setup() {
      api = useThemeProvider({ defaultTheme: 'light' })
      return () => null
    },
  })
  const wrapper = mount(Comp)
  return { wrapper, api: () => api }
}

describe('useThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('light', 'dark')
  })

  it('mounts without throwing (immediate watcher runs during setup)', () => {
    expect(() => mountProvider()).not.toThrow()
  })

  it('applies the resolved theme class to <html> and updates on setTheme', async () => {
    const { api } = mountProvider()
    expect(document.documentElement.classList.contains('light')).toBe(true)

    api().setTheme('dark')
    await nextTick()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
    expect(api().resolvedTheme.value).toBe('dark')
    expect(localStorage.getItem('boldkit-theme')).toBe('dark')
  })
})

describe('useTheme fallback (no provider)', () => {
  it('returns a working standalone state without throwing', () => {
    const Comp = defineComponent({
      setup() {
        const t = useTheme()
        return () => t.theme.value
      },
    })
    expect(() => mount(Comp)).not.toThrow()
  })
})

describe('circular reveal', () => {
  const doc = document as unknown as { startViewTransition?: unknown }
  afterEach(() => {
    delete doc.startViewTransition
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('applies the theme instantly when View Transitions are unsupported', async () => {
    const { api } = mountProvider()
    api().setTheme('dark', { origin: { x: 10, y: 10 } })
    await nextTick()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('boldkit-theme')).toBe('dark')
  })

  it('updates inside the transition and grows a circle from the origin element', async () => {
    let update: (() => void | Promise<void>) | undefined
    let ready!: () => void
    doc.startViewTransition = vi.fn((cb: () => void | Promise<void>) => {
      update = cb
      return { ready: new Promise<void>((r) => (ready = r)) }
    })
    const animate = vi.fn()
    document.documentElement.animate = animate as unknown as typeof document.documentElement.animate
    const button = document.createElement('button')
    button.getBoundingClientRect = () => ({ left: 100, top: 20, width: 40, height: 40 }) as DOMRect

    const { api } = mountProvider()
    api().setTheme('dark', { origin: button })
    // Nothing changes until the browser has captured the old view…
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    await update!()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    ready()
    await Promise.resolve()
    await Promise.resolve()
    const [, newOpts] = animate.mock.calls[1]
    expect(newOpts.pseudoElement).toBe('::view-transition-new(root)')
    expect(animate.mock.calls[1][0].clipPath[0]).toBe('circle(0px at 120px 40px)')
  })

  it('swaps instantly under reduced motion', () => {
    doc.startViewTransition = vi.fn()
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
    const update = vi.fn()
    circularReveal(update, { x: 0, y: 0 })
    expect(update).toHaveBeenCalledOnce()
    expect(doc.startViewTransition).not.toHaveBeenCalled()
  })

  it('survives blocked localStorage', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    const { api } = mountProvider()
    expect(() => api().setTheme('dark')).not.toThrow()
    await nextTick()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
