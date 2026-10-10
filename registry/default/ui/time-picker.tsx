import * as React from 'react'
import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

// Typed here so the dev-only guards compile without @types/node (Vite's
// default tsconfig has none). `declare` emits nothing: bundlers still
// replace the literal process.env.NODE_ENV.
declare const process: { env: { NODE_ENV?: string } }

export interface TimePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onChange' | 'value' | 'defaultValue'> {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  format?: '12h' | '24h'
  minuteStep?: 1 | 5 | 10 | 15 | 30
  showSeconds?: boolean
  minTime?: Date
  maxTime?: Date
  disabled?: boolean
  placeholder?: string
  className?: string
}

const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  (
    allProps,
    ref
  ) => {
    // Controlled-ness is decided by whether the `value` PROP IS PRESENT,
    // latched on first render — not by whether it is defined. `undefined` is a
    // legal controlled value for an optional date, so the ordinary
    // `useState<Date>()` + `value` pattern used to start uncontrolled and
    // silently flip on the first pick.
    const isControlled = React.useRef('value' in allProps).current

    const {
      value: controlledValue,
      defaultValue,
      onChange,
      format = '12h',
      minuteStep = 1,
      showSeconds = false,
      minTime,
      maxTime,
      disabled = false,
      placeholder = 'Select time',
      className,
      ...props
    } = allProps

    const [open, setOpen] = React.useState(false)
    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(defaultValue)

    if (process.env.NODE_ENV !== 'production') {
      if (isControlled !== ('value' in allProps)) {
        console.warn(
          '[TimePicker] Switching between controlled and uncontrolled is not supported. ' +
            'Pass `defaultValue` for uncontrolled use.'
        )
      }
    }
    const selectedTime = isControlled ? controlledValue : uncontrolledValue

    const hours = format === '12h' ? 12 : 24
    const hoursArray = Array.from({ length: hours }, (_, i) => (format === '12h' ? i + 1 : i))
    const minutesArray = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep)
    const secondsArray = Array.from({ length: 60 }, (_, i) => i)

    const getHour = (date: Date) => {
      const h = date.getHours()
      if (format === '12h') {
        return h === 0 ? 12 : h > 12 ? h - 12 : h
      }
      return h
    }

    const getPeriod = (date: Date) => {
      return date.getHours() >= 12 ? 'PM' : 'AM'
    }

    const selectedHour = selectedTime ? getHour(selectedTime) : null
    const selectedMinute = selectedTime ? selectedTime.getMinutes() : null
    const selectedSecond = selectedTime ? selectedTime.getSeconds() : null
    const selectedPeriod = selectedTime ? getPeriod(selectedTime) : 'AM'

    const updateTime = (
      hour?: number,
      minute?: number,
      second?: number,
      period?: 'AM' | 'PM'
    ) => {
      const newDate = new Date(selectedTime || new Date())

      if (hour !== undefined) {
        let h = hour
        if (format === '12h') {
          const currentPeriod = period ?? selectedPeriod
          if (currentPeriod === 'PM' && hour !== 12) h = hour + 12
          else if (currentPeriod === 'AM' && hour === 12) h = 0
        }
        newDate.setHours(h)
      }

      if (minute !== undefined) {
        newDate.setMinutes(minute)
      }

      if (second !== undefined) {
        newDate.setSeconds(second)
      }

      if (period !== undefined && hour === undefined && selectedTime) {
        let h = selectedTime.getHours()
        if (period === 'PM' && h < 12) h += 12
        else if (period === 'AM' && h >= 12) h -= 12
        newDate.setHours(h)
      }

      // Check min/max time, in seconds so showSeconds isn't ignored.
      const toSeconds = (d: Date) =>
        d.getHours() * 3600 + d.getMinutes() * 60 + (showSeconds ? d.getSeconds() : 0)
      if (minTime && toSeconds(newDate) < toSeconds(minTime)) return
      if (maxTime && toSeconds(newDate) > toSeconds(maxTime)) return

      if (!isControlled) {
        setUncontrolledValue(newDate)
      }
      onChange?.(newDate)
    }

    const formatDisplayTime = (date: Date) => {
      const h = getHour(date)
      const m = date.getMinutes().toString().padStart(2, '0')
      const s = date.getSeconds().toString().padStart(2, '0')
      const period = format === '12h' ? ` ${getPeriod(date)}` : ''
      const hourStr = format === '12h' ? h.toString() : h.toString().padStart(2, '0')

      if (showSeconds) {
        return `${hourStr}:${m}:${s}${period}`
      }
      return `${hourStr}:${m}${period}`
    }

    const isTimeDisabled = (hour: number, minute: number) => {
      let h = hour
      if (format === '12h') {
        if (selectedPeriod === 'PM' && hour !== 12) h = hour + 12
        else if (selectedPeriod === 'AM' && hour === 12) h = 0
      }

      // Compare in seconds, not minutes: with showSeconds the bound was
      // otherwise off by up to 59 seconds in both directions.
      const asSeconds = (d: Date) =>
        d.getHours() * 3600 + d.getMinutes() * 60 + (showSeconds ? d.getSeconds() : 0)
      const timeSeconds =
        h * 3600 + minute * 60 + (showSeconds ? (selectedSecond ?? 0) : 0)

      if (minTime) {
        if (timeSeconds < asSeconds(minTime)) return true
      }

      if (maxTime) {
        if (timeSeconds > asSeconds(maxTime)) return true
      }

      return false
    }

    // Calculate number of columns for responsive width
    const columnCount = 2 + (showSeconds ? 1 : 0) + (format === '12h' ? 1 : 0)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            {...props}
            className={cn(
              'w-[180px] justify-start text-left font-normal',
              !selectedTime && 'text-muted-foreground',
              className
            )}
          >
            <Clock className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {selectedTime ? formatDisplayTime(selectedTime) : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'w-auto p-0 overflow-hidden',
            'ease-out animate-in fade-in-0 zoom-in-95 duration-200'
          )}
          align="start"
          sideOffset={4}
        >
          <div
            className={cn(
              'flex',
              // Responsive: stack on very small screens
              'max-w-[calc(100vw-2rem)]'
            )}
            style={{
              // Dynamic width based on column count
              minWidth: `${columnCount * 60}px`,
            }}
          >
            {/* Hours column */}
            <div className="flex-1 min-w-[60px] border-r-3 border-foreground">
              <div className="px-2 py-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground border-b-3 border-foreground bg-muted/30">
                Hour
              </div>
              <ScrollArea className="h-[200px]">
                <div className="p-1" role="listbox" aria-label="Hour">
                  {hoursArray.map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      role="option"
                      aria-selected={selectedHour === hour}
                      // Was styled as disabled but still clickable, and
                      // activating it silently did nothing.
                      disabled={isTimeDisabled(hour, selectedMinute ?? 0)}
                      onClick={() => updateTime(hour)}
                      className={cn(
                        'w-full px-2 py-1.5 text-center text-sm',
                        'transition duration-150 ease-out',
                        'hover:bg-muted hover:scale-105',
                        'focus:outline-none focus:bg-muted',
                        selectedHour === hour && 'bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] scale-105',
                        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                      )}
                    >
                      {format === '12h' ? hour : hour.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Minutes column */}
            <div className={cn(
              'flex-1 min-w-[60px]',
              (showSeconds || format === '12h') && 'border-r-3 border-foreground'
            )}>
              <div className="px-2 py-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground border-b-3 border-foreground bg-muted/30">
                Min
              </div>
              <ScrollArea className="h-[200px]">
                <div className="p-1" role="listbox" aria-label="Minute">
                  {minutesArray.map((minute) => (
                    <button
                      key={minute}
                      type="button"
                      role="option"
                      aria-selected={selectedMinute === minute}
                      // The minute column never consulted isTimeDisabled, so
                      // out-of-range minutes were selectable under minTime/maxTime.
                      disabled={isTimeDisabled(selectedHour ?? 0, minute)}
                      onClick={() => updateTime(undefined, minute)}
                      className={cn(
                        'w-full px-2 py-1.5 text-center text-sm',
                        'transition duration-150 ease-out',
                        'hover:bg-muted hover:scale-105',
                        'focus:outline-none focus:bg-muted',
                        selectedMinute === minute && 'bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] scale-105',
                        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                      )}
                    >
                      {minute.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Seconds column */}
            {showSeconds && (
              <div className={cn(
                'flex-1 min-w-[60px]',
                format === '12h' && 'border-r-3 border-foreground'
              )}>
                <div className="px-2 py-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground border-b-3 border-foreground bg-muted/30">
                  Sec
                </div>
                <ScrollArea className="h-[200px]">
                  <div className="p-1" role="listbox" aria-label="Second">
                    {secondsArray.map((second) => (
                      <button
                        key={second}
                        type="button"
                        role="option"
                        aria-selected={selectedSecond === second}
                        onClick={() => updateTime(undefined, undefined, second)}
                        className={cn(
                          'w-full px-2 py-1.5 text-center text-sm',
                          'transition duration-150 ease-out',
                          'hover:bg-muted hover:scale-105',
                          'focus:outline-none focus:bg-muted',
                          selectedSecond === second && 'bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] scale-105'
                        )}
                      >
                        {second.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* AM/PM column */}
            {format === '12h' && (
              <div className="flex-1 min-w-[50px]">
                <div className="px-2 py-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground border-b-3 border-foreground bg-muted/30">
                  <span className="hidden sm:inline">Period</span>
                  <span className="sm:hidden">AP</span>
                </div>
                <div className="p-1 space-y-1">
                  {(['AM', 'PM'] as const).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => updateTime(undefined, undefined, undefined, period)}
                      className={cn(
                        'w-full px-2 py-3 text-center text-sm font-bold',
                        'transition duration-150 ease-out',
                        'hover:bg-muted hover:scale-105',
                        'focus:outline-none focus:bg-muted',
                        selectedPeriod === period && 'bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] scale-105'
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
TimePicker.displayName = 'TimePicker'

export { TimePicker }
