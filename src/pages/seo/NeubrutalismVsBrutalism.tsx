import { SITE_URL } from '@/config/routes-meta'
import {
  SeoArticleLayout,
  Section,
  Callout,
  DataGrid,
  DoDont,
  CTABox,
  LinkCards,
} from '@/components/seo/SeoArticleLayout'

const TOC = [
  { id: 'answer', label: 'The quick answer' },
  { id: 'brutalism', label: 'Brutalism' },
  { id: 'neubrutalism', label: 'Neubrutalism' },
  { id: 'memphis', label: 'Memphis' },
  { id: 'compare', label: 'Side by side' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'Is neubrutalism the same as brutalism?',
    answer:
      'No - neubrutalism is an evolution of web brutalism, not the same thing. Brutalism is deliberately raw and unstyled: system fonts, harsh contrast, little color, and an embrace of "ugly". Neubrutalism keeps that anti-gradient boldness but adds structure - a clear grid, loud flat color, hard offset shadows, and real visual hierarchy - so the result is usable, not just confrontational.',
  },
  {
    question: 'Is Memphis design the same as neubrutalism?',
    answer:
      'No. Memphis is a 1980s postmodern style from the Italian Memphis Group - squiggles, dots, zig-zags, terrazzo, and pastel-meets-primary color clashes. It shares neubrutalism’s love of bold color, but Memphis decoration is playful and ornamental, scattered across a surface, whereas neubrutalism is structural: borders, shadows, and grids that define functional UI elements.',
  },
  {
    question: 'Which is more usable?',
    answer:
      'Disciplined neubrutalism, by a wide margin. Raw brutalism intentionally fights the user, and pure Memphis decoration is hard to apply to dense interfaces without clutter. Neubrutalism’s high-contrast color blocks, thick borders, and obvious press-down states actually aid scannability - provided you keep a grid and test text contrast against WCAG AA.',
  },
]

