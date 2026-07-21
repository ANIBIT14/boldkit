import { SITE_URL } from '@/config/routes-meta'
import { SeoArticleLayout, Section, Callout, DataGrid } from '@/components/seo/SeoArticleLayout'
import report from '@/config/a11y-report.json'
import contrastReport from '@/config/contrast-report.json'
import catalog from '../../packages/mcp/catalog.json'

const TOC = [
  { id: 'approach', label: 'How we test' },
  { id: 'matrix', label: 'Component matrix' },
  { id: 'contrast', label: 'Dark-mode contrast' },
  { id: 'limits', label: 'What axe can’t check' },
]

const contrastPassing = contrastReport.results.filter((r) => r.pass).length

const FAQ = [
  {
    question: 'Are BoldKit components WCAG AA compliant?',
    answer:
      'Every component in the matrix marked "pass" renders with zero axe-core violations in our automated test suite, which runs on every pull request. Automated checks cover a large share of WCAG 2.1 AA criteria; keyboard patterns and reduced-motion support are built into the components themselves.',
  },
  {
    question: 'How is this matrix generated?',
    answer:
      'It is generated from the real CI test run, not maintained by hand. Each component is rendered in an accessible reference configuration and scanned with axe-core via vitest-axe; the results are written to a JSON report that this page renders directly.',
  },
  {
    question: 'Does BoldKit respect prefers-reduced-motion?',
    answer:
      'Yes. A global reduced-motion guard ships in every BoldKit stylesheet (React and Vue), collapsing animations and transitions to near-instant when the user has requested reduced motion.',
  },
]

type ReportEntry = (typeof report.components)[number]
const bySlug = new Map<string, ReportEntry>(report.components.map((c) => [c.slug, c]))

const components = catalog.items
  .filter((item) => item.type === 'registry:ui')
  .map((item) => ({ ...item, result: bySlug.get(item.name) }))

const tested = components.filter((c) => c.result)
const passing = tested.filter((c) => c.result!.status === 'pass')

function StatusBadge({ entry }: { entry?: ReportEntry }) {
  if (!entry) {
    return <span className="text-foreground/50">— not yet automated</span>
  }
  if (entry.status === 'pass') {
    return (
      <span className="inline-block border-2 border-foreground bg-[#00E572] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-black">
        Pass
      </span>
    )
  }
  return (
    <span className="inline-block border-2 border-foreground bg-[#FF4911] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-black">
      {entry.violations.join(', ')}
    </span>
  )
}

export function Accessibility() {
  return (
    <SeoArticleLayout
      eyebrow="Accessibility"
      title="WCAG AA Matrix"
      lede="Per-component accessibility status for BoldKit, generated from the automated axe-core suite that gates every pull request — not a hand-maintained checklist."
      accent="#00E572"
      updated="July 2026"
      toc={TOC}
      seo={{
        title: 'Accessibility — WCAG AA Component Matrix',
        description:
          'WCAG AA accessibility matrix for BoldKit neubrutalism components. Per-component axe-core results generated from the CI test suite, for React and Vue 3.',
        canonical: `${SITE_URL}/accessibility`,
        keywords:
          'boldkit accessibility, wcag aa components, accessible ui library, axe-core tested components, accessible neubrutalism',
        breadcrumbs: [{ name: 'Home', url: `${SITE_URL}/` }, { name: 'Accessibility' }],
        faq: FAQ,
      }}
    >
      <Section id="approach" title="How we test">
        <p>
          Each component is rendered in an accessible reference configuration (labelled inputs,
          named controls) and scanned with <strong>axe-core</strong> via vitest-axe. The suite runs
          on every pull request, so a violation blocks the merge — accessibility is a CI gate, not
          a periodic audit. This page renders the report emitted by that test run.
        </p>
        <Callout>
          <strong>
            {passing.length}/{tested.length}
          </strong>{' '}
          automated components currently pass with zero axe violations, out of{' '}
          <strong>{components.length}</strong> registry components total. Coverage grows every
          release; untested components are listed honestly as “not yet automated”.
        </Callout>
      </Section>

      <Section id="matrix" title="Component matrix">
        <p>
          React results come from the automated suite. Vue components share the same markup
          patterns and Reka UI primitives (the Vue port of what Radix provides on React), but do
          not yet have their own automated axe runs — an equivalent Vue suite is planned.
        </p>
        <DataGrid
          headers={['Component', 'React (axe)', 'Vue']}
          rows={components.map((c) => [
            <span key={c.name} className="font-bold">
              {c.name}
            </span>,
            <StatusBadge key={`${c.name}-react`} entry={c.result} />,
            <span key={`${c.name}-vue`} className="text-foreground/50">
              {c.frameworks.includes('vue') ? 'shared pattern, not yet automated' : 'n/a'}
            </span>,
          ])}
        />
        <p>
          Raw data: <a href="/a11y-report.json">a11y-report.json</a>
        </p>
      </Section>

      <Section id="contrast" title="Dark-mode contrast">
        <p>
          Color contrast is excluded from the axe suite (the test environment has no layout
          engine), so it is verified separately by a script that computes WCAG contrast ratios over
          every semantic token pair in both light and dark modes (<code>scripts/audit-contrast.ts</code>).
          Text pairs must meet 4.5:1, UI pairs 3:1.
        </p>
        <Callout>
          <strong>
            {contrastPassing}/{contrastReport.results.length}
          </strong>{' '}
          token-pair contrast checks pass across light and dark modes.
        </Callout>
        <DataGrid
          headers={['Pair', 'Mode', 'Ratio', 'Status']}
          rows={contrastReport.results.map((r) => [
            <span key={`${r.pair}-${r.mode}-n`} className="font-mono text-sm">
              {r.pair}
            </span>,
            <span key={`${r.pair}-${r.mode}-m`} className="capitalize">
              {r.mode}
            </span>,
            <span key={`${r.pair}-${r.mode}-r`} className="font-bold">
              {r.ratio}:1
            </span>,
            r.pass ? (
              <span
                key={`${r.pair}-${r.mode}-s`}
                className="inline-block border-2 border-foreground bg-[#00E572] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-black"
              >
                Pass
              </span>
            ) : (
              <span
                key={`${r.pair}-${r.mode}-s`}
                className="inline-block border-2 border-foreground bg-[#FF4911] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-black"
              >
                Fail
              </span>
            ),
          ])}
        />
        <p>
          Raw data: <a href="/contrast-report.json">contrast-report.json</a>
        </p>
      </Section>

      <Section id="limits" title="What axe can’t check">
        <p>
          Automated scanning catches roughly half of WCAG issues. The rest is design and
          implementation discipline:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Color contrast</strong> — excluded from the automated run (the test
            environment has no layout engine) and verified separately in the dark-mode contrast
            audit. Neubrutalism’s black-on-color palette is naturally high-contrast.
          </li>
          <li>
            <strong>Keyboard interaction</strong> — components are built on Radix UI (React) and
            Reka UI (Vue) primitives, which implement the WAI-ARIA authoring patterns for focus
            management, roving tabindex, and arrow-key navigation.
          </li>
          <li>
            <strong>Reduced motion</strong> — a global <code>prefers-reduced-motion</code> guard
            ships in every BoldKit stylesheet.
          </li>
        </ul>
      </Section>
    </SeoArticleLayout>
  )
}
