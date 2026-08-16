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
  { id: 'problem', label: 'The two-framework problem' },
  { id: 'approach', label: 'What parity actually means' },
  { id: 'differs', label: 'Where the frameworks differ' },
  { id: 'maintained', label: 'How parity is enforced' },
  { id: 'when', label: 'When this matters' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'Is there a component library that works in both React and Vue?',
    answer:
      'A few. The common approaches are CSS-only libraries like daisyUI that work anywhere because they ship no component code, wrapper libraries like Flowbite that maintain a separate package per framework, and web-component libraries that work everywhere at the cost of framework-native ergonomics. BoldKit takes the copy-in registry approach with a parallel registry per framework.',
  },
  {
    question: 'Are the React and Vue components identical?',
    answer:
      'Visually yes — same borders, shadows, spacing and motion tokens, because they share the same stylesheets. API-wise they follow each framework’s idiom: React uses props and callbacks on Radix primitives, Vue uses v-model and emits on Reka UI. Forcing identical APIs would make one of them feel foreign.',
  },
  {
    question: 'Can I share a theme between the React and Vue apps?',
    answer:
      'Yes. Theming is entirely CSS custom properties, so the same globals.css tokens drive both. Change a palette once and both apps follow — that is usually the main reason teams want this in the first place.',
  },
  {
    question: 'Does the Vue version lag behind React?',
    answer:
      'Both registries are built in the same release from a shared source, and the audit scripts run over both. The honest caveat is that a few items exist in one framework only — currently 3 of the 7 templates are Vue, and a handful of canvas effects are React-first. The components pages mark availability per item.',
  },
]

