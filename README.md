# BoldKit

<div align="center">

![BoldKit Banner](assets/banner.png)

**Bold. Raw. Beautiful.**

A neubrutalism React component library built on shadcn/ui.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://typescriptlang.org)
[![Components](https://img.shields.io/badge/Components-45-FF6B6B)](https://boldkit.dev/components)
[![Shapes](https://img.shields.io/badge/SVG_Shapes-30-FFD93D)](https://boldkit.dev/shapes)

[Website](https://boldkit.dev) · [Documentation](https://boldkit.dev/docs) · [Components](https://boldkit.dev/components) · [Shapes](https://boldkit.dev/shapes)

</div>

---

## Preview

<div align="center">

![BoldKit Components](assets/preview.png)

*45 beautifully crafted neubrutalism components*

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
| **45 Components** | Buttons, Cards, Dialogs, Forms, and more |
| **30 SVG Shapes** | Decorative shapes for unique layouts |
| **shadcn CLI** | Install directly via `npx shadcn@latest add` |
| **Accessible** | Built on Radix UI primitives |
| **Dark Mode** | Full light/dark theme support |
| **TypeScript** | Complete type safety |
| **Tailwind v4** | Modern CSS with latest Tailwind |

## Quick Start

### Install with shadcn CLI (Recommended)

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

### Using Registry Alias

Add to your `components.json`:

```json
{
  "registries": {
    "@boldkit": "https://boldkit.dev/r"
  }
}
```

Then install:

```bash
npx shadcn@latest add @boldkit/button @boldkit/card @boldkit/input
```

## Usage

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

</details>

<details>
<summary><strong>Layout & Containers</strong></summary>

- Card
- Layered Card (stacked paper effect)
- Dialog
- Drawer
- Sheet
- Accordion
- Collapsible
- Tabs
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
- Charts (via Recharts)

</details>

<details>
<summary><strong>Decorative (Neubrutalism Special)</strong></summary>

- Sticker (rotated labels)
- Marquee (scrolling ticker)
- 30 SVG Shapes (Burst, Blob, Lightning, Heart, Star, and more)

</details>

## Shapes

30 decorative SVG shapes for unique neubrutalism layouts:

```tsx
import { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'

<BurstShape size={100} className="text-primary" />
<HeartShape size={80} filled={false} strokeWidth={4} />
<LightningShape size={60} className="text-accent" />
```

<div align="center">

![SVG Shapes](assets/shapes.png)

</div>

## Theming

Customize with CSS variables:

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

- **React 19** - Latest React with concurrent features
- **Tailwind CSS v4** - Modern utility-first CSS
- **Radix UI** - Accessible primitives
- **TypeScript** - Full type safety
- **Class Variance Authority** - Variant management
- **Vite** - Fast development and builds

## Development

```bash
# Clone
git clone https://github.com/ANIBIT14/boldkit.git
cd boldkit

# Install
npm install

# Dev server
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

[Website](https://boldkit.dev) · [GitHub](https://github.com/ANIBIT14/boldkit) · [Twitter](https://twitter.com/aniruddhaagarwal)

</div>
