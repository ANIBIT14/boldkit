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
  { id: 'discipline', label: 'Palette discipline' },
  { id: 'palettes', label: 'Ready-made palettes' },
  { id: 'contrast', label: 'Contrast & a11y' },
  { id: 'boldkit', label: 'Use in BoldKit' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'How many colors should a neubrutalism palette use?',
    answer:
      'Two to three, maximum. A near-white or near-black base, one or two loud accents, and pure black for borders and text. Add a single flat shadow color and you are done. Beyond three loud colors the layout stops reading as bold and starts reading as chaos.',
  },
  {
    question: 'What background works best for neubrutalism?',
    answer:
      'A warm near-white cream (around #FAF4E6) is the classic neubrutalist base - it softens the harsh black borders just enough while keeping high contrast. A near-black base (around #0A0A0A) also works for a darker, club-flyer feel. Pure #FFFFFF is fine but reads colder and more generic.',
  },
  {
    question: 'Can neubrutalism be dark mode?',
    answer:
      'Yes. Flip the base to a near-black (#0A0A0A-#1A1A1A), keep your accents loud, and switch borders and shadows to a near-white so the chunky outlines stay visible against the dark surface. The discipline is identical - only the base and border colors invert. Re-check text contrast against the new background.',
  },
]

const SWATCH = (colors: string[]) => (
  <span className="inline-flex gap-1">
    {colors.map(c => (
      <span
        key={c}
        className="h-5 w-5 border-2 border-foreground"
        style={{ backgroundColor: c }}
        aria-hidden
      />
    ))}
  </span>
)

