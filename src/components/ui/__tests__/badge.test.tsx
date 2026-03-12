import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { Badge } from '../badge'

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Badge>Default Badge</Badge>)
      expect(screen.getByText('Default Badge')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      render(<Badge>Status: Active</Badge>)
      expect(screen.getByText('Status: Active')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('applies default variant', () => {
      render(<Badge variant="default">Default</Badge>)
      expect(screen.getByText('Default')).toHaveClass('bg-primary')
    })

    it('applies secondary variant', () => {
      render(<Badge variant="secondary">Secondary</Badge>)
      expect(screen.getByText('Secondary')).toHaveClass('bg-secondary')
    })

    it('applies destructive variant', () => {
      render(<Badge variant="destructive">Error</Badge>)
      expect(screen.getByText('Error')).toHaveClass('bg-destructive')
    })

    it('applies outline variant', () => {
      render(<Badge variant="outline">Outline</Badge>)
      expect(screen.getByText('Outline')).toHaveClass('bg-background')
    })

    it('applies success variant', () => {
      render(<Badge variant="success">Success</Badge>)
      expect(screen.getByText('Success')).toHaveClass('bg-success')
    })

    it('applies warning variant', () => {
      render(<Badge variant="warning">Warning</Badge>)
      expect(screen.getByText('Warning')).toHaveClass('bg-warning')
    })

    it('applies info variant', () => {
      render(<Badge variant="info">Info</Badge>)
      expect(screen.getByText('Info')).toHaveClass('bg-info')
    })

    it('applies accent variant', () => {
      render(<Badge variant="accent">Accent</Badge>)
      expect(screen.getByText('Accent')).toHaveClass('bg-accent')
    })
  })

  describe('Styling', () => {
    it('applies neubrutalism border', () => {
      render(<Badge>Styled</Badge>)
      expect(screen.getByText('Styled')).toHaveClass('border-2')
    })

    it('accepts custom className', () => {
      render(<Badge className="custom-class">Custom</Badge>)
      expect(screen.getByText('Custom')).toHaveClass('custom-class')
    })

    it('merges custom className with default styles', () => {
      render(<Badge className="my-class">Merged</Badge>)
      const badge = screen.getByText('Merged')
      expect(badge).toHaveClass('my-class')
      expect(badge).toHaveClass('font-bold')
    })
  })

  describe('Accessibility', () => {
    it('is accessible as a status indicator', () => {
      render(<Badge role="status">Active</Badge>)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('supports aria-label', () => {
      render(<Badge aria-label="User status: online">Online</Badge>)
      expect(screen.getByLabelText('User status: online')).toBeInTheDocument()
    })
  })
})
