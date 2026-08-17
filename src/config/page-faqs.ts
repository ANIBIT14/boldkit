// src/config/page-faqs.ts
// FAQ content for SEO landing pages, keyed by route path.
//
// Lives here rather than inside the page components because scripts/generate-html.ts
// runs in Node and cannot import .tsx. Keeping it importable from both sides is what
// lets the FAQPage JSON-LD be written into the STATIC html at build time instead of
// only being injected client-side — where no crawler reading the served markup ever
// saw it. No React imports in this file, same constraint as routes-meta.ts.

export interface PageFaq {
  question: string
  answer: string
}

export const PAGE_FAQS: Record<string, PageFaq[]> = {
  '/tools/extract-favicon': [
    {
      question: 'How do I download a favicon from a website?',
      answer:
        'The quickest way is FavGrab - paste the site’s URL and it fetches and lets you download every icon the page exposes. If you’d rather do it by hand, append /favicon.ico to the domain (e.g. https://example.com/favicon.ico) and save the file your browser loads.',
    },
    {
      question: 'Can I get a high-res favicon?',
      answer:
        'Often, yes. The /favicon.ico path usually returns a low-res 16/32px ICO, but many sites declare a much larger icon in their page <link> tags - view-source and look for apple-touch-icon (typically 180×180 PNG) or an SVG icon, which scales infinitely. FavGrab surfaces all of these so you can grab the largest one.',
    },
    {
      question: 'Is it legal to extract a favicon?',
      answer:
        'For research, references, your own bookmarks, or a links UI - yes, that’s normal fair use. A favicon is usually a trademarked brand logo, so what’s not OK is passing another brand’s icon off as your own or using it to impersonate them. Extract freely; just don’t misrepresent.',
    },
  ],

  '/tools/favicon-generator': [
    {
      question: 'What image size should I upload for a favicon?',
      answer:
        'Start from a square source image of at least 512×512 pixels. A larger square master downscales cleanly to every required size (16, 32, 180, 192, 512). Avoid uploading a small or non-square image - upscaling produces blurry icons.',
    },
    {
      question: 'Do I still need a favicon.ico file?',
      answer:
        'Yes, as a fallback. Modern browsers prefer PNG and SVG icons, but a multi-resolution favicon.ico (16/32/48) is still the safest default for older browsers and some crawlers. A good generator outputs both.',
    },
    {
      question: 'Is FavGrab free?',
      answer:
        'Yes. FavGrab is a free in-browser tool from the BoldKit team for extracting favicons from any website and converting images between favicon formats - no signup required.',
    },
  ],

  '/tools/favicon-sizes': [
    {
      question: 'What favicon sizes do I need in 2026?',
      answer:
        'A small set covers everything: a multi-resolution favicon.ico (16/32/48), a 32×32 PNG, an apple-touch-icon at 180×180, and 192×192 plus 512×512 PNGs for PWA/Android. Add an icon.svg for crisp vector rendering and you are done - there is no need for 20+ separate files.',
    },
    {
      question: 'What size is the Apple touch icon?',
      answer:
        'The apple-touch-icon is 180×180 pixels. iOS uses it for the home-screen icon when someone adds your site to their home screen. Export it as a PNG with no transparency - give it a solid background, because iOS fills transparent pixels with black.',
    },
    {
      question: 'Do I need a 512px icon?',
      answer:
        'Yes, if you ship a web app manifest. The 512×512 PNG is required for the PWA install prompt and the Android splash screen; the 192×192 covers the home-screen icon. Skip the 512 and installable PWAs lose their high-resolution install and splash artwork.',
    },
  ],

  '/mcp-ui-components': [
    {
      question: 'What is an MCP server for UI components?',
      answer:
        'Model Context Protocol is an open standard that lets AI coding agents call external tools. An MCP server for a component library exposes search and install operations, so instead of guessing component names from training data, the agent queries the real catalogue and gets back accurate names, dependencies and install commands.',
    },
    {
      question: 'How do I add BoldKit to Claude Code or Cursor?',
      answer:
        'Add @boldkit/mcp as an MCP server in your client config, pointing at npx -y @boldkit/mcp. It runs over stdio and needs no API key or account. Claude Code, Cursor, Windsurf and any other MCP-capable client use the same package.',
    },
    {
      question: 'Does the agent write files to my project?',
      answer:
        'Only if you ask it to. Searching and getting an install command are read-only. There is a separate install tool that shells out to the shadcn or shadcn-vue CLI in a directory you specify — that one writes files, and your client will normally ask for approval first.',
    },
    {
      question: 'Does it detect React vs Vue automatically?',
      answer:
        'Yes. It walks up from the directory you point it at to the nearest package.json and looks for nuxt, vue or reka-ui first, then next or react, and picks the matching registry. You can override it explicitly if the detection guesses wrong in a monorepo.',
    },
  ],

  '/neubrutalism': [
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
  ],

  '/neubrutalism/colors': [
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
  ],

  '/neubrutalism/examples': [
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
  ],

  '/neubrutalism/fonts': [
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
  ],

  '/neubrutalism/vs-brutalism': [
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
  ],

  '/nuxt-ui-components': [
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
  ],

  '/tools/png-to-ico': [
    {
      question: 'Can I convert PNG to ICO online for free?',
      answer:
        'Yes. FavGrab is a free in-browser tool from the BoldKit team that converts a PNG into a multi-resolution favicon.ico - no upload, no signup, and your image never leaves your machine because the conversion runs entirely in the browser.',
    },
    {
      question: 'What size PNG do I need?',
      answer:
        'Start from a square PNG of at least 256×256 pixels, ideally 512×512. A larger square master downscales cleanly to the 16, 32 and 48px frames packed inside the .ico. A small or non-square source upscales badly and produces a blurry icon.',
    },
    {
      question: 'Do I still need ICO in 2026?',
      answer:
        'Yes, as a fallback. Modern browsers prefer PNG and SVG icons, but a multi-resolution favicon.ico (16/32/48) at your site root is still the safest default for older browsers and some crawlers. Ship favicon.ico alongside PNG/SVG and you cover everything.',
    },
  ],

  '/react-vue-component-library': [
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
  ],

  '/shadcn-alternatives': [
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
  ],

  '/tools': [
    {
      question: 'Are BoldKit tools free?',
      answer:
        'Yes - every tool listed here is completely free with no signup, no account, and no upload limits. They run in your browser as part of the open-source BoldKit project, so there is nothing to pay for and nothing to install.',
    },
    {
      question: 'Do I need an account for FavGrab?',
      answer:
        'No. FavGrab runs entirely in your browser - favicon extraction and image conversion happen client-side, so your images never leave your machine. There is no login, no email, and no usage cap.',
    },
    {
      question: 'Can I use these tools commercially?',
      answer:
        'Yes. BoldKit and its tools are free under the MIT license. Anything you generate - favicons, pixel art, themes, shapes, canvas backgrounds - is yours to use in commercial and client work with no attribution required.',
    },
  ],

  '/vue-ui-components': [
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
  ],
}
