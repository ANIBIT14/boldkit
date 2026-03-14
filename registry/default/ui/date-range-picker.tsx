import * as React from 'react'
import { format, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export interface DateRangePickerPreset {
  label: string
  value: DateRange
}

export interface DateRangePickerProps {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange | undefined) => void
  numberOfMonths?: 1 | 2
  presets?: DateRangePickerPreset[]
  showPresets?: boolean
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  placeholder?: string
  align?: 'start' | 'center' | 'end'
  className?: string
}

const getDefaultPresets = (): DateRangePickerPreset[] => {
  const today = new Date()
  const lastMonth = subMonths(today, 1)

  return [
    {
      label: 'Today',
      value: { from: today, to: today },
    },
    {
      label: 'Last 7 days',
      value: { from: subDays(today, 6), to: today },
    },
    {
      label: 'Last 30 days',
      value: { from: subDays(today, 29), to: today },
    },
    {
      label: 'This month',
      value: { from: startOfMonth(today), to: today },
    },
    {
      label: 'Last month',
      value: { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) },
    },
  ]
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      numberOfMonths = 2,
      presets,
      showPresets = true,
      minDate,
      maxDate,
      disabled = false,
      placeholder = 'Pick a date range',
      align = 'start',
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [uncontrolledValue, setUncontrolledValue] = React.useState<DateRange | undefined>(defaultValue)

    const isControlled = controlledValue !== undefined
    const selectedRange = isControlled ? controlledValue : uncontrolledValue

    const resolvedPresets = presets ?? getDefaultPresets()

    const handleSelect = (range: DateRange | undefined) => {
      if (!isControlled) {
        setUncontrolledValue(range)
      }
      onChange?.(range)
    }

    const handlePresetClick = (preset: DateRangePickerPreset) => {
      handleSelect(preset.value)
    }

    const isPresetSelected = (preset: DateRangePickerPreset) => {
      if (!selectedRange?.from || !selectedRange?.to) return false
      if (!preset.value.from || !preset.value.to) return false

      return (
        format(selectedRange.from, 'yyyy-MM-dd') === format(preset.value.from, 'yyyy-MM-dd') &&
        format(selectedRange.to, 'yyyy-MM-dd') === format(preset.value.to, 'yyyy-MM-dd')
      )
    }

    const formatDateRange = (range: DateRange) => {
      if (!range.from) return placeholder
      if (!range.to) return format(range.from, 'LLL dd, y')
      return `${format(range.from, 'LLL dd, y')} - ${format(range.to, 'LLL dd, y')}`
    }

    // Use single month on mobile
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 640)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const effectiveNumberOfMonths = isMobile ? 1 : numberOfMonths

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedRange && 'text-muted-foreground',
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {selectedRange ? formatDateRange(selectedRange) : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'w-auto p-0 overflow-hidden',
            'shadow-[8px_8px_0px_hsl(var(--shadow-color))]',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            'max-w-[calc(100vw-2rem)]',
            'max-h-[calc(100vh-4rem)] overflow-auto'
          )}
          align={align}
          sideOffset={4}
        >
          <div className={cn(
            'flex',
            // Stack vertically on mobile
            isMobile && showPresets ? 'flex-col' : 'flex-row'
          )}>
            {/* Presets sidebar/header */}
            {showPresets && resolvedPresets.length > 0 && (
              <div className={cn(
                'p-3 bg-muted/30',
                isMobile
                  ? 'border-b-3 border-foreground'
                  : 'min-w-[130px] border-r-3 border-foreground'
              )}>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Presets
                </p>
                <div className={cn(
                  isMobile
                    ? 'flex flex-wrap gap-1'
                    : 'space-y-1'
                )}>
                  {resolvedPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={cn(
                        'text-left text-sm transition-all duration-150',
                        'hover:bg-muted',
                        isMobile
                          ? 'px-2 py-1 border-2 border-foreground text-xs'
                          : 'w-full px-3 py-2',
                        isPresetSelected(preset) && 'bg-accent font-medium shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar(s) */}
            <div className="p-3">
              <Calendar
                mode="range"
                defaultMonth={selectedRange?.from}
                selected={selectedRange}
                onSelect={handleSelect}
                numberOfMonths={effectiveNumberOfMonths}
                disabled={(date) => {
                  if (minDate && date < minDate) return true
                  if (maxDate && date > maxDate) return true
                  return false
                }}
                className="border-0 shadow-none"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
DateRangePicker.displayName = 'DateRangePicker'

export { DateRangePicker, getDefaultPresets }
export type { DateRange }
