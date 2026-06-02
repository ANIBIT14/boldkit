import { SITE_URL } from '@/config/routes-meta'
import {
  SeoArticleLayout,
  Section,
  Callout,
  DataGrid,
  CTABox,
  LinkCards,
} from '@/components/seo/SeoArticleLayout'

const TOC = [
  { id: 'what-works', label: 'What works' },
  { id: 'display', label: 'Display fonts' },
  { id: 'body', label: 'Body fonts' },
  { id: 'mono', label: 'Mono accents' },
  { id: 'pairings', label: 'Pairing recipes' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'What font does neubrutalism use?',
    answer:
      'There is no single font, but the look leans on bold neo-grotesque and geometric sans display faces pushed to extreme weights - Bebas Neue, Space Grotesk, Syne, Archivo and Sora are common picks. BoldKit itself uses Bebas Neue for display, Outfit for body, and DM Mono for uppercase labels.',
  },
  {
    question: 'Are these fonts free?',
    answer:
      'Yes. Every font recommended here is available free on Google Fonts with an open license, so you can self-host or load them with no licensing cost for commercial projects.',
  },
  {
    question: 'Should headlines be uppercase?',
    answer:
      'Often, but not always. Uppercase with wide letter-spacing suits short labels, eyebrows and chunky display headlines and reinforces the bold, stamped feel. For longer headlines keep sentence case for readability - uppercase a full paragraph and legibility collapses.',
  },
]

