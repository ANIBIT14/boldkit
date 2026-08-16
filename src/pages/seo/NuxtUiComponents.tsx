import { SITE_URL, COUNTS } from '@/config/routes-meta'
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
  { id: 'answer', label: 'The short answer' },
  { id: 'setup', label: 'Setup for Nuxt 3 and 4' },
  { id: 'paths', label: 'The path gotcha' },
  { id: 'ssr', label: 'SSR and hydration' },
  { id: 'vs-nuxt-ui', label: 'vs Nuxt UI' },
  { id: 'checklist', label: 'Do and don’t' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'Can I use shadcn components in Nuxt?',
    answer:
      'Yes, via shadcn-vue. Either use the shadcn-nuxt module, which wires up the config for you, or run the shadcn-vue CLI directly against a registry URL. Components land in your components/ui directory as .vue files and Nuxt auto-imports them.',
  },
  {
    question: 'Does BoldKit work with Nuxt 4?',
    answer:
      'Yes — Nuxt 4 and Nuxt 3 are both supported and tested against a real Nuxt install rather than only in theory. Nuxt 4 moved the app source into app/, which changes where the CLI writes files; the registry uses alias-relative paths so both layouts resolve correctly.',
  },
  {
    question: 'Do I need the shadcn-nuxt module?',
    answer:
      'Not strictly. The module mainly configures the component prefix and directory, and makes auto-import behave predictably. You can install straight from a registry URL without it, as long as your components.json aliases are set.',
  },
  {
    question: 'Do these components work with SSR?',
    answer:
      'Yes. Components that touch browser APIs guard against a missing window and defer to onMounted, so server rendering does not crash. Chart components render client-side by design since ECharts needs a real canvas.',
  },
]

