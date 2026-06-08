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

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  /** date-fns format string for the trigger label. */
  dateFormat?: string
  disabled?: boolean
  className?: string
}

/** A single-date picker: a button trigger that opens a calendar in a popover. */
export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  dateFormat = 'LLL dd, y',
  disabled,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(value)

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
          variant="outline"
          disabled={disabled}
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
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
