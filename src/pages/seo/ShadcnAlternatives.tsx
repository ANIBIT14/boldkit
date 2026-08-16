import { SITE_URL, COUNTS } from '@/config/routes-meta'
import {
  SeoArticleLayout,
  Section,
  Callout,
  DataGrid,
  CTABox,
  LinkCards,
} from '@/components/seo/SeoArticleLayout'

const TOC = [
  { id: 'answer', label: 'The short answer' },
  { id: 'what-you-keep', label: 'What you keep either way' },
  { id: 'options', label: 'The options compared' },
  { id: 'styled', label: 'If you want a look, not a blank canvas' },
  { id: 'vue', label: 'If you are on Vue or Nuxt' },
  { id: 'boldkit', label: 'Where BoldKit fits' },
  { id: 'choosing', label: 'How to choose' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'Is shadcn/ui a component library?',
    answer:
      'Not in the usual sense. shadcn/ui is a set of components you copy into your own repo via a CLI, plus a registry format for distributing them. There is no runtime package to install and no version to upgrade — once the files land in your project, they are your code. That is the model most alternatives on this page either adopt or deliberately reject.',
  },
  {
    question: 'What is the best shadcn alternative?',
    answer:
      'There is no single best one, because "alternative" covers three different needs. If you want the same copy-in model with a different look, use another shadcn-compatible registry. If you want a styled, batteries-included library, daisyUI or Flowbite are closer. If you want lower-level primitives to style yourself, Radix UI (React) or Reka UI (Vue) are the layer underneath shadcn/ui itself.',
  },
  {
    question: 'Does shadcn/ui work with Vue?',
    answer:
      'Not directly — shadcn/ui is React-only. shadcn-vue is a separate community port that mirrors the API on top of Reka UI and ships its own CLI (npx shadcn-vue@latest add). A registry built for React will not install into a Vue project; it needs a Vue-specific registry with Vue single-file components.',
  },
  {
    question: 'Can I use a shadcn registry without Next.js?',
    answer:
      'Yes. The shadcn CLI writes files into whatever project it is pointed at, so Vite, Remix, Astro, TanStack Start and Laravel all work. Next.js is the default in the docs, not a requirement. On the Vue side the same applies to Vite and Nuxt.',
  },
  {
    question: 'Is BoldKit free?',
    answer:
      'Yes — MIT licensed, with no pro tier, no paid blocks, and no signup. Several popular block libraries in this space are freemium, where the marketing sections are free but full page templates sit behind a licence. BoldKit does not split its catalogue that way.',
  },
]

