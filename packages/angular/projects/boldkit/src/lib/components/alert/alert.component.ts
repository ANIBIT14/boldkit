import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const alertVariants = cva(
  'relative w-full border-3 border-foreground p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type AlertVariants = VariantProps<typeof alertVariants>

@Component({
  selector: 'bk-alert',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`],
  host: { 'role': 'alert' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() variant: AlertVariants['variant'] = 'default'
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(alertVariants({ variant: this.variant }), this.class)
  }
}

@Component({
  selector: 'bk-alert-title',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertTitleComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('mb-1 font-bold uppercase tracking-wide leading-none', this.class)
  }
}

@Component({
  selector: 'bk-alert-description',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDescriptionComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('text-sm [&_p]:leading-relaxed', this.class)
  }
}

export const AlertComponents = [AlertComponent, AlertTitleComponent, AlertDescriptionComponent]
