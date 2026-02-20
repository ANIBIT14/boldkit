import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy, forwardRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-radio-group',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements ControlValueAccessor, AfterContentInit {
  @Input() value: string = ''
  @Input() disabled: boolean = false
  @Input() class: string = ''

  @Output() valueChange = new EventEmitter<string>()

  @ContentChildren(forwardRef(() => RadioGroupItemComponent)) items!: QueryList<RadioGroupItemComponent>

  private onChange: (value: string) => void = () => {}
  private onTouched: () => void = () => {}

  @HostBinding('class')
  get hostClass(): string {
    return cn('grid gap-2', this.class)
  }

  @HostBinding('attr.role') role = 'radiogroup'

  ngAfterContentInit(): void {
    this.updateItems()
  }

  selectValue(value: string): void {
    if (!this.disabled) {
      this.value = value
      this.valueChange.emit(value)
      this.onChange(value)
      this.updateItems()
    }
  }

  private updateItems(): void {
    if (this.items) {
      this.items.forEach(item => {
        item.checked = item.value === this.value
        item.group = this
      })
    }
  }

  writeValue(value: string): void {
    this.value = value
    this.updateItems()
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}

@Component({
  selector: 'bk-radio-group-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngIf="checked" class="flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" class="fill-primary-foreground"><circle cx="12" cy="12" r="12"/></svg>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupItemComponent {
  @Input() value: string = ''
  @Input() disabled: boolean = false
  @Input() class: string = ''

  checked: boolean = false
  group: RadioGroupComponent | null = null

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'aspect-square h-5 w-5 rounded-full border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none data-[state=checked]:bg-primary cursor-pointer inline-flex items-center justify-center',
      this.class
    )
  }

  @HostBinding('attr.role') role = 'radio'

  @HostBinding('attr.data-state')
  get dataState(): string {
    return this.checked ? 'checked' : 'unchecked'
  }

  @HostBinding('attr.aria-checked')
  get ariaChecked(): boolean {
    return this.checked
  }

  @HostBinding('tabindex') tabindex = 0

  @HostListener('click')
  onClick(): void {
    if (!this.disabled && this.group) {
      this.group.selectValue(this.value)
    }
  }

  @HostListener('keydown.space', ['$event'])
  onSpace(event: Event): void {
    event.preventDefault()
    this.onClick()
  }
}

export const RadioGroupComponents = [RadioGroupComponent, RadioGroupItemComponent]
