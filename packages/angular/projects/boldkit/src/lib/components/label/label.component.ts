import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

export const labelVariants = cva(
  'text-sm font-bold uppercase tracking-wide leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

export type LabelVariants = VariantProps<typeof labelVariants>

@Component({
  selector: 'bk-label, label[bkLabel]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(labelVariants(), this.class)
  }
}
