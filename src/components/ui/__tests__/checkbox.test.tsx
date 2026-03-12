import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { Checkbox } from '../checkbox'

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders unchecked by default', () => {
      render(<Checkbox aria-label="Test checkbox" />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('renders checked when defaultChecked is true', () => {
      render(<Checkbox defaultChecked aria-label="Checked checkbox" />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('renders controlled checked state', () => {
      render(<Checkbox checked aria-label="Controlled checkbox" />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })
  })

  describe('Interactions', () => {
    it('toggles on click', async () => {
      const { user } = render(<Checkbox aria-label="Toggle checkbox" />)
      const checkbox = screen.getByRole('checkbox')

      expect(checkbox).not.toBeChecked()
      await user.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    it('toggles off when clicked while checked', async () => {
      const { user } = render(<Checkbox defaultChecked aria-label="Uncheck checkbox" />)
      const checkbox = screen.getByRole('checkbox')

      expect(checkbox).toBeChecked()
      await user.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    it('calls onCheckedChange when toggled', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Checkbox onCheckedChange={handleChange} aria-label="Callback checkbox" />
      )

      await user.click(screen.getByRole('checkbox'))
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('can be toggled with keyboard (Space)', async () => {
      const { user } = render(<Checkbox aria-label="Keyboard checkbox" />)
      const checkbox = screen.getByRole('checkbox')

      await user.tab()
      expect(checkbox).toHaveFocus()
      await user.keyboard(' ')
      expect(checkbox).toBeChecked()
    })
  })

  describe('States', () => {
    it('can be disabled', () => {
      render(<Checkbox disabled aria-label="Disabled checkbox" />)
      expect(screen.getByRole('checkbox')).toBeDisabled()
    })

    it('does not toggle when disabled', async () => {
      const handleChange = vi.fn()
      const { user } = render(
        <Checkbox disabled onCheckedChange={handleChange} aria-label="Disabled" />
      )

      await user.click(screen.getByRole('checkbox'))
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('can be in indeterminate state', () => {
      render(<Checkbox checked="indeterminate" aria-label="Indeterminate checkbox" />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate')
    })
  })

  describe('Styling', () => {
    it('applies neubrutalism border', () => {
      render(<Checkbox aria-label="Styled checkbox" />)
      expect(screen.getByRole('checkbox')).toHaveClass('border-3')
    })

    it('accepts custom className', () => {
      render(<Checkbox className="custom-checkbox" aria-label="Custom" />)
      expect(screen.getByRole('checkbox')).toHaveClass('custom-checkbox')
    })
  })

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Checkbox aria-label="Accept terms" />)
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
    })

    it('supports aria-labelledby', () => {
      render(
        <>
          <label id="checkbox-label">Terms and conditions</label>
          <Checkbox aria-labelledby="checkbox-label" />
        </>
      )
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-labelledby', 'checkbox-label')
    })

    it('supports aria-describedby', () => {
      render(
        <>
          <Checkbox aria-label="Terms" aria-describedby="terms-desc" />
          <span id="terms-desc">Please read carefully</span>
        </>
      )
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-describedby', 'terms-desc')
    })

    it('is focusable with tab', async () => {
      const { user } = render(<Checkbox aria-label="Focusable" />)

      await user.tab()
      expect(screen.getByRole('checkbox')).toHaveFocus()
    })
  })

  describe('With Label', () => {
    it('works with associated label element', async () => {
      const { user } = render(
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label htmlFor="terms">Accept terms</label>
        </div>
      )

      // Click on label should toggle checkbox
      await user.click(screen.getByText('Accept terms'))
      expect(screen.getByRole('checkbox')).toBeChecked()
    })
  })
})
