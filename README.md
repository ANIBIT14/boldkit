# BoldKit

<div align="center">

![BoldKit Banner](assets/banner.png)

**Bold. Raw. Beautiful.**

A neubrutalism component library for React and Vue 3, built on shadcn/ui.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs)](https://vuejs.org)
[![Nuxt](https://img.shields.io/badge/Nuxt-00DC82?logo=nuxtdotjs)](https://nuxt.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://typescriptlang.org)
[![Components](https://img.shields.io/badge/Components-50+-FF6B6B)](https://boldkit.dev/components)
[![Charts](https://img.shields.io/badge/Charts-10-9B59B6)](https://boldkit.dev/charts)
[![Shapes](https://img.shields.io/badge/SVG_Shapes-42-FFD93D)](https://boldkit.dev/shapes)

[Website](https://boldkit.dev) · [Documentation](https://boldkit.dev/docs) · [Components](https://boldkit.dev/components) · [Charts](https://boldkit.dev/charts) · [Shapes](https://boldkit.dev/shapes)

</div>

---

## Preview

<div align="center">

![BoldKit Components](assets/preview.png)

*50+ beautifully crafted neubrutalism components and 10 chart types for React and Vue 3*

</div>

## What is Neubrutalism?

Neubrutalism (or neo-brutalism) is a bold design aesthetic characterized by:

- **Thick Borders** - 3px solid borders that define elements
- **Hard Shadows** - Offset shadows with no blur (4px 4px 0px)
- **Bold Colors** - High-contrast, vibrant color palettes
- **Raw Typography** - Bold, uppercase text for emphasis
- **Zero Radius** - Square corners for that raw, unpolished look

<div align="center">

![Neubrutalism Style](assets/style-demo.gif)

</div>

## Features

| Feature | Description |
|---------|-------------|
| **50+ Components** | Buttons, Cards, Dialogs, Forms, Spinners, Steppers, and more |
| **10 Chart Types** | Bar, Line, Area, Pie, Donut, Radar, Radial, Gauge, Sparkline |
| **42 SVG Shapes** | Decorative shapes for unique layouts |
| **React & Vue 3** | Full support for both frameworks |
| **Nuxt Ready** | SSR-compatible with shadcn-nuxt module |
| **shadcn CLI** | Install via `shadcn` (React) or `shadcn-vue` (Vue/Nuxt) |
| **Accessible** | Built on Radix UI (React) & Reka UI (Vue) |
| **Dark Mode** | Full light/dark theme support |
| **TypeScript** | Complete type safety |
| **Tailwind v4** | Modern CSS with latest Tailwind |

## Quick Start

### React (shadcn CLI)

```bash
# Install a component
npx shadcn@latest add https://boldkit.dev/r/button.json

# Install multiple components
npx shadcn@latest add https://boldkit.dev/r/button.json https://boldkit.dev/r/card.json https://boldkit.dev/r/input.json

# Install shapes
npx shadcn@latest add https://boldkit.dev/r/shapes.json

# Install theme (CSS variables)
npx shadcn@latest add https://boldkit.dev/r/theme.json
```

### Vue 3 (shadcn-vue CLI)

```bash
# Install a component
npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json

# Install multiple components
npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json https://boldkit.dev/r/vue/card.json https://boldkit.dev/r/vue/input.json

# Install shapes
npx shadcn-vue@latest add https://boldkit.dev/r/vue/shapes.json

# Install theme (CSS variables)
npx shadcn-vue@latest add https://boldkit.dev/r/vue/theme.json
```

### Nuxt

```bash
# 1. Add shadcn-nuxt module
npx nuxi@latest module add shadcn-nuxt

# 2. Initialize shadcn-vue (select Nuxt when prompted)
npx shadcn-vue@latest init

# 3. Install BoldKit components
npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json
```

**nuxt.config.ts:**

```typescript
export default defineNuxtConfig({
  modules: ['shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})
```

> **Note:** Some components (Drawer, Sonner, Command, Calendar, Chart) require `<ClientOnly>` wrapper for SSR. See the [Nuxt installation guide](https://boldkit.dev/docs/installation#nuxt-installation) for details.

### Using Registry Alias

**React** - Add to your `components.json`:

```json
{
  "registries": {
    "@boldkit": "https://boldkit.dev/r"
  }
}
```

**Vue** - Add to your `components.json`:

```json
{
  "registries": {
    "@boldkit": "https://boldkit.dev/r/vue"
  }
}
```

Then install:

```bash
npx shadcn@latest add @boldkit/button @boldkit/card @boldkit/input
# or for Vue
npx shadcn-vue@latest add @boldkit/button @boldkit/card @boldkit/input
```

## Usage

### React

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Example() {
  return (
    <Card>
      <CardHeader className="bg-primary">
        <CardTitle className="flex items-center gap-2">
          Welcome to BoldKit
          <Badge variant="secondary">New</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Build bold, beautiful interfaces with ease.</p>
        <div className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Vue 3

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Card>
    <CardHeader class="bg-primary">
      <CardTitle class="flex items-center gap-2">
        Welcome to BoldKit
        <Badge variant="secondary">New</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <p>Build bold, beautiful interfaces with ease.</p>
      <div class="flex gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
      </div>
    </CardContent>
  </Card>
</template>
```

<div align="center">

![Code Example Output](assets/example-output.png)

</div>

## Components

<details>
<summary><strong>Form Components</strong></summary>

- Button (7 variants, 5 sizes)
- Input
- Textarea
- Checkbox
- Radio Group
- Select
- Switch
- Slider
- Label
- Input OTP
- **Dropzone** (drag-and-drop file upload) ✨ NEW

</details>

<details>
<summary><strong>Layout & Containers</strong></summary>

- Card
- Layered Card (stacked paper effect)
- **Stat Card** (statistics display) ✨ NEW
- Dialog
- Drawer
- Sheet
- Accordion
- Collapsible
- Tabs
- **Stepper** (multi-step forms/wizards) ✨ NEW
- Scroll Area
- Aspect Ratio
- Separator

</details>

<details>
<summary><strong>Feedback & Status</strong></summary>

- Alert
- Alert Dialog
- Badge
- Progress
- Skeleton
- **Spinner** (5 animation variants) ✨ NEW
- Sonner (Toast)

</details>

<details>
<summary><strong>Navigation</strong></summary>

- Breadcrumb
- Dropdown Menu
- Command Palette
- Pagination
- Popover
- Tooltip
- Hover Card

</details>

<details>
<summary><strong>Data Display</strong></summary>

- Avatar
- Table
- Calendar
- **Kbd** (keyboard shortcut hints) ✨ NEW

</details>

<details>
<summary><strong>Charts (10 Types)</strong></summary>

- Area Chart
- Bar Chart
- Line Chart
- Pie Chart
- **Donut Chart** (pie with center content) ✨ NEW
- **Radar Chart** (multi-variable comparison) ✨ NEW
- **Radial Bar Chart** (circular progress) ✨ NEW
- **Gauge Chart** (speedometer KPI) ✨ NEW
- **Sparkline** (inline trend charts) ✨ NEW

</details>

<details>
<summary><strong>Decorative (Neubrutalism Special)</strong></summary>

- Sticker (rotated labels)
- Marquee (scrolling ticker)
- 42 SVG Shapes (Burst, Blob, Lightning, Heart, Star, Sun, Planet, and more)

</details>

## Shapes

42 decorative SVG shapes for unique neubrutalism layouts:

### React

```tsx
import { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'

<BurstShape size={100} className="text-primary" />
<HeartShape size={80} filled={false} strokeWidth={4} />
<LightningShape size={60} className="text-accent" />
```

### Vue 3

```vue
<script setup lang="ts">
import { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'
</script>

<template>
  <BurstShape :size="100" class="text-primary" />
  <HeartShape :size="80" :filled="false" :stroke-width="4" />
  <LightningShape :size="60" class="text-accent" />
</template>
```

<div align="center">

![SVG Shapes](assets/shapes.png)

</div>

## Theming

Customize with CSS variables (works for both React and Vue):

```css
:root {
  --primary: 0 84% 71%;       /* Coral */
  --secondary: 174 62% 56%;   /* Teal */
  --accent: 49 100% 71%;      /* Yellow */
  --destructive: 0 84% 60%;   /* Red */
  --shadow-color: 240 10% 10%;
  --radius: 0rem;             /* Keep it square! */
}
```

Visit the [Theme Builder](https://boldkit.dev/themes) to create custom themes.

## Tech Stack

### React
- **React 19** - Latest React with concurrent features
- **Radix UI** - Accessible primitives
- **Recharts** - Data visualization

### Vue 3
- **Vue 3** - Composition API with `<script setup>`
- **Reka UI** - Accessible primitives (Radix port for Vue)
- **vue-echarts** - Data visualization

### Nuxt
- **Nuxt** - Vue meta-framework with SSR support
- **shadcn-nuxt** - Official Nuxt module for shadcn-vue
- **Auto-imports** - Components auto-imported from `components/ui`
- **VueUse** - SSR-safe composables

### Shared
- **Tailwind CSS v4** - Modern utility-first CSS
- **TypeScript** - Full type safety
- **Class Variance Authority** - Variant management
- **Vite** - Fast development and builds

## Project Structure

```
boldkit/
├── src/                    # React documentation site
├── packages/
│   └── vue/               # Vue 3 components
│       └── src/
│           └── components/
│               └── ui/    # Vue SFC components
├── public/
│   └── r/                 # Component registry
│       ├── *.json         # React registry
│       └── vue/
│           └── *.json     # Vue registry
```

## Development

```bash
# Clone
git clone https://github.com/ANIBIT14/boldkit.git
cd boldkit

# Install
npm install

# Dev server (React docs site)
npm run dev

# Build
npm run build

# Build registry
npm run registry:build
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT License - free for personal and commercial use.

---

<div align="center">

**Built by [Aniruddha Agarwal](https://github.com/ANIBIT14)**

[LinkedIn](https://www.linkedin.com/in/aniruddhaagarwal/) · [GitHub](https://github.com/ANIBIT14/boldkit)

</div>

