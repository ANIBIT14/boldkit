import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/test/test-utils'
import { Rating } from '../rating'

describe('Rating', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Rating />)
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('renders 5 stars by default', () => {
      render(<Rating />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(5)
    })

    it('renders custom number of stars', () => {
      render(<Rating max={10} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(10)
    })

    it('renders with custom className', () => {
      render(<Rating className="custom-rating" />)
      const container = screen.getByRole('slider')
      expect(container).toHaveClass('custom-rating')
    })
  })

  describe('Value Management', () => {
    it('uses defaultValue when uncontrolled', () => {
      render(<Rating defaultValue={3} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '3')
    })

    it('uses controlled value when provided', () => {
      render(<Rating value={4} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '4')
    })

    it('calls onChange when value changes', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating onChange={handleChange} />)

      const buttons = screen.getAllByRole('button')
      await user.click(buttons[2])

      expect(handleChange).toHaveBeenCalledWith(3)
    })

    it('updates display when clicking on stars', async () => {
      const { user } = render(<Rating />)

      const buttons = screen.getAllByRole('button')
      await user.click(buttons[3])

      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '4')
    })
  })

  describe('Hover Behavior', () => {
    it('calls onHoverChange when hovering over stars', async () => {
      const handleHover = vi.fn()
      render(<Rating onHoverChange={handleHover} />)

      const buttons = screen.getAllByRole('button')
      fireEvent.mouseMove(buttons[2], { clientX: 50 })

      expect(handleHover).toHaveBeenCalled()
    })

    it('calls onHoverChange with null when mouse leaves', () => {
      const handleHover = vi.fn()
      render(<Rating onHoverChange={handleHover} />)

      const slider = screen.getByRole('slider')
      fireEvent.mouseLeave(slider)

      expect(handleHover).toHaveBeenCalledWith(null)
    })
  })

  describe('Keyboard Navigation', () => {
    it('increments value with ArrowRight', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).toHaveBeenCalledWith(4)
    })

    it('decrements value with ArrowLeft', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowLeft}')

      expect(handleChange).toHaveBeenCalledWith(2)
    })

    it('increments value with ArrowUp', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowUp}')

      expect(handleChange).toHaveBeenCalledWith(4)
    })

    it('decrements value with ArrowDown', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowDown}')

      expect(handleChange).toHaveBeenCalledWith(2)
    })

    it('jumps to min (0) with Home key', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{Home}')

      expect(handleChange).toHaveBeenCalledWith(0)
    })

    it('jumps to max with End key', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} max={5} onChange={handleChange} />)

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{End}')

      expect(handleChange).toHaveBeenCalledWith(5)
    })

    it('respects min boundary', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={0} onChange={handleChange} />)

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowLeft}')

      expect(handleChange).toHaveBeenCalledWith(0)
    })

    it('respects max boundary', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={5} max={5} onChange={handleChange} />)

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).toHaveBeenCalledWith(5)
    })
  })

  describe('Precision (Half Stars)', () => {
    it('supports half-star precision', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating precision={0.5} onChange={handleChange} />)

      const buttons = screen.getAllByRole('button')
      // Click on the second star (full click)
      await user.click(buttons[1])

      // With full click it should register full value (2)
      expect(handleChange).toHaveBeenCalledWith(2)
    })

    it('steps by 0.5 with keyboard when precision is 0.5', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Rating defaultValue={3} precision={0.5} onChange={handleChange} />
      )

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).toHaveBeenCalledWith(3.5)
    })
  })

  describe('Icon Types', () => {
    it('renders star icons by default', () => {
      render(<Rating />)
      // Stars should be rendered as SVG elements
      const slider = screen.getByRole('slider')
      const svgs = slider.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThan(0)
    })

    it('accepts heart icon type', () => {
      render(<Rating icon="heart" />)
      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('accepts circle icon type', () => {
      render(<Rating icon="circle" />)
      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('applies small size class', () => {
      render(<Rating size="sm" />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveClass('[&_svg]:h-4')
    })

    it('applies medium size class by default', () => {
      render(<Rating />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveClass('[&_svg]:h-5')
    })

    it('applies large size class', () => {
      render(<Rating size="lg" />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveClass('[&_svg]:h-6')
    })

    it('applies extra-large size class', () => {
      render(<Rating size="xl" />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveClass('[&_svg]:h-8')
    })
  })

  describe('ReadOnly State', () => {
    it('is not interactive when readOnly', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating readOnly value={3} onChange={handleChange} />)

      const buttons = screen.getAllByRole('button')
      await user.click(buttons[4])

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('has tabIndex -1 when readOnly', () => {
      render(<Rating readOnly />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabindex', '-1')
    })

    it('does not respond to keyboard when readOnly', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating readOnly defaultValue={3} onChange={handleChange} />)

      const slider = screen.getByRole('slider')
      slider.focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('applies disabled styles', () => {
      render(<Rating disabled />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveClass('opacity-50')
      expect(slider).toHaveClass('pointer-events-none')
    })

    it('is not interactive when disabled', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating disabled onChange={handleChange} />)

      const buttons = screen.getAllByRole('button')
      await user.click(buttons[2])

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('has tabIndex -1 when disabled', () => {
      render(<Rating disabled />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabindex', '-1')
    })

    it('buttons are disabled', () => {
      render(<Rating disabled />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toBeDisabled()
      })
    })
  })

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Rating />)
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('has correct aria-valuemin', () => {
      render(<Rating />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
    })

    it('has correct aria-valuemax', () => {
      render(<Rating max={5} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuemax', '5')
    })

    it('has correct aria-valuenow', () => {
      render(<Rating value={3} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '3')
    })

    it('has aria-label', () => {
      render(<Rating />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-label', 'Rating')
    })

    it('has aria-valuetext for screen readers', () => {
      render(<Rating value={3} max={5} icon="star" />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuetext', '3 out of 5 stars')
    })

    it('has aria-valuetext for heart icon', () => {
      render(<Rating value={2} max={5} icon="heart" />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuetext', '2 out of 5 hearts')
    })

    it('is focusable when not disabled or readOnly', () => {
      render(<Rating />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabindex', '0')
    })
  })

  describe('Visual Feedback', () => {
    it('applies hover scale effect on interactive stars', () => {
      render(<Rating />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toHaveClass('hover:scale-110')
      })
    })

    it('does not apply hover effect when readOnly', () => {
      render(<Rating readOnly />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).not.toHaveClass('hover:scale-110')
      })
    })
  })
})
