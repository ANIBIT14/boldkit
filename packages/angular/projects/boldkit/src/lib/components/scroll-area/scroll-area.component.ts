import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-scroll-area',
  standalone: true,
  template: `
    <div [class]="viewportClass">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollAreaComponent {
  @Input() class: string = ''
  @Input() orientation: 'vertical' | 'horizontal' | 'both' = 'vertical'

  @HostBinding('class')
  get hostClass(): string {
    return cn('relative overflow-hidden', this.class)
  }

  get viewportClass(): string {
    return cn(
      'h-full w-full',
      this.orientation === 'vertical' && 'overflow-y-auto overflow-x-hidden',
      this.orientation === 'horizontal' && 'overflow-x-auto overflow-y-hidden',
      this.orientation === 'both' && 'overflow-auto'
    )
  }
}
