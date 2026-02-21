import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { cn } from '../../utils/cn'

// Base shape props interface
export interface ShapeProps {
  size?: number
  strokeWidth?: number
  filled?: boolean
  color?: string
  class?: string
}

// Shape type definition
interface ShapeData {
  path: string
  colorClass: string
  viewBox?: string
  fill?: string
}

// Shape data for generating components
const SHAPES: Record<string, ShapeData> = {
  // GEOMETRIC SHAPES
  triangle: { path: 'M50 5 L95 90 L5 90 Z', colorClass: 'text-accent' },
  diamond: { path: 'M50 5 L95 50 L50 95 L5 50 Z', colorClass: 'text-primary' },
  pentagon: { path: 'M50 5 L95 38 L77 90 L23 90 L5 38 Z', colorClass: 'text-primary' },
  hexagon: { path: 'M25 10 L75 10 L95 50 L75 90 L25 90 L5 50 Z', colorClass: 'text-secondary' },
  octagon: { path: 'M30 5 L70 5 L95 30 L95 70 L70 95 L30 95 L5 70 L5 30 Z', colorClass: 'text-accent' },
  cross: { path: 'M35 5 L65 5 L65 35 L95 35 L95 65 L65 65 L65 95 L35 95 L35 65 L5 65 L5 35 L35 35 Z', colorClass: 'text-accent' },
  trapezoid: { path: 'M20 5 L80 5 L95 55 L5 55 Z', colorClass: 'text-secondary', viewBox: '0 0 100 60' },
  parallelogram: { path: 'M20 5 L95 5 L80 45 L5 45 Z', colorClass: 'text-info', viewBox: '0 0 100 50' },

  // STAR SHAPES
  star4: { path: 'M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z', colorClass: 'text-info' },
  star5: { path: 'M50 5 L61 35 L95 35 L68 55 L79 90 L50 70 L21 90 L32 55 L5 35 L39 35 Z', colorClass: 'text-warning' },
  star6: { path: 'M50 2 L56 30 L85 15 L65 40 L98 50 L65 60 L85 85 L56 70 L50 98 L44 70 L15 85 L35 60 L2 50 L35 40 L15 15 L44 30 Z', colorClass: 'text-accent' },
  burst: { path: 'M50 5 L55 35 L85 15 L65 40 L95 50 L65 60 L85 85 L55 65 L50 95 L45 65 L15 85 L35 60 L5 50 L35 40 L15 15 L45 35 Z', colorClass: 'text-accent' },
  spark: { path: 'M50 0 L53 40 L90 20 L60 47 L100 50 L60 53 L90 80 L53 60 L50 100 L47 60 L10 80 L40 53 L0 50 L40 47 L10 20 L47 40 Z', colorClass: 'text-warning' },
  explosion: { path: 'M50 0 L55 30 L80 10 L65 35 L100 40 L70 50 L100 60 L65 65 L80 90 L55 70 L50 100 L45 70 L20 90 L35 65 L0 60 L30 50 L0 40 L35 35 L20 10 L45 30 Z', colorClass: 'text-destructive' },

  // DECORATIVE SHAPES
  heart: { path: 'M50 88 C25 65 5 45 5 30 C5 15 20 5 35 5 C42 5 50 15 50 15 C50 15 58 5 65 5 C80 5 95 15 95 30 C95 45 75 65 50 88 Z', colorClass: 'text-destructive' },
  shield: { path: 'M50 5 L90 20 L90 55 C90 75 70 90 50 95 C30 90 10 75 10 55 L10 20 Z', colorClass: 'text-primary' },
  cloud: { path: 'M25 70 C10 70 5 55 15 45 C10 35 20 20 35 25 C45 10 70 10 80 25 C95 20 100 45 90 55 C100 65 90 80 75 75 L25 75 C15 75 10 70 25 70 Z', colorClass: 'text-info' },
  lightning: { path: 'M55 5 L25 50 L45 50 L35 95 L75 45 L55 45 L70 5 Z', colorClass: 'text-warning' },
  ribbon: { path: 'M5 25 L25 35 L25 15 L75 15 L75 35 L95 25 L95 75 L75 65 L75 85 L25 85 L25 65 L5 75 Z', colorClass: 'text-accent' },
  badge: { path: 'M50 5 L65 15 L85 10 L80 30 L95 45 L80 55 L85 75 L65 70 L50 85 L35 70 L15 75 L20 55 L5 45 L20 30 L15 10 L35 15 Z', colorClass: 'text-secondary' },
  sun: { path: 'M50 25 C64 25 75 36 75 50 C75 64 64 75 50 75 C36 75 25 64 25 50 C25 36 36 25 50 25 Z M50 5 L50 15 M50 85 L50 95 M5 50 L15 50 M85 50 L95 50 M15 15 L22 22 M78 78 L85 85 M15 85 L22 78 M78 22 L85 15', colorClass: 'text-warning' },
  moon: { path: 'M70 10 C45 10 25 30 25 55 C25 80 45 95 70 95 C50 95 30 75 30 50 C30 25 50 10 70 10 Z', colorClass: 'text-secondary' },
  crescent: { path: 'M65 10 C35 10 15 35 15 55 C15 80 35 95 65 95 C45 90 30 70 30 50 C30 30 45 15 65 10 Z', colorClass: 'text-secondary' },
  rainbow: { path: 'M10 80 C10 40 35 10 50 10 C65 10 90 40 90 80 L75 80 C75 55 65 30 50 30 C35 30 25 55 25 80 Z', colorClass: 'text-info' },
  planet: { path: 'M50 15 C70 15 85 30 85 50 C85 70 70 85 50 85 C30 85 15 70 15 50 C15 30 30 15 50 15 Z M20 60 Q50 70 80 60', colorClass: 'text-primary' },
  umbrella: { path: 'M50 10 C20 10 5 35 5 55 L50 55 L50 85 C50 90 55 95 60 95 C65 95 70 90 70 85 L70 80 M50 55 L95 55 C95 35 80 10 50 10 Z', colorClass: 'text-accent' },
  apple: { path: 'M50 15 C50 5 60 5 60 15 M30 25 C15 30 10 50 10 65 C10 85 25 95 40 95 L60 95 C75 95 90 85 90 65 C90 50 85 30 70 25 C55 20 45 20 30 25 Z', colorClass: 'text-destructive' },

  // ARROWS & INDICATORS
  arrowUp: { path: 'M50 5 L90 50 L65 50 L65 95 L35 95 L35 50 L10 50 Z', colorClass: 'text-success' },
  arrowRight: { path: 'M95 50 L50 10 L50 35 L5 35 L5 65 L50 65 L50 90 Z', colorClass: 'text-success' },
  arrowDown: { path: 'M50 95 L10 50 L35 50 L35 5 L65 5 L65 50 L90 50 Z', colorClass: 'text-destructive' },
  arrowLeft: { path: 'M5 50 L50 90 L50 65 L95 65 L95 35 L50 35 L50 10 Z', colorClass: 'text-warning' },
  chevronDouble: { path: 'M15 25 L50 60 L85 25 L85 40 L50 75 L15 40 Z', colorClass: 'text-primary' },

  // COMMUNICATION
  speechBubble: { path: 'M10 15 L90 15 L90 65 L55 65 L40 85 L40 65 L10 65 Z', colorClass: 'text-info' },
  thoughtBubble: { path: 'M25 15 L75 15 C85 15 90 25 90 35 L90 55 C90 65 85 70 75 70 L45 70 L30 85 L35 70 L25 70 C15 70 10 65 10 55 L10 35 C10 25 15 15 25 15 Z M20 88 C20 85 25 82 28 85 C31 88 25 92 20 88 Z', colorClass: 'text-muted' },

  // LABELS & TAGS
  tagShape: { path: 'M5 20 L55 5 L95 50 L55 95 L5 80 Z M25 50 C25 45 30 40 35 40 C40 40 45 45 45 50 C45 55 40 60 35 60 C30 60 25 55 25 50 Z', colorClass: 'text-secondary' },
  ticketShape: { path: 'M5 15 L95 15 L95 40 C85 40 80 45 80 50 C80 55 85 60 95 60 L95 85 L5 85 L5 60 C15 60 20 55 20 50 C20 45 15 40 5 40 Z', colorClass: 'text-accent' },

  // ABSTRACT
  wave: { path: 'M0 50 C15 30 35 30 50 50 C65 70 85 70 100 50 L100 100 L0 100 Z', colorClass: 'text-info' },
  zigzag: { path: 'M0 50 L20 20 L40 50 L60 20 L80 50 L100 20 L100 80 L80 50 L60 80 L40 50 L20 80 L0 50 Z', colorClass: 'text-warning' },
  spiral: { path: 'M50 50 C50 35 65 35 65 50 C65 65 35 65 35 50 C35 25 75 25 75 50 C75 75 25 75 25 50 C25 15 85 15 85 50', colorClass: 'text-secondary', fill: 'none' },
  infinity: { path: 'M25 50 C25 35 40 35 50 50 C60 65 75 65 75 50 C75 35 60 35 50 50 C40 65 25 65 25 50 Z', colorClass: 'text-primary', fill: 'none' },
}

