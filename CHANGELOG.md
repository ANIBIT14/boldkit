# Changelog

All notable changes to BoldKit are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
