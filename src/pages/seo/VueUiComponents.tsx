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
  { id: 'install', label: 'Install in 60 seconds' },
  { id: 'catalogue', label: 'What you get' },
  { id: 'how-it-works', label: 'How the Vue registry works' },
  { id: 'charts', label: 'Charts on Vue' },
  { id: 'parity', label: 'React parity' },
  { id: 'gotchas', label: 'Gotchas worth knowing' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'Does shadcn work with Vue 3?',
    answer:
      'Not shadcn/ui itself — it is React-only. shadcn-vue is a separate community port that mirrors the same CLI-and-registry model on top of Reka UI. You install with npx shadcn-vue@latest add and the components land as .vue single-file components in your project.',
  },
  {
    question: 'How do I install BoldKit components in a Vue project?',
    answer:
      'Point the shadcn-vue CLI at the BoldKit Vue registry: npx shadcn-vue@latest add "https://boldkit.dev/r/vue/button.json". The component and its dependencies are written into your components/ui directory and become your code. There is no package to install.',
  },
  {
    question: 'Do I need Nuxt to use these?',
    answer:
      'No. Any Vue 3 project works — Vite, Nuxt 3, Nuxt 4, or an existing app you are adding Tailwind to. Nuxt has a couple of path-resolution specifics, which are covered on the Nuxt page.',
  },
  {
    question: 'Are the Vue components the same as the React ones?',
    answer:
      'Same components, same visual output, idiomatic to each framework. React uses Radix primitives and props; Vue uses Reka UI with v-model and emits where that is the natural Vue pattern. A handful of items exist in one framework only — the components page marks which.',
  },
  {
    question: 'Is there a Vue chart library included?',
    answer:
      'Yes. Vue charts are built on ECharts via vue-echarts, covering 14 chart types including funnel, treemap, sankey and heatmap. The React side uses Recharts. Both sit behind a shared authoring API so annotations and toolbars work the same way.',
  },
]

