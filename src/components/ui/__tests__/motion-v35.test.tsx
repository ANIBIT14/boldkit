/**
 * Motion System v3.5 — loading states.
 *
 * Covers the branching logic added in v3.5: Skeleton variant mapping, the
 * Progress determinate/indeterminate split, and ChartContainer's loading swap.
 * The CSS itself isn't asserted here (jsdom doesn't apply stylesheets) — these
 * pin the class + ARIA contract the stylesheet hangs off.
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { Skeleton } from '../skeleton'
import { Progress } from '../progress'
import { ChartContainer } from '../chart/container'
import { ChartLoading } from '../chart/loading'

describe('Skeleton (v3.5 variants)', () => {
  it('defaults to the pre-v3.5 pulse behaviour', () => {
    render(<Skeleton data-testid="s" />)
    expect(screen.getByTestId('s')).toHaveClass('animate-pulse')
  })

  it.each([
    ['stamp', 'bk-skeleton-stamp'],
    ['blocks', 'bk-skeleton-blocks'],
    ['scan', 'bk-skeleton-scan'],
  ] as const)('maps variant=%s to .%s', (variant, cls) => {
    render(<Skeleton variant={variant} data-testid="s" />)
    expect(screen.getByTestId('s')).toHaveClass(cls)
  })

  it('variant=none applies no animation class', () => {
    render(<Skeleton variant="none" data-testid="s" />)
    const el = screen.getByTestId('s')
    expect(el.className).not.toMatch(/animate-pulse|bk-skeleton-/)
  })

  it('is hidden from assistive tech', () => {
    render(<Skeleton data-testid="s" />)
    expect(screen.getByTestId('s')).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('Progress (v3.5 variants)', () => {
  it('smooth is the default and still drives the indicator transform', () => {
    render(<Progress value={40} data-testid="p" />)
    const indicator = screen.getByTestId('p').firstElementChild
    expect(indicator).toHaveStyle({ transform: 'translateX(-60%)' })
    expect(indicator).not.toHaveClass('bk-progress-marquee')
  })

  it('stepped keeps the transform but adds the stepped timing class', () => {
    render(<Progress value={40} variant="stepped" data-testid="p" />)
    const indicator = screen.getByTestId('p').firstElementChild
    expect(indicator).toHaveClass('bk-progress-stepped')
    expect(indicator).toHaveStyle({ transform: 'translateX(-60%)' })
  })

  it('marquee is indeterminate — no transform, no aria-valuenow', () => {
    render(<Progress value={40} variant="marquee" data-testid="p" />)
    const indicator = screen.getByTestId('p').firstElementChild
    expect(indicator).toHaveClass('bk-progress-marquee')
    expect(indicator).not.toHaveAttribute('style')
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
  })

  it('exposes aria-valuenow for a determinate value', () => {
    render(<Progress value={40} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40')
  })

  it('clamps an out-of-range value before it reaches the primitive', () => {
    render(<Progress value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('an omitted value stays indeterminate', () => {
    render(<Progress />)
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
  })

  it('clamps and fills against max, not a hard 100', () => {
    render(<Progress value={150} max={200} data-testid="p" />)
    // The bar is 75% full and AT agrees — before the fix this rendered a full
    // bar while reporting aria-valuenow=100 against max=200 ("50%").
    expect(screen.getByTestId('p')).toHaveAttribute('aria-valuenow', '150')
    expect(screen.getByTestId('p')).toHaveAttribute('aria-valuemax', '200')
    expect(screen.getByTestId('p').firstElementChild).toHaveStyle({
      transform: 'translateX(-25%)',
    })
  })
})

describe('ChartLoading', () => {
  it('announces itself and renders the default bar count', () => {
    const { container } = render(<ChartLoading />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText('Loading chart')).toBeInTheDocument()
    expect(container.querySelectorAll('.bk-skeleton-stamp')).toHaveLength(7)
  })

  it('staggers each bar so they do not stamp in unison', () => {
    const { container } = render(<ChartLoading bars={3} />)
    const bars = [...container.querySelectorAll<HTMLElement>('.bk-skeleton-stamp')]
    expect(bars).toHaveLength(3)
    expect(bars.map((b) => b.style.animationDelay)).toEqual(['0ms', '90ms', '180ms'])
  })
})

describe('ChartContainer (loading)', () => {
  const config = { a: { label: 'A', color: '#000' } }

  it('renders the chart and keeps role=img when not loading', () => {
    render(
      <ChartContainer config={config} aria-label="Revenue" data-testid="c">
        <svg />
      </ChartContainer>
    )
    const el = screen.getByTestId('c')
    expect(el).toHaveAttribute('role', 'img')
    expect(el).not.toHaveAttribute('aria-busy')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('swaps in the placeholder and drops role=img while loading', () => {
    render(
      <ChartContainer config={config} aria-label="Revenue" loading data-testid="c">
        <svg />
      </ChartContainer>
    )
    const el = screen.getByTestId('c')
    expect(el).toHaveAttribute('aria-busy', 'true')
    // role=img would wrap the live region and swallow the announcement.
    expect(el).not.toHaveAttribute('role')
    expect(el).not.toHaveAttribute('aria-label')
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('forwards a custom loading label', () => {
    render(
      <ChartContainer config={config} loading loadingLabel="Crunching numbers">
        <svg />
      </ChartContainer>
    )
    expect(screen.getByText('Crunching numbers')).toBeInTheDocument()
  })
})
