import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const toggleVariants = cva(
  'inline-flex items-center justify-center text-sm font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:translate-x-[4px] data-[state=on]:translate-y-[4px] data-[state=on]:shadow-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-muted',
        outline: 'bg-background hover:bg-muted',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ToggleVariants = VariantProps<typeof toggleVariants>

@Component({
  selector: 'bk-toggle, button[bkToggle]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent {
  @Input() variant: ToggleVariants['variant'] = 'default'
  @Input() size: ToggleVariants['size'] = 'default'
  @Input() pressed: boolean = false
  @Input() disabled: boolean = false
  @Input() class: string = ''

  @Output() pressedChange = new EventEmitter<boolean>()

  @HostBinding('class')
  get hostClass(): string {
    return cn(toggleVariants({ variant: this.variant, size: this.size }), this.class)
  }

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.pressed ? 'on' : 'off'
  }

  @HostBinding('attr.aria-pressed')
  get ariaPressed(): boolean {
    return this.pressed
  }

  @HostBinding('disabled')
  get isDisabled(): boolean {
    return this.disabled
  }

  @HostListener('click')
  onClick(): void {
    if (!this.disabled) {
      this.pressed = !this.pressed
      this.pressedChange.emit(this.pressed)
    }
  }
}
