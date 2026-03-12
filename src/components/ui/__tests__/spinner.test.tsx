import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { Spinner } from '../spinner'

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Spinner data-testid="spinner" />)
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })

    it('renders with default variant (dots)', () => {
      render(<Spinner data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner.children.length).toBeGreaterThan(0)
    })
  })

  describe('Variants', () => {
    it('renders dots variant', () => {
      render(<Spinner variant="dots" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })

    it('renders bars variant', () => {
      render(<Spinner variant="bars" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })

    it('renders blocks variant', () => {
      render(<Spinner variant="blocks" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })

    it('renders brutal variant', () => {
      render(<Spinner variant="brutal" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })

    it('renders ring variant', () => {
      render(<Spinner variant="ring" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('renders xs size', () => {
      render(<Spinner size="xs" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('h-3')
      expect(spinner).toHaveClass('w-3')
    })

    it('renders sm size', () => {
      render(<Spinner size="sm" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('h-4')
      expect(spinner).toHaveClass('w-4')
    })

    it('renders md size (default)', () => {
      render(<Spinner size="md" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('h-6')
      expect(spinner).toHaveClass('w-6')
    })

    it('renders lg size', () => {
      render(<Spinner size="lg" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('h-8')
      expect(spinner).toHaveClass('w-8')
    })

    it('renders xl size', () => {
      render(<Spinner size="xl" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('h-12')
      expect(spinner).toHaveClass('w-12')
    })
  })

  describe('Styling', () => {
    it('accepts custom className', () => {
      render(<Spinner className="custom-spinner" data-testid="spinner" />)
      expect(screen.getByTestId('spinner')).toHaveClass('custom-spinner')
    })

    it('merges custom className with default classes', () => {
      render(<Spinner className="my-class" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('my-class')
      expect(spinner).toHaveClass('inline-flex')
    })
  })

  describe('Accessibility', () => {
    it('has role="status" by default', () => {
      render(<Spinner />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('supports aria-label', () => {
      render(<Spinner aria-label="Loading content" />)
      expect(screen.getByLabelText('Loading content')).toBeInTheDocument()
    })

    it('supports custom role', () => {
      render(<Spinner role="progressbar" data-testid="spinner" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  describe('Animation', () => {
    it('dots variant has animated children', () => {
      render(<Spinner variant="dots" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      const dots = spinner.querySelectorAll('[class*="animate"]')
      expect(dots.length).toBeGreaterThan(0)
    })

    it('bars variant has animated children', () => {
      render(<Spinner variant="bars" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      const bars = spinner.querySelectorAll('[class*="animate"]')
      expect(bars.length).toBeGreaterThan(0)
    })
  })
})