export function NeubrutalismFonts() {
  return (
    <SeoArticleLayout
      eyebrow="Typography"
      title="Neubrutalism Fonts"
      lede="The best neubrutalist type pairs a bold neo-grotesque or geometric sans display face with a clean, neutral body font and a mono accent for labels - here are the faces and pairing recipes that work."
      accent="#4EC9C0"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'Best Neubrutalism Fonts & Pairings (2026)',
        description:
          'The best fonts for neubrutalist design - bold neo-grotesque and geometric sans display faces, clean body fonts, and mono accents, with ready-made pairing recipes.',
        canonical: `${SITE_URL}/neubrutalism/fonts`,
        keywords:
          'neubrutalism fonts, neobrutalism typography, brutalist fonts, best fonts neubrutalism, neubrutalism font pairing',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Neubrutalism', url: `${SITE_URL}/neubrutalism` },
          { name: 'Fonts' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="what-works" title="What makes a font work for neubrutalism">
        <p>
          Neubrutalist type has a job: be loud. The faces that land are <strong>bold neo-grotesque</strong> or{' '}
          <strong>geometric sans</strong> with a little quirk and some vintage energy - just enough
          personality to feel hand-stamped rather than corporate-neutral. The move is to{' '}
          <strong>push weight to the extreme</strong>: reach for extra-bold, black, and ultra-wide cuts so
          headlines stop being labels and start being visual anchors that hold the page together.
        </p>
        <p>
          The opposite of the look is timid. Skip overly <em>decorative</em> or tightly{' '}
          <em>condensed</em> faces that fight readability, anything with soft humanist curves that reads
          &ldquo;friendly SaaS,&rdquo; and anything you&rsquo;d describe as &ldquo;elegant.&rdquo; You want
          weight, contrast, and confidence, not refinement. One chunky display face does the shouting; the
          rest of the system stays quiet and legible.
        </p>
        <Callout title="The one rule" tone="#4EC9C0">
          Headlines are structure, not decoration. If your display font isn&rsquo;t roughly 2&times; the
          body size and several weights heavier, the page won&rsquo;t read as neubrutalist - it&rsquo;ll
          just read as bold.
        </Callout>
      </Section>

      <Section id="display" title="Display & headline fonts">
        <p>
          These carry the headlines. All are free on Google Fonts, and all reward heavy weights and tight
          tracking. BoldKit&rsquo;s own site runs on <strong>Bebas Neue</strong>.
        </p>
        <DataGrid
          headers={['Font', 'Style', 'Best for']}
          rows={[
            ['Bebas Neue', 'Condensed display', 'Tall, all-caps headlines - what BoldKit uses'],
            ['Space Grotesk', 'Neo-grotesque', 'The default safe pick - quirky but versatile'],
            ['Syne', 'Geometric display', 'Headlines that expand and warp as weight increases'],
            ['Sora', 'Neo-grotesque', 'Clean, modern headlines with subtle character'],
            ['Epilogue', 'Geometric sans', 'Distinctive single-storey g, sharp at black weight'],
            ['Bricolage Grotesque', 'Playful grotesque', 'Quirky ascenders and a lively, off-kilter feel'],
            ['Darker Grotesque', 'Tall grotesque', 'Dense, towering caps for posters and heroes'],
            ['Archivo', 'Grotesque (variable)', 'Ultra-wide and ultra-bold cuts for max impact'],
          ]}
        />
      </Section>

      <Section id="body" title="Body fonts">
        <p>
          The body font&rsquo;s job is to disappear. Pick a clean, neutral, geometric sans that stays
          readable at small sizes and never competes with the headline. BoldKit pairs its display type with{' '}
          <strong>Outfit</strong>.
        </p>
        <DataGrid
          headers={['Font', 'Style', 'Best for']}
          rows={[
            ['Outfit', 'Geometric sans', 'Neutral, friendly body copy - what BoldKit uses'],
            ['Plus Jakarta Sans', 'Geometric sans', 'Slightly warmer body text with good rhythm'],
            ['IBM Plex Sans', 'Grotesque', 'Technical, precise tone for docs and dashboards'],
            ['Manrope', 'Geometric sans', 'Modern, even color across long paragraphs'],
          ]}
        />
      </Section>

      <Section id="mono" title="Mono accents">
        <p>
          A monospace accent is the neubrutalist signature. Use it for{' '}
          <strong>uppercase tracked labels</strong>, eyebrows, code snippets, and version badges - the
          fixed-width cadence reads as deliberate and machine-stamped. BoldKit uses <strong>DM Mono</strong>{' '}
          for its eyebrows and labels.
        </p>
        <DataGrid
          headers={['Font', 'Style', 'Best for']}
          rows={[
            ['DM Mono', 'Mono', 'Eyebrows & uppercase labels - what BoldKit uses'],
            ['JetBrains Mono', 'Mono', 'Code blocks and inline code with great legibility'],
            ['Space Mono', 'Quirky mono', 'Retro-technical badges and decorative captions'],
            ['Share Tech Mono', 'Terminal mono', 'Loud, screen-style version tags and metadata'],
          ]}
        />
        <Callout title="Label recipe" tone="#4EC9C0">
          Set mono labels in uppercase with wide tracking (around <code>0.18em</code>) at a small size. It
          instantly reads as a neubrutalist eyebrow without any borders or color.
        </Callout>
      </Section>

      <Section id="pairings" title="Pairing recipes">
        <p>
          You don&rsquo;t need to invent a system. Each recipe below is a <strong>display + body + mono</strong>{' '}
          trio that already works - including the exact stack BoldKit ships with.
        </p>
        <DataGrid
          headers={['Display', 'Body', 'Mono', 'Vibe']}
          rows={[
            ['Bebas Neue', 'Outfit', 'DM Mono', 'Confident, editorial - the BoldKit stack'],
            ['Space Grotesk', 'Inter', 'JetBrains Mono', 'Modern, technical, safe default'],
            ['Syne', 'Manrope', 'Space Mono', 'Expressive, arty, poster-like'],
            ['Archivo', 'Plus Jakarta Sans', 'DM Mono', 'Wide, heavy, maximum impact'],
          ]}
        />
        <Callout title="The cardinal rule of pairing" tone="#4EC9C0">
          Pair <strong>one</strong> chunky display font with <strong>one</strong> clean body font. Never put
          two loud fonts together - they cancel each other out and the page loses its anchor. The mono
          is an accent, not a third headline.
        </Callout>
        <CTABox
          title="See the type in action"
          body="Browse 60+ thick-bordered, hard-shadowed components - every one styled with this exact display + body + mono system. Copy, paste, ship."
          href="/components"
          cta="Browse components"
          tone="#4EC9C0"
        />
        <LinkCards
          items={[
            { to: '/neubrutalism', label: 'What is neubrutalism', desc: 'The complete guide to the style and its core traits.' },
            { to: '/neubrutalism/colors', label: 'Color palettes', desc: 'Copy-paste neubrutalism palettes with HSL tokens.' },
            { to: '/components', label: 'Components', desc: '60+ React & Vue components using these fonts.' },
            { to: '/themes', label: 'Theme Builder', desc: 'Tune fonts, shadows, and accents, then copy the CSS.' },
          ]}
        />
      </Section>

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