export function ReactVueComponentLibrary() {
  return (
    <SeoArticleLayout
      eyebrow="Cross-framework"
      title="One Library, Two Frameworks"
      lede="Running React in the app and Vue on the marketing site is common, and it usually means maintaining two unrelated design systems that drift apart. This is what it takes to avoid that."
      accent="#B084FF"
      updated="August 2026"
      toc={TOC}
      seo={{
        title: 'React + Vue Component Library — One Design System, Both Frameworks | BoldKit',
        description:
          'How to run one design system across React and Vue 3 without maintaining two drifting codebases. Shared CSS tokens, parallel registries, and where framework idioms should diverge.',
        canonical: `${SITE_URL}/react-vue-component-library`,
        keywords:
          'react and vue component library, cross framework component library, design system react vue, shared design system, vue and react ui library, multi framework ui components',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'React + Vue' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="problem" title="The two-framework problem">
        <p>
          Plenty of organisations end up here without deciding to: a React product app, a Nuxt
          marketing site, an acquired Vue dashboard. Each gets its own component layer, and within a
          year the button in one is 3px different from the button in the other and nobody knows which
          is correct.
        </p>
        <p>The usual escapes, and what each actually costs:</p>
        <DataGrid
          headers={['Approach', 'How it works', 'The cost']}
          rows={[
            ['CSS-only library', 'Ship classes, no component code (daisyUI)', 'No behaviour — you rebuild dropdowns, dialogs and focus traps per framework'],
            ['Web components', 'One implementation, custom elements', 'Awkward framework ergonomics, SSR friction, form participation issues'],
            ['Wrapper packages', 'A package per framework (Flowbite)', 'Two codebases to keep in sync; one usually lags'],
            ['Design tokens only', 'Share variables, build components twice', 'Cheapest to start, but behaviour and a11y still diverge'],
            ['Parallel registries', 'Framework-native source, shared styles', 'Two implementations — but generated and audited together'],
          ]}
        />
        <p>
          There is no free option. The question is which cost you would rather carry, and for most
          teams the answer is &ldquo;anything except rebuilding a focus trap twice&rdquo;.
        </p>
      </Section>

      <Section id="approach" title="What parity actually means">
        <p>
          BoldKit takes the last row: a real React implementation and a real Vue implementation, with
          everything that <em>can</em> be shared being shared.
        </p>
        <ul className="ml-1 space-y-2">
          <li>
            <strong>Stylesheets are shared verbatim.</strong> Borders, shadow offsets, easing curves,
            keyframes and motion tokens live in CSS. A change to a token changes both frameworks in the
            same release, because it is literally the same file content.
          </li>
          <li>
            <strong>Theming is CSS custom properties.</strong> One palette drives both apps. No
            JavaScript theme object to keep in sync.
          </li>
          <li>
            <strong>Behaviour comes from maintained primitives.</strong> Radix on React, Reka on Vue —
            two libraries that already agree closely on ARIA patterns and keyboard behaviour, so
            interaction semantics match without hand-porting.
          </li>
          <li>
            <strong>Both registries are generated in one build</strong> from one source tree, so
            neither can quietly fall behind.
          </li>
        </ul>
        <Callout title="The part that is not shared" tone="#B084FF">
          The component source itself. A <code>.tsx</code> file and a <code>.vue</code> file are
          genuinely different programs — pretending otherwise produces a library that feels wrong in
          both frameworks. Two implementations, one visual and behavioural contract.
        </Callout>
      </Section>

      <Section id="differs" title="Where the frameworks differ">
        <p>
          Deliberate divergences. Each follows the idiom a developer in that ecosystem would expect:
        </p>
        <DataGrid
          headers={['Concern', 'React', 'Vue 3']}
          rows={[
            ['Primitives', 'Radix UI', 'Reka UI'],
            ['Controlled state', 'value + onValueChange', 'v-model'],
            ['Events', 'onOpenChange, onSelect', 'emits'],
            ['Styling helper', 'cn() + CVA', 'cn() + CVA'],
            ['Charts', 'Recharts', 'ECharts via vue-echarts'],
            ['Motion', '<Motion> + hooks', '<Motion> + composables'],
            ['CLI', 'npx shadcn@latest', 'npx shadcn-vue@latest'],
          ]}
        />
        <p>
          Charts are the widest gap, because the engines differ. A shared authoring layer covers
          annotations, the export toolbar and loading states, so common work is portable — but deep
          customisation still means writing engine-specific options. That limit is real and worth
          knowing before you plan around it.
        </p>
      </Section>

      <Section id="maintained" title="How parity is enforced">
        <p>
          Intent is not enough — parity decays unless something checks it. What runs on every change:
        </p>
        <ul className="ml-1 space-y-2">
          <li><strong>A sync step</strong> copies source into the registry mirror, and fails the build if a mirror has drifted.</li>
          <li><strong>An import audit</strong> checks every registry item ships the files its imports need, per framework, so nothing installs broken.</li>
          <li><strong>Accessibility tests</strong> run automated axe passes on both React and Vue, published as a per-component matrix.</li>
          <li><strong>A contrast audit</strong> checks every semantic token pair in light and dark against WCAG, and gates the build.</li>
          <li><strong>Test suites on both sides</strong> — 610 React and 66 Vue at the time of writing.</li>
        </ul>
        <p>
          These exist because parity broke before. Every one of those checks was added after a real bug
          shipped — a Vue registry that installed a stylesheet it did not include, a component exported
          on one side and not the other, a fix applied to source but never mirrored.
        </p>
      </Section>

      <Section id="when" title="When this matters">
        <p><strong>Worth it when:</strong></p>
        <ul className="ml-1 space-y-2">
          <li>You genuinely ship both frameworks and want one visual language across them.</li>
          <li>You are migrating between frameworks and want the UI to stay constant while the app moves.</li>
          <li>You are choosing a library now and want the option later without a rewrite.</li>
        </ul>
        <p><strong>Not worth it when:</strong></p>
        <ul className="ml-1 space-y-2">
          <li>You are React-only and will stay that way — pick the best React option and ignore this axis entirely.</li>
          <li>You need the deepest possible framework integration, where Nuxt UI or a React-native-to-the-metal library wins.</li>
          <li>You want a neutral base to brand heavily — BoldKit&rsquo;s look is opinionated by design.</li>
        </ul>
      </Section>

      <CTABox
        title="See the same component in both"
        body={`Every component page has React and Vue tabs side by side with runnable examples and each framework's install command. ${COUNTS.components}+ components, MIT licensed.`}
        href="/components"
        cta="Browse components"
        tone="#B084FF"
      />

      <LinkCards
        items={[
          { to: '/vue-ui-components', label: 'Vue 3 components', desc: 'Install via shadcn-vue, built on Reka UI.' },
          { to: '/nuxt-ui-components', label: 'Nuxt setup', desc: 'Nuxt 3 and 4, plus the path resolution specifics.' },
          { to: '/shadcn-alternatives', label: 'shadcn alternatives', desc: 'The wider field, grouped by what you actually need.' },
          { to: '/accessibility', label: 'Accessibility matrix', desc: 'Per-component axe results for React and Vue.' },
        ]}
      />
    </SeoArticleLayout>
  )
}
