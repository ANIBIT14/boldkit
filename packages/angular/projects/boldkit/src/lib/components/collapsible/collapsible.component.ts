import { Component, Input, Output, EventEmitter, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-collapsible',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleComponent {
  @Input() open: boolean = false
  @Input() disabled: boolean = false
  @Input() class: string = ''

  @Output() openChange = new EventEmitter<boolean>()

  @HostBinding('class')
  get hostClass(): string {
    return cn('', this.class)
  }

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.open ? 'open' : 'closed'
  }

  toggle(): void {
    if (!this.disabled) {
      this.open = !this.open
      this.openChange.emit(this.open)
    }
  }
}

@Component({
  selector: 'bk-collapsible-trigger',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleTriggerComponent {
  @Input() class: string = ''

  collapsible: CollapsibleComponent | null = null

  @HostBinding('class')
  get hostClass(): string {
    return cn('cursor-pointer', this.class)
  }

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.collapsible?.open ? 'open' : 'closed'
  }
}

@Component({
  selector: 'bk-collapsible-content',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content *ngIf="collapsible?.open"></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleContentComponent {
  @Input() class: string = ''

  collapsible: CollapsibleComponent | null = null

  @HostBinding('class')
  get hostClass(): string {
    return cn('overflow-hidden', this.class)
  }

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.collapsible?.open ? 'open' : 'closed'
  }
}

export const CollapsibleComponents = [CollapsibleComponent, CollapsibleTriggerComponent, CollapsibleContentComponent]
