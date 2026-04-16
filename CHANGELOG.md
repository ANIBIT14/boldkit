# Changelog

All notable changes to BoldKit are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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

[3.1.0]: https://github.com/ANIBIT14/boldkit/releases/tag/v3.1.0
[3.0.4]: https://github.com/ANIBIT14/boldkit/releases/tag/v3.0.4
[3.0.3]: https://github.com/ANIBIT14/boldkit/releases/tag/v3.0.3
