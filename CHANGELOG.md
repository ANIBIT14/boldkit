# Changelog

All notable changes to BoldKit are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [3.4.8] — 2026-07-19 — Platform/DX: MCP server, CLI & WCAG matrix

The v3.7.0 Platform/DX milestone, shipped early: install BoldKit from an AI agent or the terminal, and a published per-component accessibility matrix.

### Features

🤖 **`@boldkit/mcp` — MCP server** (new package, `packages/mcp`). Lets Claude Code, Cursor, or any MCP client install components by natural-language description — for **both React and Vue**. Five tools: `search_components` (scored keyword search over a build-time catalog of all 114 registry items), `get_component`, `get_install_command`, `install_components` (shells out to `shadcn` / `shadcn-vue` — no reimplemented resolvers), and `list_components`. Framework auto-detected from the target project's package.json. Setup: `claude mcp add boldkit -- npx -y @boldkit/mcp`.

⌨️ **`boldkit` CLI** (new package, `packages/cli`). `npx boldkit add button card`, `npx boldkit search "toast"`, `npx boldkit list` — auto-detects React vs Vue, maps names to hosted registry URLs, delegates the install to the right shadcn CLI. `--react`/`--vue`/`--dry-run` flags. Shares its core with `@boldkit/mcp`.

📊 **Published WCAG AA matrix at `/accessibility`.** Per-component axe-core results generated from the real CI test run (not a hand-maintained table), rendered as a matrix with honest "not yet automated" gaps. Raw data at `/a11y-report.json`. New `/docs/mcp` page documents the MCP server + CLI.

### Fixes

🐛 **Rating had a nested-interactive violation (React + Vue).** The `role="slider"` container (focusable) wrapped focusable star buttons — axe `nested-interactive`. Rating is now a `role="group"` of toggle buttons with a roving tabindex and `aria-pressed` state; the group label announces the current value and arrow keys still work via bubbled keydown. Caught by the new matrix generation.

### Tooling & quality

✅ **a11y coverage 19 → 30 components** (adds kbd, spinner, skeleton, stat-card, toggle, sticker, marquee, tag-input, rating, pagination, label); fixtures extracted to `src/test/a11y-fixtures.tsx` and the suite now emits the a11y report consumed by `/accessibility`.

🏗 **Monorepo:** root package renamed `boldkit-site` (private) so the CLI package owns the `boldkit` npm name; workspaces now `vue` + `mcp` + `cli`; `registry:build` gained a final `build-mcp-catalog` step so the MCP catalog can never go stale. _npm publish of `boldkit` + `@boldkit/mcp` is a separate manual step (scope ownership to verify)._

### Bumps

- React: `3.4.7 → 3.4.8`
- New: `@boldkit/mcp 0.1.0`, `boldkit` (CLI) `0.1.0`

---

## [3.4.7] — 2026-07-18 — Codebase audit: SSR, a11y, tests & theme presets

A prioritized audit pass — fixing correctness/DX findings and shipping installable theme presets.

### Fixes

🐛 **Vue `useTheme` crashed under SSR (Nuxt).** The provider's `watch(theme, …, { immediate: true })` touched `window.document` during `setup`, which runs on the server — a `ReferenceError` before hydration. Both the provider watcher and the fallback `updateTheme` now bail when `window` is undefined. Ships in the `use-theme` registry item.

🐛 **Slider thumb had no accessible name (React + Vue).** The custom Slider spread `aria-label` onto the wrapper `<div>`, not the `role="slider"` thumb, so screen readers announced an unnamed slider (axe: `aria-input-field-name`). `aria-label` / `aria-labelledby` now forward to the thumb; the Vue thumb also gained `aria-valuetext` for parity. Surfaced by the expanded a11y suite.

### Tooling & quality

✅ **Vue now has automated tests.** Added Vitest + Vue Test Utils to `@boldkit/vue` (previously zero coverage) with a baseline for `useThemeProvider`/`useTheme` (incl. the SSR regression), `useIsMobile`, and `Button`. Wired into CI.

✅ **a11y coverage 7 → 19 components.** Extended the axe suite to Tabs, RadioGroup, Select, Slider, Progress, Textarea, Accordion, Table, Breadcrumb, Avatar, Separator, and ToggleGroup.

✅ **CI now verifies the full delivery pipeline.** New `build:ci` step runs typegen + `vite build` + `registry:build` + SSG (skips the SEO-only prerender), so registry/build breakage can no longer ship green.

🧹 **Repo hygiene.** Removed a stray untracked `package-lock.json` and gitignored non-bun lockfiles (repo is bun-only); deleted two dead, unreferenced scripts (`generate-examples.js`, `migrate-doc-sources.ts`).

### Features

🎨 **Theme presets ship as CSS-vars-only swaps.** The 14 builder presets are now emitted to `public/themes/<slug>.css` (+ `index.json`) at build time from a shared source (`src/config/theme-presets.ts`), with a per-preset download in the Theme Builder. Drop a file into your `globals.css` to reskin. _Note: presets swap primary/secondary/accent over BoldKit's default neutrals — full per-preset neutral palettes are a later design pass._

### Bumps

- React: `3.4.6 → 3.4.7`
- Vue: `3.2.6 → 3.2.7`

---

## [3.4.6] — 2026-07-14 — Vue components all build on Nuxt

Installing and building the **entire** Vue library in a real Nuxt 4 project surfaced latent SFC compile errors — components BoldKit's own app never compiled (unused ones are tree-shaken, and `vue-tsc` doesn't enforce these compiler-only rules).

### Fixes

🐛 **`<script setup>` cannot contain ES module exports.** Eight components declared an injection-key `export const … = Symbol()` inside `<script setup>`, which fails the consumer's build: **Carousel, Dropzone, ChartContainer, ToggleGroup, Timeline, SidebarProvider, Stepper, StepperItem**. Each injection key (and any cross-imported context type) now lives in a paired `<script>` block.

🐛 **`GaugeChart` — `defineProps()` cannot reference a local variable.** `withDefaults` referenced a setup-local `DEFAULT_ZONES`, which gets hoisted out of `setup()`. Moved `DEFAULT_ZONES` + `GaugeChartZone` to module scope.

