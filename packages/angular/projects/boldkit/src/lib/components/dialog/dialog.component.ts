import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content select="[bkDialogTrigger]"></ng-content>
    <div *ngIf="open" class="fixed inset-0 z-50">
      <div
        class="fixed inset-0 z-50 bg-black/70 animate-in fade-in-0"
        (click)="onOverlayClick()">
      </div>
      <div [class]="contentClass">
        <ng-content select="bk-dialog-content"></ng-content>
        <button
          type="button"
          class="absolute right-4 top-4 border-2 border-foreground bg-background p-1 shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus:outline-none focus:ring-2 focus:ring-ring"
          (click)="close()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          <span class="sr-only">Close</span>
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @Input() open: boolean = false
  @Input() closeOnOverlayClick: boolean = true
  @Input() class: string = ''

  @Output() openChange = new EventEmitter<boolean>()

  get contentClass(): string {
    return cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-3 border-foreground bg-background p-6 shadow-[8px_8px_0px_hsl(var(--shadow-color))] duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] sm:max-w-[425px]',
      this.class
    )
  }

  onOverlayClick(): void {
    if (this.closeOnOverlayClick) {
      this.close()
    }
  }

  close(): void {
    this.open = false
    this.openChange.emit(false)
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.close()
    }
  }
}

@Component({
  selector: 'bk-dialog-content',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentComponent {
  @Input() class: string = ''
}

@Component({
  selector: 'bk-dialog-header',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHeaderComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('flex flex-col space-y-1.5 text-center sm:text-left', this.class)
  }
}

@Component({
  selector: 'bk-dialog-footer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFooterComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', this.class)
  }
}

@Component({
  selector: 'bk-dialog-title',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTitleComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('text-lg font-bold uppercase tracking-wide leading-none', this.class)
  }
}

@Component({
  selector: 'bk-dialog-description',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDescriptionComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn('text-sm text-muted-foreground', this.class)
  }
}

export const DialogComponents = [
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
]
