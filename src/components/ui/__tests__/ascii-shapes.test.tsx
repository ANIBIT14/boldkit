import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@/test/test-utils'
import {
  AsciiSpiral, AsciiRose, AsciiWave,
  AsciiVortex, AsciiPulse, AsciiMatrix, AsciiGrid,
} from '../ascii-shapes'

beforeEach(() => {
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => { setTimeout(() => cb(0), 0); return 1 })
  vi.stubGlobal('cancelAnimationFrame', () => {})
  vi.stubGlobal('performance', { now: () => 0 })
})
afterEach(() => { vi.unstubAllGlobals() })

const COMPONENTS = [
  { name: 'AsciiSpiral', Component: AsciiSpiral },
  { name: 'AsciiRose', Component: AsciiRose },
  { name: 'AsciiWave', Component: AsciiWave },
  { name: 'AsciiVortex', Component: AsciiVortex },
  { name: 'AsciiPulse', Component: AsciiPulse },
  { name: 'AsciiMatrix', Component: AsciiMatrix },
  { name: 'AsciiGrid', Component: AsciiGrid },
]

COMPONENTS.forEach(({ name, Component }) => {
  describe(name, () => {
    it('renders a pre element', () => {
      render(<Component data-testid="ascii" animated={false} />)
      const pre = screen.getByTestId('ascii')
      expect(pre.tagName.toLowerCase()).toBe('pre')
    })

    it('renders correct number of lines for sm size', () => {
      render(<Component data-testid="ascii" size="sm" animated={false} />)
      const pre = screen.getByTestId('ascii')
      const lines = pre.textContent?.split('\n') ?? []
      expect(lines.length).toBe(12)
    })

    it('renders correct number of lines for md size', () => {
      render(<Component data-testid="ascii" size="md" animated={false} />)
      const pre = screen.getByTestId('ascii')
      const lines = pre.textContent?.split('\n') ?? []
      expect(lines.length).toBe(24)
    })

    it('accepts all charset options without throwing', () => {
      const charsets = ['blocks', 'braille', 'classic', 'line', 'dots'] as const
      charsets.forEach((charset) => {
        expect(() => render(<Component charset={charset} animated={false} />)).not.toThrow()
      })
    })

    it('accepts custom className', () => {
      render(<Component data-testid="ascii" className="my-custom" animated={false} />)
      expect(screen.getByTestId('ascii')).toHaveClass('my-custom')
    })

    it('cancels animation frame on unmount', () => {
      const cancelSpy = vi.fn()
      vi.stubGlobal('cancelAnimationFrame', cancelSpy)
      const { unmount } = render(<Component animated={true} />)
      unmount()
      expect(cancelSpy).toHaveBeenCalled()
    })

    it('does not call requestAnimationFrame when animated=false', () => {
      const rafSpy = vi.fn().mockReturnValue(1)
      vi.stubGlobal('requestAnimationFrame', rafSpy)
      render(<Component animated={false} />)
      expect(rafSpy).not.toHaveBeenCalled()
    })
  })
})