export function ShadcnAlternatives() {
  return (
    <SeoArticleLayout
      eyebrow="Comparison"
      title="shadcn Alternatives"
      lede="shadcn/ui became the default for new React projects — which is exactly why people start looking for something else. Here is an honest map of the alternatives, grouped by the problem you are actually trying to solve."
      accent="#4ECDC4"
      updated="August 2026"
      toc={TOC}
      seo={{
        title: 'shadcn Alternatives (2026) — Honest Comparison for React & Vue | BoldKit',
        description:
          'A practical guide to shadcn/ui alternatives in 2026 — copy-in registries, styled libraries like daisyUI and Flowbite, headless primitives, and the Vue options. What each is actually good at, and how to pick.',
        canonical: `${SITE_URL}/shadcn-alternatives`,
        keywords:
          'shadcn alternatives, shadcn ui alternatives, alternative to shadcn, shadcn vs daisyui, shadcn vue alternative, best shadcn alternative, shadcn registry alternatives',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'shadcn Alternatives' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="answer" title="The short answer">
        <p>
          &ldquo;Alternative to shadcn&rdquo; is three different questions wearing one coat. Sort
          yourself into a row before reading further:
        </p>
        <Callout title="Pick your actual problem" tone="#4ECDC4">
          <ul className="ml-1 space-y-2">
            <li>
              <strong>&ldquo;I like the model, I want a different look.&rdquo;</strong> Stay on the
              shadcn CLI and point it at a different registry. Nothing else changes — same install
              command, same code ownership.
            </li>
            <li>
              <strong>&ldquo;I don&rsquo;t want to own the code.&rdquo;</strong> You want a real
              dependency you upgrade with a version bump: daisyUI, Flowbite, Element Plus, MUI.
            </li>
            <li>
              <strong>&ldquo;I want to style everything myself.&rdquo;</strong> Drop a layer down to
              headless primitives — Radix UI on React, Reka UI on Vue. shadcn/ui is a styled wrapper
              around Radix, so this is removing an opinion, not replacing one.
            </li>
          </ul>
        </Callout>
        <p>
          The mistake is treating these as interchangeable. Swapping shadcn/ui for daisyUI is not a
          restyle — it is a change in who owns the component code and how you upgrade it.
        </p>
      </Section>

      <Section id="what-you-keep" title="What you keep either way">
        <p>
          If you stay inside the shadcn ecosystem and only change registry, these stay identical, which
          is why switching costs so little:
        </p>
        <ul className="ml-1 space-y-2">
          <li><strong>The CLI</strong> — <code>npx shadcn@latest add &lt;url&gt;</code> for React, <code>npx shadcn-vue@latest add &lt;url&gt;</code> for Vue.</li>
          <li><strong>Code ownership</strong> — files land in <code>components/ui/</code> and become yours to edit.</li>
          <li><strong>The primitive layer</strong> — most registries build on Radix (React) or Reka (Vue), so accessibility behaviour and keyboard handling carry over.</li>
          <li><strong>Tailwind</strong> — theming stays CSS-variable driven, so your existing tokens usually survive.</li>
        </ul>
        <p>
          What changes is the visual language and the breadth of the catalogue. That is genuinely all
          — which is why &ldquo;alternative&rdquo; inside the registry world is a much smaller decision
          than it sounds.
        </p>
      </Section>

      <Section id="options" title="The options compared">
        <p>
          Grouped by model rather than by popularity, because the model is what determines whether a
          switch is an afternoon or a quarter:
        </p>
        <DataGrid
          headers={['Option', 'Model', 'Frameworks', 'Best when']}
          rows={[
            ['shadcn/ui', 'Copy-in via CLI', 'React', 'You want the default, largest ecosystem and most examples'],
            ['shadcn-vue', 'Copy-in via CLI', 'Vue 3, Nuxt', 'You want the shadcn model but your app is Vue'],
            ['BoldKit', 'Copy-in via CLI', 'React + Vue 3', 'You want a strong opinionated look, or the same components in both frameworks'],
            ['daisyUI', 'CSS plugin (dependency)', 'Any (CSS-only)', 'You want themes and semantic classes without shipping component code'],
            ['Flowbite', 'Dependency per framework', 'React, Vue, Svelte, HTML', 'You want a broad prebuilt catalogue and do not want to own the source'],
            ['Radix UI', 'Headless primitives', 'React', 'You are building your own design system from the ground up'],
            ['Reka UI', 'Headless primitives', 'Vue 3', 'Same, on Vue — this is what shadcn-vue and BoldKit build on'],
            ['MUI / Ant Design', 'Full styled framework', 'React', 'Enterprise breadth, data-heavy admin UIs, established conventions'],
          ]}
        />
        <Callout title="A note on block counts" tone="#4ECDC4">
          Several sites in this space advertise 400–800+ &ldquo;blocks&rdquo;. Those numbers usually
          count every variant of every section separately, and a large share sit behind a paid tier.
          Compare what is actually free and actually installable before treating a headline number as
          a feature.
        </Callout>
      </Section>

      <Section id="styled" title="If you want a look, not a blank canvas">
        <p>
          shadcn/ui is deliberately neutral. That is the point — it is a starting surface you are
          expected to brand. The cost is that a default shadcn app looks like every other default
          shadcn app, which is the single most common reason people go looking for alternatives.
        </p>
        <p>Two ways out:</p>
        <ul className="ml-1 space-y-2">
          <li>
            <strong>Theme it yourself.</strong> Change the CSS variables, radius and fonts. Cheapest
            option, and usually enough for a product that wants to look conventional but not generic.
          </li>
          <li>
            <strong>Start from a registry that already has a point of view.</strong> You inherit an
            aesthetic instead of authoring one — useful when the alternative is shipping the default
            palette forever because nobody had time to design.
          </li>
        </ul>
        <p>
          BoldKit is the second kind: every component is neubrutalist by construction — 3px borders,
          hard offset shadows with zero blur, no border radius, uppercase tracked labels. That is a
          strong commitment, and the honest caveat is that it is not a neutral base. If you need
          something quiet and corporate, theme shadcn/ui instead.
        </p>
      </Section>

      <Section id="vue" title="If you are on Vue or Nuxt">
        <p>
          This is where the alternatives list thins out sharply. shadcn/ui itself is React-only, and a
          React registry cannot install into a Vue project — the files are <code>.tsx</code>, the
          primitives are Radix, and neither ports across.
        </p>
        <p>Practical options today:</p>
        <ul className="ml-1 space-y-2">
          <li><strong>shadcn-vue</strong> — the community port. Mirrors the shadcn API on Reka UI, with its own CLI and registry format.</li>
          <li><strong>Nuxt UI</strong> — if you are on Nuxt specifically and happy with a dependency, this is the most integrated choice.</li>
          <li><strong>Element Plus / PrimeVue</strong> — mature, broad, styled. Closer to MUI than to shadcn in philosophy.</li>
          <li><strong>BoldKit</strong> — ships a parallel Vue registry so the same components exist in both frameworks.</li>
        </ul>
        <p>
          The gap worth knowing about: most of the popular block and template libraries in the shadcn
          orbit are React-only. If you are on Vue, a large part of the ecosystem you read about
          simply is not available to you.
        </p>
        <LinkCards
          items={[
            { to: '/vue-ui-components', label: 'Vue 3 UI components', desc: 'The full Vue catalogue and how the shadcn-vue install works.' },
            { to: '/nuxt-ui-components', label: 'Nuxt setup', desc: 'Installing into Nuxt 3 and 4, including the path gotchas.' },
          ]}
        />
      </Section>

      <Section id="boldkit" title="Where BoldKit fits">
        <p>
          BoldKit is a shadcn-compatible registry with a fixed aesthetic, published for React and Vue
          from one source. Concretely:
        </p>
        <ul className="ml-1 space-y-2">
          <li><strong>{COUNTS.components}+ components</strong>, <strong>{COUNTS.charts} chart types</strong>, <strong>{COUNTS.shapes} SVG shapes</strong>, <strong>{COUNTS.blocks} blocks</strong> and <strong>{COUNTS.templates} templates</strong>.</li>
          <li><strong>React and Vue parity</strong> — the same component, same props where the frameworks allow, installed through each framework&rsquo;s own CLI.</li>
          <li><strong>MIT, no pro tier</strong> — nothing in the catalogue is paywalled.</li>
          <li><strong>Charts in both frameworks</strong> — Recharts on React, ECharts on Vue, behind one API.</li>
        </ul>
        <Callout title="What it is not" tone="#FF6B35">
          <ul className="ml-1 space-y-2">
            <li><strong>Not neutral.</strong> The neubrutalist look is the product. Toning it down means overriding a lot.</li>
            <li><strong>Not a blocks marketplace.</strong> {COUNTS.blocks} blocks and {COUNTS.templates} templates, and they are copy-paste from the docs rather than CLI-installable.</li>
            <li><strong>Not a drop-in shadcn replacement.</strong> Component names overlap, but the styling is opinionated enough that swapping mid-project is a visual redesign.</li>
          </ul>
        </Callout>
      </Section>

      <Section id="choosing" title="How to choose">
        <p>Three questions, in order. They resolve most of the decision:</p>
        <ol className="ml-4 list-decimal space-y-2">
          <li>
            <strong>Do you want to own the component code?</strong> Yes → a registry (shadcn/ui,
            shadcn-vue, BoldKit). No → a dependency (daisyUI, Flowbite, MUI, Element Plus).
          </li>
          <li>
            <strong>Do you have a designer?</strong> Yes → start neutral and brand it. No → start from
            a registry with an opinion, so the default state already looks deliberate.
          </li>
          <li>
            <strong>Which frameworks must this serve?</strong> React only → the whole field is open.
            Vue or both → the field narrows to shadcn-vue, Nuxt UI, the styled Vue libraries, and
            BoldKit.
          </li>
        </ol>
        <p>
          If you land on &ldquo;registry, opinionated, both frameworks&rdquo;, that is the specific
          corner BoldKit was built for. If you land anywhere else, one of the options above will serve
          you better — the list is here so you can find it.
        </p>
      </Section>

      <CTABox
        title="Try it without committing"
        body="Install a single component into an existing React or Vue project and see how it sits next to what you already have. No package, no lock-in — the files are yours."
        href="/docs"
        cta="Read the install guide"
        tone="#4ECDC4"
      />

      <LinkCards
        items={[
          { to: '/components', label: 'Browse components', desc: `All ${COUNTS.components}+ components with live React and Vue examples.` },
          { to: '/react-vue-component-library', label: 'One library, two frameworks', desc: 'How the React and Vue registries stay in parity.' },
          { to: '/neubrutalism', label: 'What is neubrutalism?', desc: 'The design language behind the look, and when it fits.' },
          { to: '/mcp-ui-components', label: 'Install with AI', desc: 'The MCP server that lets an agent search and install components.' },
        ]}
      />
    </SeoArticleLayout>
  )
}
