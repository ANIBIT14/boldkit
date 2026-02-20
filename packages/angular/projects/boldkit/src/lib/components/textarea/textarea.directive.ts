import { Directive, Input, HostBinding } from '@angular/core'
import { cn } from '../../utils/cn'

@Directive({
  selector: 'textarea[bkTextarea]',
  standalone: true,
})
export class TextareaDirective {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'flex min-h-[100px] w-full border-3 border-input bg-background px-4 py-3 text-base shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:translate-x-[4px] focus-visible:translate-y-[4px] focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      this.class
    )
  }
}
