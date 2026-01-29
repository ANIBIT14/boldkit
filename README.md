# BoldKit

A neubrutalism React component library built on top of shadcn/ui.

**Bold. Raw. Beautiful.**

[boldkit.dev](https://boldkit.dev) | [Documentation](https://boldkit.dev/docs) | [Components](https://boldkit.dev/components)

## Features

- **30+ Components** - All shadcn/ui components styled with neubrutalism aesthetics
- **shadcn CLI Compatible** - Install components directly using the shadcn CLI
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

## Installation

### Using shadcn CLI (Recommended)

Add BoldKit as a registry in your `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "registries": {
    "@boldkit": "https://boldkit.dev/r"
  }
}
```

Then install components:

```bash
# Install a single component
npx shadcn@latest add @boldkit/button

# Install multiple components
npx shadcn@latest add @boldkit/button @boldkit/card @boldkit/input

# Install all components
npx shadcn@latest add @boldkit/accordion @boldkit/alert @boldkit/avatar @boldkit/badge @boldkit/breadcrumb @boldkit/button @boldkit/card @boldkit/checkbox @boldkit/collapsible @boldkit/command @boldkit/dialog @boldkit/dropdown-menu @boldkit/input @boldkit/label @boldkit/popover @boldkit/progress @boldkit/radio-group @boldkit/scroll-area @boldkit/select @boldkit/separator @boldkit/sheet @boldkit/skeleton @boldkit/slider @boldkit/sonner @boldkit/switch @boldkit/table @boldkit/tabs @boldkit/textarea @boldkit/toggle @boldkit/toggle-group @boldkit/tooltip
```

### Direct URL Installation

You can also install directly from the registry URL:

```bash
npx shadcn@latest add https://boldkit.dev/r/button.json
```

### Manual Installation

1. Install dependencies:

```bash
npm add clsx tailwind-merge class-variance-authority lucide-react
```

2. Copy the utils file to `lib/utils.ts`:

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

3. Add BoldKit CSS variables to your global CSS:

```css
:root {
  --background: 60 9% 98%;
  --foreground: 240 10% 10%;
  --primary: 0 84% 71%;
  --primary-foreground: 240 10% 10%;
  --secondary: 174 62% 56%;
  --secondary-foreground: 240 10% 10%;
  --accent: 49 100% 71%;
  --accent-foreground: 240 10% 10%;
  --muted: 60 5% 90%;
  --muted-foreground: 240 4% 46%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --success: 152 69% 69%;
  --success-foreground: 240 10% 10%;
  --warning: 49 100% 60%;
  --warning-foreground: 240 10% 10%;
  --info: 212 100% 73%;
  --info-foreground: 240 10% 10%;
  --border: 240 10% 10%;
  --input: 240 10% 10%;
  --ring: 240 10% 10%;
  --radius: 0rem;
  --shadow-color: 240 10% 10%;
}

.dark {
  --background: 240 10% 10%;
  --foreground: 60 9% 98%;
  --border: 60 9% 98%;
  --input: 60 9% 98%;
  --ring: 60 9% 98%;
  --shadow-color: 0 0% 0%;
}
```

4. Copy components from the `registry/default/ui` folder.

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
| Form | Button, Input, Textarea, Checkbox, Radio Group, Select, Switch, Slider, Label |
| Data Display | Card, Badge, Avatar, Table, Progress, Skeleton, Separator |
| Feedback | Alert, Dialog, Sheet, Sonner (Toast), Tooltip, Popover |
| Navigation | Tabs, Accordion, Breadcrumb, Dropdown Menu, Command |
| Layout | Aspect Ratio, Scroll Area, Collapsible, Toggle, Toggle Group |

## Theming

Customize BoldKit with CSS variables:

```css
:root {
  --primary: 0 84% 71%;       /* Coral */
  --secondary: 174 62% 56%;   /* Teal */
  --accent: 49 100% 71%;      /* Yellow */
  --shadow-color: 240 10% 10%;
  --radius: 0rem;
}
```

## Development

```bash
# Clone the repository
git clone https://github.com/ANIBIT14/boldkit.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build the registry
npm run registry:build
```

## Registry Structure

BoldKit uses the shadcn registry format:

```
registry/
└── default/
    ├── lib/
    │   └── utils.ts
    └── ui/
        ├── button.tsx
        ├── card.tsx
        └── ...
```

The `registry:build` script generates JSON files in `public/r/` that can be consumed by the shadcn CLI.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with React, Tailwind CSS & Radix UI

**Sources:**
- [shadcn/ui Registry Documentation](https://ui.shadcn.com/docs/registry/getting-started)
- [registry.json Schema](https://ui.shadcn.com/docs/registry/registry-json)
- [components.json Configuration](https://ui.shadcn.com/docs/components-json)
