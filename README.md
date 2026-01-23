# BoldKit

A neubrutalism React component library built on top of shadcn/ui.

**Bold. Raw. Beautiful.**

[boldkit.dev](https://boldkit.dev) | [Documentation](https://boldkit.dev/docs) | [Components](https://boldkit.dev/components)

## Features

- **30+ Components** - All shadcn/ui components styled with neubrutalism aesthetics
- **Accessible** - Built on Radix UI primitives with full keyboard navigation
- **Customizable** - CSS variables for easy theming
- **TypeScript** - Full type safety and IntelliSense support
- **Mobile-First** - Responsive design that works on all devices
- **Dark Mode** - Built-in support for light and dark themes

## Design Principles

BoldKit follows the neubrutalism design aesthetic:

- **Bold Colors** - High-contrast, vibrant color palettes
- **Thick Borders** - 3px solid borders that define elements
- **Hard Shadows** - Offset shadows with no blur (e.g., 4px 4px 0px)
- **Raw Typography** - Bold, uppercase text for emphasis
- **Minimal Radius** - Square or barely-rounded corners

## Quick Start

```bash
# Install dependencies
bun add clsx tailwind-merge class-variance-authority lucide-react

# Copy components from the repository
# Or use the CLI (coming soon)
npx boldkit-ui init
```

## Usage

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export function Example() {
  return (
    <Card>
      <CardHeader className="bg-primary">
        Welcome to BoldKit
      </CardHeader>
      <CardContent>
        <Button variant="secondary">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Components

| Category | Components |
|----------|------------|
| Form | Button, Input, Textarea, Checkbox, Radio, Select, Switch, Slider, Label |
| Data Display | Card, Badge, Avatar, Table, Progress, Skeleton, Separator |
| Feedback | Alert, Dialog, Sheet, Toast, Tooltip, Popover |
| Navigation | Tabs, Accordion, Breadcrumb, Dropdown Menu, Command |
| Layout | Aspect Ratio, Scroll Area, Collapsible |

## Theming

Customize BoldKit with CSS variables:

```css
:root {
  --primary: 0 84% 71%;       /* Coral */
  --secondary: 174 62% 56%;   /* Teal */
  --accent: 49 100% 71%;      /* Yellow */
  --shadow-offset: 4px;
  --border-width: 3px;
}
```

## Development

```bash
# Clone the repository
git clone https://github.com/boldkit/boldkit.git

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with React, Tailwind CSS & Radix UI
