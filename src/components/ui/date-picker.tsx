import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Typed here so the dev-only guards compile without @types/node (Vite's
// default tsconfig has none). `declare` emits nothing: bundlers still
// replace the literal process.env.NODE_ENV.
declare const process: { env: { NODE_ENV?: string } }

export interface DatePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onChange' | 'value' | 'defaultValue'> {
  /** Controlled value. Pass `defaultValue` instead for uncontrolled use. */
  value?: Date
  /** Uncontrolled initial value. */
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  /** date-fns format string for the trigger label. */
  dateFormat?: string
  disabled?: boolean
  className?: string
}

/** A single-date picker: a button trigger that opens a calendar in a popover. */
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(allProps, ref) {
  // Controlled-ness is decided by whether the `value` PROP IS PRESENT, latched
  // on first render — not by whether it is defined. `undefined` is a perfectly
  // legal controlled value for an optional date, so the ordinary
  // `const [d] = useState<Date>()` + `value={d}` pattern used to start
  // uncontrolled, silently flip to controlled on the first pick, then flip back
  // on clear and redisplay a stale internal date.
  const isControlled = React.useRef('value' in allProps).current

  const {
    value,
    defaultValue,
    onChange,
    placeholder = 'Pick a date',
    dateFormat = 'LLL dd, y',
    disabled,
    className,
    ...props
  } = allProps

  const [open, setOpen] = React.useState(false)
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(defaultValue)

  if (process.env.NODE_ENV !== 'production') {
    // Mirrors the warning Slider already ships.
    if (isControlled !== ('value' in allProps)) {
      console.warn(
        '[DatePicker] Switching between controlled and uncontrolled is not supported. ' +
          'Pass `defaultValue` for uncontrolled use.'
      )
    }
  }

  const selected = isControlled ? value : uncontrolled

  const handleSelect = (date: Date | undefined) => {
    if (!isControlled) setUncontrolled(date)
    onChange?.(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          disabled={disabled}
          {...props}
          className={cn(
            'w-[260px] justify-start gap-2 font-bold normal-case',
            !selected && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {selected ? format(selected, dateFormat) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
  }
)
DatePicker.displayName = 'DatePicker'
