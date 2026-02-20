import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef, ChangeDetectionStrategy, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { cn } from '../../utils/cn'

@Component({
  selector: 'bk-slider',
  standalone: true,
  template: `
    <div class="relative h-3 w-full grow overflow-hidden border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
      <div
        class="absolute h-full bg-primary transition-all"
        [style.width]="percentage + '%'">
      </div>
    </div>
    <div
      class="block h-6 w-6 border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-grab active:cursor-grabbing absolute top-1/2 -translate-y-1/2"
      [style.left]="'calc(' + percentage + '% - 12px)'"
      tabindex="0"
      role="slider"
      [attr.aria-valuemin]="min"
      [attr.aria-valuemax]="max"
      [attr.aria-valuenow]="value"
      (mousedown)="startDrag($event)"
      (keydown)="onKeyDown($event)">
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements ControlValueAccessor {
  @Input() value: number = 0
  @Input() min: number = 0
  @Input() max: number = 100
  @Input() step: number = 1
  @Input() disabled: boolean = false
  @Input() class: string = ''

  @Output() valueChange = new EventEmitter<number>()

  private onChange: (value: number) => void = () => {}
  private onTouched: () => void = () => {}
  private isDragging = false

  constructor(private elementRef: ElementRef) {}

  @HostBinding('class')
  get hostClass(): string {
    return cn('relative flex w-full touch-none select-none items-center', this.class)
  }

  get percentage(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100
  }

  startDrag(event: MouseEvent): void {
    if (this.disabled) return
    this.isDragging = true
    this.updateValue(event)

    const mouseMoveHandler = (e: MouseEvent) => {
      if (this.isDragging) {
        this.updateValue(e)
      }
    }

    const mouseUpHandler = () => {
      this.isDragging = false
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  private updateValue(event: MouseEvent): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
    const newValue = Math.round((percentage * (this.max - this.min) + this.min) / this.step) * this.step
    this.setValue(newValue)
  }

  private setValue(newValue: number): void {
    const clampedValue = Math.max(this.min, Math.min(this.max, newValue))
    if (clampedValue !== this.value) {
      this.value = clampedValue
      this.valueChange.emit(this.value)
      this.onChange(this.value)
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault()
        this.setValue(this.value + this.step)
        break
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault()
        this.setValue(this.value - this.step)
        break
      case 'Home':
        event.preventDefault()
        this.setValue(this.min)
        break
      case 'End':
        event.preventDefault()
        this.setValue(this.max)
        break
    }
  }

  writeValue(value: number): void {
    this.value = value ?? 0
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
