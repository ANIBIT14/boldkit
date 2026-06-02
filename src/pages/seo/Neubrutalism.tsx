import { SITE_URL } from '@/config/routes-meta'
import {
  SeoArticleLayout,
  Section,
  Callout,
  DoDont,
  CTABox,
  LinkCards,
} from '@/components/seo/SeoArticleLayout'

const TOC = [
  { id: 'definition', label: 'Definition' },
  { id: 'traits', label: 'Core traits' },
  { id: 'disciplined', label: 'Disciplined vs chaotic' },
  { id: 'rules', label: 'Do & don’t' },
  { id: 'build', label: 'Build it' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'Is it spelled neubrutalism or neobrutalism?',
    answer:
      'Both spellings refer to the same web design trend. "Neubrutalism" and "neobrutalism" are used interchangeably; it is an evolution of the older brutalist web aesthetic toward a more usable, deliberately bold style.',
  },
  {
    question: 'Is neubrutalism still on trend in 2026?',
    answer:
      'Yes. Neubrutalism emerged around 2020-21 and has shown far more staying power than most micro-trends, continuing to influence product design, component libraries, and brand identities through 2026.',
  },
  {
    question: 'Is neubrutalism accessible?',
    answer:
      'It can be, when applied with discipline. High-contrast color blocks and bold type help readability, but you must verify text contrast meets WCAG AA and avoid clashing pairs like yellow on cyan. Disciplined, grid-based neubrutalism tests well; chaotic anti-design does not.',
  },
]

export function Neubrutalism() {
  return (
    <SeoArticleLayout
      eyebrow="Complete Guide"
      title="What Is Neubrutalism?"
      lede="Neubrutalism is a high-contrast, deliberately raw design style built on thick black borders, hard offset shadows, sharp corners, and loud flat color. Here is what defines it, why it works, and how to ship it without wrecking usability."
      accent="#FFE400"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'What Is Neubrutalism? The Complete Guide (2026)',
        description:
          'Neubrutalism (neobrutalism) explained: thick borders, hard shadows, sharp corners, bold flat color and chunky type. Core traits, do’s and don’ts, accessibility, and how to build it in React & Vue.',
        canonical: `${SITE_URL}/neubrutalism`,
        keywords:
          'neubrutalism, neobrutalism, what is neubrutalism, neubrutalism design, neo brutalism web design, brutalist ui, neubrutalism react, neubrutalism vue',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Neubrutalism' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="definition" title="What neubrutalism actually is">
        <p>
          <strong>Neubrutalism</strong> (also spelled <strong>neobrutalism</strong>) is a visual
          design trend defined by high contrast, blocky layouts, loud flat color, thick borders, and
          intentionally &ldquo;unpolished&rdquo; elements. It is the friendlier descendant of raw
          1990s web <em>brutalism</em>: it keeps the rebellious, anti-gradient attitude but reintroduces
          enough structure, color, and feedback to actually be usable.
        </p>
        <p>
          Where most interfaces try to disappear, neubrutalism is loud on purpose. Flat color blocks
          clash. Typography is oversized. Borders feel almost physical. Drop shadows look stamped on by
          hand. That refusal to sand down the edges is the entire point - it makes a product
          memorable in a sea of soft, rounded, identical SaaS dashboards.
        </p>
        <Callout title="In one line" tone="#FFE400">
          Neubrutalism = brutalist boldness + modern usability. Thick borders, hard shadows, zero
          border-radius, bold type, and a tight high-contrast palette.
        </Callout>
      </Section>

      <Section id="traits" title="The five core traits">
        <p>Almost every neubrutalist interface is built from the same five ingredients:</p>
        <ul className="ml-1 space-y-2">
          <li><strong>Thick solid borders</strong> - typically 2-3px solid black on every interactive element. No hairlines.</li>
          <li><strong>Hard offset shadows</strong> - a single flat color, offset 4-6px on both axes with <em>zero blur</em>, like a stamp pressed slightly to the side.</li>
          <li><strong>Sharp corners</strong> - border-radius is set to <code>0</code>. Everything is a crisp rectangle.</li>
          <li><strong>Bold, chunky typography</strong> - 700+ weights, uppercase labels, wide letter-spacing. Headlines act as visual anchors.</li>
          <li><strong>Tight, high-contrast color</strong> - 2-3 loud colors (think black, neon green, electric blue) on off-white or near-black.</li>
        </ul>
        <p>
          BoldKit bakes these into CSS variables so you get the look for free:{' '}
          <code>border-3 border-foreground</code>, a <code>4px 4px 0</code> shadow, and{' '}
          <code>--radius: 0rem</code>. The signature interaction is the <strong>press-down hover</strong>:
          elements translate by <code>(4px, 4px)</code> and drop their shadow, mimicking a physical
          button being pushed in.
        </p>
        <LinkCards
          items={[
            { to: '/neubrutalism/colors', label: 'Color palettes', desc: 'Copy-paste neubrutalism palettes with HSL tokens.' },
            { to: '/neubrutalism/fonts', label: 'Fonts & pairings', desc: 'The best display + mono fonts for the style.' },
          ]}
        />
      </Section>

      <Section id="disciplined" title="Disciplined vs. chaotic neubrutalism">
        <p>
          This is the difference between a striking product and an unusable one. A 2026 usability study
          split the style into two camps: <strong>disciplined</strong> layouts with a clear grid, and{' '}
          <strong>chaotic anti-design</strong> where everything fights for attention. The disciplined
          version scored reasonable usability. The chaotic version saw task-success rates fall as low as
          8-10% on information-heavy pages.
        </p>
        <p>
          The lesson: keep the loud surface, but ground it in a real grid, clear hierarchy, and tested
          contrast. Bold should never mean illegible.
        </p>
      </Section>

      <Section id="rules" title="Do &amp; don't">
        <DoDont
          doItems={[
            'Limit to 2-3 high-contrast colors and reuse them relentlessly.',
            'Check text contrast against WCAG AA - even loud colors must be readable.',
            'Pair one chunky display font with a clean, neutral body font.',
            'Keep a clear grid; make headlines ~2× the body size.',
            'Use generous 24-32px padding so dense borders can breathe.',
            'Show obvious state changes on hover - shift, invert, or shadow.',
          ]}
          dontItems={[
            'Pair colors that fail contrast (e.g. yellow text on cyan).',
            'Reach for soft gradients or blurred shadows - they break the aesthetic.',
            'Let every element shout at once; pick a focal point.',
            'Round your corners - keep border-radius at 0.',
            'Cram content edge-to-edge with no whitespace.',
            'Rely on color alone to signal interactivity.',
          ]}
        />
      </Section>

      <Section id="build" title="Build neubrutalism in minutes">
        <p>
          You don&rsquo;t have to hand-roll the borders and shadows. <strong>BoldKit</strong> is a free,
          open-source neubrutalism component library for <strong>React</strong> and <strong>Vue 3</strong>:
          60+ components, blocks, templates, charts, and shapes, all installed via the shadcn CLI so the
          source lands directly in your project. Start from{' '}
          <a href="/components">the component gallery</a>, drop in a{' '}
          <a href="/blocks">section block</a>, or tune the look in the{' '}
          <a href="/themes">Theme Builder</a>.
        </p>
        <CTABox
          title="Get the neubrutalism look"
          body="Browse 60+ thick-bordered, hard-shadowed components for React and Vue 3. Copy, paste, ship."
          href="/components"
          cta="Explore components"
          tone="#FFE400"
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
