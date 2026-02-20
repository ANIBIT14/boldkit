import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy, ContentChildren, QueryList, AfterContentInit, forwardRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements AfterContentInit {
  @Input() type: 'single' | 'multiple' = 'single'
  @Input() value: string | string[] = ''
  @Input() collapsible: boolean = true
  @Input() class: string = ''

  @Output() valueChange = new EventEmitter<string | string[]>()

  @ContentChildren(forwardRef(() => AccordionItemComponent)) items!: QueryList<AccordionItemComponent>

  @HostBinding('class')
  get hostClass(): string {
    return cn('', this.class)
  }

  ngAfterContentInit(): void {
    this.updateItems()
  }

  toggleItem(itemValue: string): void {
    if (this.type === 'single') {
      if (this.value === itemValue && this.collapsible) {
        this.value = ''
      } else {
        this.value = itemValue
      }
    } else {
      const values = Array.isArray(this.value) ? [...this.value] : []
      const index = values.indexOf(itemValue)
      if (index > -1) {
        values.splice(index, 1)
      } else {
        values.push(itemValue)
      }
      this.value = values
    }
    this.valueChange.emit(this.value)
    this.updateItems()
  }

  isOpen(itemValue: string): boolean {
    if (this.type === 'single') {
      return this.value === itemValue
    }
    return Array.isArray(this.value) && this.value.includes(itemValue)
  }

  private updateItems(): void {
    if (this.items) {
      this.items.forEach(item => {
        item.isOpen = this.isOpen(item.value)
        item.accordion = this
      })
    }
  }
}

@Component({
  selector: 'bk-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent {
  @Input() value: string = ''
  @Input() disabled: boolean = false
  @Input() class: string = ''

  isOpen: boolean = false
  accordion: AccordionComponent | null = null

  @HostBinding('class')
  get hostClass(): string {
    return cn('border-3 border-foreground border-b-0 last:border-b-3 shadow-[4px_4px_0px_hsl(var(--shadow-color))]', this.class)
  }

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.isOpen ? 'open' : 'closed'
  }

  toggle(): void {
    if (!this.disabled && this.accordion) {
      this.accordion.toggleItem(this.value)
    }
  }
}

@Component({
  selector: 'bk-accordion-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="chevronClass">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionTriggerComponent {
  @Input() class: string = ''

  item: AccordionItemComponent | null = null

  @HostBinding('class')
  get hostClass(): string {
    const isOpen = this.item?.isOpen ?? false
    return cn(
      'flex flex-1 items-center justify-between bg-background py-4 px-4 font-bold uppercase tracking-wide transition-all duration-200 hover:bg-muted cursor-pointer w-full',
      isOpen && 'bg-accent',
      this.class
    )
  }

  get chevronClass(): string {
    const isOpen = this.item?.isOpen ?? false
    return cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')
  }

  @HostListener('click')
  onClick(): void {
    this.item?.toggle()
  }
}

@Component({
  selector: 'bk-accordion-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="item?.isOpen" [class]="innerClass">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionContentComponent {
  @Input() class: string = ''

  item: AccordionItemComponent | null = null

  @HostBinding('class')
  get hostClass(): string {
    return cn('overflow-hidden text-sm border-t-3 border-foreground', this.class)
  }

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.item?.isOpen ? 'open' : 'closed'
  }

  get innerClass(): string {
    return cn('p-4', this.class)
  }
}

export const AccordionComponents = [
  AccordionComponent,
  AccordionItemComponent,
  AccordionTriggerComponent,
  AccordionContentComponent,
]
