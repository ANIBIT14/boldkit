import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy, forwardRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngIf="checked" class="flex items-center justify-center text-current">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    </span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() checked: boolean = false
  @Input() disabled: boolean = false
  @Input() class: string = ''

  @Output() checkedChange = new EventEmitter<boolean>()

  private onChange: (value: boolean) => void = () => {}
  private onTouched: () => void = () => {}

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'peer h-5 w-5 shrink-0 border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer inline-flex items-center justify-center',
      this.class
    )
  }

  @HostBinding('attr.role') role = 'checkbox'

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
    if (!this.disabled) {
      this.checked = !this.checked
      this.checkedChange.emit(this.checked)
      this.onChange(this.checked)
    }
  }

  @HostListener('keydown.space', ['$event'])
  onSpace(event: Event): void {
    event.preventDefault()
    this.onClick()
  }

  writeValue(value: boolean): void {
    this.checked = value
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
