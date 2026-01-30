---
title: "Introducing BoldKit: A Neubrutalism React Component Library"
published: false
description: "Meet BoldKit - 45 beautifully crafted neubrutalism React components built on shadcn/ui. Thick borders, hard shadows, bold colors. Install via shadcn CLI."
tags: react, opensource, webdev, design
cover_image: https://boldkit.dev/og-image.png
canonical_url: https://boldkit.dev
---

# Introducing BoldKit: Neubrutalism for React

Hey developers! I'm excited to share **BoldKit**, a free and open-source React component library I've been working on. If you're tired of the same polished, rounded-corner UI libraries and want something that stands out, this might be for you.

## What is Neubrutalism?

Neubrutalism (or neo-brutalism) is a bold design trend that's been taking over the web. Think:

- **Thick 3px borders** that make elements pop
- **Hard shadows** with zero blur (like `4px 4px 0px`)
- **Vibrant, high-contrast colors**
- **Square corners** - no border-radius allowed!
- **Bold, uppercase typography**

It's raw, it's unapologetic, and it's incredibly eye-catching.

![Neubrutalism Example](https://boldkit.dev/assets/style-demo.gif)

## Why BoldKit?

I built BoldKit because I wanted:

1. **shadcn/ui compatibility** - Same architecture, familiar patterns
2. **One-command installs** - Use the shadcn CLI you already know
3. **Full accessibility** - Built on Radix UI primitives
4. **Modern stack** - React 19, Tailwind CSS v4, TypeScript

## Quick Start

It's literally one command:

```bash
npx shadcn@latest add https://boldkit.dev/r/button.json
```

Or install multiple components:

```bash
npx shadcn@latest add https://boldkit.dev/r/button.json https://boldkit.dev/r/card.json https://boldkit.dev/r/input.json
```

That's it. No npm packages to manage, no version conflicts. Just copy-paste components that you own.

## What's Included?

### 45 Components

Everything you need to build complete interfaces:

**Form Controls:**
- Button (7 variants, 5 sizes)
- Input, Textarea
- Checkbox, Radio Group, Switch
- Select, Slider, Input OTP

**Layout:**
- Card & Layered Card (stacked paper effect!)
- Dialog, Drawer, Sheet
- Accordion, Tabs, Collapsible

**Feedback:**
- Alert, Alert Dialog
- Badge, Progress, Skeleton
- Toast notifications (Sonner)

**Navigation:**
- Breadcrumb, Dropdown Menu
- Command Palette, Pagination
- Popover, Tooltip

### 30 SVG Shapes

Unique to BoldKit - decorative shapes for that extra neubrutalism flair:

```tsx
import { BurstShape, HeartShape, LightningShape } from '@/components/ui/shapes'

<BurstShape size={100} className="text-primary" />
<HeartShape size={80} filled={false} strokeWidth={4} />
<LightningShape size={60} className="text-accent" />
```

Shapes include: Burst, Blob, Lightning, Heart, Stars, Shield, Cloud, Diamond, Hexagon, and 20 more!

## Code Example

Here's a quick example of BoldKit in action:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BurstShape } from '@/components/ui/shapes'

export function WelcomeCard() {
  return (
    <Card className="relative overflow-hidden">
      <BurstShape
        size={80}
        className="absolute -top-4 -right-4 text-accent opacity-50"
      />
      <CardHeader className="bg-primary">
        <CardTitle className="flex items-center gap-2">
          Welcome to BoldKit
          <Badge variant="secondary">New</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Build bold, beautiful interfaces with ease.</p>
        <div className="flex gap-2">
          <Button>Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

## Theming

BoldKit uses CSS variables, making customization dead simple:

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

There's also a [Theme Builder](https://boldkit.dev/themes) on the website where you can create and export custom themes.

## Dark Mode

Full dark mode support out of the box. The neubrutalism aesthetic works beautifully in both light and dark themes.

## Registry Setup (Optional)

If you want to use the cleaner `@boldkit/component` syntax, add this to your `components.json`:

```json
{
  "registries": {
    "@boldkit": "https://boldkit.dev/r"
  }
}
```

Then install components like:

```bash
npx shadcn@latest add @boldkit/button @boldkit/card @boldkit/badge
```

## Tech Stack

- **React 19** - Latest features
- **Tailwind CSS v4** - Modern utility-first CSS
- **Radix UI** - Accessible primitives
- **TypeScript** - Full type safety
- **Class Variance Authority** - Clean variant management
- **Vite** - Fast builds

## Links

- **Website:** [boldkit.dev](https://boldkit.dev)
- **Documentation:** [boldkit.dev/docs](https://boldkit.dev/docs)
- **Components:** [boldkit.dev/components](https://boldkit.dev/components)
- **Shapes:** [boldkit.dev/shapes](https://boldkit.dev/shapes)
- **GitHub:** [github.com/ANIBIT14/boldkit](https://github.com/ANIBIT14/boldkit)

## Contributing

BoldKit is MIT licensed and open for contributions! Whether it's:

- New components
- Bug fixes
- Documentation improvements
- New SVG shapes

Check out the [Contributing Guide](https://github.com/ANIBIT14/boldkit/blob/main/CONTRIBUTING.md) to get started.

---

## Try It Today

```bash
npx shadcn@latest add https://boldkit.dev/r/button.json
```

I'd love to hear what you think! Drop a comment below or open an issue on GitHub.

**Star the repo if you find it useful!** [github.com/ANIBIT14/boldkit](https://github.com/ANIBIT14/boldkit)

---

*Built with love by [Aniruddha Agarwal](https://github.com/ANIBIT14)*