Verified end-to-end: all **364** components compile in a single Nuxt 4 build, `vue-tsc` clean.

### Bumps

- React: `3.4.5 → 3.4.6`
- Vue: `3.2.5 → 3.2.6`

---

## [3.4.5] — 2026-07-13 — Nuxt compatibility, motion a11y & SEO prerender

Makes BoldKit install cleanly on **Nuxt 4** (verified end-to-end in a real project), plus an animation-audit pass and a docs-site SEO upgrade.

### Fixes

🐛 **Nuxt / srcDir component resolution (#10).** The Vue registry pinned every file to a hardcoded `components/ui/…` target, which shadcn-vue resolves relative to the project root — so on Nuxt 4 (where `@/` → `app/`) files installed to `./components/ui` while imports pointed at `./app/components/ui`. Files now ship without hardcoded targets and place under whatever your aliases resolve to.

🐛 **Alias-relative registry paths (#10).** `@boldkit/utils` (and other lib/composable items) mis-installed to `app/lib/default/lib/utils.ts` when added alongside a component, because the `registry/default/` path prefix collapsed the CLI's common-root computation. Paths are now alias-relative (`components/ui/…`, `lib/…`, `composables/…`), matching upstream shadcn-vue. Verified live on Nuxt 4.

🐛 **Docs showed a barrel import that doesn't exist (#10).** Every Vue usage example used `import { Button } from '@/components/ui'`, but the registry ships individual `.vue` files with no barrel — so consumers copying the docs hit "cannot find module". All 66 pages now show per-file default imports.

🩹 **Vue `ui` barrel synced with disk** (internal); **Nuxt `componentDir` docs** added for auto-import.

### Motion (React + Vue)

♿ **Universal `prefers-reduced-motion` guard** added to the shipped theme — hand-rolled `transition-all` hover effects now honor reduced-motion.
⚡ **`transition-all` → scoped `transition`** everywhere (verified zero visual change).
🎯 **Overlays scale from their trigger**, not center (Radix/Reka transform-origin vars).
⌨️ **Command palette fades** instead of zooming (high-frequency ⌘K).

### Docs site

🚀 **Route prerendering** — every docs route now ships fully-rendered HTML for crawlers and JS-less AI crawlers, instead of an empty `#root`.

### Bumps

- React: `3.4.4 → 3.4.5`
- Vue: `3.2.4 → 3.2.5`

---

## [3.4.4] — 2026-07-06 — Chart export fidelity & fullscreen fixes

Patch fixes for the `<ChartToolbar>` shipped in 3.4.3, across React and Vue.

### Fixes

🐛 **PNG / SVG export now downloads the chart, not a toolbar icon.** The export grabbed the container's first `<svg>` — which was a toolbar *button icon*, not the chart — so downloads came out as a tiny glyph. It now skips the toolbar controls and serializes the actual chart.

🐛 **Exports keep their colors in every viewer.** A chart's colors come from CSS variables (`hsl(var(--primary))`) and external stylesheets, neither of which survive serialization. The export now resolves each element's *computed* style to concrete colors and writes them as presentation **attributes** (not just inline style) plus an opaque white backdrop — so Preview, Quick Look, Illustrator, and browsers all render the real chart, not a colorless outline.

🐛 **Fullscreen no longer leaves a black gap.** A fullscreened chart kept its fixed height, letting the browser's black backdrop show through below it. The container now takes the page background and lays the chart out with a definite height (`flex: 1`), so Recharts' `ResponsiveContainer` and ECharts' `autoresize` grow to fill — no black bars.

🩹 **Crisper canvas exports.** ECharts (canvas) PNGs are composited onto white so a transparent chart background doesn't export as black.

### Bumps

- React: `3.4.3 → 3.4.4`
- Vue: `3.2.3 → 3.2.4`

---

## [3.4.3] — 2026-07-06 — Vue Motion parity, chart export toolbar & CI

A parity-and-foundation release. The headline: the **Vue `<Motion>` adapter** promised in 3.4.2 now ships, closing the last framework gap in the motion system. Alongside it, a new **chart export toolbar** for both frameworks, real **CI**, automated **accessibility** tests, and repo cleanup.

### Highlights

✨ **Vue Motion adapter — parity with React.** `<Motion>`, `<Reveal>`, and `<Stagger>` components plus `useShake` / `useViewTransition` composables now ship for Vue, wrapping the same framework-agnostic `motion-core`. New Vue registry items `motion` + `motion-core` mirror the React `motion-core` / `motion-react` split. The full six-recipe motion language is now identical across React and Vue.

✨ **Chart export toolbar (React + Vue).** New `<ChartToolbar>` wraps any chart with a brutalist overlay to export **PNG**, **SVG**, or **CSV**, and toggle **fullscreen**. Engine-agnostic — it reads the wrapped `<svg>` (Recharts) or `<canvas>` (ECharts), so one shared `chart-export` core drives both frameworks. Registry items: `chart-export` + `chart-toolbar`.

♿ **Automated accessibility.** `axe-core` now runs in the test suite over core components (Button, Input, Label, Badge, Alert, Card, Checkbox, Switch), so a11y regressions fail CI instead of waiting for a manual audit.

🩹 **Continuous integration.** A real CI pipeline (lint + React `tsc` + Vue `vue-tsc` + tests + registry audit) replaces the old React-Native-only workflow.

🧹 **Removed the phantom `react-native` package.** It carried no source — only an Expo example and committed build cache — and is now deleted. `.gitignore` hardened against Expo/Android/iOS build artifacts.

### Docs

- New live docs at **`/components/chart-toolbar`** (React demo + Vue snippets).
- Vue `<Motion>` examples on **`/components/motion`** are now backed by a real, installable adapter.

### Notes

- No breaking changes. All existing React and Vue components are untouched.
- Vue Motion installs via `npx shadcn-vue@latest add @boldkit/motion` (pulls `motion-core` transitively).

### Bumps

- React: `3.4.2 → 3.4.3`
- Vue: `3.2.2 → 3.2.3`

---

## [3.4.2] — 2026-06-18 — Motion system + buttery component retrofit

The signature **"hard look, buttery feel"** release. Neubrutalism's reputation is harsh and static — this patch keeps the hard visual language (3px borders, 4px offset shadows, sharp corners) but gives every interaction a premium, settled motion so the kit *feels* world-class to use.

### Highlights

✨ **Motion system (React).** New `motion`, `motion-core`, and `motion-react` registry items. A framework-agnostic, zero-runtime CSS core (`--bk-*` tokens, canonical keyframes, a reduced-motion guard) drives six signature recipes — `press`, `stamp-in`, `shake`, `reveal`, `slide-hard`, `pulse-shadow` — exposed through `<Motion>`, `<Reveal>`, `<Stagger>` components plus `useShake` / `useViewTransition` hooks. SSR-safe. Live docs at `/components/motion`.

✨ **Buttery retrofit, by default (React + Vue).** Button, Card, Input, Toggle, and Switch now route their press/hover/focus through a shared `.bk-interactive` timing on a new **snap** easing curve — the chunky shadow-collapse *settles* with a small overshoot instead of a flat slide. Easing is split: overshoot applies only to `transform`/`box-shadow`, while colour/border/opacity stay on a smooth `ease-out` (no hover flicker).

🩹 **`.bk-press` press choreography.** Animates `transform` + a hard offset `box-shadow` (composes correctly with a background colour), replacing an earlier pseudo-element approach that could invert under the hover transform.

♿ **Reduced-motion throughout.** Every recipe and the `.bk-interactive` timing collapse to near-instant under `prefers-reduced-motion: reduce`; reveals show their content immediately.

### Notes

- The Vue **`<Motion>`/`<Reveal>` adapter** is not in this release — the buttery **retrofit** ships for Vue now; the Vue adapter components follow in a focused update.

### Bumps

- React: `3.4.1 → 3.4.2`
- Vue: `3.2.1 → 3.2.2`

---

## [3.4.1] — 2026-06-10 — Custom easing system + docs Theming fix

A motion-polish + docs fix patch. Every transition and animation in BoldKit now runs on a **custom easing system** based on the [animations.dev](https://animations.dev/learn/animation-theory/the-easing-blueprint) easing blueprint — the browser's built-in `ease-out` / `ease-in-out` curves are too weak to read as "snappy" on hard neubrutalist surfaces, so they're replaced with stronger custom `cubic-bezier` curves. Applied identically across **React and Vue 3**.

### Highlights

✨ **Custom easing tokens.** New `--ease-out` (out-quart), `--ease-in-out` (in-out-cubic), and `--ease-in` design tokens in `@theme`, plus a named scale (`--ease-out-quad…expo`, `--ease-in-out-quad…quint`) sorted weakest→strongest. `--default-transition-timing-function` is now `ease-out`, so every `transition-*` utility gets responsive motion for free.

✨ **Every animation retrofitted.** ~37 keyframe animations per stylesheet (accordion, collapsible, bounce, pop, shake, wiggle, jello, etc.) now reference the easing tokens. Continuous `linear` motion (marquee, spin) and the caret blink are intentionally left untouched.

🩹 **Overlays animate with intent.** All 16 React + 18 Vue overlay components (Popover, Dialog, Dropdown, Tooltip, Sheet, Select, Menubar, Context Menu, Hover Card, Command, Tour, …) now apply the custom `ease-out` curve on enter/exit instead of falling back to the browser default.

🐛 **Docs "Theming" opens the full Theme Builder.** The Theming entry in the docs sidebar was rendering the Theme Builder embedded in the narrow docs column, where it didn't lay out fully. It now opens the standalone full-width `/themes` page in a new tab.

### Bumps

- React: `3.4.0 → 3.4.1`
- Vue: `3.2.0 → 3.2.1`

---

## [3.4.0] — 2026-06-08 — 9 new components + Vue parity

Closes the longest-standing gap against the shadcn component set: BoldKit now ships every classic Radix/Reka primitive. **Nine new components**, each with full React **and** Vue 3 parity, installable via the registry. Plus a manifest-driven docs refactor and a batch of UI fixes surfaced while building them.

### Highlights

✨ **Four classic primitives, finally.** **Context Menu** (right-click menus), **Menubar** (desktop-style app toolbars), **Navigation Menu** (site nav with dropdown panels), and **Resizable** (draggable split panes / dashboard layouts) — neubrutalized over Radix (React) and Reka UI (Vue). These were the only standard shadcn components BoldKit didn't have.

✨ **Five form/layout adds.** **Button Group**, **Input Group** (inputs with leading/trailing addons), **Field** (label + control + description + error composition), **Native Select** (a11y-first styled `<select>`), and a single **Date Picker** (button → calendar popover) to complement the existing Date Range Picker.

✨ **Full Vue 3 parity for all nine.** Every new component ships matching Reka UI implementations and `r/vue/*.json` registry entries — no "coming soon" placeholders.

🐛 **Resizable vertical panels no longer collapse.** `react-resizable-panels` sets an inline `height:100%` that overrides a `h-*` class; demos and docs now use `min-h-*` (the documented pattern) so vertical groups size correctly. The npm dep is pinned to `react-resizable-panels@^2.1.0` so consumers get the matching API.

🐛 **Navigation Menu dropdown renders reliably.** Reworked to render its panel in place (the Radix viewport's measured-height mechanism was collapsing the panel to zero).

🩹 **Date Range Picker presets restyled** as proper neubrutalist buttons (hard border + shadow + press), and the single **Date Picker** now correctly tracks a controlled `value`.

### Internals

- **Docs routes are now manifest-driven.** `src/config/component-docs.tsx` is the single source for every component/block doc route; `App.tsx` maps over it (shrank from 336 → ~165 lines). Adding a component is a one-line entry.
- New components are registered in the command palette (⌘K) search and the sitemap + `llms-full.txt`.
- `ComponentDoc` gained an opt-in `previewClassName` (used to give the Navigation Menu preview headroom for its open dropdown).

### Bumps

- React: `3.3.9 → 3.4.0`
- Vue: `3.1.9 → 3.2.0`

---

## [3.3.9] — 2026-05-29 — Next.js + Tailwind v4 compatibility

Three install-time bugs reported against v3.3.8 — all in the path between BoldKit's docs/registry and a fresh Next.js + Tailwind v4 + shadcn project. None affect existing Vite users.

### Highlights

🩹 **`import.meta.env.DEV` no longer breaks Next.js builds** (#8). Five components emitted Vite-only `import.meta.env.DEV` reads — fine under Vite, fatal under `next build` because Next.js does not type `ImportMeta.env`. Replaced with `process.env.NODE_ENV === 'development'` everywhere (works in both Vite and Next): React `ErrorBoundary`, `Tour`, `Slider`, `SankeyChart`, `Invoice` block, and the Vue `ErrorBoundary` (hoisted to an `isDev` const so the template binding stays SSR-safe). Registry JSONs regenerated.

🩹 **Theme Builder now emits a Tailwind v4 `@theme` bridge** (#7). The generator at `/theme-builder` shipped only `:root { --background: 60 9% 98%; }` etc. — raw HSL channels with no `--color-*` mapping. Pasted into a Tailwind v4 + shadcn project that expects `--color-background: var(--background)`, the utilities resolved to `background-color: 60 9% 98%` (invalid). Generator now prepends a full `@theme { --color-background: hsl(var(--background)); … }` block matching the shipped registry styles, plus the `--radius-sm/md/lg/xl` shorthands. Every preset funnels through `generateCSS()`, so all themes inherit the fix.

🩹 **Registry alias docs use the `{name}.json` template** (#9). shadcn 4.x requires the templated item URL in the `registries` map — BoldKit's install docs showed `"@boldkit": "https://boldkit.dev/r"` (and Vue `…/r/vue`), which fails to resolve `@boldkit/button`. Updated Installation page, Introduction page (both copy-buttons), and README to:
- React: `https://boldkit.dev/r/{name}.json`
- Vue: `https://boldkit.dev/r/vue/{name}.json`

### Internals

- `tsconfig.app.json` now includes `"node"` in `types` and adds `@types/node` to devDeps — required so the new `process.env.NODE_ENV` reads type-check under BoldKit's own `tsc -b`. Downstream Next.js users already have these via Next.

### Bumps

- React: `3.3.8 → 3.3.9`
- Vue: `3.1.8 → 3.1.9`

---

## [3.3.8] — 2026-05-29 — Registry recheck + chart family fix

A follow-up stability pass after a full source-vs-registry recheck. **36 install-breakers** that were silently shipping in v3.3.7 — caught by extending the audit script to cover relative imports, fixed in this release.

### Highlights

🩹 **React chart family is installable.** All 9 standalone chart entries (`donut-chart`, `radar-chart`, `radial-bar-chart`, `gauge-chart`, `sparkline`, `funnel-chart`, `treemap-chart`, `heatmap-chart`, `sankey-chart`) shipped with install targets at `components/ui/chart/<name>.tsx` while their relative `./chart` import resolved to a path nothing shipped. Flattened all chart targets to `components/ui/<name>.tsx` so `./chart` correctly hits the base `chart` entry. Added missing `@boldkit/chart` registryDep to the four entries that import `./empty`.

🩹 **8 Vue entries had missing `registryDependencies` or stale file lists.** `alert-dialog`, `calendar`, `pagination` now declare `button` (each imports `./button-variants`). `toggle-group` declares `toggle`. `dropzone` declares `progress` + `spinner`. `stat-card` declares `card` + `progress`. `empty-state` and `layered-card` now ship their `-variants.ts` sibling. `pagination` and `dropdown-menu` had stale `files:` lists referencing components that don't exist on disk — corrected.

🩹 **20 Vue shapes were missing from the registry.** `SHAPE_FILES` had drifted 20 entries behind the 55 on disk. Replaced with disk auto-discovery so any new shape ships automatically: Apple, Crescent, Decagon, Ellipse, FibonacciSpiral, Gear, Heptagon, KochSnowflake, MobiusStrip, PenroseTriangle, Planet, Rainbow, Rhombus, Seal, Star6, Sun, Torus, Trefoil, Umbrella, WavyRectangle.

✨ **Vue parity for `ascii-shapes` and `error-boundary`.** Both existed on the React side but had no Vue install path. ASCII Shapes now ship all 17 components + constants via a new subdirectory codepath. ErrorBoundary now has a Vue equivalent using `onErrorCaptured` with the same neubrutalism fallback UI; published as `r/vue/error-boundary.json`.

✨ **New `/components/error-boundary` docs page.** Framework-switched preview/code/install with a live "Trigger error" demo button. Sidebar entry + Installation page entry added.

🐛 **Blocks page no longer shows broken install commands.** All 15 block cards were displaying `npx shadcn add boldkit.dev/r/<block>.json` commands that 404'd — the block registry entries don't exist (blocks remain copy/paste-grade). Removed the install bar UI. Each block doc page now has React + Vue "View on GitHub" source links via a new `sourcePaths` prop on `BlockDoc`.

### Internals — new permanent guard

`scripts/audit-registry-imports.mjs` was previously blind to relative imports — only checked `from '@/...'` aliases. Extended to resolve `from './x'` and `from '../x'` against each file's install target, verifying the resolved path is shipped by the same entry or by a declared registryDependency. That single change exposed all 36 issues above in one audit run.

### Bumps

- `package.json`: 3.3.7 → 3.3.8
- `packages/vue/package.json`: 3.1.7 → 3.1.8
- README badge: 3.3.7 → 3.3.8

---

## [3.3.7] — 2026-05-26 — Registry health pass

A focused stability release that fixes install-time failures consumers have been hitting and adds permanent guards so the same classes of bug can't silently return.

### Highlights

🩹 **`@boldkit/*` install path now works end-to-end.** Cross-component deps (`button`, `utils`, `math-curves`, etc.) were resolving against shadcn's default registry instead of BoldKit's. All 74 references across React + Vue are now properly scoped.

🩹 **Vue `math-curve-*` family is installable.** `MathCurveLoader`, `MathCurveProgress`, `MathCurveBackground`, and the shared `math-curves` engine were missing from `shadcn-vue` entirely. Now registered.

🩹 **Chart components ship current source.** React chart-X files synced from `src/components/ui/chart/` with import rewriting. Vue chart entries now bundle `ChartEmpty.vue` and `chart-types.ts` so installs compile.

🩹 **37 UI mirrors caught up with `src/`.** Months of bug fixes (focus-visible, ARIA attrs, edge cases) and security helpers (`safeHref`, `sanitizeCssValue`) had never reached the registry. `rating.tsx` registry was an entirely different implementation from src.

✨ **Two new `MathCurveLoader` curves.** `spiral` and `heart`, both already in the runtime — TypeScript just needed widening.

🐛 **`/components/sidebar` no longer crashes.** Active-state demo was missing its `<SidebarProvider>` wrapper.

### ⚠️ Required setup (positive break)

Add the `@boldkit` alias to your `components.json`:

```json
{
  "registries": {
    "@boldkit": "https://boldkit.dev/r"
  }
}
```

(Vue: `https://boldkit.dev/r/vue`.)

Then install components as:

```bash
npx shadcn@latest add @boldkit/button @boldkit/card
# or for Vue
npx shadcn-vue@latest add @boldkit/button @boldkit/card
```

Single-file installs of leaf items (`utils`, `styles`) still work via direct URL, but **any component with cross-deps requires the alias.**

### Internals — drift can't recur

New `scripts/sync-registry-from-src.js` runs as a pre-step in `registry:build`. It copies `src/components/ui/*.tsx` and selected libs into `registry/default/` and self-verifies — if any in-scope mirror still drifts after sync, the build fails. This protects against the silent-drift class of bug going forward.

### Commits

- `2f68fd1` registry: scope cross-references with `@boldkit/` namespace
- `86397c2` registry+docs: finish scoping pass, fix build order, update install docs
- `9b70d71` registry: migrate 6 hand-written Vue entries into build script
- `2c016b0` math-curves: add `spiral` + `heart` to `LoaderCurveKey`
- `f9151fa` registry: close Vue math-curve gap + sync 37 drifted React mirrors
- `b74270f` registry: chart family drift — sync React, complete Vue bundling
- `de251ec` docs: wrap Active State sidebar demo in `SidebarProvider`

**Full diff:** [`v3.3.6...v3.3.7`](https://github.com/ANIBIT14/boldkit/compare/v3.3.6...v3.3.7)

---

## [3.3.2] — 2026-05-09

### 🐛 Bug Fixes

**React UI Components**
- `carousel.tsx` — Use snap position as key in `CarouselDots` instead of array index
- `chart/sankey-chart.tsx` — Replace non-null `!` assertions on Map lookups with `?? 0` safe fallbacks; guard `ResizeObserver` callback with `mountedRef` to prevent state updates after unmount
- `chart/tooltip.tsx` — Guard `toLocaleString()` with `Number.isFinite` before calling on `item.value`
- `chart/donut-chart.tsx` — Consistently use `pieView.cx/cy` inside the typed cast block
- `chart/heatmap-chart.tsx` — Clamp tooltip position to viewport bounds to prevent off-screen rendering
- `data-table.tsx` — Use `String()` instead of unsafe `as string` cast on filter value
- `math-curve-background.tsx` — Add `strokeWidth` to `useEffect` dependency array
- `date-range-picker.tsx` — Replace string-format date comparison with `isSameDay` from date-fns
- `input-otp.tsx` — Add optional chaining `slots?.[index]` to guard against undefined slots
- `rating.tsx` — Fix star `tabIndex` so the selected star is keyboard-focusable; add `role="radio"` and `aria-checked`
- `dropzone.tsx` — Fix off-by-one: check `accepted.length >= maxFiles` instead of loop index
- `tag-input.tsx` — Replace non-null assertion in `useImperativeHandle` with safe `focus`/`blur` pattern
- `sidebar.tsx` — Wrap `document.cookie` write in try/catch for private browsing environments
- `stepper.tsx` — Support `React.memo`-wrapped `StepperItem` via `displayName` check
- `tour.tsx` — Emit `console.warn` in dev when a tour step's target element is not found in the DOM
- `progress.tsx` — Clamp value to 0–100 range before computing `translateX` transform
- `pagination.tsx` — Move `sr-only` "More pages" text outside `aria-hidden` span
- `slider.tsx` — Guard `console.warn` behind `NODE_ENV !== 'production'`

**Vue Blocks**
- `AuthForms.vue` — Auto-submit OTP form after paste fills all 6 digits
- `OnboardingFlow.vue` — Add file type/size validation on avatar upload; add email regex + duplicate check before adding team members
- `SettingsPage.vue` — Emit `themeChange` event when a theme is selected
- `CTASection.vue` — Wrap newsletter inputs in `<form @submit.prevent>`; add email validation
- `FAQSection.vue` — Add reactive `activeCategory` ref + `filteredFaqs` computed for the categories variant

**React Blocks**
- `onboarding-flow.tsx` — Add file type/size validation on avatar upload; add `aria-label`/`aria-current` on step indicator dots
- `contact-section.tsx` — Add `subject` field to `ContactSplit` variant
- `testimonials.tsx` — Add star rating display to `TestimonialsMasonry` variant
- `settings-page.tsx` — Validate accent color is in `accentColors` array before firing callback
- `feature-grid.tsx` — Add `line-clamp-3` to Bento `CardDescription` to prevent overflow on narrow screens
- `team-section.tsx` — Rewrite `getInitials()` with proper edge case handling (single-word names, empty strings)
- `logo-cloud.tsx` — Warn in dev when `LogoCloudWithStats` silently drops logos beyond index 9

---

## [3.3.0] — 2026-05-05

### ✨ New Components

**Combobox (React + Vue)**
- New `Combobox` component built by composing `Popover` and `Command` — searchable, filterable dropdown with neubrutalism styling
- `ComboboxTrigger` — single-select trigger with thick border, hard shadow, and press-down focus effect
- `ComboboxMultiTrigger` — multi-select trigger with removable tag chips; `values` prop accepts `{ value, label }[]` and `onRemove` (React) / `@remove` (Vue) returns the item's `value` directly (no reverse-lookup needed)
- `ComboboxContent` — popover wrapper with `align="start"` default so the dropdown left-aligns with the trigger
- Re-exports all `Command*` sub-components as `Combobox*` aliases (`ComboboxInput`, `ComboboxList`, `ComboboxEmpty`, `ComboboxGroup`, `ComboboxItem`, `ComboboxSeparator`)
- Installable via shadcn CLI: `npx shadcn@latest add "https://boldkit.dev/r/combobox.json"` (React) / `npx shadcn-vue@latest add "https://boldkit.dev/r/vue/combobox.json"` (Vue)
- Full documentation page at `/components/combobox` with 5 examples: Basic, Multi Select, With Groups, With Label, Disabled
- Added to sidebar navigation, Cmd+K search, and sitemap

### 🐛 Bug Fixes

**Vue Templates**
- `DocsTemplate.vue` — Added `aria-live="polite"` region so screen readers announce "Copied to clipboard" when copy button is clicked

---

## [3.2.3] — 2026-05-02

### 🐛 Bug Fixes

**React Core UI**
- `badge.tsx` — Renders as inline `<span>` instead of block `<div>` (fixes layout in inline contexts)
- `input-otp.tsx` — Added bounds check on `slots[index]` in `InputOTPSlot` — no longer crashes when index is out of range or used outside `OTPInput` context
- `stepper.tsx` — `StepperContent` now has `aria-labelledby` pointing to its corresponding `StepperTrigger` (ARIA tab panel pattern)
- `stepper.tsx` — `StepperTrigger` gets a stable `id` for the labelledby association
- `tree-view.tsx` — Renamed internal `TreeNode` function component to `TreeNodeItem` to eliminate confusion with the exported `TreeNode` interface

**Charts**
- `chart/legend.tsx` — React keys in `ChartLegendContent` now use `dataKey ?? value ?? index` — prevents duplicate key warnings when two series share a label
- `chart/donut-chart.tsx` — `foreignObject` center label now sizes proportionally to `innerRadius` instead of hardcoded `100×60`
- `chart/radial-bar-chart.tsx` — `stacked` variant is now functional — uses `stackId="stack"` on `<RadialBar>` so bars stack angularly in the same track
- `chart/sankey-chart.tsx` — Removed unused `totalVal` variable and `void totalVal` suppressor (dead code)
- `chart/treemap-chart.tsx` — Fixed `Tooltip` `formatter` type annotation to match Recharts' actual `ValueType`
- `math-curve-background.tsx` — Removed `strokeOpacity={0.15}` from the inner `<path>` — was multiplying with the SVG-level `opacity` prop making curves nearly invisible (0.15 × 0.15 = 0.022)
- `math-curve-progress.tsx` — Progress head rotation now uses CSS `style.transform` + `transformBox: fill-box` instead of SVG `transform` attribute — CSS transitions now actually animate

**Shapes**
- `shapes.tsx` — Clamped inner `strokeWidth` to `Math.max(1, strokeWidth - 2)` — no more zero/negative stroke values
- `shapes.tsx` — Added `aria-hidden="true"` to all 55 SVG shape components (decorative SVGs no longer announced by screen readers)
- `ascii-shapes.tsx` — Fixed `drawTorus` B-rotation z-component: `oz2` was incorrectly set to `oz1`, skipping the B-axis rotation and producing a flat torus
- `ascii-shapes.tsx` — Added `aria-hidden="true"` to ASCII art `<pre>` elements

**Blocks**
- `marquee.tsx` — `speed` prop now respected when `direction="right"` (added `animate-marquee-slow-reverse` and `animate-marquee-fast-reverse` CSS classes)
- `team-section.tsx` — Replaced deprecated `Twitter` icon with `XIcon` from lucide-react
- `team-section.tsx` — Hidden social link overlay now has `aria-hidden="true"` and links have `tabIndex={-1}` — keyboard users no longer tab through invisible links
- `footer-section.tsx` — `<Separator>` components standardised to `h-[3px]` (was `h-[2px]`, inconsistent with neubrutalism 3px border standard)
- `contact-section.tsx` — Map container no longer collapses to zero height at `lg` breakpoint (`lg:h-auto` → `lg:h-full lg:min-h-[400px]`)

**Vue (@boldkit/vue v3.1.3)**
- `Tabs.vue` — `update:modelValue` emit narrowed from `string | number` to `string`
- `Select.vue` — Removed `bigint` and `Record<string, unknown>` from `update:modelValue` emit (narrowed to `string | number | null`)
- `DropdownMenuRadioGroup.vue` — Aligned prop (`modelValue?: string | null`) with emit (`string | null`)
- `Tour.vue` — `popoverRef` explicitly typed as `Ref<HTMLDivElement | undefined>`; `totalSteps` in provided context is now a reactive `ComputedRef<number>` instead of a plain number
- `Slider.vue` — Fixed `if (animationId)` falsy check in `onUnmounted` — now uses strict `!== null` so RAF ID `0` is correctly cancelled
- `Dropzone.vue` — `maxFiles` prop is now enforced in `processFiles` — excess files are rejected with `code: 'too-many-files'` instead of silently accepted

---

## [3.2.2] — 2026-04-28

### 🐛 Bug Fixes

**Canvas Effects — React & Vue (all 10 components)**
- Added `devicePixelRatio` scaling to all `resize()` functions — canvas effects are now sharp on Retina/HiDPI displays instead of blurry
- Initialized `let raf = 0` (was uninitialized `let raf: number`) across all React canvas components
- Added zero-size canvas guard to `Metaballs`, `ParticleWeb`, and `FlowField` (React + Vue) — particles no longer initialize at `(0,0)` when canvas is hidden or in a lazy container
- Fixed `React.CSSProperties` used without `React` namespace import in all 10 React canvas files — now uses `import type { CSSProperties }`
- `MatrixRain` (React + Vue) — added `background: #000` to canvas element so trail fade works on any parent background
- `MouseRipple` (React + Vue) — clamped `size = Math.max(0, 3 + ripple * 9)` to prevent negative values in `fillRect`
- `MouseRipple.vue` — replaced `_cleanup` monkey-patch on DOM node with a proper closure variable; eliminates potential `mousemove` listener leak on unmount
- `Plasma.vue` — added `palette.length < 2` guard in `colorAt()` to prevent `TypeError` crash with single-color palettes
- `Plasma.vue` — added zero-size dimension guard to `resize()` (matching React version)
- `Aurora.tsx` — reset `ctx.shadowColor = 'transparent'` after aurora bands loop to prevent shadow bleed on subsequent draw calls
- Fixed stale registry content in `public/r/plasma.json` and `public/r/vue/plasma.json` — now in sync with current source including DPR scaling and zero-size guards

**Website & UI**
- `Home.tsx` — fixed broken `<Link to="/theme-builder">` (route doesn't exist); corrected to `/themes`
- `Home.tsx` — wrapped `navigator.clipboard.writeText()` in try/catch to handle non-HTTPS / unsupported browsers
- `Home.tsx` — fixed `React.CSSProperties` without `React` import
- `Home.tsx` — `DotMatrixPreview` interval now skips updates when tab is hidden
- `Home.tsx` — copy button `setTimeout` stored in ref and cleared on re-click to avoid stale state updates
- `Header.tsx` — mobile menu (`role="dialog"`) now closes on `Escape` key press
- `Header.tsx` — added keyboard focus trap to mobile menu (ARIA dialog pattern)
- `Header.tsx` — fixed `React.CSSProperties` without `React` import
- `App.tsx` — unknown `/docs/*` paths now redirect to `/docs` instead of silently rendering Introduction
- `App.tsx` — moved `<Toaster />` inside `<BrowserRouter>` for correct provider nesting
- `Footer.tsx` — fixed stat card right-border logic at 2-column mobile breakpoint (was creating dangling border on 3rd item)
- `CanvasEffects.tsx` — hero install/import copy buttons now use the actual `installLine`/`importLine` values instead of hardcoded Aurora strings
- `CanvasEffects.tsx` — "08 More Effects" divider count is now dynamic (`GRID.length`)
- `CanvasEffects.tsx` — Aurora `reactCode`/`vueCode` now includes all 5 colors (was missing `#00dceb`)
- `CanvasEffects.tsx` — each effect card now has `id={effect.id}` for hash-based deep linking
- `SearchCommand.tsx` — canvas effects now navigate to hash anchors (e.g. `/canvas-effects#aurora`) instead of all linking to the same `/canvas-effects` URL
- `SearchCommand.tsx` — `<kbd>` shortcut hint now has `aria-hidden="true"` to prevent screen reader double-announcement

**Build**
- `scripts/build-registry.js` — now processes `public/r/vue/` subdirectory and outputs stripped registry files to `public/vue/` (was silently skipping all Vue registry files)

---

## [3.1.1] — 2026-04-18

### 🐛 Bug Fixes

**Core UI Components**
- `skeleton.tsx` — Added missing `React` import (was using `React.HTMLAttributes` without import)
- `sonner.tsx` — Fixed `useTheme` import to use `next-themes` instead of non-existent `@/hooks/use-theme`
- `stepper.tsx` — Fixed inverted orientation: `horizontal` now renders `flex-row`, `vertical` renders `flex-col`
- `carousel.tsx` — Added `api.off('reInit', onSelect)` cleanup to prevent memory leak
- `marquee.tsx` — Replaced non-existent Tailwind pause class with `group`/`group-hover:[animation-play-state:paused]`
- `tree-view.tsx` — Renamed internal `TreeNode` function to `TreeNodeItem` to fix collision with exported `TreeNode` interface
- `alert.tsx` — Fixed `AlertTitle` forwardRef type from `HTMLParagraphElement` → `HTMLHeadingElement`
- `layered-card.tsx` — Fixed `LayeredCardTitle` forwardRef type from `HTMLParagraphElement` → `HTMLHeadingElement`
- `badge.tsx` — Changed rendered element from `<div>` to `<span>` with correct `HTMLSpanElement` prop type
- `slider.tsx` — Fixed stale closure in `onValueCommit` using a ref synced via `useEffect`

**Charts**
- `chart.tsx` — Added `overflow-hidden` to chart container CVA base class
- `radar-chart.tsx` — Fixed label rendering to handle non-string label values; fixed domain `'auto'` → `'dataMax'`
- `gauge-chart.tsx` — Added division-by-zero guard when `min === max`; fixed arc segment keys to use value range instead of index
- `sparkline.tsx` — Fixed stroke color: was using unresolved CSS variable instead of resolved color value
- `heatmap-chart.tsx` — Added empty data guard; implemented proper `colorLow`/`colorHigh` interpolation via `color-mix`
- `radial-bar-chart.tsx` — Added empty array guard for `Math.max(...data.map(...))` spread
- `funnel-chart.tsx` — Added missing `height` prop (default 300) to interface and component

**Shapes & Math Curves**
- `shapes.tsx` — Fixed minimum strokeWidth to prevent negative values with `Math.max(1, strokeWidth - N)`
- `ascii-shapes.tsx` — Fixed 3D rotation matrix bug (`oz2` was copying `oz1` instead of applying `cosB` rotation); added `aria-hidden="true"` to `<pre>` elements
- `math-curve-background.tsx` — Removed non-functional stroke opacity attributes from track path
- `math-curve-progress.tsx` — Added `label` prop for accessibility; added CSS transition on indicator position
- `math-curves.ts` — Fixed cardioid x-offset overflow (was `50 - a`, now `50 + a` so shape stays within viewBox); added `discontinuities` support to `CurveDefinition`; fixed triskelion rendering with proper path breaks at discontinuity points

**Marketing Blocks**
- `hero-section.tsx` — Added `href` support to all primary/secondary action buttons (5 variants)
- `cta-section.tsx` — Fixed `bg-warning` (undefined CSS class) → `bg-yellow-500`; added `href` support to action buttons
- `contact-section.tsx` — Added missing `id` attributes and `<Label>` elements to `ContactWithMap` form fields

**Application Blocks**
- `auth-forms.tsx` — Added terms checkbox validation in `SignUpForm`; fixed OTP double-submit with `hasSubmitted` ref
- `error-pages.tsx` — Fixed countdown timer: extracted helper function; replaced broken state pattern with `useState` + `setInterval`
- `settings-page.tsx` — Fixed controlled form: added `useEffect` for prop sync; used nullish coalescing for optional string fields

**Vue Components**
- `data-table.json` — Fixed `DropdownMenuTrigger` missing `as-child` attribute
- `tabs.json` — Fixed `update:modelValue` emit type from `string | number` → `string`
- `timeline.json` — Fixed template to use `props.orientation` instead of bare `orientation`
- `tour.json` — Fixed `ref<HTMLDivElement>()` → `ref<HTMLDivElement | undefined>()` to avoid strict-mode error

---

## [3.1.0] — 2026-04-16

### ✨ ASCII Shapes — 12 animated ASCII art components

The headline feature of 3.1.0. A complete ASCII animation engine built from scratch — no canvas, no WebGL, just text characters rendered with real 3D math.

**5 three-dimensional shapes** rendered using perspective projection, z-buffering, and Lambertian shading:

| Component | Description |
|-----------|-------------|
| `AsciiTorus` | Rotating torus — X+Y axes, tube R1=1.0, ring R2=2.2 |
| `AsciiDonut` | Classic [donut.c](https://www.a1k0n.net/2011/07/20/donut-math.html) — X+Z axes, fatter tube R1=1.2 |
| `AsciiSphere` | Globe with rotating lat/lon grid texture and dark side |
| `AsciiCube` | Solid cube with back-face culling and per-face shading |
| `AsciiHelix` | DNA double helix — two parametric strands with connecting rungs |

**7 generative 2D animations** drawn directly into a character grid each frame:

| Component | Description |
|-----------|-------------|
| `AsciiSpiral` | Archimedean spiral arms rotating continuously |
| `AsciiRose` | Rose curve r=cos(5θ) blooming and phase-shifting |
| `AsciiWave` | Multi-frequency sine interference scrolling left→right |
| `AsciiVortex` | Rotating density field collapsing toward center |
| `AsciiPulse` | Concentric rings expanding outward and fading |
| `AsciiMatrix` | Characters raining downward per column |
| `AsciiGrid` | Grid intersections pulsing with traveling waves |

**Shared prop API** (all 12 components):

```tsx
<AsciiTorus
  size="md"          // 'sm' (24×12) | 'md' (48×24) | 'lg' (72×36) | 'hero' (120×60)
  charset="blocks"   // 'blocks' | 'braille' | 'classic' | 'line' | 'dots'
  speed="normal"     // 'slow' (0.4×) | 'normal' (1×) | 'fast' (2.2×)
  color="#e74c3c"    // any CSS color; ignored when multicolor=true
  multicolor         // cycles primary→secondary→accent→warning→info→success per row
  animated={false}   // static first frame — no RAF, fully SSR-safe
/>
```

**Framework support:**
- React — full animated + static
- Vue 3 — full animated + static (`isMounted` guard prevents SSR RAF calls)
- Nuxt — `animated={false}` works without `<ClientOnly>`; animated variants need `<ClientOnly>` to avoid hydration mismatch

**Install:**
```bash
# React
npx shadcn@latest add "https://boldkit.dev/r/ascii-shapes.json"

# Vue 3 / Nuxt
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/ascii-shapes.json"
```

**New pages:**
- `/ascii-shapes` — interactive showcase with live controls (charset, size, color picker, multicolor toggle)
- `/components/ascii-shapes` — full docs with 8 example sections, React + Vue code tabs, props table

---

### 📐 Math Curves — 7 new curves (15 total)

Added to `MathCurveLoader`, `MathCurveProgress`, and `MathCurveBackground`:

| New Curve | Formula |
|-----------|---------|
| `astroid` | x=cos³(t), y=sin³(t) |
| `deltoid` | 3-cusped hypocycloid |
| `nephroid` | 2-cusped epicycloid (R=2, r=1) |
| `epicycloid` | General epicycloid |
| `superellipse` | Lamé curve with n=2.5 |
| `triskelion` | 3-armed rotational spiral |
| `involute` | Involute of a circle |

Previously 8 curves, now **15 total**. All doc pages updated to showcase the full set.

---

### 🔷 SVG Shapes — 10 new shapes (64 total)

**Geometric additions** (added to existing Geometric category):
- `HeptagonShape` — 7-sided polygon
- `DecagonShape` — 10-sided polygon
- `RhombusShape` — diamond with equal sides
- `EllipseShape` — scalable ellipse
- `TrefoilShape` — three-lobed clover knot

**New Mathematical category:**
- `FibonacciSpiralShape` — golden ratio spiral
- `PenroseTriangleShape` — impossible triangle illusion
- `KochSnowflakeShape` — fractal snowflake (3 iterations)
- `MobiusStripShape` — topological band rendering
- `TorusShape` — SVG torus projection

Previously 54 shapes, now **64 total**. All 10 are visible on `/shapes` with "New" badges and install/copy actions.

---

### 📚 Docs & Website

- **`/components/ascii-shapes`** — new full docs page with 8 interactive sections: 3D Shapes, Generative Animations, Character Sets, Sizes, Color, Multicolor, Speed, Static/SSR-safe
- **`/docs`** (Introduction) — updated Key Features list, added ASCII Shapes section with install commands (React/Vue/Nuxt), added Math Curve Components section with cards
- **`/shapes`** — 10 missing shapes now visible; new Mathematical category
- **Homepage** — live ASCII shapes section, math curves grid expanded 8→15, "What's New" updated
- **README** — new ASCII Shapes section with component table + code examples, updated shape/component counts
- **Sidebar** — ASCII Shapes added to docs nav with "New" badge
- **⌘K search** — ASCII Shapes searchable

---

### 🐛 Fixes

- Vue `<pre>` components had spurious `<div>` wrapper — merged onto `<pre>` root
- `nephroid` formula corrected to true 2-cusped epicycloid (R=2, r=1)
- `AsciiShapeProps.className` deduplication (now inherited from `HTMLAttributes<HTMLPreElement>`)
- `/shapes` page missing 10 new shape imports — all now visible

---

## [3.0.4] — 2026-03-30

- Math Curve components (Loader, Progress, Background) — 8 curves
- Shape Builder interactive tool
- Bug fixes and accessibility improvements
- SEO and sitemap improvements

## [3.0.3] — prior

See git tags for earlier release history.

---

[3.1.1]: https://github.com/ANIBIT14/boldkit/releases/tag/v3.1.1
[3.1.0]: https://github.com/ANIBIT14/boldkit/releases/tag/v3.1.0
[3.0.4]: https://github.com/ANIBIT14/boldkit/releases/tag/v3.0.4
[3.0.3]: https://github.com/ANIBIT14/boldkit/releases/tag/v3.0.3
