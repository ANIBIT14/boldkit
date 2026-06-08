import { useState } from 'react'
import { DatePicker } from '@/components/ui/date-picker'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/date-picker.tsx?raw'
import vueSourceCode from '@vue-ui/DatePicker.vue?raw'

const vueUsageCode = `<script setup lang="ts">
import { DatePicker } from '@/components/ui'
import type { DateValue } from 'reka-ui'
import { ref } from 'vue'

const date = ref<DateValue>()
</script>

<template>
  <DatePicker v-model="date" />
</template>`

const usageCode = `import { useState } from 'react'
import { DatePicker } from '@/components/ui/date-picker'

export default function Example() {
  const [date, setDate] = useState<Date>()
  return <DatePicker value={date} onChange={setDate} />
}`

export function DatePickerDoc() {
  const [date, setDate] = useState<Date | undefined>()
  const [date2, setDate2] = useState<Date | undefined>()

  return (
    <>
      <ComponentDoc
        name="Date Picker"
        description="A single-date picker — a button trigger that opens a calendar in a popover, built on Calendar, Popover and Button."
        registryName="date-picker"
        dependencies={['date-fns', 'lucide-react']}
        vueDependencies={['reka-ui', 'lucide-vue-next']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <DatePicker value={date} onChange={setDate} />
      </ComponentDoc>

      <ExampleSection
        title="Custom Format"
        description="Control the trigger label with any date-fns format string."
        code={`<DatePicker
  value={date}
  onChange={setDate}
  dateFormat="EEEE, MMMM do"
  placeholder="Choose a day"
/>`}
      >
        <DatePicker
          value={date2}
          onChange={setDate2}
          dateFormat="EEEE, MMMM do"
          placeholder="Choose a day"
        />
      </ExampleSection>
    </>
  )
}
