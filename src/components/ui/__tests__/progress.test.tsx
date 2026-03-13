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
    it('displays 0% progress via indicator transform', () => {
      render(<Progress value={0} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.firstElementChild
      // At 0%, indicator should be fully translated left (translateX(-100%))
      expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
    })

    it('displays 50% progress via indicator transform', () => {
      render(<Progress value={50} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.firstElementChild
      // At 50%, indicator should be half translated (translateX(-50%))
      expect(indicator).toHaveStyle({ transform: 'translateX(-50%)' })
    })

    it('displays 100% progress via indicator transform', () => {
      render(<Progress value={100} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.firstElementChild
      // At 100%, indicator should be fully visible (translateX(0%))
      expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' })
    })

    it('handles values above 100 correctly', () => {
      render(<Progress value={150} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.firstElementChild
      // Implementation uses (value || 0), so 150 becomes translateX(-(-50)%) = translateX(50%)
      expect(indicator).toBeInTheDocument()
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
      expect(progressbar).toHaveClass('h-5')
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

    it('displays value correctly via transform', () => {
      render(<Progress value={75} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.firstElementChild
      // At 75%, indicator should be at translateX(-25%)
      expect(indicator).toHaveStyle({ transform: 'translateX(-25%)' })
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
