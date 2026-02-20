import { Component, Input, HostBinding, HostListener, ChangeDetectionStrategy, ElementRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
    <div
      *ngIf="isVisible"
      [class]="contentClass"
      [style.position]="'absolute'"
      [style.bottom]="'100%'"
      [style.left]="'50%'"
      [style.transform]="'translateX(-50%)'"
      [style.margin-bottom]="'6px'"
      role="tooltip">
      {{ content }}
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      display: inline-block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  @Input() content: string = ''
  @Input() class: string = ''

  isVisible: boolean = false

  get contentClass(): string {
    return cn(
      'z-50 overflow-hidden border-2 border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] whitespace-nowrap',
      this.class
    )
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isVisible = true
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isVisible = false
  }

  @HostListener('focus')
  onFocus(): void {
    this.isVisible = true
  }

  @HostListener('blur')
  onBlur(): void {
    this.isVisible = false
  }
}
