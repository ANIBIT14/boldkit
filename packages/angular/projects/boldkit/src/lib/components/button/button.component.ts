import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

/**
 * Button variants using CVA (Class Variance Authority)
 * These are identical to the React version for consistency
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-3 border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        accent:
          'bg-accent text-accent-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        destructive:
          'bg-destructive text-destructive-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        outline:
          'bg-background text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none hover:bg-muted active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        ghost:
          'border-transparent shadow-none hover:bg-muted hover:border-foreground',
        link: 'border-transparent shadow-none underline-offset-4 hover:underline text-primary',
        noShadow:
          'bg-primary text-primary-foreground',
        reverse:
          'bg-primary text-primary-foreground hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-11 w-11',
      },
      animation: {
        none: '',
        pulse: 'animate-[brutal-pulse_2s_ease-in-out_infinite]',
        bounce: 'animate-[brutal-bounce_0.5s_ease-in-out_infinite]',
        shake: 'hover:animate-[brutal-shake_0.4s_ease-in-out]',
        wiggle: 'hover:animate-[brutal-wiggle_0.3s_ease-in-out]',
        pop: 'hover:animate-[brutal-pop_0.2s_ease-out] active:scale-95',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

@Component({
  selector: 'bk-button, button[bkButton]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariants['variant'] = 'default'
  @Input() size: ButtonVariants['size'] = 'default'
  @Input() animation: ButtonVariants['animation'] = 'none'
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      buttonVariants({
        variant: this.variant,
        size: this.size,
        animation: this.animation,
      }),
      this.class
    )
  }

  @HostBinding('attr.type')
  get buttonType(): string {
    return 'button'
  }
}
