import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { Input } from '../input'

describe('Input', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter your name" />)
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    })

    it('renders with value', () => {
      render(<Input value="Test value" onChange={() => {}} />)
      expect(screen.getByDisplayValue('Test value')).toBeInTheDocument()
    })
  })

  describe('Input Types', () => {
    it('renders text input by default', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('renders email input', () => {
      render(<Input type="email" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    })

    it('renders password input', () => {
      render(<Input type="password" />)
      expect(document.querySelector('input[type="password"]')).toBeInTheDocument()
    })

    it('renders number input', () => {
      render(<Input type="number" />)
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('renders search input', () => {
      render(<Input type="search" />)
      expect(screen.getByRole('searchbox')).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('can be disabled', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('can be read-only', () => {
      render(<Input readOnly value="Read only" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    })

    it('can be required', () => {
      render(<Input required />)
      expect(screen.getByRole('textbox')).toBeRequired()
    })
  })

  describe('Interactions', () => {
    it('handles onChange events', async () => {
      const handleChange = vi.fn()
      const { user } = render(<Input onChange={handleChange} />)

      await user.type(screen.getByRole('textbox'), 'Hello')
      expect(handleChange).toHaveBeenCalled()
    })

    it('updates value on typing', async () => {
      const { user } = render(<Input />)
      const input = screen.getByRole('textbox')

      await user.type(input, 'Test input')
      expect(input).toHaveValue('Test input')
    })

    it('handles focus events', async () => {
      const handleFocus = vi.fn()
      const { user } = render(<Input onFocus={handleFocus} />)

      await user.click(screen.getByRole('textbox'))
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('handles blur events', async () => {
      const handleBlur = vi.fn()
      const { user } = render(<Input onBlur={handleBlur} />)

      await user.click(screen.getByRole('textbox'))
      await user.tab()
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('can be focused with keyboard', async () => {
      const { user } = render(<Input />)

      await user.tab()
      expect(screen.getByRole('textbox')).toHaveFocus()
    })

    it('clears value when cleared', async () => {
      const { user } = render(<Input />)
      const input = screen.getByRole('textbox')

      await user.type(input, 'Some text')
      await user.clear(input)
      expect(input).toHaveValue('')
    })
  })

  describe('Styling', () => {
    it('applies neubrutalism border', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toHaveClass('border-3')
    })

    it('accepts custom className', () => {
      render(<Input className="custom-input" />)
      expect(screen.getByRole('textbox')).toHaveClass('custom-input')
    })

    it('applies focus styles', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toHaveClass('focus-visible:ring-2')
    })
  })

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Input aria-label="Search input" />)
      expect(screen.getByLabelText('Search input')).toBeInTheDocument()
    })

    it('supports aria-describedby', () => {
      render(
        <>
          <Input aria-describedby="helper" />
          <span id="helper">Enter your email address</span>
        </>
      )
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'helper')
    })

    it('supports aria-invalid', () => {
      render(<Input aria-invalid="true" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Attributes', () => {
    it('forwards ref', () => {
      const ref = vi.fn()
      render(<Input ref={ref} />)
      expect(ref).toHaveBeenCalled()
    })

    it('supports maxLength', () => {
      render(<Input maxLength={10} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10')
    })

    it('supports minLength', () => {
      render(<Input minLength={3} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('minLength', '3')
    })

    it('supports pattern', () => {
      render(<Input pattern="[A-Za-z]+" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('pattern', '[A-Za-z]+')
    })

    it('supports autocomplete', () => {
      render(<Input autoComplete="email" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'email')
    })
  })
})
