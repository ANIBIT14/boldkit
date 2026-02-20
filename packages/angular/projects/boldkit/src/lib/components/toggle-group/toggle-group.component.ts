import { Component, Input, Output, EventEmitter, HostBinding, ChangeDetectionStrategy, ContentChildren, QueryList, AfterContentInit, forwardRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../utils/cn'
import { toggleVariants, type ToggleVariants } from '../toggle/toggle.component'

@Component({
  selector: 'bk-toggle-group',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleGroupComponent implements AfterContentInit {
  @Input() type: 'single' | 'multiple' = 'single'
  @Input() value: string | string[] = ''
  @Input() variant: ToggleVariants['variant'] = 'default'
  @Input() size: ToggleVariants['size'] = 'default'
  @Input() disabled: boolean = false
  @Input() class: string = ''

  @Output() valueChange = new EventEmitter<string | string[]>()

  @ContentChildren(forwardRef(() => ToggleGroupItemComponent)) items!: QueryList<ToggleGroupItemComponent>

  @HostBinding('class')
  get hostClass(): string {
    return cn('inline-flex items-center justify-center gap-1', this.class)
  }

  @HostBinding('attr.role') role = 'group'

  ngAfterContentInit(): void {
    this.updateItems()
  }

  toggleItem(itemValue: string): void {
    if (this.type === 'single') {
      this.value = this.value === itemValue ? '' : itemValue
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

  isSelected(itemValue: string): boolean {
    if (this.type === 'single') {
      return this.value === itemValue
    }
    return Array.isArray(this.value) && this.value.includes(itemValue)
  }

  private updateItems(): void {
    if (this.items) {
      this.items.forEach(item => {
        item.isSelected = this.isSelected(item.value)
        item.group = this
      })
    }
  }
}

@Component({
  selector: 'bk-toggle-group-item',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleGroupItemComponent {
  @Input() value: string = ''
  @Input() disabled: boolean = false
  @Input() class: string = ''

  isSelected: boolean = false
  group: ToggleGroupComponent | null = null

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      toggleVariants({
        variant: this.group?.variant || 'default',
        size: this.group?.size || 'default',
      }),
      this.class
    )
  }

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.isSelected ? 'on' : 'off'
  }

  @HostBinding('attr.aria-pressed')
  get ariaPressed(): boolean {
    return this.isSelected
  }
}

export const ToggleGroupComponents = [ToggleGroupComponent, ToggleGroupItemComponent]