export function VueUiComponents() {
  return (
    <SeoArticleLayout
      eyebrow="Vue 3"
      title="Vue UI Components"
      lede="Most of the component libraries people write about are React-only. BoldKit ships a full Vue 3 registry — the same components, installed with the shadcn-vue CLI, landing in your repo as .vue files you own."
      accent="#42B883"
      updated="August 2026"
      toc={TOC}
      seo={{
        title: `Vue 3 UI Components — ${COUNTS.components}+ shadcn-vue Compatible | BoldKit`,
        description:
          `Free neubrutalism UI components for Vue 3 and Nuxt. ${COUNTS.components}+ components, ${COUNTS.charts} chart types and ${COUNTS.shapes} shapes, installed via the shadcn-vue CLI and built on Reka UI. MIT licensed.`,
        canonical: `${SITE_URL}/vue-ui-components`,
        keywords:
          'vue ui components, vue 3 component library, shadcn vue, shadcn-vue components, vue tailwind components, reka ui components, vue neubrutalism, free vue ui library',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Vue UI Components' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="answer" title="The short answer">
        <p>
          BoldKit is a <strong>shadcn-vue compatible registry</strong>. You install components with
          the shadcn-vue CLI, they arrive as Vue single-file components in your own{' '}
          <code>components/ui/</code> directory, and from that moment they are your code — no runtime
          dependency, no version to chase.
        </p>
        <Callout title="One line to try it" tone="#42B883">
          <code>npx shadcn-vue@latest add &quot;https://boldkit.dev/r/vue/button.json&quot;</code>
        </Callout>
        <p>
          Under the hood the interactive components are built on <strong>Reka UI</strong> — the same
          headless primitive layer shadcn-vue uses — so keyboard behaviour, focus management and ARIA
          come from a maintained accessibility library rather than hand-rolled markup.
        </p>
      </Section>

      <Section id="install" title="Install in 60 seconds">
        <p>Assuming a Vue 3 project with Tailwind already configured:</p>
        <ol className="ml-4 list-decimal space-y-2">
          <li>
            <strong>Add the theme</strong> — the CSS variables everything else reads from:
            <br />
            <code>npx shadcn-vue@latest add &quot;https://boldkit.dev/r/vue/styles.json&quot;</code>
          </li>
          <li>
            <strong>Add components as you need them</strong> — dependencies resolve automatically:
            <br />
            <code>npx shadcn-vue@latest add &quot;https://boldkit.dev/r/vue/dialog.json&quot;</code>
          </li>
          <li>
            <strong>Import and use</strong> — they are ordinary local components:
            <br />
            <code>import Button from &apos;@/components/ui/Button.vue&apos;</code>
          </li>
        </ol>
        <Callout title="No Tailwind yet?" tone="#42B883">
          Run the shadcn-vue init first (<code>npx shadcn-vue@latest init</code>) to set up Tailwind
          and the path aliases, then come back to step 1. BoldKit uses the standard shadcn-vue project
          layout, so anything the official docs say about aliases applies unchanged.
        </Callout>
      </Section>

      <Section id="catalogue" title="What you get">
        <DataGrid
          headers={['Category', 'Count', 'Examples']}
          rows={[
            [`Components`, `${COUNTS.components}+`, 'Dialog, Combobox, Data Table, Command, Sidebar, Tour, Date Range Picker, Input OTP'],
            [`Charts`, `${COUNTS.charts}`, 'Area, Bar, Line, Pie, Donut, Radar, Gauge, Sparkline, Funnel, Treemap, Sankey, Heatmap'],
            [`Shapes`, `${COUNTS.shapes}`, 'Badges, arrows, blobs, stars, geometric and decorative SVGs'],
            [`Blocks`, `${COUNTS.blocks}`, 'Hero, pricing, FAQ, testimonials, auth forms, settings, dashboard layout'],
            [`Templates`, `${COUNTS.templates}`, 'Landing page, docs, portfolio'],
          ]}
        />
        <Callout title="Honest scope note" tone="#FF6B35">
          Components, charts and shapes are <strong>registry-installable</strong> via the CLI. Blocks
          and templates are <strong>copy-paste from their docs pages</strong> — they are not registry
          items in either framework. Vue currently ships 3 of the {COUNTS.templates} templates; the
          rest are React-only for now.
        </Callout>
      </Section>

      <Section id="how-it-works" title="How the Vue registry works">
        <p>
          A registry is just JSON served over HTTP. Each item lists its files, its npm dependencies and
          its registry dependencies, and the CLI resolves the graph before writing anything to disk.
        </p>
        <ul className="ml-1 space-y-2">
          <li><strong>Components</strong> land in <code>components/ui/</code> as <code>.vue</code> files.</li>
          <li><strong>Composables</strong> (<code>useMotion</code>, <code>useTheme</code>) are their own registry items so they can be shared without duplication.</li>
          <li><strong>Utilities</strong> like <code>cn()</code> go to <code>lib/utils.ts</code>, matching shadcn-vue convention.</li>
          <li><strong>Stylesheets</strong> are pulled in as siblings when a component needs keyframes that Tailwind cannot express.</li>
        </ul>
        <p>
          Because it is plain JSON at a stable URL, you can also vendor it: fetch the item, commit the
          files, and you have a fully offline build with no network step in CI.
        </p>
      </Section>

      <Section id="charts" title="Charts on Vue">
        <p>
          Charts are usually where cross-framework libraries give up, because the underlying chart
          engines differ. BoldKit uses <strong>ECharts</strong> on Vue (via <code>vue-echarts</code>)
          and <strong>Recharts</strong> on React, then puts a shared authoring layer on top so the
          things you actually write stay the same:
        </p>
        <ul className="ml-1 space-y-2">
          <li><strong>Annotations</strong> — <code>referenceLine</code>, <code>callout</code> and <code>arrow</code> objects author identically and map to each engine&rsquo;s native mechanism.</li>
          <li><strong>Toolbar</strong> — export to PNG or SVG, CSV download and fullscreen, on both.</li>
          <li><strong>Loading states</strong> — a shared <code>loading</code> prop renders a chart-shaped placeholder rather than a spinner.</li>
        </ul>
        <p>
          The two engines are not identical and this page will not pretend otherwise — deep ECharts or
          Recharts customisation still means writing engine-specific options. The shared layer covers
          the common cases, not every case.
        </p>
      </Section>

      <Section id="parity" title="React parity">
        <p>
          Both registries are generated from one source of truth, and the same audit scripts run over
          both. In practice that means a fix on one side lands on the other in the same release rather
          than drifting for months.
        </p>
        <p>Where the frameworks differ, BoldKit follows the local idiom rather than forcing symmetry:</p>
        <DataGrid
          headers={['Concern', 'React', 'Vue']}
          rows={[
            ['Primitives', 'Radix UI', 'Reka UI'],
            ['Two-way state', 'value + onChange', 'v-model'],
            ['Events', 'onSelect, onOpenChange', 'emits'],
            ['Charts', 'Recharts', 'ECharts'],
            ['Install CLI', 'npx shadcn@latest', 'npx shadcn-vue@latest'],
          ]}
        />
        <p>
          If you run both frameworks in one organisation — a Nuxt marketing site and a React app, say —
          this is the case the library was built for.
        </p>
      </Section>

      <Section id="gotchas" title="Gotchas worth knowing">
        <p>Things that will save you an afternoon, including a few we got wrong first:</p>
        <ul className="ml-1 space-y-2">
          <li>
            <strong>The Vue registry URL has <code>/vue/</code> in it.</strong> Using the React URL by
            mistake gives you <code>.tsx</code> files that will not compile.
          </li>
          <li>
            <strong>Nuxt resolves paths differently.</strong> Component targets must sit under a
            directory containing <code>components/ui</code> or Nuxt&rsquo;s auto-import produces
            doubled paths. See the Nuxt page.
          </li>
          <li>
            <strong>Reka UI v2 changed some prop names.</strong> If you are on an older Reka, pin
            before installing rather than after.
          </li>
          <li>
            <strong>Animated components need the motion stylesheet.</strong> It is declared as a
            sibling file so the CLI pulls it in — but if you vendored files by hand, copy it too or the
            animations are silently inert.
          </li>
        </ul>
      </Section>

      <CTABox
        title="Browse the Vue catalogue"
        body="Every component page has a Vue tab with a runnable example and the exact shadcn-vue install command. No signup, MIT licensed."
        href="/components"
        cta="Browse components"
        tone="#42B883"
      />

      <LinkCards
        items={[
          { to: '/nuxt-ui-components', label: 'Using Nuxt?', desc: 'Nuxt 3 and 4 setup, plus the path resolution specifics.' },
          { to: '/react-vue-component-library', label: 'One library, two frameworks', desc: 'How parity is kept between the React and Vue registries.' },
          { to: '/shadcn-alternatives', label: 'shadcn alternatives', desc: 'Where this sits next to shadcn-vue, Nuxt UI and Element Plus.' },
          { to: '/charts', label: 'Vue charts', desc: `All ${COUNTS.charts} chart types with live ECharts examples.` },
        ]}
      />
    </SeoArticleLayout>
  )
}
