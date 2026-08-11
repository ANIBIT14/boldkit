/**
 * Accessibility contract for the v3.4.9 blocks — Vue mirror of the React
 * suite at src/components/blocks/__tests__/blocks-a11y.test.tsx.
 *
 * These assert semantics axe can't judge: a cell can be perfectly valid HTML
 * and still convey nothing. The comparison table's ✓/✗ cells were exactly
 * that — lucide marks its icons aria-hidden, so a boolean cell rendered as an
 * empty box to assistive tech while sighted users saw the whole answer.
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ComparisonTable from '@/components/blocks/marketing/ComparisonTable.vue'
import DashboardLayout from '@/components/blocks/application/DashboardLayout.vue'
import SettingsPage from '@/components/blocks/application/SettingsPage.vue'

describe('ComparisonTable.vue a11y', () => {
  const mountTable = () =>
    mount(ComparisonTable, {
      props: {
        columns: ['Free', 'Pro'],
        rows: [
          { feature: 'Components', values: [true, true] },
          { feature: 'Priority support', values: [false, true] },
          { feature: 'Seats', values: ['1', 'Unlimited'] },
        ],
      },
    })

  it('gives every boolean cell a text equivalent', () => {
    // 4 booleans in the fixture → 4 sr-only labels: 3 true, 1 false.
    const labels = mountTable()
      .findAll('.sr-only')
      .map((n) => n.text())
    expect(labels.filter((t) => t === 'Included')).toHaveLength(3)
    expect(labels.filter((t) => t === 'Not included')).toHaveLength(1)
  })

  it('exposes row and column headers so cells are announced in context', () => {
    const w = mountTable()
    const headers = w.findAll('thead th')
    expect(headers.every((h) => h.attributes('scope') === 'col')).toBe(true)

    const rowHeader = w.findAll('tbody th')
    expect(rowHeader).toHaveLength(3)
    expect(rowHeader[1].attributes('scope')).toBe('row')
    expect(rowHeader[1].text()).toBe('Priority support')
  })

  it('keeps plain string values as-is', () => {
    expect(mountTable().text()).toContain('Unlimited')
  })
})

describe('SettingsPage.vue a11y', () => {
  it('names each colour swatch and exposes which one is selected', () => {
    // Swatches are bare colour blocks — the check mark is aria-hidden by lucide,
    // so without a name and aria-pressed they are unlabelled toggles.
    const swatches = mount(SettingsPage, { props: { variant: 'appearance' } })
      .findAll('button[aria-pressed]')
      .filter((b) => b.attributes('aria-label') !== undefined)
    expect(swatches.length).toBeGreaterThanOrEqual(6)
    expect(swatches.map((b) => b.attributes('aria-label'))).toContain('Blue')
    expect(swatches.filter((b) => b.attributes('aria-pressed') === 'true')).toHaveLength(1)
  })
})

describe('DashboardLayout.vue a11y', () => {
  it('marks the active nav item with aria-current, not just styling', () => {
    const w = mount(DashboardLayout, {
      props: {
        nav: [{ label: 'Overview', active: true }, { label: 'Billing' }],
        stats: [{ label: 'MRR', value: '$12k' }],
      },
    })
    const buttons = w.findAll('nav button')
    expect(buttons[0].attributes('aria-current')).toBe('page')
    expect(buttons[1].attributes('aria-current')).toBeUndefined()
  })
})