export function NeubrutalismColors() {
  return (
    <SeoArticleLayout
      eyebrow="Palettes"
      title="Neubrutalism Color Palettes"
      lede="The whole trick is discipline: 2-3 loud, high-contrast colors locked against a single base, with pure black borders and one flat shadow. Here are copy-paste palettes that already hit that balance."
      accent="#C084FC"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'Neubrutalism Color Palettes - Copy-Paste Hex & HSL',
        description:
          'Ready-to-use neubrutalism color palettes with hex codes - acid lime, electric blue, hot pink, risograph and newsprint. Plus how to pick 2-3 high-contrast colors that pass WCAG.',
        canonical: `${SITE_URL}/neubrutalism/colors`,
        keywords:
          'neubrutalism colors, neubrutalism color palette, neobrutalism palette, brutalist color scheme, neubrutalism hex codes',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Neubrutalism', url: `${SITE_URL}/neubrutalism` },
          { name: 'Colors' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="discipline" title="Why palette discipline matters">
        <p>
          Neubrutalism lives and dies on <strong>restraint inside loudness</strong>. The style screams,
          but it screams with a small vocabulary: <strong>two to three bold, high-contrast colors</strong>{' '}
          and not one more. Add a fourth and a fifth loud hue and the flat color blocks stop fighting{' '}
          <em>for</em> you and start fighting each other - the result reads as noise, not design.
        </p>
        <p>Every disciplined neubrutalist palette is built from the same four roles:</p>
        <ul className="ml-1 space-y-2">
          <li><strong>A base</strong> - a warm near-white cream (~<code>#FAF4E6</code>) <em>or</em> a near-black. This is most of the canvas.</li>
          <li><strong>One or two loud accents</strong> - the colors people remember. Neon, fluoro, saturated and flat.</li>
          <li><strong>Pure black</strong> (~<code>#0A0A0A</code>) - every border and most text. Non-negotiable.</li>
          <li><strong>A single flat shadow color</strong> - one hard, blur-free offset shadow, reused everywhere.</li>
        </ul>
        <Callout title="The rule" tone="#C084FC">
          Pick one base, one or two accents, black for structure, one shadow. If you can&rsquo;t name
          the role of a color, it doesn&rsquo;t belong in the palette.
        </Callout>
      </Section>

      <Section id="palettes" title="Six ready-made palettes">
        <p>
          Each of these is already disciplined - a base, loud accents, and black structure. Copy the
          hex, drop them into the <a href="/themes">Theme Builder</a>, and ship.
        </p>
        <DataGrid
          headers={['Palette', 'Swatches', 'Hex codes', 'Vibe']}
          rows={[
            [
              <strong>Acid</strong>,
              SWATCH(['#B6FF3C', '#0A0A0A', '#FAF4E6']),
              <code>#B6FF3C · #0A0A0A · #FAF4E6</code>,
              'Toxic, energetic',
            ],
            [
              <strong>Electric</strong>,
              SWATCH(['#2D5BFF', '#FF3D81', '#FFFFFF']),
              <code>#2D5BFF · #FF3D81 · #FFFFFF</code>,
              'Loud, club-flyer',
            ],
            [
              <strong>Sunshine</strong>,
              SWATCH(['#FFE400', '#0A0A0A', '#FFFFFF']),
              <code>#FFE400 · #0A0A0A · #FFFFFF</code>,
              'Friendly, classic neubrutalism',
            ],
            [
              <strong>Risograph</strong>,
              SWATCH(['#FF4FA3', '#2C6BED', '#FFF7E8']),
              <code>#FF4FA3 · #2C6BED · #FFF7E8</code>,
              'Print-zine',
            ],
            [
              <strong>Newsprint</strong>,
              SWATCH(['#0A0A0A', '#FFFFFF', '#E5251F']),
              <code>#0A0A0A · #FFFFFF · #E5251F</code>,
              'Editorial, stark',
            ],
            [
              <strong>Mint Pop</strong>,
              SWATCH(['#00D9A8', '#1A1A1A', '#FFF8E7']),
              <code>#00D9A8 · #1A1A1A · #FFF8E7</code>,
              'Fresh, retro-modern',
            ],
          ]}
        />
        <p>
          Notice the pattern: every row is one base, one or two accents, and a near-black for borders and
          text. Swap the accent, keep the structure, and you have a fresh palette that still feels coherent.
        </p>
      </Section>

      <Section id="contrast" title="Contrast & accessibility">
        <p>
          Loud is not the same as legible. The single most common neubrutalism mistake is putting{' '}
          <strong>colored text on a colored block that fails contrast</strong> - yellow text on cyan
          looks &ldquo;on brand&rdquo; and is nearly unreadable. Bold borders make a layout feel
          accessible; they don&rsquo;t make low-contrast text accessible.
        </p>
        <Callout title="Test it" tone="#C084FC">
          Any text must clear <strong>WCAG AA</strong>: a 4.5:1 contrast ratio for body copy, 3:1 for
          large/bold headings. Run every text-on-color pairing through a contrast checker before you ship
          - loud accents are the worst offenders.
        </Callout>
        <DoDont
          doItems={[
            'Put black text on your loud accents - it almost always passes AA.',
            'Reserve loud accents for fills, borders, and big type, not small body copy.',
            'Verify each text-on-color pair against WCAG AA with a checker.',
            'Keep the same flat shadow color across the whole palette.',
          ]}
          dontItems={[
            'Pair clashing same-value hues like yellow text on cyan.',
            'Set colored text on a colored fill without checking the ratio.',
            'Rely on a loud accent alone to signal an interactive state.',
            'Add a fourth loud color “just to balance” the palette.',
          ]}
        />
      </Section>

      <Section id="boldkit" title="Use these palettes in BoldKit">
        <p>
          BoldKit drives the entire look from CSS variables, so a palette is just a set of token values.
          Map your three roles like this:
        </p>
        <DataGrid
          headers={['Role', 'Token', 'Typical value']}
          rows={[
            ['Loud accent #1', <code>--primary</code>, 'your main accent'],
            ['Loud accent #2', <code>--secondary</code>, 'optional second accent'],
            ['Highlight', <code>--accent</code>, 'small pops / hover'],
            ['Base canvas', <code>--background</code>, 'cream or near-black'],
            ['Text & borders', <code>--foreground</code>, '~#0A0A0A'],
            ['Hard shadow', <code>--shadow-color</code>, 'one flat color'],
            ['Border color', <code>--border</code>, 'usually = foreground'],
          ]}
        />
        <p>
          Don&rsquo;t hand-edit variables blind - open the{' '}
          <a href="/themes">Theme Builder</a> to tweak <code>--shadow-color</code>,{' '}
          <code>--border-width</code> and your accents live, then copy the generated CSS straight into your
          project. Pair the palette with the right type from the{' '}
          <a href="/neubrutalism/fonts">fonts guide</a>, and revisit the{' '}
          <a href="/neubrutalism">main neubrutalism guide</a> for the full system.
        </p>
        <CTABox
          title="Tune your palette"
          body="Adjust accents, shadow color, and border width live, preview against real components, then copy the CSS variables into your app."
          href="/themes"
          cta="Open Theme Builder"
          tone="#C084FC"
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

      <LinkCards
        items={[
          { to: '/neubrutalism', label: 'What is neubrutalism', desc: 'The complete guide to the style.' },
          { to: '/neubrutalism/fonts', label: 'Fonts & pairings', desc: 'Display + mono fonts that match these palettes.' },
          { to: '/themes', label: 'Theme Builder', desc: 'Tweak tokens live and copy the CSS.' },
          { to: '/components', label: 'Component gallery', desc: '60+ neubrutalist components for React & Vue.' },
        ]}
      />
    </SeoArticleLayout>
  )
}
