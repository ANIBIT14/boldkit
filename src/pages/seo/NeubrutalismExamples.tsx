import { SITE_URL } from '@/config/routes-meta'
import {
  SeoArticleLayout,
  Section,
  Callout,
  DoDont,
  DataGrid,
  CTABox,
  LinkCards,
} from '@/components/seo/SeoArticleLayout'

const TOC = [
  { id: 'look', label: 'What to look for' },
  { id: 'patterns', label: 'Recurring patterns' },
  { id: 'live', label: 'Live examples' },
  { id: 'anti', label: 'Anti-patterns' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'What is the most famous neubrutalism website?',
    answer:
      'Gumroad is the most widely cited archetype. Its 2022 redesign - thick black borders, hard offset shadows, flat clashing color, and oversized type - is the reference point most people picture when they hear "neubrutalism," and it helped push the look into mainstream product design.',
  },
  {
    question: 'Where can I find neubrutalism examples to copy?',
    answer:
      'BoldKit ships full neubrutalist templates and section blocks you can open, view-source, and copy directly into your project via the shadcn CLI. They are real, production-grade examples - landing pages, portfolios, dashboards, and pricing pages - rather than static screenshots, so you can inspect exactly how each pattern is built.',
  },
  {
    question: 'Is neubrutalism good for real products?',
    answer:
      'Yes - when applied with discipline. Bold borders and high-contrast color blocks aid recognition and readability, and the style has been used in shipping SaaS, indie tools, and portfolios. The failure mode is chaotic anti-design with no hierarchy; disciplined, grid-based neubrutalism tests well on real tasks.',
  },
]

