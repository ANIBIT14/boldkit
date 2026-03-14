import { useState } from 'react'
import { subDays } from 'date-fns'
import { DateRangePicker, type DateRange } from '@/components/ui/date-range-picker'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { format, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export interface DateRangePickerProps {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange | undefined) => void
  numberOfMonths?: 1 | 2
  presets?: Array<{ label: string; value: DateRange }>
  showPresets?: boolean
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  placeholder?: string
  align?: 'start' | 'center' | 'end'
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({ value, defaultValue, onChange, numberOfMonths, presets, showPresets, minDate, maxDate, disabled, placeholder, align }, ref) => {
    // Implementation...
  }
)

export { DateRangePicker }`

const usageCode = `import { DateRangePicker } from '@/components/ui/date-range-picker'

export default function Example() {
  return <DateRangePicker />
}`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { DateRangePicker } from '@/components/ui/date-range-picker'

const range = ref()
</script>

<template>
  <DateRangePicker v-model="range" />
</template>`

export function DateRangePickerDoc() {
  const [range, setRange] = useState<DateRange>()

  return (
    <>
      <ComponentDoc
        name="Date Range Picker"
        description="A date range picker with preset options, dual calendar view, and customizable presets."
        dependencies={['date-fns', 'react-day-picker', '@radix-ui/react-popover', 'lucide-react']}
        vueDependencies={['date-fns', 'v-calendar', 'reka-ui', 'lucide-vue-next']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="max-w-sm">
          <DateRangePicker />
        </div>
      </ComponentDoc>

      {/* Controlled */}
      <ExampleSection
        title="Controlled"
        description="Control the date range with state."
        code={`const [range, setRange] = useState<DateRange>()

<DateRangePicker value={range} onChange={setRange} />
<p>From: {range?.from?.toLocaleDateString()}</p>
<p>To: {range?.to?.toLocaleDateString()}</p>`}
        vueCode={`<script setup>
const range = ref()
</script>

<template>
  <DateRangePicker v-model="range" />
  <p>From: {{ range?.from?.toLocaleDateString() }}</p>
  <p>To: {{ range?.to?.toLocaleDateString() }}</p>
</template>`}
      >
        <div className="space-y-2 max-w-sm">
          <DateRangePicker value={range} onChange={setRange} />
          {range?.from && (
            <p className="text-sm text-muted-foreground">
              {range.from.toLocaleDateString()}
              {range.to && ` - ${range.to.toLocaleDateString()}`}
            </p>
          )}
        </div>
      </ExampleSection>

      {/* Single Month */}
      <ExampleSection
        title="Single Month"
        description="Show only one calendar month."
        code={`<DateRangePicker numberOfMonths={1} />`}
        vueCode={`<template>
  <DateRangePicker :number-of-months="1" />
</template>`}
      >
        <div className="max-w-xs">
          <DateRangePicker numberOfMonths={1} />
        </div>
      </ExampleSection>

      {/* Without Presets */}
      <ExampleSection
        title="Without Presets"
        description="Hide the preset options sidebar."
        code={`<DateRangePicker showPresets={false} />`}
        vueCode={`<template>
  <DateRangePicker :show-presets="false" />
</template>`}
      >
        <div className="max-w-sm">
          <DateRangePicker showPresets={false} />
        </div>
      </ExampleSection>

      {/* Custom Presets */}
      <ExampleSection
        title="Custom Presets"
        description="Provide your own preset date ranges."
        code={`const customPresets = [
  { label: 'This week', value: { from: startOfWeek(new Date()), to: new Date() } },
  { label: 'Last 14 days', value: { from: subDays(new Date(), 13), to: new Date() } },
  { label: 'Q1 2024', value: { from: new Date(2024, 0, 1), to: new Date(2024, 2, 31) } },
]

<DateRangePicker presets={customPresets} />`}
        vueCode={`<script setup>
const customPresets = [
  { label: 'This week', value: { from: startOfWeek(new Date()), to: new Date() } },
  { label: 'Last 14 days', value: { from: subDays(new Date(), 13), to: new Date() } },
]
</script>

<template>
  <DateRangePicker :presets="customPresets" />
</template>`}
      >
        <div className="max-w-sm">
          <DateRangePicker
            presets={[
              { label: 'This week', value: { from: subDays(new Date(), new Date().getDay()), to: new Date() } },
              { label: 'Last 14 days', value: { from: subDays(new Date(), 13), to: new Date() } },
              { label: 'Last 90 days', value: { from: subDays(new Date(), 89), to: new Date() } },
            ]}
          />
        </div>
      </ExampleSection>

      {/* Min/Max Date */}
      <ExampleSection
        title="Min/Max Date"
        description="Restrict the selectable date range."
        code={`<DateRangePicker
  minDate={subDays(new Date(), 30)}
  maxDate={new Date()}
/>`}
        vueCode={`<script setup>
import { subDays } from 'date-fns'
</script>

<template>
  <DateRangePicker
    :min-date="subDays(new Date(), 30)"
    :max-date="new Date()"
  />
</template>`}
      >
        <div className="space-y-2 max-w-sm">
          <DateRangePicker
            minDate={subDays(new Date(), 30)}
            maxDate={new Date()}
          />
          <p className="text-sm text-muted-foreground">
            Only last 30 days are selectable
          </p>
        </div>
      </ExampleSection>

      {/* Alignment */}
      <ExampleSection
        title="Alignment"
        description="Customize the popover alignment."
        code={`<DateRangePicker align="end" />`}
        vueCode={`<template>
  <DateRangePicker align="end" />
</template>`}
      >
        <div className="flex justify-end max-w-sm">
          <DateRangePicker align="end" />
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="Disable the date range picker."
        code={`<DateRangePicker disabled />`}
        vueCode={`<template>
  <DateRangePicker disabled />
</template>`}
      >
        <div className="max-w-sm">
          <DateRangePicker disabled />
        </div>
      </ExampleSection>
    </>
  )
}
