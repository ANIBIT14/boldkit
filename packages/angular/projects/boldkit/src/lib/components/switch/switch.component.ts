import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-switch',
  standalone: true,
  template: `
    <span
      [class]="thumbClass"
      [style.transform]="checked ? 'translateX(20px)' : 'translateX(2px)'">
    </span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() checked: boolean = false
  @Input() disabled: boolean = false
  @Input() class: string = ''

  @Output() checkedChange = new EventEmitter<boolean>()

  private onChange: (value: boolean) => void = () => {}
  private onTouched: () => void = () => {}

  @HostBinding('class')
  get hostClass(): string {
    return cn(
      'peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
      this.class
    )
  }

  get thumbClass(): string {
    return 'pointer-events-none block h-5 w-5 border-2 border-foreground bg-background shadow-sm transition-transform duration-200'
  }

  @HostBinding('attr.role') role = 'switch'

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
