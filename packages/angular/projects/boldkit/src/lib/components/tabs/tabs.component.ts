import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy, ContentChildren, QueryList, AfterContentInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @Input() value: string = ''
  @Input() class: string = ''

  @Output() valueChange = new EventEmitter<string>()

  @HostBinding('class')
  get hostClass(): string {
    return cn('w-full', this.class)
  }

  selectTab(value: string): void {
    this.value = value
    this.valueChange.emit(value)
  }
}

@Component({
  selector: 'bk-tabs-list',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsListComponent {
  @Input() class: string = ''

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'inline-flex h-12 items-center justify-center border-3 border-foreground bg-background p-1 text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
      this.class
    )
  }

  @HostBinding('attr.role') role = 'tablist'
}

@Component({
  selector: 'bk-tabs-trigger',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsTriggerComponent {
  @Input() value: string = ''
  @Input() disabled: boolean = false
  @Input() class: string = ''

  isActive: boolean = false

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'inline-flex items-center justify-center whitespace-nowrap border-2 border-transparent px-4 py-1.5 gap-1.5 text-sm font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-foreground cursor-pointer',
      this.class
    )
  }

  @HostBinding('attr.role') role = 'tab'

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.isActive ? 'active' : 'inactive'
  }

  @HostBinding('attr.aria-selected')
  get ariaSelected(): boolean {
    return this.isActive
  }

  @HostBinding('tabindex')
  get tabindex(): number {
    return this.isActive ? 0 : -1
  }
}

@Component({
  selector: 'bk-tabs-content',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content *ngIf="isActive"></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsContentComponent {
  @Input() value: string = ''
  @Input() class: string = ''

  isActive: boolean = false

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.class
    )
  }

  @HostBinding('attr.role') role = 'tabpanel'

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.isActive ? 'active' : 'inactive'
  }

  @HostBinding('attr.hidden')
  get hidden(): boolean | null {
    return this.isActive ? null : true
  }
}

export const TabsComponents = [TabsComponent, TabsListComponent, TabsTriggerComponent, TabsContentComponent]
