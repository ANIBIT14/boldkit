import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-progress',
  standalone: true,
  template: `
    <div
      class="h-full w-full flex-1 bg-primary transition-all duration-500 ease-out"
      [style.transform]="'translateX(-' + (100 - (value || 0)) + '%)'">
    </div>
  `,
  host: {
    'role': 'progressbar',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {
  @Input() value: number = 0
  @Input() max: number = 100
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'relative h-5 w-full overflow-hidden border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
      this.class
    )
  }

  @HostBinding('attr.aria-valuenow')
  get ariaValueNow(): number {
    return this.value
  }

  @HostBinding('attr.aria-valuemin')
  get ariaValueMin(): number {
    return 0
  }

  @HostBinding('attr.aria-valuemax')
  get ariaValueMax(): number {
    return this.max
  }
}
