import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/calendar.tsx?raw'
import vueSourceCode from '@vue-ui/Calendar.vue?raw'


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


const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from '@/components/ui'

const date = ref<Date>(new Date())
</script>

<template>
  <Calendar v-model="date" />
</template>`

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
        dependencies={['react-day-picker', 'date-fns']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
        nuxtClientOnly={true}
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
        vueCode={`<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from '@/components/ui'

const date = ref<Date>(new Date())
</script>

<template>
  <Calendar v-model="date" />
</template>`}
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
        vueCode={`<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from '@/components/ui'

const dateRange = ref<{ start: Date | undefined; end: Date | undefined }>({
  start: undefined,
  end: undefined,
})
</script>

<template>
  <Calendar v-model="dateRange" mode="range" :number-of-months="2" />
</template>`}
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
        vueCode={`<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from '@/components/ui'

const dates = ref<Date[]>([])
</script>

<template>
  <Calendar v-model="dates" mode="multiple" />
</template>`}
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
        vueCode={`<template>
  <Calendar
    :is-date-disabled="(date) => date.getDay() === 0 || date.getDay() === 6"
  />
  <p class="text-sm text-muted-foreground mt-2">Weekends are disabled</p>
</template>`}
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
