import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect, afterAll } from 'vitest'
import { axe } from 'vitest-axe'
import { render } from '@/test/test-utils'
import { a11yFixtures } from '@/test/a11y-fixtures'

/**
 * Automated accessibility smoke tests. Renders each fixture in
 * a11y-fixtures.tsx and asserts axe-core finds no violations. Enforced on
 * every PR via CI so a11y is a gate, not a periodic manual audit.
 *
 * As a side effect, emits public/a11y-report.json — per-component axe results
 * that back the /accessibility WCAG matrix page.
 *
 * `color-contrast` and other layout-dependent rules are disabled because the
 * happy-dom test environment has no layout engine to compute them. Contrast
 * is verified separately in the dark-mode contrast audit.
 */
const axeConfig = {
  rules: {
    'color-contrast': { enabled: false },
  },
}

interface ReportEntry {
  slug: string
  status: 'pass' | 'fail'
  violations: string[]
}

const report: ReportEntry[] = []

describe('accessibility (axe)', () => {
  for (const { slug, element } of a11yFixtures) {
    it(`${slug} has no violations`, async () => {
      const { container } = render(element)
      const results = await axe(container, axeConfig)
      report.push({
        slug,
        status: results.violations.length === 0 ? 'pass' : 'fail',
        violations: results.violations.map((v) => v.id),
      })
      expect(results).toHaveNoViolations()
    })
  }

  afterAll(() => {
    report.sort((a, b) => a.slug.localeCompare(b.slug))
    const body =
      JSON.stringify(
        {
          tool: 'axe-core via vitest-axe (color-contrast excluded: no layout engine in happy-dom)',
          framework: 'react',
          components: report,
        },
        null,
        2
      ) + '\n'
    // src copy backs the /accessibility matrix page (Vite can't import from
    // public/); public copy is the raw downloadable report.
    writeFileSync(join(process.cwd(), 'src/config/a11y-report.json'), body)
    writeFileSync(join(process.cwd(), 'public/a11y-report.json'), body)
  })
})
