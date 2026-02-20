import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      <div (click)="toggle()">
        <ng-content select="[bkPopoverTrigger]"></ng-content>
      </div>
      <div
        *ngIf="open"
        [class]="contentClass"
        [style.position]="'absolute'"
        [style.top]="'100%'"
        [style.left]="align === 'start' ? '0' : align === 'end' ? 'auto' : '50%'"
        [style.right]="align === 'end' ? '0' : 'auto'"
        [style.transform]="align === 'center' ? 'translateX(-50%)' : 'none'"
        [style.margin-top]="'4px'">
        <ng-content select="bk-popover-content"></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
  @Input() open: boolean = false
  @Input() align: 'start' | 'center' | 'end' = 'center'
  @Input() class: string = ''

  @Output() openChange = new EventEmitter<boolean>()

  get contentClass(): string {
    return cn(
      'z-50 w-72 border-3 border-foreground bg-popover p-4 text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] outline-none',
      this.class
    )
  }

  toggle(): void {
    this.open = !this.open
    this.openChange.emit(this.open)
  }

  close(): void {
    this.open = false
    this.openChange.emit(false)
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Close on click outside - would need more sophisticated handling
  }
}

@Component({
  selector: 'bk-popover-content',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverContentComponent {
  @Input() class: string = ''
}

export const PopoverComponents = [PopoverComponent, PopoverContentComponent]
