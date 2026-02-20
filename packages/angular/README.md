# BoldKit Angular

> **⚠️ EXPERIMENTAL** - This Angular port is under active development and not yet ready for production use.

A neubrutalism Angular component library - Bold, raw, beautiful.

## Overview

BoldKit Angular is a port of [BoldKit](https://boldkit.dev) for Angular applications. It provides the same neubrutalism design aesthetic with Angular-native components.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Angular 18/19 | Framework |
| @radix-ng/primitives | Headless primitives (planned) |
| Tailwind CSS 4 | Styling |
| CVA | Type-safe variants |
| lucide-angular | Icons |

## Installation (Coming Soon)

```bash
npm install @boldkit/angular
```

## Usage

```typescript
import { ButtonComponent, CardComponent } from '@boldkit/angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <bk-card>
      <bk-card-header>
        <bk-card-title>Hello BoldKit</bk-card-title>
      </bk-card-header>
      <bk-card-content>
        <button bkButton variant="primary">Click Me</button>
      </bk-card-content>
    </bk-card>
  `
})
export class ExampleComponent {}
```

## Available Components

### Implemented
- [x] Button (`bk-button`, `button[bkButton]`)
- [x] Card (`bk-card`, `bk-card-header`, `bk-card-content`, etc.)
- [x] Badge (`bk-badge`)
- [x] Input (`input[bkInput]`)

### Planned
- [ ] Dialog
- [ ] Select
- [ ] Checkbox
- [ ] Radio Group
- [ ] Tabs
- [ ] Tooltip
- [ ] Popover
- [ ] And 35+ more...

## Design Tokens

BoldKit uses the same CSS variables as the React and Vue versions:

```css
--radius: 0;              /* No border radius */
--border-width: 3px;      /* Thick borders */
--shadow-offset: 4px;     /* Hard shadows */
```

## Architecture

Following the spartan-ng pattern:

- **Components** - Styled, ready-to-use Angular components
- **Directives** - Apply BoldKit styles to native elements
- **Utils** - Shared utilities like `cn()` for class merging

## Development

```bash
cd packages/angular
pnpm install
pnpm build
```

## Contributing

This port is experimental. Contributions welcome!

## License

MIT