export function NeubrutalismVsBrutalism() {
  return (
    <SeoArticleLayout
      eyebrow="Comparison"
      title="Neubrutalism vs Brutalism"
      lede="Three loud, related, often-confused styles - raw brutalism, structured neubrutalism, and playful 80s Memphis - sit on the same anti-minimal family tree but pull in very different directions."
      accent="#FF6B35"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'Neubrutalism vs Brutalism vs Memphis - The Differences',
        description:
          'How neubrutalism differs from raw brutalism and 80s Memphis design - era, borders, color, shadows and usability compared side by side, with guidance on when to use each.',
        canonical: `${SITE_URL}/neubrutalism/vs-brutalism`,
        keywords:
          'neubrutalism vs brutalism, brutalism vs neubrutalism, memphis design, neubrutalism difference, neobrutalism vs brutalism',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Neubrutalism', url: `${SITE_URL}/neubrutalism` },
          { name: 'vs Brutalism' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="answer" title="The quick answer">
        <p>
          People mix these up constantly, so here is the short version before the detail:
          <strong> brutalism</strong>, <strong>neubrutalism</strong>, and <strong>Memphis</strong> all
          reject soft, rounded, invisible design - but they come from different decades and aim at
          different things.
        </p>
        <Callout title="In three lines" tone="#FF6B35">
          <ul className="ml-1 space-y-2">
            <li><strong>Brutalism</strong> - raw, unstyled, harsh. Web roots in the 1990s and 2010s, conceptual roots in concrete &ldquo;béton brut&rdquo; architecture. Intentionally ugly, barely any color.</li>
            <li><strong>Neubrutalism</strong> - brutalism softened for real use: bold flat color, hard offset shadows with no blur, zero radius, and a clear grid you can actually navigate.</li>
            <li><strong>Memphis</strong> - 1980s postmodern play: squiggles, confetti, zig-zags, terrazzo, and pastel-vs-primary clashes. Decorative, not structural.</li>
          </ul>
        </Callout>
      </Section>

      <Section id="brutalism" title="Brutalism - raw and unapologetic">
        <p>
          The name comes from <em>béton brut</em> (&ldquo;raw concrete&rdquo;), the mid-century
          architectural movement of exposed, unfinished structural materials. On the web, brutalism
          surfaced in the 1990s as a reaction to slick corporate sites and resurged around 2014-2018
          as a deliberate &ldquo;anti-design&rdquo; stance - sites that looked like raw HTML on
          purpose.
        </p>
        <p>Its hallmarks are about stripping away, not adding:</p>
        <ul className="ml-1 space-y-2">
          <li><strong>Default & system fonts</strong> - Times New Roman, Arial, unstyled defaults. Often <strong>monospace</strong> for a terminal feel.</li>
          <li><strong>Unstyled HTML</strong> - blue underlined links, naked form controls, visible structure.</li>
          <li><strong>Harsh contrast</strong> - stark black-on-white, abrupt edges, no easing.</li>
          <li><strong>Intentional ugliness</strong> - friction and discomfort are features, not bugs.</li>
          <li><strong>Little to no color</strong> - restraint to the point of austerity; color, when it appears, is jarring.</li>
        </ul>
        <p>
          Brutalism is a statement. It is rarely the right call for a product that needs people to
          complete tasks - which is exactly the gap neubrutalism stepped into.
        </p>
      </Section>

      <Section id="neubrutalism" title="Neubrutalism - boldness made usable">
        <p>
          Neubrutalism (also <strong>neobrutalism</strong>) emerged around <strong>2020-21</strong>{' '}
          and went mainstream across product design and component libraries by 2026. It is brutalism with
          the rough edges kept but the hostility removed.
        </p>
        <p><strong>What it kept from brutalism:</strong></p>
        <ul className="ml-1 space-y-2">
          <li>Unapologetic boldness and a refusal to blend in.</li>
          <li>Thick, almost physical borders - typically 2-3px solid black.</li>
          <li>An anti-gradient, anti-skeuomorphism attitude: flat surfaces only.</li>
        </ul>
        <p><strong>What it added to make it work:</strong></p>
        <ul className="ml-1 space-y-2">
          <li><strong>Loud flat color</strong> - 2-3 high-contrast colors used relentlessly, not the austere monochrome of brutalism.</li>
          <li><strong>Hard offset shadows</strong> - a single flat color offset 4-6px on both axes with <em>zero blur</em>, like a stamp pressed slightly off-register.</li>
          <li><strong>Zero border-radius, but clear grids</strong> - sharp rectangles arranged on a real layout, not chaos.</li>
          <li><strong>Usable hierarchy</strong> - oversized headlines, legible body type, obvious focal points.</li>
          <li><strong>Press-down interactions</strong> - elements translate by <code>(4px, 4px)</code> and drop their shadow on hover, mimicking a button being pushed.</li>
        </ul>
        <Callout title="The one-line distinction" tone="#FF6B35">
          Brutalism removes until it hurts. Neubrutalism keeps the bold surface but rebuilds the
          structure underneath so people can actually use it.
        </Callout>
      </Section>

      <Section id="memphis" title="Memphis - 80s postmodern play">
        <p>
          Memphis design comes from the <strong>Memphis Group</strong>, founded in Milan in 1981 by
          Ettore Sottsass. It was a postmodern revolt against the &ldquo;good taste&rdquo; of clean modernism
          - furniture, textiles, and graphics drenched in clashing color and ornament.
        </p>
        <p>Its visual vocabulary is instantly recognizable:</p>
        <ul className="ml-1 space-y-2">
          <li><strong>Squiggles, dots, and zig-zags</strong> scattered as standalone decoration.</li>
          <li><strong>Terrazzo</strong> speckle textures and confetti-like geometric shapes.</li>
          <li><strong>Pastel + primary clashes</strong> - mint, coral, and lemon thrown against red, blue, and black.</li>
          <li><strong>Geometric confetti</strong> - triangles, semicircles, and grids floating freely, untethered from any layout.</li>
        </ul>
        <p>
          Memphis overlaps neubrutalism in sheer color confidence, which is why they get confused. But
          the intent is opposite: Memphis shapes are <em>decorative and playful</em>, layered on top of a
          design for personality. Neubrutalism’s borders and shadows are <em>structural</em> - they
          define the functional edges of buttons, cards, and inputs.
        </p>
      </Section>

      <Section id="compare" title="Side by side">
        <p>The same seven dimensions across all three styles:</p>
        <DataGrid
          headers={['Dimension', 'Brutalism', 'Neubrutalism', 'Memphis']}
          rows={[
            ['Era', '1990s web · 1950s architecture', 'Emerged ~2020-21', '1980s (Memphis Group, 1981)'],
            ['Borders', 'Whatever the browser draws', 'Thick 2-3px solid black', 'Decorative outlines, inconsistent'],
            ['Color', 'Little to none; austere', '2-3 loud flat colors', 'Pastel + primary clashes'],
            ['Shadows', 'None', 'Hard 4-6px offset, no blur', 'Rarely used; flat shapes'],
            ['Typography', 'System / monospace', 'Bold, chunky, uppercase', 'Quirky, geometric display'],
            ['Usability', 'Intentionally hostile', 'Usable when disciplined', 'Decorative, not task-focused'],
            ['Vibe', 'Raw, confrontational', 'Bold but structured', 'Playful, retro, chaotic'],
          ]}
        />
        <p>
          <strong>When to use which:</strong> reach for <strong>raw brutalism</strong> only when the
          statement <em>is</em> the product - portfolios, manifestos, art projects that want
          friction. Choose <strong>neubrutalism</strong> when you need a memorable, high-contrast product
          UI that people still have to operate - dashboards, landing pages, component systems.
          Borrow from <strong>Memphis</strong> when you want playful, nostalgic decoration on top of an
          otherwise sound layout, not as the layout itself.
        </p>
        <DoDont
          doItems={[
            'Pick neubrutalism for product UI that must stay usable.',
            'Use brutalism when intentional friction is the message.',
            'Layer Memphis shapes as accents over a real grid.',
            'Keep one bold color system and reuse it everywhere.',
          ]}
          dontItems={[
            'Ship raw brutalism for a checkout or onboarding flow.',
            'Confuse Memphis decoration with structural borders.',
            'Let three styles fight in a single interface.',
            'Assume "bold" excuses failing WCAG AA contrast.',
          ]}
        />
        <LinkCards
          items={[
            { to: '/neubrutalism', label: 'What is neubrutalism', desc: 'The complete guide to the style and its traits.' },
            { to: '/neubrutalism/colors', label: 'Color palettes', desc: 'Copy-paste neubrutalism palettes with HSL tokens.' },
            { to: '/neubrutalism/examples', label: 'Examples', desc: 'Real neubrutalist interfaces and patterns.' },
            { to: '/components', label: 'Components', desc: '60+ thick-bordered React & Vue components.' },
          ]}
        />
      </Section>

      <CTABox
        title="New to the style? Start here"
        body="Skip the history lesson and get the practical playbook - traits, do’s and don’ts, accessibility, and how to ship neubrutalism in React and Vue."
        href="/neubrutalism"
        cta="Read the guide"
        tone="#FF6B35"
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
