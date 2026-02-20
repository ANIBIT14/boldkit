import { Directive, Input, HostBinding } from '@angular/core'
import { cn } from '../../utils/cn'

/**
 * Input directive that applies BoldKit neubrutalism styles to native input elements
 *
 * Usage:
 * <input bkInput placeholder="Enter text..." />
 * <input bkInput class="custom-class" />
 */
@Directive({
  selector: 'input[bkInput], textarea[bkInput]',
  standalone: true,
})
export class InputDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'flex h-11 w-full border-3 border-input bg-background px-4 py-2 text-base shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:translate-x-[4px] focus-visible:translate-y-[4px] focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      this.class
    )
  }
}
