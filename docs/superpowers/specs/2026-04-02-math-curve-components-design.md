# Math Curve Components — Design Spec

**Date:** 2026-04-02
**Status:** Approved
**Inspired by:** [math-curve-loaders](https://github.com/Paidax01/math-curve-loaders)

---

## Overview

Three new BoldKit components that render mathematical parametric curves with neubrutalism aesthetics. All three share a common math engine. Existing `Spinner` component is untouched.

| Component | Purpose |
|---|---|
| `MathCurveLoader` | Drop-in animated loader, looping curve animation |
| `MathCurveProgress` | Controlled 0–100 progress indicator along an open curve |
| `MathCurveBackground` | Ambient animated background layer wrapping children |

Both React and Vue 3 (Nuxt-compatible) implementations. Registered via shadcn CLI.

---

## Architecture

### Shared Math Engine: `math-curves.ts`

Framework-agnostic TypeScript file placed in `src/lib/` (React) and `packages/vue/src/lib/` (Vue — identical copy). Exported API:

```ts
// Curve keys per component type
type LoaderCurveKey = 'rose' | 'lissajous' | 'butterfly' | 'hypotrochoid' | 'cardioid' | 'lemniscate' | 'fourier' | 'rose3'
type ProgressCurveKey = 'spiral' | 'heart' | 'lissajous' | 'cardioid' | 'rose'
type BackgroundCurveKey = 'rose' | 'lissajous' | 'fourier' | 'spiral'

/**
 * Returns { x, y } in 0–100 coordinate space (center 50, 50).
 * detailScale defaults to 1.0 if omitted — used by Progress which has no breathing animation.
 */
getPoint(curve: string, progress: number, detailScale?: number): { x: number; y: number }

/**
 * Returns the curve tangent angle in radians at the given progress position.
 * Computed via finite difference: angle at (progress) vs (progress + ε), ε = 0.001.
 * Used to rotate the head <rect> to follow the curve direction.
 */
getAngle(curve: string, progress: number, detailScale?: number): number

/**
 * Returns a full SVG path string (M + L commands) for the guide track.
 * segments defaults: rose/cardioid/lemniscate/hypotrochoid = 300,
 *                    lissajous/butterfly/rose3 = 240,
 *                    fourier = 480, spiral/heart = 200.
 * Pass explicit segments to override.
 */
buildPath(curve: string, detailScale?: number, segments?: number): string

/**
 * Returns sine-based detailScale oscillator value in range [0.52, 1.0].
 * Formula: 0.52 + ((sin(2π * ((elapsed % pulseDurationMs) / pulseDurationMs)) + 1) / 2) * 0.48
 * elapsed = performance.now() milliseconds. pulseDurationMs from curve config.
 */
getDetailScale(elapsed: number, pulseDurationMs: number): number
```

All coordinates are in `0–100` space with center at `(50, 50)`. The SVG viewBox is `0 0 100 100`.

### Animation Loop

- React: `useEffect` + `requestAnimationFrame`, cleanup on unmount
- Vue: `onMounted` / `onUnmounted` + `requestAnimationFrame`
- No external animation libraries

### Registry Dependency Chain

```
utils  ←  math-curves  ←  math-curve-loader
                        ←  math-curve-progress
                        ←  math-curve-background
```

---

## Curve Catalog

### MathCurveLoader (8 curves — tight looping)

| Key | Name | Character |
|---|---|---|
| `rose` | Rose Curve | 5-petal flower, classic, medium density |
| `lissajous` | Lissajous Drift | Figure-8 family, smooth oscillation |
| `butterfly` | Butterfly | Irregular organic loop, asymmetric |
| `hypotrochoid` | Hypotrochoid | Spirograph inner loop, geometric |
| `cardioid` | Cardioid | Heart-shaped teardrop loop |
| `lemniscate` | Lemniscate | Infinity symbol / figure-8 |
| `fourier` | Fourier Flow | Multi-harmonic interference pattern |
| `rose3` | Rose Three | 3-petal variant, compact |

### MathCurveProgress (5 curves — open/directional)

| Key | Name | Character |
|---|---|---|
| `spiral` | Spiral | Archimedean outward unwind |
| `heart` | Heart Wave | Algebraic heart trace |
| `lissajous` | Lissajous Arc | Partial arc left→right |
| `cardioid` | Cardioid Arc | Half-loop trace |
| `rose` | Rose Petal | Single petal trace |

### MathCurveBackground (4 curves — large, slow ambient)

| Key | Name | Character |
|---|---|---|
| `rose` | Rose Orbit | Large 7-petal slow drift |
| `lissajous` | Lissajous Drift | Wide slow oscillation |
| `fourier` | Fourier Flow | Complex multi-layer ambient |
| `spiral` | Spiral Search | Slow expanding spiral |

Background reuses loader curve math at larger scale and slower speed — no additional curve implementations needed.

**Total unique curve implementations: 10** (`rose`, `rose3`, `lissajous`, `butterfly`, `hypotrochoid`, `cardioid`, `lemniscate`, `fourier`, `spiral`, `heart`)

---

## Component APIs

### MathCurveLoader

Extends `React.SVGAttributes<SVGSVGElement>` (which includes `className`). Uses `React.forwardRef<SVGSVGElement, MathCurveLoaderProps>`. CVA used for size variants.

```tsx
interface MathCurveLoaderProps extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof mathCurveLoaderVariants> {
  curve?: LoaderCurveKey        // default: 'rose'
  speed?: 'slow' | 'normal' | 'fast'  // default: 'normal'
  trackColor?: string           // CSS color, default: var(--foreground) at 20% opacity
  headColor?: string            // CSS color, default: var(--primary)
  strokeWidth?: number          // track stroke width in SVG units, default: 4
  headSize?: number             // head square size in SVG units, default: 8
  // size variant via CVA (xs|sm|md|lg|xl), default: 'md'
}
```

Size → rendered SVG pixel dimensions: `xs=24`, `sm=32`, `md=48`, `lg=64`, `xl=96`

Speed → loop duration: `slow=9000ms`, `normal=5500ms`, `fast=3000ms`

**Accessibility:** `role="status"` with default `aria-label="Loading"` (overridable via prop). Supports `aria-hidden` passthrough via `...props` spread.

---

### MathCurveProgress

Extends `React.SVGAttributes<SVGSVGElement>`. Uses `React.forwardRef<SVGSVGElement, MathCurveProgressProps>`. CVA used for size variants.

```tsx
interface MathCurveProgressProps extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof mathCurveProgressVariants> {
  value: number                 // 0–100, required
  curve?: ProgressCurveKey      // default: 'spiral'
  showValue?: boolean           // show numeric % label, default: false
  trackColor?: string           // default: var(--foreground) at 20% opacity
  fillColor?: string            // default: var(--primary)
  strokeWidth?: number          // default: 4
  // size variant via CVA (sm|md|lg), default: 'md'
}
```

**No animation loop.** Head position = `getPoint(curve, value / 100)` with no `detailScale` (defaults to `1.0`). Head angle = `getAngle(curve, value / 100)`. Head is a `<rect>` — position is set via `x`/`y` attributes and rotation via `transform="rotate(angle, cx, cy)"`. Smooth transition on value change is handled by CSS `transition: transform 300ms ease` on the `<rect>` element (React: inline `style`, Vue: `:style` binding).

**Progress track rendering:** The full guide track always renders at `trackColor` / 20% opacity (the "rail"). There is no secondary filled-path from 0 → value. Progress is communicated solely by the head position along the track. The `fillColor` prop controls the head fill color.

**Accessibility:** `role="progressbar"`, `aria-valuenow={value}`, `aria-valuemin={0}`, `aria-valuemax={100}`.

---

### MathCurveBackground

Extends `React.HTMLAttributes<HTMLDivElement>`. Uses `React.forwardRef<HTMLDivElement, MathCurveBackgroundProps>`. No CVA needed (no size/variant axes beyond props).

```tsx
interface MathCurveBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  curve?: BackgroundCurveKey    // default: 'rose'
  speed?: 'slow' | 'normal' | 'fast'  // default: 'slow'
  opacity?: number              // 0–1, applied to entire SVG layer, default: 0.15
  trackColor?: string           // default: var(--foreground)
  headColor?: string            // default: var(--primary)
  strokeWidth?: number          // default: 2
  asChild?: boolean             // React: Radix Slot, Vue: Reka Primitive. default: false
  children?: React.ReactNode
}
```

**React registry dependency:** Because `asChild` uses `@radix-ui/react-slot`, add `"@radix-ui/react-slot"` to the `dependencies` array in `math-curve-background.json`. Vue uses `reka-ui` which is already a peer dependency of the Vue package (no registry addition needed, consistent with other Vue components).

**Rendering:** `position: relative` container div (or Slot root when `asChild`). SVG: `position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0`. Children wrapper: `position: relative; z-index: 1`.

**Accessibility:** SVG has `aria-hidden="true"` — it is decorative. Children are not affected.

---

## Visual Design

### Rendering Layers

Every animation composes two SVG layers:

1. **Track** — full curve as continuous `<path>`. Always visible at low opacity. Shows the complete curve shape — the neubrutalism "rail".
   - `stroke-linecap="square"`, `stroke-linejoin="miter"` (hard edges, no rounding)
   - Track opacity: 0.2 (Loader/Progress), controlled by `opacity` prop (Background)

2. **Head** — a `<rect>` (square) traveling along the track, rotated via `transform="rotate(angle, cx, cy)"` using the angle from `getAngle()`.
   - Solid fill with `stroke="var(--foreground)"` + `stroke-width="1.5"` (neubrutalist border)
   - Full opacity, sharp corners — no softness

### Neubrutalism Constraints

- No blur, no glow, no gradients, no drop shadows, no border-radius
- Square head (`<rect>`) — never a circle
- Hard stroke caps (`square`) on the track path
- On hover (Loader, Background): track opacity increases to 0.4 — consistent with BoldKit's hover interaction model

### Color Defaults

| Role | Default | Context |
|---|---|---|
| Track stroke | `var(--foreground)` at 20% opacity | Guide path |
| Head fill | `var(--primary)` | Moving element |
| Head stroke | `var(--foreground)` at full opacity, `stroke-width="1.5"` | Neubrutalist outline |

Dark mode works automatically — all defaults use CSS variables, no hardcoded colors.

### Detail Scale / Breathing

Loader and Background animate `getDetailScale(elapsed, pulseDurationMs)` each frame, producing values in `[0.52, 1.0]` that subtly morph curve shape. Formula:

```
detailScale = 0.52 + ((sin(2π × (elapsed % pulseDurationMs) / pulseDurationMs) + 1) / 2) × 0.48
```

Progress component does not use `detailScale` — it passes no third argument to `getPoint` / `getAngle`, which default to `1.0`.

---

## File Structure

### New Source Files

```
# React
src/lib/math-curves.ts
src/components/ui/math-curve-loader.tsx
src/components/ui/math-curve-progress.tsx
src/components/ui/math-curve-background.tsx

# Vue
packages/vue/src/lib/math-curves.ts               # identical to React version
packages/vue/src/components/ui/MathCurveLoader.vue
packages/vue/src/components/ui/MathCurveProgress.vue
packages/vue/src/components/ui/MathCurveBackground.vue

# Registry source templates
registry/default/lib/math-curves.ts               # target: lib/math-curves.ts
registry/default/ui/math-curve-loader.tsx          # target: components/ui/math-curve-loader.tsx
registry/default/ui/math-curve-progress.tsx        # target: components/ui/math-curve-progress.tsx
registry/default/ui/math-curve-background.tsx      # target: components/ui/math-curve-background.tsx
```

Vue registry source templates use the same paths as React. The Vue registry JSON entries specify `"target": "src/lib/math-curves.ts"` (or `src/components/ui/...`) per Nuxt/Vue project conventions.

### Published Registry JSON

```
public/r/math-curves.json
public/r/math-curve-loader.json
public/r/math-curve-progress.json
public/r/math-curve-background.json

public/r/vue/math-curves.json
public/r/vue/math-curve-loader.json
public/r/vue/math-curve-progress.json
public/r/vue/math-curve-background.json
```

### registry.json additions

```json
{ "name": "math-curves",            "type": "registry:lib",  "dependencies": [], "registryDependencies": ["utils"] },
{ "name": "math-curve-loader",      "type": "registry:ui",   "dependencies": ["class-variance-authority"], "registryDependencies": ["utils", "math-curves"] },
{ "name": "math-curve-progress",    "type": "registry:ui",   "dependencies": ["class-variance-authority"], "registryDependencies": ["utils", "math-curves"] },
{ "name": "math-curve-background",  "type": "registry:ui",   "dependencies": ["@radix-ui/react-slot"], "registryDependencies": ["utils", "math-curves"] }
```

Note: `math-curves` does not depend on `class-variance-authority` — it is pure math utilities with no styling.

---

## Install Commands

```bash
# React
npx shadcn@latest add "https://boldkit.dev/r/math-curve-loader.json"
npx shadcn@latest add "https://boldkit.dev/r/math-curve-progress.json"
npx shadcn@latest add "https://boldkit.dev/r/math-curve-background.json"

# Vue / Nuxt
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/math-curve-loader.json"
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/math-curve-progress.json"
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/math-curve-background.json"
```

---

## Out of Scope

- Modifying or replacing the existing `Spinner` component
- Canvas-based rendering (SVG only)
- React Native support
- Interactive parameter sliders (docs/demo concern, not the component itself)
- More than 10 unique curve implementations in this release
- Filled progress track segment (progress communicated by head position only)
