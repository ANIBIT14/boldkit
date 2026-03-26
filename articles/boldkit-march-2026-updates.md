---
title: "BoldKit March 2026 Update: New Landing Page, Full Vue 3 Parity, Header & Footer Redesign"
published: false
description: "A roundup of everything that shipped in BoldKit this month — editorial neubrutalism redesign, Vue examples across all 34 doc pages, new empty-state presets, and fully responsive header/footer."
tags: react, vue, ui, opensource
cover_image: https://ik.imagekit.io/fincalfy/Screenshot%202026-03-21%20at%209.48.00%E2%80%AFPM.png
---

March was a big month for [BoldKit](https://boldkit.dev) — the free neubrutalism UI component library for React and Vue 3. Here's everything that shipped.

---

## 🎨 Landing Page Redesign

The homepage got a full editorial neubrutalism overhaul. The design direction: bold display typography, tight grid discipline, and strong color contrast — no gradients, no rounded corners, no safe choices.

**What changed:**

- **Bebas Neue + DM Mono** — Bebas Neue for all display headlines (`clamp(56px, 14vw, 180px)`), DM Mono for code snippets and labels
- **Component collage hero** — a floating grid of live BoldKit components sits beside the headline on desktop, giving visitors an instant visual feel for the library
- **Stats bar** — 4 colored cells (50+ components, 10 charts, 45 shapes, MIT licensed) using the full neubrutalism vocabulary: `border-3`, 4px offset shadows, zero border-radius
- **Component showcase** — asymmetric grid showing cards, badges, buttons, charts, and shapes in a dense, editorial layout
- **Dark CTA section** — `bg-foreground` background, high contrast, GitHub and docs CTAs side by side

The font stack ships via `<link>` in `index.html` (not CSS `@import`) to avoid PostCSS ordering constraints with Tailwind v4.

---

## 📱 Mobile & Responsive Fixes

Several overflow and layout issues were fixed across breakpoints:

- **Hero overflow below 518px** — the CLI command snippet was overflowing on very small screens. Fixed by adding `min-w-0` to the `<code>` element and `w-full min-w-0` to its wrapper, removing the fixed `max-w`
- **Stats bar mobile border** — the item at grid position `[1]` had a right border that appeared mid-row on 2-column mobile layout; made it `md:border-r-3` only
- **Component showcase tablet** — added `md:grid-cols-2 lg:grid-cols-3` with `md:col-span-1` overrides so the layout works properly at all widths
- **Global scrollbar hiding** — `scrollbar-width: none` + `*::-webkit-scrollbar { display: none }` applied globally in `globals.css`

---

## 🧩 Empty State: Animations, Layouts, and New Presets

The Empty State component had undocumented features. All of them are now fully documented with live demos.

### Animations

Three entrance animation variants — `fadeIn`, `bounce`, and `scale` — now have live interactive demos with a **Replay button** so you can see them fire on demand (they're CSS entrance animations, so they only play once on mount):

```tsx
<EmptyState
  preset="no-results"
  animation="bounce"
/>
```

### Layouts

Both `vertical` (default) and `horizontal` layouts are now documented with side-by-side examples.

### New Presets

The docs now cover all 14 presets:

| Preset | Description |
|--------|-------------|
| `no-results` | Search came up empty |
| `no-data` | No records yet |
| `error` | Something went wrong |
| `offline` | No internet connection |
| `permission-denied` | Access restricted |
| `coming-soon` | Feature not yet available |
| `maintenance` | Under maintenance |
| `upload` | Drop files here |
| `no-notifications` | Inbox zero |
| `no-messages` | No conversations |
| `no-favorites` | Nothing saved |
| `no-activity` | No recent events |
| `empty-cart` | Cart is empty |
| `success` | Action completed |

### Icon Colors

`success`, `warning`, and `destructive` icon color variants are now documented with examples.

---

## 🔵 Vue 3 Parity: Examples on All 34 Doc Pages

This was the biggest documentation lift of the month. Every `ExampleSection` on the BoldKit docs previously showed only React code. All **34 component doc pages** that were missing Vue examples now have them:

`Dialog` · `Drawer` · `DropdownMenu` · `Pagination` · `Popover` · `Progress` · `RadioGroup` · `ScrollArea` · `Select` · `Separator` · `Sheet` · `Skeleton` · `Sonner` · `Sticker` · `Switch` · `Table` · `Tabs` · `Textarea` · `Toggle` · `ToggleGroup` · `Tooltip` · `AlertDialog` · `AspectRatio` · `Avatar` · `Breadcrumb` · `Calendar` · `Collapsible` · `Command` · `HoverCard` · `InputOtp` · `Label` · `LayeredCard` · `Marquee` · `EmptyState`

Key Vue 3 conversion rules applied throughout:

```vue
<!-- React → Vue -->
className     → class
htmlFor       → for
asChild       → as-child
onClick={fn}  → @click="fn"
onValueChange → v-model
lucide-react  → lucide-vue-next
```

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

The Vue registry (`public/r/vue/`) also received the missing `theme.json` file.

---

## 🐛 Bug Fixes

- **Sparkline, Donut, Gauge, Radar, Radial Bar routes** — these chart doc pages existed but had no routes in `App.tsx`. Added lazy-loaded routes for all five under `/components/`.
- **Sticky Note in Installation page** — `sticky-note` was listed as a standalone installable component, but it's part of the `sticker` component. Removed from the list.
- **Logo Cloud placeholders** — `via.placeholder.com` URLs replaced with real company logos via SimpleIcons CDN (Vercel, GitHub, Linear, Notion, Stripe).

---

## 🔝 Header Redesign

The nav header got a full neubrutalism upgrade with much better UX at every breakpoint.

**Design changes:**

- **Primary accent stripe** — a `3px` coral stripe runs full-width above the nav, anchoring BoldKit's brand color at the very top of every page
- **Bebas Neue wordmark** — logo text in Bebas Neue; the icon rotates `-6°` on hover
- **Active nav indicator** — replaced the `bg-muted` highlight with a `3px` primary-colored underline flush with the header's bottom border, same weight as the top stripe (intentional visual rhythm)
- **Neubrutalism action buttons** — theme toggle and hamburger are now square `border-3` buttons that invert (black/white) on hover
- **Bordered search pill** — the search button became a proper pill: icon + `Search...` label on md+ + `⌘K` kbd badge

**Mobile menu (full rethink):**

- Full-screen overlay with a semi-transparent backdrop (tap to dismiss)
- Nav rows with icon + label, neubrutalism border + shadow lift on hover, inverted fill for the active route
- Body scroll locked while open, auto-closes on route change
- `env(safe-area-inset-bottom)` padding for notched iPhones

---

## 🦶 Footer Redesign

The footer went from a basic 4-column grid to a structured three-section layout with real visual hierarchy.

### Dark Hero Section

Always-dark (`bg-neutral-950`) regardless of light/dark mode — using hardcoded values instead of CSS variables that invert in dark mode:

- Giant `clamp(80px, 18vw, 220px)` "BUILD BOLD" in Bebas Neue at `text-white/10` opacity — a ghost watermark behind the subtitle
- Subtitle calls out both **React** (white) and **Vue 3** (`#42b883` green) by name

### Framework Install Cards

Side-by-side cards for React and Vue 3, each with their framework's brand color, logo, and the exact CLI install command:

```bash
# React
npx shadcn@latest add "https://boldkit.dev/r/[component].json"

# Vue 3 / Nuxt
npx shadcn-vue@latest add "https://boldkit.dev/r/vue/[component].json"
```

### Links Grid

4-column layout (2-column on mobile):
- Brand column with Bebas Neue wordmark, tagline, and neubrutalism social icon buttons
- Explore links
- Resources (GitHub, Changelog, Issues)
- Frameworks column with React (Radix UI + Recharts) and Vue 3 (Reka UI + ECharts) cards

### Bottom Bar

Inverted dark strip in DM Mono — MIT license left, "Made with ♥" right.

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
- 🧩 [Components](https://boldkit.dev/components)

---

If you're building with neubrutalism design — thick borders, hard shadows, sharp corners, bold type — BoldKit has everything you need for both React and Vue 3. Give it a star if you find it useful! ⭐
