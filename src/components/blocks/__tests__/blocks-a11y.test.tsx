/**
 * Accessibility contract for the v3.4.9 blocks.
 *
 * These assert semantics axe can't judge: a cell can be perfectly valid HTML
 * and still convey nothing. The comparison table's ✓/✗ cells were exactly
 * that — lucide marks its icons aria-hidden, so a boolean cell rendered as an
 * empty box to assistive tech while sighted users saw the whole answer.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, within } from '@/test/test-utils'
import { ComparisonTable } from '../marketing/comparison-table'
import { DashboardLayout } from '../application/dashboard-layout'
import { AppearanceSettings, SettingsPage } from '../application/settings-page'
import { PricingSection } from '../marketing/pricing-section'
import { LogoCloudWithStats } from '../marketing/logo-cloud'

describe('ComparisonTable a11y', () => {
  const renderTable = () =>
    render(
      <ComparisonTable
        columns={['Free', 'Pro']}
        rows={[
          { feature: 'Components', values: [true, true] },
          { feature: 'Priority support', values: [false, true] },
          { feature: 'Seats', values: ['1', 'Unlimited'] },
        ]}
      />
    )

  it('gives every boolean cell a text equivalent', () => {
    renderTable()
    // 3 true + 1 false across the fixture above.
    expect(screen.getAllByText('Included')).toHaveLength(3)
    expect(screen.getAllByText('Not included')).toHaveLength(1)
  })

  it('exposes row and column headers so cells are announced in context', () => {
    renderTable()
    expect(screen.getByRole('columnheader', { name: 'Free' })).toHaveAttribute('scope', 'col')
    const rowHeader = screen.getByRole('rowheader', { name: 'Priority support' })
    expect(rowHeader).toHaveAttribute('scope', 'row')
    // The row reads as "Priority support / Not included / Included".
    expect(within(rowHeader.closest('tr')!).getByText('Not included')).toBeInTheDocument()
  })

  it('keeps plain string values as-is', () => {
    renderTable()
    expect(screen.getByText('Unlimited')).toBeInTheDocument()
  })
})

describe('AppearanceSettings a11y', () => {
  it('names each colour swatch and exposes which one is selected', () => {
    render(<AppearanceSettings accentColor="#22c55e" />)
    // Swatches are bare colour blocks — the check mark is aria-hidden by lucide,
    // so without a name and aria-pressed they are unlabelled toggles.
    const green = screen.getByRole('button', { name: 'Green', pressed: true })
    expect(green).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Blue', pressed: false })).toBeInTheDocument()
  })
})

describe('DashboardLayout a11y', () => {
  it('marks the active nav item with aria-current, not just styling', () => {
    render(
      <DashboardLayout
        nav={[{ label: 'Overview', active: true }, { label: 'Billing' }]}
        stats={[{ label: 'MRR', value: '$12k' }]}
      />
    )
    expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('button', { name: 'Billing' })).not.toHaveAttribute('aria-current')
  })
})

describe('PricingSection CTAs', () => {
  const tiers = [
    { name: 'Free', price: '$0', features: ['One project'], onCtaClick: vi.fn() },
    { name: 'Pro', price: '$20', features: ['Unlimited'], ctaHref: '/signup', cta: 'Upgrade' },
  ]

  it('calls onCtaClick for a tier without a href', async () => {
    const user = userEvent.setup()
    render(<PricingSection tiers={tiers} />)
    await user.click(screen.getByRole('button', { name: 'Get started' }))
    expect(tiers[0].onCtaClick).toHaveBeenCalledOnce()
  })

  it('renders a link when ctaHref is set', () => {
    render(<PricingSection tiers={tiers} />)
    expect(screen.getByRole('link', { name: 'Upgrade' })).toHaveAttribute('href', '/signup')
  })

  it('sanitizes a dangerous ctaHref', () => {
    render(
      <PricingSection
        tiers={[{ name: 'X', price: '$1', features: [], ctaHref: 'javascript:alert(1)' }]}
      />
    )
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '#')
  })
})

describe('LogoCloudWithStats', () => {
  const logos = Array.from({ length: 12 }, (_, i) => ({ name: `Logo ${i + 1}`, logo: `/l${i}.svg` }))

  it('renders every logo by default', () => {
    // Previously hard-capped at 9, dropping the rest with only a console warn.
    render(<LogoCloudWithStats logos={logos} stats={[{ value: '1M', label: 'Users' }]} />)
    expect(screen.getAllByRole('img')).toHaveLength(12)
  })

  it('honours an explicit maxLogos cap', () => {
    render(
      <LogoCloudWithStats logos={logos} stats={[{ value: '1M', label: 'Users' }]} maxLogos={4} />
    )
    expect(screen.getAllByRole('img')).toHaveLength(4)
  })
})

describe('SettingsPage appearance persistence', () => {
  beforeEach(() => localStorage.clear())

  it('persists the theme choice across a remount', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<SettingsPage defaultTab="appearance" />)
    await user.click(screen.getByRole('button', { name: /Dark/ }))
    expect(screen.getByRole('button', { name: /Dark/ })).toHaveAttribute('aria-pressed', 'true')
    unmount()

    render(<SettingsPage defaultTab="appearance" />)
    expect(screen.getByRole('button', { name: /Dark/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('falls back to defaults when stored JSON is corrupt', () => {
    localStorage.setItem('boldkit-settings-appearance', 'not json{')
    render(<SettingsPage defaultTab="appearance" />)
    expect(screen.getByRole('button', { name: /System/ })).toHaveAttribute('aria-pressed', 'true')
  })
})