// Base shape component
@Component({
  selector: 'bk-shape',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="getHeight()"
      [attr.viewBox]="viewBox"
      [class]="hostClass">
      <path
        [attr.d]="path"
        [attr.fill]="getFill()"
        stroke="hsl(var(--foreground))"
        [attr.stroke-width]="strokeWidth"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShapeComponent {
  @Input() shape: string = 'heart'
  @Input() size: number = 100
  @Input() strokeWidth: number = 3
  @Input() filled: boolean = true
  @Input() color?: string
  @Input() class: string = ''

  get shapeData(): ShapeData {
    return SHAPES[this.shape] || SHAPES['heart']
  }

  get path(): string {
    return this.shapeData.path
  }

  get viewBox(): string {
    return this.shapeData.viewBox || '0 0 100 100'
  }

  get hostClass(): string {
    return cn(this.shapeData.colorClass, this.class)
  }

  getHeight(): number {
    if (this.shapeData.viewBox) {
      const parts = this.shapeData.viewBox.split(' ')
      const height = parseInt(parts[3]) / parseInt(parts[2])
      return this.size * height
    }
    return this.size
  }

  getFill(): string {
    if (this.shapeData.fill === 'none') return 'none'
    return this.filled ? (this.color || 'currentColor') : 'none'
  }
}

// Individual shape components for convenience
@Component({
  selector: 'bk-heart-shape',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100" [class]="hostClass">
      <path d="M50 88 C25 65 5 45 5 30 C5 15 20 5 35 5 C42 5 50 15 50 15 C50 15 58 5 65 5 C80 5 95 15 95 30 C95 45 75 65 50 88 Z" [attr.fill]="fill" stroke="hsl(var(--foreground))" [attr.stroke-width]="strokeWidth"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartShapeComponent {
  @Input() size: number = 100
  @Input() strokeWidth: number = 3
  @Input() filled: boolean = true
  @Input() color?: string
  @Input() class: string = ''

  get hostClass(): string { return cn('text-destructive', this.class) }
  get fill(): string { return this.filled ? (this.color || 'currentColor') : 'none' }
}

@Component({
  selector: 'bk-star-shape',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100" [class]="hostClass">
      <path d="M50 5 L61 35 L95 35 L68 55 L79 90 L50 70 L21 90 L32 55 L5 35 L39 35 Z" [attr.fill]="fill" stroke="hsl(var(--foreground))" [attr.stroke-width]="strokeWidth"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarShapeComponent {
  @Input() size: number = 100
  @Input() strokeWidth: number = 3
  @Input() filled: boolean = true
  @Input() color?: string
  @Input() class: string = ''

  get hostClass(): string { return cn('text-warning', this.class) }
  get fill(): string { return this.filled ? (this.color || 'currentColor') : 'none' }
}

@Component({
  selector: 'bk-burst-shape',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100" [class]="hostClass">
      <path d="M50 5 L55 35 L85 15 L65 40 L95 50 L65 60 L85 85 L55 65 L50 95 L45 65 L15 85 L35 60 L5 50 L35 40 L15 15 L45 35 Z" [attr.fill]="fill" stroke="hsl(var(--foreground))" [attr.stroke-width]="strokeWidth"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurstShapeComponent {
  @Input() size: number = 100
  @Input() strokeWidth: number = 3
  @Input() filled: boolean = true
  @Input() color?: string
  @Input() class: string = ''

  get hostClass(): string { return cn('text-accent', this.class) }
  get fill(): string { return this.filled ? (this.color || 'currentColor') : 'none' }
}

@Component({
  selector: 'bk-shield-shape',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100" [class]="hostClass">
      <path d="M50 5 L90 20 L90 55 C90 75 70 90 50 95 C30 90 10 75 10 55 L10 20 Z" [attr.fill]="fill" stroke="hsl(var(--foreground))" [attr.stroke-width]="strokeWidth"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShieldShapeComponent {
  @Input() size: number = 100
  @Input() strokeWidth: number = 3
  @Input() filled: boolean = true
  @Input() color?: string
  @Input() class: string = ''

  get hostClass(): string { return cn('text-primary', this.class) }
  get fill(): string { return this.filled ? (this.color || 'currentColor') : 'none' }
}

@Component({
  selector: 'bk-lightning-shape',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100" [class]="hostClass">
      <path d="M55 5 L25 50 L45 50 L35 95 L75 45 L55 45 L70 5 Z" [attr.fill]="fill" stroke="hsl(var(--foreground))" [attr.stroke-width]="strokeWidth"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightningShapeComponent {
  @Input() size: number = 100
  @Input() strokeWidth: number = 3
  @Input() filled: boolean = true
  @Input() color?: string
  @Input() class: string = ''

  get hostClass(): string { return cn('text-warning', this.class) }
  get fill(): string { return this.filled ? (this.color || 'currentColor') : 'none' }
}

@Component({
  selector: 'bk-cloud-shape',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100" [class]="hostClass">
      <path d="M25 70 C10 70 5 55 15 45 C10 35 20 20 35 25 C45 10 70 10 80 25 C95 20 100 45 90 55 C100 65 90 80 75 75 L25 75 C15 75 10 70 25 70 Z" [attr.fill]="fill" stroke="hsl(var(--foreground))" [attr.stroke-width]="strokeWidth"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloudShapeComponent {
  @Input() size: number = 100
  @Input() strokeWidth: number = 3
  @Input() filled: boolean = true
  @Input() color?: string
  @Input() class: string = ''

  get hostClass(): string { return cn('text-info', this.class) }
  get fill(): string { return this.filled ? (this.color || 'currentColor') : 'none' }
}

@Component({
  selector: 'bk-hexagon-shape',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100" [class]="hostClass">
      <path d="M25 10 L75 10 L95 50 L75 90 L25 90 L5 50 Z" [attr.fill]="fill" stroke="hsl(var(--foreground))" [attr.stroke-width]="strokeWidth"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HexagonShapeComponent {
  @Input() size: number = 100
  @Input() strokeWidth: number = 3
  @Input() filled: boolean = true
  @Input() color?: string
  @Input() class: string = ''

  get hostClass(): string { return cn('text-secondary', this.class) }
  get fill(): string { return this.filled ? (this.color || 'currentColor') : 'none' }
}

@Component({
  selector: 'bk-diamond-shape',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100" [class]="hostClass">
      <path d="M50 5 L95 50 L50 95 L5 50 Z" [attr.fill]="fill" stroke="hsl(var(--foreground))" [attr.stroke-width]="strokeWidth"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiamondShapeComponent {
  @Input() size: number = 100
  @Input() strokeWidth: number = 3
  @Input() filled: boolean = true
  @Input() color?: string
  @Input() class: string = ''

  get hostClass(): string { return cn('text-primary', this.class) }
  get fill(): string { return this.filled ? (this.color || 'currentColor') : 'none' }
}

export const ShapeComponents = [
  ShapeComponent,
  HeartShapeComponent,
  StarShapeComponent,
  BurstShapeComponent,
  ShieldShapeComponent,
  LightningShapeComponent,
  CloudShapeComponent,
  HexagonShapeComponent,
  DiamondShapeComponent,
]

// Export shape names for dynamic usage
export const SHAPE_NAMES = Object.keys(SHAPES)
