import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { Progress } from '../progress'

describe('Progress', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Progress />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders with value', () => {
      render(<Progress value={50} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  describe('Value', () => {
    it('displays 0% progress', () => {
      render(<Progress value={0} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '0')
    })

    it('displays 50% progress', () => {
      render(<Progress value={50} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '50')
    })

    it('displays 100% progress', () => {
      render(<Progress value={100} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '100')
    })

    it('caps value at 100', () => {
      render(<Progress value={150} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '100')
    })

    it('handles undefined value gracefully', () => {
      render(<Progress value={undefined} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('applies neubrutalism border', () => {
      render(<Progress value={50} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveClass('border-3')
    })

    it('accepts custom className', () => {
      render(<Progress value={50} className="custom-progress" />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveClass('custom-progress')
    })

    it('has correct height', () => {
      render(<Progress value={50} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveClass('h-4')
    })
  })

  describe('Accessibility', () => {
    it('has progressbar role', () => {
      render(<Progress value={50} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('has aria-valuemin attribute', () => {
      render(<Progress value={50} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0')
    })

    it('has aria-valuemax attribute', () => {
      render(<Progress value={50} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100')
    })

    it('has aria-valuenow attribute', () => {
      render(<Progress value={75} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75')
    })

    it('supports aria-label', () => {
      render(<Progress value={50} aria-label="Loading progress" />)
      expect(screen.getByLabelText('Loading progress')).toBeInTheDocument()
    })

    it('supports aria-labelledby', () => {
      render(
        <>
          <label id="progress-label">File upload progress</label>
          <Progress value={50} aria-labelledby="progress-label" />
        </>
      )
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-labelledby', 'progress-label')
    })
  })

  describe('Visual Indicator', () => {
    it('has indicator element', () => {
      render(<Progress value={50} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.querySelector('[data-slot="indicator"]') || progress.firstChild
      expect(indicator).toBeInTheDocument()
    })
  })
})
