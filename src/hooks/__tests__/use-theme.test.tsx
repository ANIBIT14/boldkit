import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme, circularReveal } from '../use-theme'

const doc = document as unknown as { startViewTransition?: unknown }

function Toggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      onClick={(e) => setTheme(resolvedTheme === 'light' ? 'dark' : 'light', { origin: e.currentTarget })}
    >
      {resolvedTheme}
    </button>
  )
}

const renderToggle = () =>
  render(
    <ThemeProvider defaultTheme="light">
      <Toggle />
    </ThemeProvider>
  )

afterEach(() => {
  delete doc.startViewTransition
  vi.restoreAllMocks()
  localStorage.clear()
  document.documentElement.classList.remove('light', 'dark')
})

describe('useTheme circular reveal', () => {
  it('applies the theme instantly when View Transitions are unsupported', () => {
    renderToggle()
    act(() => screen.getByRole('button').click())
    expect(document.documentElement).toHaveClass('dark')
    expect(screen.getByRole('button')).toHaveTextContent('dark')
    expect(localStorage.getItem('boldkit-theme')).toBe('dark')
  })

  it('changes the theme inside the transition, after the old view is captured', async () => {
    let update: (() => void) | undefined
    let ready!: () => void
    doc.startViewTransition = vi.fn((cb: () => void) => {
      update = cb
      return { ready: new Promise<void>((r) => (ready = r)) }
    })
    const animate = vi.fn()
    document.documentElement.animate = animate as unknown as typeof document.documentElement.animate

    renderToggle()
    const button = screen.getByRole('button')
    button.getBoundingClientRect = () => ({ left: 100, top: 20, width: 40, height: 40 }) as DOMRect
    act(() => button.click())
    expect(document.documentElement).not.toHaveClass('dark')

    act(() => update!())
    // Class and React state both land in the "new" snapshot.
    expect(document.documentElement).toHaveClass('dark')
    expect(button).toHaveTextContent('dark')

    await act(async () => ready())
    expect(animate).toHaveBeenCalledTimes(2)
    const [keyframes, opts] = animate.mock.calls[1]
    expect(opts.pseudoElement).toBe('::view-transition-new(root)')
    expect(keyframes.clipPath[0]).toBe('circle(0px at 120px 40px)')
  })

  it('swaps instantly under reduced motion', () => {
    doc.startViewTransition = vi.fn()
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
    const update = vi.fn()
    circularReveal(update, { x: 0, y: 0 })
    expect(update).toHaveBeenCalledOnce()
    expect(doc.startViewTransition).not.toHaveBeenCalled()
  })

  it('survives blocked localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    renderToggle()
    act(() => screen.getByRole('button').click())
    expect(document.documentElement).toHaveClass('dark')
  })
})
