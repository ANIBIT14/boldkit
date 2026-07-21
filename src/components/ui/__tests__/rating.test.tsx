import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/test/test-utils'
import { Rating } from '../rating'

// Rating is a role="group" of toggle buttons with a roving tabindex (not
// role="slider" — nesting focusable buttons inside a focusable slider is an
// axe nested-interactive violation). Value is exposed via the group label and
// aria-pressed; arrow-key handling lives on the group and receives bubbled
// keydowns from the focused star.

/** The star that currently holds the roving tabindex. */
function focusableStar() {
  const button = screen
    .getAllByRole('button')
    .find((b) => b.getAttribute('tabindex') === '0')
  expect(button).toBeDefined()
  return button!
}

describe('Rating', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Rating />)
      expect(screen.getByRole('group')).toBeInTheDocument()
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
      const container = screen.getByRole('group')
      expect(container).toHaveClass('custom-rating')
    })
  })

  describe('Value Management', () => {
    it('uses defaultValue when uncontrolled', () => {
      render(<Rating defaultValue={3} />)
      const group = screen.getByRole('group')
      expect(group).toHaveAttribute('aria-label', 'Rating: 3 out of 5 stars')
    })

    it('uses controlled value when provided', () => {
      render(<Rating value={4} />)
      const group = screen.getByRole('group')
      expect(group).toHaveAttribute('aria-label', 'Rating: 4 out of 5 stars')
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

      const group = screen.getByRole('group')
      expect(group).toHaveAttribute('aria-label', 'Rating: 4 out of 5 stars')
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

      const group = screen.getByRole('group')
      fireEvent.mouseLeave(group)

      expect(handleHover).toHaveBeenCalledWith(null)
    })
  })

  describe('Keyboard Navigation', () => {
    it('increments value with ArrowRight', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      focusableStar().focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).toHaveBeenCalledWith(4)
    })

    it('decrements value with ArrowLeft', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      focusableStar().focus()
      await user.keyboard('{ArrowLeft}')

      expect(handleChange).toHaveBeenCalledWith(2)
    })

    it('increments value with ArrowUp', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      focusableStar().focus()
      await user.keyboard('{ArrowUp}')

      expect(handleChange).toHaveBeenCalledWith(4)
    })

    it('decrements value with ArrowDown', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      focusableStar().focus()
      await user.keyboard('{ArrowDown}')

      expect(handleChange).toHaveBeenCalledWith(2)
    })

    it('jumps to min (0) with Home key', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} onChange={handleChange} />)

      focusableStar().focus()
      await user.keyboard('{Home}')

      expect(handleChange).toHaveBeenCalledWith(0)
    })

    it('jumps to max with End key', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={3} max={5} onChange={handleChange} />)

      focusableStar().focus()
      await user.keyboard('{End}')

      expect(handleChange).toHaveBeenCalledWith(5)
    })

    it('respects min boundary', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={0} onChange={handleChange} />)

      focusableStar().focus()
      await user.keyboard('{ArrowLeft}')

      expect(handleChange).toHaveBeenCalledWith(0)
    })

    it('respects max boundary', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating defaultValue={5} max={5} onChange={handleChange} />)

      focusableStar().focus()
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

      focusableStar().focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).toHaveBeenCalledWith(3.5)
    })
  })

  describe('Icon Types', () => {
    it('renders star icons by default', () => {
      render(<Rating />)
      // Stars should be rendered as SVG elements
      const group = screen.getByRole('group')
      const svgs = group.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThan(0)
    })

    it('accepts heart icon type', () => {
      render(<Rating icon="heart" />)
      const group = screen.getByRole('group')
      expect(group).toBeInTheDocument()
    })

    it('accepts circle icon type', () => {
      render(<Rating icon="circle" />)
      const group = screen.getByRole('group')
      expect(group).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('applies small size class', () => {
      render(<Rating size="sm" />)
      const group = screen.getByRole('group')
      expect(group).toHaveClass('[&_svg]:h-4')
    })

    it('applies medium size class by default', () => {
      render(<Rating />)
      const group = screen.getByRole('group')
      expect(group).toHaveClass('[&_svg]:h-5')
    })

    it('applies large size class', () => {
      render(<Rating size="lg" />)
      const group = screen.getByRole('group')
      expect(group).toHaveClass('[&_svg]:h-6')
    })

    it('applies extra-large size class', () => {
      render(<Rating size="xl" />)
      const group = screen.getByRole('group')
      expect(group).toHaveClass('[&_svg]:h-8')
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

    it('removes stars from the tab order when readOnly', () => {
      render(<Rating readOnly />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('tabindex', '-1')
      })
    })

    it('does not respond to keyboard when readOnly', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating readOnly defaultValue={3} onChange={handleChange} />)

      screen.getAllByRole('button')[0].focus()
      await user.keyboard('{ArrowRight}')

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('applies disabled styles', () => {
      render(<Rating disabled />)
      const group = screen.getByRole('group')
      expect(group).toHaveClass('opacity-50')
      expect(group).toHaveClass('pointer-events-none')
    })

    it('is not interactive when disabled', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Rating disabled onChange={handleChange} />)

      const buttons = screen.getAllByRole('button')
      await user.click(buttons[2])

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('removes stars from the tab order when disabled', () => {
      render(<Rating disabled />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('tabindex', '-1')
      })
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
      expect(screen.getByRole('group')).toBeInTheDocument()
    })

    it('announces the current value in the group label', () => {
      render(<Rating value={3} max={5} icon="star" />)
      const group = screen.getByRole('group')
      expect(group).toHaveAttribute('aria-label', 'Rating: 3 out of 5 stars')
    })

    it('announces hearts in the group label', () => {
      render(<Rating value={2} max={5} icon="heart" />)
      const group = screen.getByRole('group')
      expect(group).toHaveAttribute('aria-label', 'Rating: 2 out of 5 hearts')
    })

    it('reflects the value with aria-pressed on stars', () => {
      render(<Rating value={3} />)
      const pressed = screen
        .getAllByRole('button')
        .filter((b) => b.getAttribute('aria-pressed') === 'true')
      expect(pressed).toHaveLength(3)
    })

    it('does not nest interactive elements (no slider wrapper)', () => {
      render(<Rating />)
      expect(screen.queryByRole('slider')).not.toBeInTheDocument()
      expect(screen.getByRole('group')).not.toHaveAttribute('tabindex')
    })

    it('exactly one star holds the roving tabindex when interactive', () => {
      render(<Rating defaultValue={3} />)
      const focusable = screen
        .getAllByRole('button')
        .filter((b) => b.getAttribute('tabindex') === '0')
      expect(focusable).toHaveLength(1)
      expect(focusable[0]).toHaveAttribute('aria-label', '3 stars')
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
