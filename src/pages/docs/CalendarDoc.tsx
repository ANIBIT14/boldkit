import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'flex flex-col gap-4',
        month_caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-bold uppercase tracking-wide',
        nav: 'flex items-center gap-1',
        button_previous: cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 bg-transparent p-0 absolute left-1'),
        button_next: cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 bg-transparent p-0 absolute right-1'),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-muted-foreground w-9 font-bold text-[0.8rem] uppercase',
        week: 'flex w-full mt-2',
        day: 'relative p-0 text-center text-sm',
        day_button: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-medium border-0'),
        selected: 'bg-primary text-primary-foreground border-2 border-foreground',
        today: 'bg-accent text-accent-foreground border-2 border-foreground',
        outside: 'text-muted-foreground opacity-50',
        disabled: 'text-muted-foreground opacity-50',
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }`

const usageCode = `import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

export default function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
}`

export function CalendarDoc() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [multipleDates, setMultipleDates] = useState<Date[] | undefined>([])

  return (
    <>
      <ComponentDoc
        name="Calendar"
        description="A date field component that allows users to enter and edit date with neubrutalism styling."
        installCommand="npx boldkit-ui add calendar"
        dependencies={['react-day-picker', 'date-fns']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </ComponentDoc>

      {/* Single Date */}
      <ExampleSection
        title="Single Date"
        description="Select a single date."
        code={`const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </ExampleSection>

      {/* Date Range */}
      <ExampleSection
        title="Date Range"
        description="Select a range of dates."
        code={`const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>()

<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
/>`}
      >
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) => setDateRange(range as { from: Date | undefined; to: Date | undefined })}
          numberOfMonths={2}
        />
      </ExampleSection>

      {/* Multiple Dates */}
      <ExampleSection
        title="Multiple Dates"
        description="Select multiple dates."
        code={`const [dates, setDates] = useState<Date[]>([])

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
/>`}
      >
        <Calendar
          mode="multiple"
          selected={multipleDates}
          onSelect={setMultipleDates}
        />
      </ExampleSection>

      {/* Disabled Dates */}
      <ExampleSection
        title="Disabled Dates"
        description="Disable specific dates or date ranges."
        code={`<Calendar
  mode="single"
  disabled={[
    new Date(2024, 0, 1),
    { from: new Date(2024, 0, 15), to: new Date(2024, 0, 20) },
  ]}
/>`}
      >
        <Calendar
          mode="single"
          disabled={[
            { dayOfWeek: [0, 6] }, // Disable weekends
          ]}
        />
        <p className="text-sm text-muted-foreground mt-2">Weekends are disabled</p>
      </ExampleSection>
    </>
  )
}