export function NuxtUiComponents() {
  return (
    <SeoArticleLayout
      eyebrow="Nuxt"
      title="Nuxt UI Components"
      lede="Installing a shadcn-style registry into Nuxt has two specific failure modes that produce confusing errors. Here is the working setup for Nuxt 3 and Nuxt 4, and what to do when paths come out wrong."
      accent="#00DC82"
      updated="August 2026"
      toc={TOC}
      seo={{
        title: 'Nuxt UI Components — shadcn-vue Registry Setup for Nuxt 3 & 4 | BoldKit',
        description:
          'Install neubrutalism UI components into Nuxt 3 or Nuxt 4 with the shadcn-vue CLI. Working setup, the app/ directory path gotcha, SSR notes, and how it compares to Nuxt UI.',
        canonical: `${SITE_URL}/nuxt-ui-components`,
        keywords:
          'nuxt ui components, nuxt component library, shadcn nuxt, shadcn-vue nuxt, nuxt 4 components, nuxt tailwind components, nuxt 3 ui library',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Nuxt UI Components' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="answer" title="The short answer">
        <p>
          Nuxt works with any shadcn-vue compatible registry, BoldKit included. The install is a single
          CLI call:
        </p>
        <Callout title="Install one component" tone="#00DC82">
          <code>npx shadcn-vue@latest add &quot;https://boldkit.dev/r/vue/button.json&quot;</code>
        </Callout>
        <p>
          The two things that trip people up are <strong>where the files land</strong> (Nuxt 4 moved
          the app source into <code>app/</code>) and <strong>auto-import collisions</strong>. Both are
          covered below — they are the reason this page exists rather than pointing you at the generic
          Vue instructions.
        </p>
      </Section>

      <Section id="setup" title="Setup for Nuxt 3 and 4">
        <ol className="ml-4 list-decimal space-y-2">
          <li>
            <strong>Install Tailwind and shadcn-vue scaffolding.</strong> The <code>shadcn-nuxt</code>{' '}
            module is the least-friction route — it sets the component directory and prefix so
            auto-import behaves.
          </li>
          <li>
            <strong>Check your <code>components.json</code> aliases</strong> point at real directories
            for your Nuxt version. On Nuxt 4 that usually means <code>app/components</code> and{' '}
            <code>app/lib</code>; on Nuxt 3, <code>components</code> and <code>lib</code>.
          </li>
          <li>
            <strong>Add the theme first</strong> so the CSS variables exist before any component
            references them:
            <br />
            <code>npx shadcn-vue@latest add &quot;https://boldkit.dev/r/vue/styles.json&quot;</code>
          </li>
          <li>
            <strong>Add components.</strong> Nuxt auto-imports anything under your components
            directory, so no explicit import is needed in templates.
          </li>
        </ol>
        <Callout title="Combined installs" tone="#00DC82">
          Installing several items in one command is fine and resolves shared dependencies once:
          <br />
          <code>npx shadcn-vue@latest add &quot;.../vue/button.json&quot; &quot;.../vue/card.json&quot;</code>
        </Callout>
      </Section>

      <Section id="paths" title="The path gotcha">
        <p>
          This is the failure worth understanding, because the symptom does not obviously point at the
          cause. On a combined install, the CLI computes a common root across the items it is writing.
          If registry paths are absolute-ish rather than alias-relative, that common root collapses
          wrongly and you get nested duplicates:
        </p>
        <DataGrid
          headers={['Symptom', 'What actually happened']}
          rows={[
            ['app/lib/default/lib/utils.ts', 'Item paths shared a registry-internal prefix that leaked into the target'],
            ['components/ui/ui/Button.vue', 'Target directory already contained components/ui and the item re-appended it'],
            ['Cannot find module @/lib/utils', 'utils landed outside the alias root, so the import cannot resolve'],
          ]}
        />
        <p>
          BoldKit&rsquo;s Vue registry uses <strong>alias-relative paths</strong> specifically so this
          cannot happen, and the layout is verified against Nuxt 4, Nuxt 3 and plain Vite on every
          registry build. If you hit one of the above with any registry, the fix is the same: check
          whether the item paths are alias-relative, and check your <code>components.json</code>{' '}
          aliases match your Nuxt version&rsquo;s directory layout.
        </p>
      </Section>

      <Section id="ssr" title="SSR and hydration">
        <p>
          Nuxt renders on the server by default, which breaks any component that assumes{' '}
          <code>window</code> exists at module scope. What to expect:
        </p>
        <ul className="ml-1 space-y-2">
          <li><strong>Interactive components are SSR-safe</strong> — browser API access is guarded and deferred to <code>onMounted</code>.</li>
          <li><strong>Charts render client-side.</strong> ECharts needs a real canvas; wrap them in <code>&lt;ClientOnly&gt;</code> if you see a hydration warning.</li>
          <li><strong>Theme flash</strong> — if you persist a dark-mode preference, set the class before paint via a Nuxt plugin, or the first frame renders light.</li>
          <li><strong>Canvas effects are client-only</strong> by nature, same as charts.</li>
        </ul>
      </Section>

      <Section id="vs-nuxt-ui" title="vs Nuxt UI">
        <p>
          The obvious question. They solve different problems and the honest answer is that Nuxt UI is
          the safer default for most Nuxt apps:
        </p>
        <DataGrid
          headers={['', 'Nuxt UI', 'BoldKit']}
          rows={[
            ['Model', 'Module dependency', 'Copy-in registry — you own the files'],
            ['Maintained by', 'Nuxt core team', 'Independent, MIT'],
            ['Nuxt integration', 'Deepest possible', 'Standard shadcn-vue conventions'],
            ['Look', 'Neutral, themeable', 'Neubrutalist by construction'],
            ['Other frameworks', 'Nuxt / Vue', 'Vue and React from one source'],
          ]}
        />
        <p>
          Choose Nuxt UI when you want the most integrated option and a neutral base to brand. Choose
          BoldKit when you want a strong aesthetic out of the box, want to own and edit the component
          source, or need the same components in a React codebase too.
        </p>
      </Section>

      <Section id="checklist" title="Do and don’t">
        <DoDont
          doItems={[
            'Add the theme item before any component, so CSS variables exist first.',
            'Match components.json aliases to your Nuxt version’s directory layout.',
            'Wrap charts and canvas effects in <ClientOnly> if hydration warns.',
            'Install multiple items in one command to resolve shared deps once.',
            'Set the theme class before paint to avoid a light-mode flash.',
          ]}
          dontItems={[
            'Don’t use the React registry URL — it has no /vue/ segment and ships .tsx.',
            'Don’t hand-copy files without their sibling stylesheets, or animations go silently inert.',
            'Don’t nest a components/ui alias inside another components/ui path.',
            'Don’t assume window exists at module scope in a component you write yourself.',
          ]}
        />
      </Section>

      <CTABox
        title="Start with one component"
        body="Add a button to an existing Nuxt app and see how the install behaves before committing to anything larger."
        href="/docs"
        cta="Read the install guide"
        tone="#00DC82"
      />

      <LinkCards
        items={[
          { to: '/vue-ui-components', label: 'Vue components', desc: `The full Vue catalogue — ${COUNTS.components}+ components and ${COUNTS.charts} charts.` },
          { to: '/shadcn-alternatives', label: 'shadcn alternatives', desc: 'How this sits next to Nuxt UI, shadcn-vue and Element Plus.' },
          { to: '/react-vue-component-library', label: 'React + Vue parity', desc: 'Running the same design system across both frameworks.' },
        ]}
      />
    </SeoArticleLayout>
  )
}
