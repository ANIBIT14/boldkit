import { describe, it, expect, vi } from 'vitest'
import { within } from '@testing-library/react'
import { render, screen } from '@/test/test-utils'
import { Alert, AlertTitle, AlertDescription, AlertAction } from '../alert'
import { Terminal } from 'lucide-react'

describe('Alert', () => {
  describe('Rendering', () => {
    it('renders with default variant', () => {
      render(
        <Alert>
          <AlertTitle>Test</AlertTitle>
        </Alert>
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('renders AlertTitle and AlertDescription', () => {
      render(
        <Alert>
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description</AlertDescription>
        </Alert>
      )
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('applies variant classes', () => {
      render(<Alert variant="destructive"><AlertTitle>Error</AlertTitle></Alert>)
      expect(screen.getByRole('alert')).toHaveClass('bg-destructive')
    })
  })
})

describe('AlertAction', () => {
  describe('Rendering', () => {
    it('renders as a button', () => {
      render(
        <Alert>
          <AlertAction onClick={vi.fn()}>Dismiss</AlertAction>
        </Alert>
      )
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
    })

    it('renders text children', () => {
      render(
        <Alert>
          <AlertAction>Undo</AlertAction>
        </Alert>
      )
      expect(screen.getByText('Undo')).toBeInTheDocument()
    })

    it('renders icon children', () => {
      render(
        <Alert>
          <AlertAction>
            <Terminal data-testid="icon" />
            Delete
          </AlertAction>
        </Alert>
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('is enabled by default', () => {
      render(<Alert><AlertAction>Act</AlertAction></Alert>)
      expect(screen.getByRole('button')).not.toBeDisabled()
    })

    it('is disabled when disabled prop is set', () => {
      render(<Alert><AlertAction disabled>Act</AlertAction></Alert>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('is disabled when loading is true', () => {
      render(<Alert><AlertAction loading>Act</AlertAction></Alert>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('shows spinner when loading', () => {
      render(<Alert><AlertAction loading>Saving</AlertAction></Alert>)
      expect(within(screen.getByRole('button')).getByRole('status', { hidden: true })).toBeInTheDocument()
    })

    it('applies disabled styles', () => {
      render(<Alert><AlertAction disabled>Act</AlertAction></Alert>)
      expect(screen.getByRole('button')).toHaveClass('disabled:opacity-40')
    })
  })

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handler = vi.fn()
      const { user } = render(<Alert><AlertAction onClick={handler}>Click</AlertAction></Alert>)
      await user.click(screen.getByRole('button'))
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const handler = vi.fn()
      const { user } = render(<Alert><AlertAction disabled onClick={handler}>Click</AlertAction></Alert>)
      await user.click(screen.getByRole('button'))
      expect(handler).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', async () => {
      const handler = vi.fn()
      const { user } = render(<Alert><AlertAction loading onClick={handler}>Click</AlertAction></Alert>)
      await user.click(screen.getByRole('button'))
      expect(handler).not.toHaveBeenCalled()
    })

    it('can be focused with keyboard', async () => {
      const { user } = render(<Alert><AlertAction>Focus me</AlertAction></Alert>)
      await user.tab()
      expect(screen.getByRole('button')).toHaveFocus()
    })
  })

  describe('Styling', () => {
    it('has no rounded corners', () => {
      render(<Alert><AlertAction>Act</AlertAction></Alert>)
      expect(screen.getByRole('button')).toHaveClass('rounded-none')
    })

    it('has top margin for spacing from content', () => {
      render(<Alert><AlertAction>Act</AlertAction></Alert>)
      expect(screen.getByRole('button')).toHaveClass('mt-3')
    })

    it('accepts custom className', () => {
      render(<Alert><AlertAction className="custom-cls">Act</AlertAction></Alert>)
      expect(screen.getByRole('button')).toHaveClass('custom-cls')
    })
  })

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Alert><AlertAction aria-label="Close alert">×</AlertAction></Alert>)
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument()
    })

    it('spinner has aria-hidden when loading', () => {
      render(<Alert><AlertAction loading>Saving</AlertAction></Alert>)
      expect(within(screen.getByRole('button')).getByRole('status', { hidden: true })).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
