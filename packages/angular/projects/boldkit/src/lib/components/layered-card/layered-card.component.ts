import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const layeredCardVariants = cva('relative', {
  variants: {
    layers: {
      single: '',
      double: '',
      triple: '',
    },
    offset: {
      sm: '',
      default: '',
      lg: '',
    },
    layerColor: {
      default: '',
      primary: '',
      secondary: '',
      accent: '',
      muted: '',
    },
  },
  defaultVariants: {
    layers: 'double',
    offset: 'default',
    layerColor: 'default',
  },
})

export type LayeredCardVariants = VariantProps<typeof layeredCardVariants>

@Component({
  selector: 'bk-layered-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Layer 3 (furthest back) -->
    <div
      *ngIf="layerCount >= 3"
      [class]="getLayerClass('opacity-50')"
      [style.transform]="'translate(' + (offsetPx * 3) + 'px, ' + (offsetPx * 3) + 'px)'">
    </div>

    <!-- Layer 2 -->
    <div
      *ngIf="layerCount >= 2"
      [class]="getLayerClass('opacity-70')"
      [style.transform]="'translate(' + (offsetPx * 2) + 'px, ' + (offsetPx * 2) + 'px)'">
    </div>

    <!-- Layer 1 -->
    <div
      *ngIf="layerCount >= 1"
      [class]="getLayerClass()"
      [style.transform]="'translate(' + offsetPx + 'px, ' + offsetPx + 'px)'">
    </div>

    <!-- Main card (top layer) -->
    <div [class]="mainCardClass">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayeredCardComponent {
  @Input() layers: LayeredCardVariants['layers'] = 'double'
  @Input() offset: LayeredCardVariants['offset'] = 'default'
  @Input() layerColor: LayeredCardVariants['layerColor'] = 'default'
  @Input() interactive: boolean = false
  @Input() class: string = ''

  private offsetSizes = { sm: 6, default: 8, lg: 12 }
  private colorClasses = {
    default: 'bg-muted',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    muted: 'bg-muted',
  }

  @HostBinding('class')
  get hostClass(): string {
    return cn(layeredCardVariants({ layers: this.layers, offset: this.offset, layerColor: this.layerColor }), this.class)
  }

  get offsetPx(): number {
    return this.offsetSizes[this.offset || 'default']
  }

  get layerCount(): number {
    return this.layers === 'single' ? 1 : this.layers === 'triple' ? 3 : 2
  }

  get layerBg(): string {
    return this.colorClasses[this.layerColor || 'default']
  }

  getLayerClass(extraClass: string = ''): string {
    return cn('absolute inset-0 border-3 border-foreground', this.layerBg, extraClass)
  }

  get mainCardClass(): string {
    return cn(
      'relative border-3 border-foreground bg-card text-card-foreground',
      this.interactive && 'cursor-pointer transition-transform duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px]'
    )
  }
}

@Component({
  selector: 'bk-layered-card-header',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayeredCardHeaderComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('flex flex-col space-y-1.5 border-b-3 border-foreground bg-muted p-4', this.class)
  }
}

@Component({
  selector: 'bk-layered-card-title',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayeredCardTitleComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('text-xl font-bold uppercase tracking-wide', this.class)
  }
}

@Component({
  selector: 'bk-layered-card-description',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayeredCardDescriptionComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('text-sm text-muted-foreground', this.class)
  }
}

@Component({
  selector: 'bk-layered-card-content',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayeredCardContentComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('p-4', this.class)
  }
}

@Component({
  selector: 'bk-layered-card-footer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayeredCardFooterComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('flex items-center border-t-3 border-foreground bg-muted p-4', this.class)
  }
}

export const LayeredCardComponents = [
  LayeredCardComponent,
  LayeredCardHeaderComponent,
  LayeredCardTitleComponent,
  LayeredCardDescriptionComponent,
  LayeredCardContentComponent,
  LayeredCardFooterComponent,
]
