---
title: "BoldKit Spring 2026: v3.0 → v3.2.2 — ASCII Animations, Canvas Effects, Dot Matrix Studio & More"
published: false
description: "Everything that shipped in BoldKit from March through April 2026 — landing page redesign, Vue 3 parity, v3.0 advanced charts & animated shapes, ASCII art engine, Math Curve components, Dot Matrix Studio, 10 Canvas Effects, Rating component, and more."
tags: react, vue, ui, opensource
cover_image: https://ik.imagekit.io/fincalfy/Screenshot%202026-03-21%20at%209.48.00%E2%80%AFPM.png
---

Spring 2026 has been the most productive stretch in [BoldKit](https://boldkit.dev)'s history — the free neubrutalism UI component library for React and Vue 3. Six weeks, five major version bumps (v2.6 → v3.2.2), and more new capabilities than any previous release cycle. Here's everything that shipped.

---

## March 2026

### 🎨 Landing Page Redesign

The homepage got a full editorial neubrutalism overhaul. The design direction: bold display typography, tight grid discipline, and strong color contrast — no gradients, no rounded corners, no safe choices.

**What changed:**

- **Bebas Neue + DM Mono** — Bebas Neue for all display headlines (`clamp(56px, 14vw, 180px)`), DM Mono for code snippets and labels
- **Component collage hero** — a floating grid of live BoldKit components sits beside the headline on desktop, giving visitors an instant visual feel for the library
- **Stats bar** — 4 colored cells (50+ components, 10 charts, 45 shapes, MIT licensed) using the full neubrutalism vocabulary: `border-3`, 4px offset shadows, zero border-radius
- **Component showcase** — asymmetric grid showing cards, badges, buttons, charts, and shapes in a dense, editorial layout
- **Dark CTA section** — `bg-foreground` background, high contrast, GitHub and docs CTAs side by side

The font stack ships via `<link>` in `index.html` (not CSS `@import`) to avoid PostCSS ordering constraints with Tailwind v4.

---

### 📱 Mobile & Responsive Fixes

Several overflow and layout issues were fixed across breakpoints:

- **Hero overflow below 518px** — the CLI command snippet was overflowing on very small screens. Fixed by adding `min-w-0` to the `<code>` element and `w-full min-w-0` to its wrapper, removing the fixed `max-w`
- **Stats bar mobile border** — the item at grid position `[1]` had a right border that appeared mid-row on 2-column mobile layout; made it `md:border-r-3` only
- **Component showcase tablet** — added `md:grid-cols-2 lg:grid-cols-3` with `md:col-span-1` overrides so the layout works properly at all widths
- **Global scrollbar hiding** — `scrollbar-width: none` + `*::-webkit-scrollbar { display: none }` applied globally in `globals.css`

---

### 🧩 Empty State: Animations, Layouts, and New Presets

The Empty State component had undocumented features. All of them are now fully documented with live demos.

**Animations** — three entrance animation variants — `fadeIn`, `bounce`, and `scale` — now have live interactive demos with a **Replay button** so you can see them fire on demand:

```tsx
<EmptyState
  preset="no-results"
  animation="bounce"
/>
```

**Layouts** — both `vertical` (default) and `horizontal` layouts are now documented with side-by-side examples.

**14 presets** are fully covered: `no-results`, `no-data`, `error`, `offline`, `permission-denied`, `coming-soon`, `maintenance`, `upload`, `no-notifications`, `no-messages`, `no-favorites`, `no-activity`, `empty-cart`, and `success`. Plus `success`, `warning`, and `destructive` icon color variants.

---

### 🔵 Vue 3 Parity: Examples on All 34 Doc Pages

Every `ExampleSection` on the BoldKit docs previously showed only React code. All **34 component doc pages** that were missing Vue examples now have them:

`Dialog` · `Drawer` · `DropdownMenu` · `Pagination` · `Popover` · `Progress` · `RadioGroup` · `ScrollArea` · `Select` · `Separator` · `Sheet` · `Skeleton` · `Sonner` · `Sticker` · `Switch` · `Table` · `Tabs` · `Textarea` · `Toggle` · `ToggleGroup` · `Tooltip` · `AlertDialog` · `AspectRatio` · `Avatar` · `Breadcrumb` · `Calendar` · `Collapsible` · `Command` · `HoverCard` · `InputOtp` · `Label` · `LayeredCard` · `Marquee` · `EmptyState`

Stateful examples use `<script setup>` with `ref()`:

```vue
<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <Dialog v-model:open="open">
    ...
  </Dialog>
</template>
```

---

### 🔝 Header & Footer Redesign

**Header** — full neubrutalism upgrade:
- `3px` coral accent stripe full-width above the nav
- Bebas Neue wordmark; icon rotates `-6°` on hover
- Active nav: `3px` primary underline (matches top stripe weight)
- Square `border-3` theme toggle and hamburger that invert on hover
- Bordered search pill: icon + `Search...` label + `⌘K` kbd badge
- Mobile: full-screen overlay, body scroll lock, `env(safe-area-inset-bottom)` for notched iPhones

**Footer** — restructured into three sections:
- Always-dark hero with ghost `BUILD BOLD` watermark in Bebas Neue
- Side-by-side React and Vue 3 install cards with framework branding
- 4-column links grid with DM Mono bottom bar

---

## v3.0.0 — Advanced Charts, Animated Shapes, Theme Presets (March 30)

### 📊 4 New Chart Types (14 Total)

The chart library expanded with four advanced chart types, all styled in full neubrutalism with React and Vue 3 examples:

| Chart | Description |
|-------|-------------|
| `FunnelChart` | Conversion funnels, sales pipelines |
| `TreemapChart` | Hierarchical area visualization |
| `HeatmapChart` | Two-dimensional intensity grids |
| `SankeyChart` | Flow and allocation diagrams |

Install any chart via the shadcn CLI:
```bash
npx shadcn@latest add "https://boldkit.dev/r/funnel-chart.json"
```

---

### ✨ Animated SVG Shapes

All 45+ BoldKit shapes now support animation props:

```tsx
<StarShape
  animation="float"   // spin | pulse | float | wiggle | bounce | glitch
  speed="normal"      // slow | normal | fast
/>
```

7 animation variants, 3 speeds, pure CSS keyframes — no JS animation libraries required. A live showcase section was added to the `/shapes` page.

---

### 🎨 14 Theme Presets in ThemeBuilder

The Theme Builder got an upgraded card UI showing a 3-color strip preview, preset name, and descriptor tag. 14 curated presets are now available out of the box — covering everything from Cyberpunk to Pastel to Monochrome.

---

### 📄 Documentation Site Template

A new Documentation Site template was added to `/templates` — header, sidebar navigation, content area, and table of contents, all in neubrutalism style.

---

## v3.0.4 — Math Curve Components & Shape Builder

### 📐 Math Curve Components

Three new components driven by real parametric math — no third-party dependencies, pure SVG paths computed via a shared math engine:

**`MathCurveLoader`** — animated loading spinner with 8 curve variants:

```tsx
<MathCurveLoader
  curve="lissajous"   // rose | lissajous | butterfly | hypotrochoid |
                      // cardioid | lemniscate | fourier | rose3
  size="md"           // sm | md | lg | xl
  speed="normal"      // slow | normal | fast
/>
```

**`MathCurveProgress`** — value-driven progress indicator (0–100) across 5 open curves: spiral, heart, lissajous, cardioid, rose.

**`MathCurveBackground`** — ambient animated background layer wrapping children via `asChild`. Four slow ambient curves playing simultaneously.

All three ship for both React and Vue 3 / Nuxt.

---

### 🔷 Shape Builder

An interactive tool at `/shapes/builder` — pick any of the 54 SVG shapes, adjust props visually (color, stroke, fill, size, animation), preview live, and copy the exact component code. No more guessing prop combinations.

---

## v3.1.0 — ASCII Art Engine (April 16)

### 🖥️ 12 Animated ASCII Art Components

The headline feature of v3.1.0. A complete ASCII animation engine built from scratch — no canvas, no WebGL, just text characters rendered at up to 60fps using real 3D math.

**5 three-dimensional shapes** using perspective projection, z-buffering, and Lambertian shading:

| Component | Description |
|-----------|-------------|
| `AsciiTorus` | Rotating torus — X+Y axes |
| `AsciiDonut` | Classic [donut.c](https://www.a1k0n.net/2011/07/20/donut-math.html) — X+Z axes, fatter tube |
| `AsciiSphere` | Globe with rotating lat/lon grid and dark side |
| `AsciiCube` | Solid cube with back-face culling and per-face shading |
| `AsciiHelix` | DNA double helix — two parametric strands with rungs |

**7 generative 2D animations** drawn into a character grid each frame:

| Component | Description |
|-----------|-------------|
| `AsciiSpiral` | Archimedean spiral arms rotating continuously |
| `AsciiRose` | Rose curve r=cos(5θ) blooming and phase-shifting |
| `AsciiWave` | Multi-frequency sine interference scrolling left→right |
| `AsciiVortex` | Rotating density field collapsing toward center |
| `AsciiPulse` | Concentric rings expanding outward and fading |
| `AsciiMatrix` | Characters raining downward per column |
| `AsciiGrid` | Grid intersections pulsing with traveling waves |

**Shared prop API** across all 12 components:

```tsx
<AsciiTorus
  size="md"          // sm (24×12) | md (48×24) | lg (72×36) | hero (120×60)
  charset="blocks"   // blocks | braille | classic | line | dots
  speed="normal"     // slow (0.4×) | normal (1×) | fast (2.2×)
  color="#e74c3c"    // any CSS color; ignored when multicolor=true
  multicolor         // cycles primary→secondary→accent→warning→info→success per row
  animated={false}   // static first frame — fully SSR-safe, no RAF
/>
```

**Nuxt support**: `animated={false}` works without `<ClientOnly>`. Animated variants need `<ClientOnly>` to avoid hydration mismatch.

```bash
# React
npx shadcn@latest add "https://boldkit.dev/r/ascii-shapes.json"

# Vue 3 / Nuxt
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/ascii-shapes.json"
```

---

### 📐 Math Curves: 15 Total

7 new parametric curves added to all three Math Curve components:

| Curve | Formula |
|-------|---------|
| `astroid` | x=cos³(t), y=sin³(t) |
| `deltoid` | 3-cusped hypocycloid |
| `nephroid` | 2-cusped epicycloid (R=2, r=1) |
| `epicycloid` | General epicycloid |
| `superellipse` | Lamé curve with n=2.5 |
| `triskelion` | 3-armed rotational spiral |
| `involute` | Involute of a circle |

Previously 8 curves, now **15 total**.

---

### 🔷 SVG Shapes: 64 Total

10 new shapes added, including a new **Mathematical** category:

- **Geometric**: `HeptagonShape`, `DecagonShape`, `RhombusShape`, `EllipseShape`, `TrefoilShape`
- **Mathematical**: `FibonacciSpiralShape`, `PenroseTriangleShape`, `KochSnowflakeShape`, `MobiusStripShape`, `TorusShape`

Previously 54, now **64 total**.

---

## ⭐ Rating Component

New component with three icon variants, keyboard navigation, and half-step precision:

```tsx
<Rating
  value={3.5}
  max={5}
  icon="star"      // star | heart | circle
  size="md"        // sm | md | lg | xl
  precision={0.5}  // 1 | 0.5
  readOnly
  aria-label="Product rating"
/>
```

Full keyboard navigation (arrow keys), `aria-readonly` support, configurable `aria-label`.

```bash
npx shadcn@latest add "https://boldkit.dev/r/rating.json"
```

---

## v3.2.0 — Dot Matrix Studio

A full in-browser **pixel art and animation editor** at `/studio` — built entirely with BoldKit components.

**Drawing tools:**
- Pencil, eraser, shapes (rectangle, ellipse, line), text tool
- Selection with Fill, Clear, and Invert actions
- Undo/redo stack
- Drag-and-drop image import

**Animation system:**
- 10 presets: Blink, Typewriter, ScanLine, Marquee, Ripple, Bounce, Slide, Wave, Rain, Fade
- Frame-by-frame editing
- Looping playback with reliable frame timing

**Export options:**
- WebM video
- PNG (single frame or spritesheet)
- SVG
- JSON (for re-import)

**UX details:**
- `localStorage` persistence — your work survives a page refresh
- Share Tech Mono font for the authentic pixel-art terminal feel
- Pastel indigo theme

---

## v3.2.1 — 10 Canvas Effects

10 zero-dependency animated canvas components, copy-pasteable for React, Vue 3, and Nuxt 3:

| Effect | Description |
|--------|-------------|
| `Aurora` | Northern lights gradient ribbons |
| `DotBlob` | Organic morphing dot field |
| `DotWave` | Wave-propagating dot grid |
| `FlowField` | Perlin noise vector field |
| `LissajousGrid` | Animated Lissajous curve grid |
| `MatrixRain` | Classic character rain |
| `Metaballs` | Organic merging blobs |
| `MouseRipple` | Ripple rings following the cursor |
| `ParticleWeb` | Connected particle network |
| `Plasma` | Sine-wave plasma color field |

Each ships with:
- Full React and Vue 3 implementations (no runtime dependencies)
- shadcn CLI registry entries for one-command install
- Per-card install command copy buttons
- Live demos on the `/canvas-effects` page

```bash
# React
npx shadcn@latest add "https://boldkit.dev/r/aurora.json"

# Vue 3 / Nuxt
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/aurora.json"
```

---

## v3.2.2 — Accessibility & HiDPI Fixes (April 28)

### 🎯 Accessibility Improvements

A dedicated accessibility pass across the component library:

- **Slider** — `aria-label` and `aria-valuetext` props on thumbs; fixes stale closure in `onValueCommit`
- **Rating** — configurable `aria-label`; `aria-readonly` attribute when `readOnly`
- **Spinner** — `role="status"` and `aria-label="Loading"` defaults across all 5 variants
- **Skeleton** — `aria-hidden="true"` by default
- **Pagination** — `PaginationEllipsis` gets `role="img"` so its `aria-label` is exposed to screen readers
- **InputOTP** — `InputOTPSeparator` gets `role="separator"`; `InputOTPGroup` gets `role="group"`
- **Breadcrumb** — removed invalid `role="link"` and `aria-disabled` from `BreadcrumbPage`
- **TreeView** — improved expand/collapse labels; `ArrowUp`/`ArrowDown` keyboard navigation
- **Tour** — `role="dialog"`, `aria-modal`, `aria-labelledby`, and `Escape` key to close

### 📺 HiDPI / Retina Fix for Canvas Effects

All 10 canvas effects now apply `devicePixelRatio` scaling in their `resize()` functions — canvas components are sharp on Retina and HiDPI displays instead of blurry at 2× or 3× pixel density.

```ts
// Before: blurry on HiDPI
canvas.width = w;
canvas.height = h;

// After: sharp everywhere
const dpr = window.devicePixelRatio || 1;
canvas.width = w * dpr;
canvas.height = h * dpr;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
```

---

## By the Numbers

Since March 2026, BoldKit grew from:

| | March | May |
|-|-------|-----|
| UI Components | 50+ | 55+ |
| Charts | 10 | 14 |
| SVG Shapes | 45 | 64 |
| Math Curves | — | 15 |
| ASCII Art Components | — | 12 |
| Canvas Effects | — | 10 |
| Tools | ThemeBuilder | ThemeBuilder + Shape Builder + Dot Matrix Studio |
| Version | 2.6.x | 3.2.2 |

---

## 🔗 Install BoldKit

**React:**
```bash
npx shadcn@latest add "https://boldkit.dev/r/[component].json"
```

**Vue 3 / Nuxt:**
```bash
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/[component].json"
```

**Links:**
- 🌐 [boldkit.dev](https://boldkit.dev)
- ⭐ [GitHub](https://github.com/ANIBIT14/boldkit)
- 📖 [Documentation](https://boldkit.dev/docs)
- 🎨 [Canvas Effects](https://boldkit.dev/canvas-effects)
- 🖥️ [Dot Matrix Studio](https://boldkit.dev/studio)

---

If you're building with neubrutalism design — thick borders, hard shadows, sharp corners, bold type — BoldKit has everything you need for both React and Vue 3. Give it a star if you find it useful! ⭐
