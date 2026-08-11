/**
 * Accessibility contract for the React templates.
 *
 * Same failure mode as the blocks suite: an icon can carry the entire meaning
 * of a cell or a form control while being aria-hidden, so the markup validates
 * and conveys nothing. axe won't flag these — they need explicit assertions.
 */
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@/test/test-utils'
import { PricingTemplate } from '../PricingTemplate'
import { ProductTemplate } from '../ProductTemplate'

describe('PricingTemplate comparison table', () => {
  it('gives boolean cells a text equivalent', () => {
    render(<PricingTemplate />)
    expect(screen.getAllByText('Included').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Not included').length).toBeGreaterThan(0)
  })

  it('exposes row and column headers', () => {
    render(<PricingTemplate />)
    for (const name of ['Feature', 'Starter', 'Pro', 'Enterprise']) {
      expect(screen.getByRole('columnheader', { name })).toHaveAttribute('scope', 'col')
    }
    // Feature names are row headers, so a cell is announced with its feature.
    const rowHeaders = screen.getAllByRole('rowheader')
    expect(rowHeaders.length).toBeGreaterThan(0)
    for (const h of rowHeaders) expect(h).toHaveAttribute('scope', 'row')

    // Every row whose cells are ticks/crosses still has a named row header.
    const iconRow = rowHeaders
      .map((h) => h.closest('tr')!)
      .find((tr) => within(tr).queryAllByText(/^(Included|Not included)$/).length > 0)
    expect(iconRow).toBeDefined()
    expect(within(iconRow!).getByRole('rowheader')).toHaveAccessibleName()
  })
})

describe('ProductTemplate colour picker', () => {
  it('names every colour radio', () => {
    render(<ProductTemplate />)
    // The visible label is a bare swatch — its only content is an aria-hidden
    // check, so each radio needs the colour name spelled out.
    const radios = screen.getAllByRole('radio')
    expect(radios.length).toBeGreaterThan(0)
    for (const radio of radios) {
      expect(radio).toHaveAccessibleName()
    }
  })
})