export function NeubrutalismExamples() {
  return (
    <SeoArticleLayout
      eyebrow="Inspiration"
      title="Neubrutalism Examples"
      lede="The patterns that define neubrutalism in practice - sticker collage, marquee tickers, oversized type, hard-bordered bento - plus live BoldKit templates you can open and inspect."
      accent="#52D65F"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'Neubrutalism Website Examples & Patterns',
        description:
          'Neubrutalism in the wild - the recurring patterns (sticker collage, marquee tickers, oversized type, hard-bordered bento) plus live, inspectable BoldKit template examples for React & Vue.',
        canonical: `${SITE_URL}/neubrutalism/examples`,
        keywords:
          'neubrutalism examples, neobrutalism websites, brutalist web design examples, neubrutalism inspiration, neubrutalism templates',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Neubrutalism', url: `${SITE_URL}/neubrutalism` },
          { name: 'Examples' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="look" title="What to look for">
        <p>
          Neubrutalism is one of the few web styles you can identify in a single glance. The tells are
          consistent: <strong>thick black borders</strong> on everything interactive, <strong>hard
          offset shadows</strong> with zero blur, <strong>flat clashing color</strong> instead of
          gradients, <strong>oversized type</strong> used as a structural element, and{' '}
          <strong>zero border-radius</strong> - crisp rectangles end to end.
        </p>
        <p>
          <a href="https://gumroad.com" target="_blank" rel="noopener noreferrer">Gumroad</a> is the
          archetype most people point to: its redesign popularized the look and made it shorthand for
          &ldquo;bold indie product.&rdquo; From there the style spread fast - into component
          libraries, indie SaaS marketing sites, and personal portfolios, where its loudness is a
          feature rather than a liability.
        </p>
        <Callout title="The instant tell" tone="#52D65F">
          If a layout looks like it was stamped together from bordered paper cut-outs - flat color,
          hard shadows, no soft edges - you are looking at neubrutalism.
        </Callout>
      </Section>

      <Section id="patterns" title="The recurring patterns">
        <p>
          Across neubrutalist sites the same handful of building blocks keep showing up. Learn to spot
          these and you can reverse-engineer almost any example:
        </p>
        <DataGrid
          headers={['Pattern', 'What it is', 'Where you see it']}
          rows={[
            ['Sticker / cutout collage', 'Bordered, slightly rotated cards layered like physical stickers.', 'Hero sections, feature highlights'],
            ['Marquee ticker strips', 'Looping horizontal bands of text or logos that scroll edge to edge.', 'Logo clouds, announcement bars'],
            ['Oversized variable display type', 'Headlines at 2-4× body size, often a heavy condensed display face.', 'Hero headers, section breaks'],
            ['Tab / file-folder navigation', 'Bordered tabs styled like manila folder tabs.', 'Dashboards, settings, docs'],
            ['Hard-bordered bento grids', 'Asymmetric tiles, each with its own thick border and shadow.', 'Feature grids, dashboards'],
            ['Press-down buttons', 'On hover the element translates and drops its shadow, mimicking a physical press.', 'Every CTA and control'],
            ['Monospace eyebrows / labels', 'Uppercase, wide-tracked mono labels above headings.', 'Section eyebrows, badges, metadata'],
          ]}
        />
        <p>
          BoldKit ships every one of these as a primitive - <a href="/components">Marquee</a>,{' '}
          <a href="/components">Sticker</a>, <a href="/components">LayeredCard</a>,{' '}
          <a href="/components">Tabs</a>, and the press-down hover baked into every button - so you can
          assemble the patterns instead of hand-rolling them.
        </p>
      </Section>

      <Section id="live" title="Live examples you can inspect">
        <p>
          Screenshots only get you so far. The most useful neubrutalism reference is one you can open,
          view-source, and copy. BoldKit ships full neubrutalist <strong>templates</strong> built from
          the patterns above - real, production-grade examples you can study line by line, then install
          via the shadcn CLI for <strong>React</strong> or <strong>Vue 3</strong>.
        </p>
        <LinkCards
          items={[
            { to: '/templates/landing-page', label: 'Landing page', desc: 'Hero collage, marquee strip, bento feature grid - the full marketing stack.' },
            { to: '/templates/portfolio', label: 'Portfolio', desc: 'Oversized type and sticker-style project cards for a personal site.' },
            { to: '/templates/dashboard', label: 'Dashboard', desc: 'Folder-tab nav and hard-bordered bento tiles for app UI.' },
            { to: '/templates/pricing', label: 'Pricing', desc: 'Bordered tier cards with press-down CTAs and clear hierarchy.' },
            { to: '/blocks', label: 'Blocks gallery', desc: 'Drop-in marketing & app sections - every pattern, isolated.' },
          ]}
        />
        <Callout title="Inspect, don't guess" tone="#52D65F">
          Each template is real source, not a static mock. Open one, read how the borders, shadows, and
          marquee are wired, and lift the parts you want straight into your project.
        </Callout>
      </Section>

      <Section id="anti" title="Anti-patterns to avoid">
        <p>
          The same ingredients can build a striking product or an unusable one. The dividing line is
          discipline. A 2026 usability finding showed that <strong>chaotic anti-design</strong> - every
          element shouting, no focal point, illegible pairings - dragged task-success rates as low as
          8-10% on information-heavy pages. The disciplined version of the same style tested fine.
        </p>
        <DoDont
          doItems={[
            'Anchor the loud surface to a real, visible grid.',
            'Pick one focal point per screen and let it lead.',
            'Test text contrast against WCAG AA - bold is not an excuse for unreadable.',
            'Keep clear hierarchy: headlines ~2× body, obvious primary action.',
          ]}
          dontItems={[
            'Make every element compete for attention at once.',
            'Pair clashing colors that fail contrast (yellow on cyan).',
            'Drop the grid and let the layout sprawl into noise.',
            'Mistake illegibility for edginess - no hierarchy, no usability.',
          ]}
        />
      </Section>

      <CTABox
        title="Start from a neubrutalism template"
        body="Skip the blank page. Open a full BoldKit template, inspect how every pattern is built, and install it into React or Vue with one command."
        href="/templates"
        cta="Browse templates"
        tone="#52D65F"
      />

      <Section id="faq" title="Frequently asked questions">
        <div className="space-y-5">
          {FAQ.map(item => (
            <div key={item.question}>
              <h3 className="text-lg font-bold text-foreground">{item.question}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-foreground/75">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>
    </SeoArticleLayout>
  )
}
