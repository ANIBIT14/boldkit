import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-skeleton',
  standalone: true,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('animate-pulse bg-muted border-2 border-foreground/20', this.class)
  }
}
