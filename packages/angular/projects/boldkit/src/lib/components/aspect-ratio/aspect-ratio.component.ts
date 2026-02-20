import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-aspect-ratio',
  standalone: true,
  template: `
    <div [style.padding-bottom]="paddingBottom" class="relative w-full">
      <div class="absolute inset-0">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectRatioComponent {
  @Input() ratio: number = 1

  get paddingBottom(): string {
    return `${(1 / this.ratio) * 100}%`
  }
}
