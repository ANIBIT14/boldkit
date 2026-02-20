# BoldKit Angular

> **⚠️ EXPERIMENTAL** - This Angular port is under active development.

A neubrutalism Angular component library - Bold, raw, beautiful.

## Overview

BoldKit Angular is a port of [BoldKit](https://boldkit.dev) for Angular applications. It provides the same neubrutalism design aesthetic with Angular-native components.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Angular 18/19 | Framework |
| Tailwind CSS 4 | Styling |
| CVA | Type-safe variants |
| lucide-angular | Icons |

## Installation

```bash
npm install @boldkit/angular
```

## Usage

```typescript
import { ButtonComponent, CardComponent, HeartShapeComponent } from '@boldkit/angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent, CardComponent, HeartShapeComponent],
  template: `
    <bk-card>
      <bk-card-header>
        <bk-card-title>Hello BoldKit</bk-card-title>
      </bk-card-header>
      <bk-card-content>
        <bk-heart-shape [size]="48"></bk-heart-shape>
        <button bkButton variant="primary">Click Me</button>
      </bk-card-content>
    </bk-card>
  `
})
export class ExampleComponent {}
```

## Available Components (35+)

### Form Controls
- [x] Button (`bk-button`, `button[bkButton]`)
- [x] Input (`input[bkInput]`)
- [x] Textarea (`textarea[bkTextarea]`)
- [x] Checkbox (`bk-checkbox`)
- [x] Radio Group (`bk-radio-group`, `bk-radio-group-item`)
- [x] Switch (`bk-switch`)
- [x] Slider (`bk-slider`)
- [x] Toggle (`bk-toggle`)
- [x] Toggle Group (`bk-toggle-group`, `bk-toggle-group-item`)
- [x] Label (`bk-label`)
- [x] Select (`bk-select`)

### Layout & Container
- [x] Card (`bk-card`, `bk-card-header`, `bk-card-content`, etc.)
- [x] Layered Card (`bk-layered-card`)
- [x] Separator (`bk-separator`)
- [x] Aspect Ratio (`bk-aspect-ratio`)
- [x] Table (`bk-table`, directives)
- [x] Scroll Area (`bk-scroll-area`)
- [x] Collapsible (`bk-collapsible`)

### Feedback
- [x] Alert (`bk-alert`, `bk-alert-title`, `bk-alert-description`)
- [x] Badge (`bk-badge`)
- [x] Skeleton (`bk-skeleton`)
- [x] Progress (`bk-progress`)

### Navigation
- [x] Tabs (`bk-tabs`, `bk-tabs-list`, `bk-tabs-trigger`, `bk-tabs-content`)
- [x] Breadcrumb (`bk-breadcrumb`)
- [x] Pagination (`bk-pagination`)
- [x] Accordion (`bk-accordion`)

### Overlay
- [x] Dialog (`bk-dialog`)
- [x] Tooltip (`bk-tooltip`)
- [x] Popover (`bk-popover`)

### Data Display
- [x] Avatar (`bk-avatar`, `bk-avatar-image`, `bk-avatar-fallback`)

### Special BoldKit Components
- [x] Sticker (`bk-sticker`)
- [x] Stamp (`bk-stamp`)
- [x] Sticky Note (`bk-sticky-note`)
- [x] Marquee (`bk-marquee`, `bk-marquee-item`)

### Shapes (42 SVG Shapes)
- [x] Generic Shape (`bk-shape [shape]="'heart'"`)
- [x] Heart (`bk-heart-shape`)
- [x] Star (`bk-star-shape`)
- [x] Burst (`bk-burst-shape`)
- [x] Shield (`bk-shield-shape`)
- [x] Lightning (`bk-lightning-shape`)
- [x] Cloud (`bk-cloud-shape`)
- [x] Hexagon (`bk-hexagon-shape`)
- [x] Diamond (`bk-diamond-shape`)
- And 33 more via the generic `bk-shape` component!

## Design Tokens

BoldKit uses the same CSS variables as the React and Vue versions:

```css
--radius: 0;              /* No border radius */
--border-width: 3px;      /* Thick borders */
--shadow-offset: 4px;     /* Hard shadows */
```

Import the styles in your `styles.css`:

```css
@import '@boldkit/angular/styles/globals.css';
```

## Architecture

- **Standalone Components** - All components are standalone and tree-shakeable
- **CVA Variants** - Same variant system as React version
- **ControlValueAccessor** - Form controls work with Angular forms
- **OnPush** - All components use OnPush change detection

## Development

```bash
cd packages/angular
npm install
npm run build
```

## License

MIT
