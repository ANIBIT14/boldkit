import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-separator',
  standalone: true,
  template: ``,
  host: { 'role': 'separator' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal'
  @Input() decorative: boolean = true
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'shrink-0 bg-foreground',
      this.orientation === 'horizontal' ? 'h-[3px] w-full' : 'h-full w-[3px]',
      this.class
    )
  }

  @HostBinding('attr.aria-orientation')
  get ariaOrientation(): string | null {
    return this.decorative ? null : this.orientation
  }

  @HostBinding('attr.aria-hidden')
  get ariaHidden(): string | null {
    return this.decorative ? 'true' : null
  }
}
