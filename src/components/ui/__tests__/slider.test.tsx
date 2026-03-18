import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/test/test-utils'
import { Slider } from '../slider'

describe('Slider', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Slider />)
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      render(<Slider className="custom-class" />)
      const container = screen.getByRole('slider').parentElement
      expect(container).toHaveClass('custom-class')
    })

    it('renders multiple thumbs for range slider', () => {
      render(<Slider defaultValue={[25, 75]} />)
      const sliders = screen.getAllByRole('slider')
      expect(sliders).toHaveLength(2)
    })
  })

  describe('Value Management', () => {
    it('uses defaultValue when uncontrolled', () => {
      render(<Slider defaultValue={[50]} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('uses controlled value when provided', () => {
      render(<Slider value={[75]} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '75')
    })

    it('clamps values to min/max range', () => {
      render(<Slider min={0} max={100} defaultValue={[50]} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
    })

    it('calls onValueChange when value changes', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).toHaveBeenCalled()
    })

    it('calls onValueCommit on pointer up', () => {
      const handleCommit = vi.fn()
      render(<Slider defaultValue={[50]} onValueCommit={handleCommit} />)

      const slider = screen.getByRole('slider')
      fireEvent.pointerDown(slider, { clientX: 100, clientY: 10 })
      fireEvent.pointerUp(document)

      expect(handleCommit).toHaveBeenCalled()
    })
  })

  describe('Keyboard Navigation', () => {
    it('increments value with ArrowRight', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} step={1} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).toHaveBeenCalledWith([51])
    })

    it('decrements value with ArrowLeft', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} step={1} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowLeft}')

      expect(handleChange).toHaveBeenCalledWith([49])
    })

    it('increments value with ArrowUp', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} step={1} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowUp}')

      expect(handleChange).toHaveBeenCalledWith([51])
    })

    it('decrements value with ArrowDown', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} step={1} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowDown}')

      expect(handleChange).toHaveBeenCalledWith([49])
    })

    it('jumps to min with Home key', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} min={0} max={100} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{Home}')

      expect(handleChange).toHaveBeenCalledWith([0])
    })

    it('jumps to max with End key', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} min={0} max={100} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{End}')

      expect(handleChange).toHaveBeenCalledWith([100])
    })

    it('increments by large step with PageUp', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} min={0} max={100} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{PageUp}')

      // Large step is (max - min) / 10 = 10
      expect(handleChange).toHaveBeenCalledWith([60])
    })

    it('decrements by large step with PageDown', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} min={0} max={100} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{PageDown}')

      // Large step is (max - min) / 10 = 10
      expect(handleChange).toHaveBeenCalledWith([40])
    })
  })

  describe('Disabled State', () => {
    it('applies disabled styles', () => {
      render(<Slider disabled />)
      const container = screen.getByRole('slider').parentElement
      expect(container).toHaveClass('opacity-50')
      expect(container).toHaveClass('pointer-events-none')
    })

    it('sets aria-disabled when disabled', () => {
      render(<Slider disabled />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-disabled', 'true')
    })

    it('has tabIndex -1 when disabled', () => {
      render(<Slider disabled />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabindex', '-1')
    })

    it('does not respond to keyboard when disabled', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider disabled defaultValue={[50]} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Orientation', () => {
    it('sets aria-orientation to horizontal by default', () => {
      render(<Slider />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('sets aria-orientation to vertical when specified', () => {
      render(<Slider orientation="vertical" />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-orientation', 'vertical')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<Slider min={10} max={90} defaultValue={[50]} />)
      const slider = screen.getByRole('slider')

      expect(slider).toHaveAttribute('role', 'slider')
      expect(slider).toHaveAttribute('aria-valuemin', '10')
      expect(slider).toHaveAttribute('aria-valuemax', '90')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('has aria-valuetext for screen readers', () => {
      render(<Slider min={0} max={100} defaultValue={[50]} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuetext', '50 of 100')
    })

    it('is focusable when not disabled', () => {
      render(<Slider />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabindex', '0')
    })

    it('each thumb in range slider has correct ARIA', () => {
      render(<Slider defaultValue={[25, 75]} min={0} max={100} />)
      const sliders = screen.getAllByRole('slider')

      expect(sliders[0]).toHaveAttribute('aria-valuenow', '25')
      expect(sliders[1]).toHaveAttribute('aria-valuenow', '75')
    })
  })

  describe('Step', () => {
    it('respects step value for keyboard navigation', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[50]} step={5} onValueChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).toHaveBeenCalledWith([55])
    })
  })

  describe('Range Slider', () => {
    it('renders two thumbs for range values', () => {
      render(<Slider defaultValue={[20, 80]} />)
      const sliders = screen.getAllByRole('slider')
      expect(sliders).toHaveLength(2)
    })

    it('maintains correct order when thumbs would cross', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Slider defaultValue={[45, 50]} step={1} onValueChange={handleChange} />
      )

      const sliders = screen.getAllByRole('slider')
      // Try to move first thumb past second
      sliders[0].focus()
      await user.keyboard('{ArrowRight}')
      await user.keyboard('{ArrowRight}')
      await user.keyboard('{ArrowRight}')
      await user.keyboard('{ArrowRight}')
      await user.keyboard('{ArrowRight}')
      await user.keyboard('{ArrowRight}')

      // First thumb should not exceed second thumb - step
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1]
      expect(lastCall[0][0]).toBeLessThan(50)
    })
  })
})
