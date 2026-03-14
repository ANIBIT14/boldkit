import { useState } from 'react'
import { TimePicker } from '@/components/ui/time-picker'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface TimePickerProps {
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
}

const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  ({ value, defaultValue, onChange, format, minuteStep, showSeconds, minTime, maxTime, disabled, placeholder }, ref) => {
    // Implementation...
  }
)

export { TimePicker }`

const usageCode = `import { TimePicker } from '@/components/ui/time-picker'

export default function Example() {
  return <TimePicker />
}`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { TimePicker } from '@/components/ui/time-picker'

const time = ref<Date>()
</script>

<template>
  <TimePicker v-model="time" />
</template>`

export function TimePickerDoc() {
  const [time, setTime] = useState<Date>()
  const [time24, setTime24] = useState<Date>()

  return (
    <>
      <ComponentDoc
        name="Time Picker"
        description="A popover-based time picker with scrollable columns for hours, minutes, and optional seconds. Supports 12h and 24h formats."
        dependencies={['@radix-ui/react-popover', '@radix-ui/react-scroll-area', 'lucide-react']}
        vueDependencies={['reka-ui', 'lucide-vue-next']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="max-w-xs">
          <TimePicker />
        </div>
      </ComponentDoc>

      {/* Controlled */}
      <ExampleSection
        title="Controlled"
        description="Control the time value with state."
        code={`const [time, setTime] = useState<Date>()

<TimePicker value={time} onChange={setTime} />
<p>Selected: {time?.toLocaleTimeString()}</p>`}
        vueCode={`<script setup>
const time = ref<Date>()
</script>

<template>
  <TimePicker v-model="time" />
  <p>Selected: {{ time?.toLocaleTimeString() }}</p>
</template>`}
      >
        <div className="space-y-2 max-w-xs">
          <TimePicker value={time} onChange={setTime} />
          <p className="text-sm text-muted-foreground">
            Selected: {time?.toLocaleTimeString() || 'None'}
          </p>
        </div>
      </ExampleSection>

      {/* 24h Format */}
      <ExampleSection
        title="24-Hour Format"
        description="Use 24-hour format instead of AM/PM."
        code={`<TimePicker format="24h" />`}
        vueCode={`<template>
  <TimePicker format="24h" />
</template>`}
      >
        <div className="max-w-xs">
          <TimePicker format="24h" value={time24} onChange={setTime24} />
        </div>
      </ExampleSection>

      {/* With Seconds */}
      <ExampleSection
        title="With Seconds"
        description="Include a seconds column in the picker."
        code={`<TimePicker showSeconds />`}
        vueCode={`<template>
  <TimePicker show-seconds />
</template>`}
      >
        <div className="max-w-xs">
          <TimePicker showSeconds />
        </div>
      </ExampleSection>

      {/* Minute Steps */}
      <ExampleSection
        title="Minute Steps"
        description="Customize the minute intervals."
        code={`<TimePicker minuteStep={15} />`}
        vueCode={`<template>
  <TimePicker :minute-step="15" />
</template>`}
      >
        <div className="flex gap-4 flex-wrap items-start">
          <div className="space-y-1 w-[180px]">
            <p className="text-xs text-muted-foreground">5 min</p>
            <TimePicker minuteStep={5} className="w-full" />
          </div>
          <div className="space-y-1 w-[180px]">
            <p className="text-xs text-muted-foreground">15 min</p>
            <TimePicker minuteStep={15} className="w-full" />
          </div>
          <div className="space-y-1 w-[180px]">
            <p className="text-xs text-muted-foreground">30 min</p>
            <TimePicker minuteStep={30} className="w-full" />
          </div>
        </div>
      </ExampleSection>

      {/* Min/Max Time */}
      <ExampleSection
        title="Min/Max Time"
        description="Restrict the selectable time range."
        code={`const minTime = new Date()
minTime.setHours(9, 0, 0)

const maxTime = new Date()
maxTime.setHours(17, 0, 0)

<TimePicker minTime={minTime} maxTime={maxTime} />`}
        vueCode={`<script setup>
const minTime = new Date()
minTime.setHours(9, 0, 0)

const maxTime = new Date()
maxTime.setHours(17, 0, 0)
</script>

<template>
  <TimePicker :min-time="minTime" :max-time="maxTime" />
</template>`}
      >
        <div className="space-y-2 max-w-xs">
          <TimePicker
            minTime={(() => {
              const d = new Date()
              d.setHours(9, 0, 0)
              return d
            })()}
            maxTime={(() => {
              const d = new Date()
              d.setHours(17, 0, 0)
              return d
            })()}
          />
          <p className="text-sm text-muted-foreground">
            Business hours only: 9 AM - 5 PM
          </p>
        </div>
      </ExampleSection>

      {/* Custom Placeholder */}
      <ExampleSection
        title="Custom Placeholder"
        description="Customize the placeholder text."
        code={`<TimePicker placeholder="Choose meeting time" />`}
        vueCode={`<template>
  <TimePicker placeholder="Choose meeting time" />
</template>`}
      >
        <div className="max-w-xs">
          <TimePicker placeholder="Choose meeting time" />
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="Disable the time picker."
        code={`<TimePicker disabled />`}
        vueCode={`<template>
  <TimePicker disabled />
</template>`}
      >
        <div className="max-w-xs">
          <TimePicker disabled />
        </div>
      </ExampleSection>
    </>
  )
}
