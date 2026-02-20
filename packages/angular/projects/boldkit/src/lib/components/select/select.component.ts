import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy, forwardRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { cn } from '../../utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

@Component({
  selector: 'bk-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [class]="triggerClass"
      [disabled]="disabled"
      (click)="toggle()"
      [attr.aria-expanded]="open">
      <span class="flex-1 text-left truncate">{{ selectedLabel || placeholder }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" [class]="chevronClass"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div *ngIf="open" [class]="contentClass">
      <div
        *ngFor="let option of options"
        [class]="getItemClass(option)"
        (click)="selectOption(option)">
        <svg *ngIf="option.value === value" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M20 6 9 17l-5-5"/></svg>
        <span [class]="option.value === value ? '' : 'ml-6'">{{ option.label }}</span>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = []
  @Input() value: string = ''
  @Input() placeholder: string = 'Select an option'
  @Input() disabled: boolean = false
  @Input() class: string = ''

  @Output() valueChange = new EventEmitter<string>()

  open: boolean = false
  private onChange: (value: string) => void = () => {}
  private onTouched: () => void = () => {}

  @HostBinding('class')
  get hostClass(): string {
    return cn('relative inline-block w-full', this.class)
  }

  get selectedLabel(): string {
    return this.options.find(o => o.value === this.value)?.label || ''
  }

  get triggerClass(): string {
    return cn(
      'flex h-11 w-full items-center justify-between border-3 border-foreground bg-background px-4 py-2 text-sm font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      this.open && 'translate-x-[4px] translate-y-[4px] shadow-none'
    )
  }

  get contentClass(): string {
    return cn(
      'absolute z-50 mt-1 w-full border-3 border-foreground bg-popover p-1 shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
    )
  }

  get chevronClass(): string {
    return cn('shrink-0 transition-transform duration-200', this.open && 'rotate-180')
  }

  getItemClass(option: SelectOption): string {
    return cn(
      'relative flex cursor-pointer select-none items-center px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
      option.disabled && 'pointer-events-none opacity-50',
      option.value === this.value && 'bg-accent text-accent-foreground'
    )
  }

  toggle(): void {
    if (!this.disabled) {
      this.open = !this.open
    }
  }

  selectOption(option: SelectOption): void {
    if (!option.disabled) {
      this.value = option.value
      this.valueChange.emit(this.value)
      this.onChange(this.value)
      this.open = false
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Close on click outside
  }

  writeValue(value: string): void {
    this.value = value
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
