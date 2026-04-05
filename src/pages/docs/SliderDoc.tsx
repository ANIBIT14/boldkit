import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  // Jelly physics settings
  stiffness?: number  // Spring stiffness (higher = snappier)
  damping?: number    // Damping ratio (higher = less bouncy)
  mass?: number       // Mass of thumb (higher = more inertia)
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, defaultValue, min, max, step, onValueChange, disabled, stiffness, damping, mass, ... }, ref) => {
    // Spring physics implementation with jelly squish effect
    // Supports single value and range (two thumbs)
    // Click anywhere on track to move nearest thumb
  }
)

export { Slider }`

const usageCode = `import { Slider } from '@/components/ui/slider'

export default function Example() {
  return (
    <Slider defaultValue={[50]} max={100} step={1} />
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  modelValue?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  stiffness?: number
  damping?: number
  mass?: number
}>(), {
  defaultValue: () => [0],
  min: 0,
  max: 100,
  step: 1,
  stiffness: 400,
  damping: 28,
  mass: 1
})

const emit = defineEmits<{
  'update:modelValue': [value: number[]]
}>()

// Spring physics implementation
// Jelly squish effect on drag
// Click on track to move nearest thumb
</script>

<template>
  <div :class="cn('relative flex touch-none select-none items-center w-full py-2')">
    <!-- Track with click handler -->
    <div class="relative h-4 w-full cursor-pointer border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
      <div class="absolute h-full bg-primary" :style="{ width: position + '%' }" />
    </div>
    <!-- Thumb with jelly physics -->
    <div class="absolute h-7 w-7 cursor-grab border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]" />
  </div>
</template>`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const value = ref([50])
</script>

<template>
  <Slider v-model="value" :max="100" :step="1" />
</template>`

export function SliderDoc() {
  const [value, setValue] = useState([50])
  const [rangeValue, setRangeValue] = useState([25, 75])

  return (
    <>
      <ComponentDoc
        name="Slider"
        description="The BoldKit Slider is a neubrutalism range input with spring-physics jelly animations, supporting both single-thumb and dual-thumb (range) modes. It is fully keyboard accessible via arrow keys and works in controlled and uncontrolled usage patterns. Tune the feel with stiffness, damping, and mass props for custom bounce and inertia."
        dependencies={[]}
        vueDependencies={[]}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="w-full max-w-md">
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </ComponentDoc>

      {/* With Value Display */}
      <ExampleSection
        title="With Value"
        description="Display the current slider value. Drag the thumb and watch the jelly effect!"
        code={`const [value, setValue] = useState([50])

<div className="space-y-4">
  <Slider
    value={value}
    onValueChange={setValue}
    max={100}
    step={1}
  />
  <p className="text-sm font-bold">Value: {value[0]}</p>
</div>`}
        vueCode={`<script setup>
const value = ref([50])
</script>

<template>
  <Slider v-model="value" :max="100" />
  <p>Value: {{ value[0] }}</p>
</template>`}
      >
        <div className="w-full max-w-md space-y-4">
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
          />
          <p className="text-sm font-bold">Value: {value[0]}</p>
        </div>
      </ExampleSection>

      {/* Range Slider */}
      <ExampleSection
        title="Range Slider"
        description="A slider with two thumbs for selecting a range. Click anywhere on the track to move the nearest thumb."
        code={`const [range, setRange] = useState([25, 75])

<Slider
  value={range}
  onValueChange={setRange}
  max={100}
/>
<p>Range: {range[0]} - {range[1]}</p>`}
        vueCode={`<script setup>
const range = ref([25, 75])
</script>

<template>
  <Slider v-model="range" :max="100" />
  <p>Range: {{ range[0] }} - {{ range[1] }}</p>
</template>`}
      >
        <div className="w-full max-w-md space-y-4">
          <Slider
            value={rangeValue}
            onValueChange={setRangeValue}
            max={100}
            step={1}
          />
          <p className="text-sm font-bold">
            Range: {rangeValue[0]} - {rangeValue[1]}
          </p>
        </div>
      </ExampleSection>

      {/* Custom Step */}
      <ExampleSection
        title="Custom Step"
        description="Slider with custom step increments."
        code={`<Slider defaultValue={[25]} max={100} step={25} />`}
        vueCode={`<template>
  <Slider :default-value="[25]" :max="100" :step="25" />
</template>`}
      >
        <div className="w-full max-w-md space-y-2">
          <Slider defaultValue={[25]} max={100} step={25} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </ExampleSection>

      {/* Physics Presets */}
      <ExampleSection
        title="Physics Presets"
        description="Customize the spring physics for different feel. Adjust stiffness, damping, and mass."
        code={`// Snappy - quick response
<Slider stiffness={800} damping={40} mass={0.5} />

// Bouncy - more overshoot
<Slider stiffness={300} damping={12} mass={1} />

// Gooey - slow and heavy
<Slider stiffness={150} damping={15} mass={3} />`}
        vueCode={`<!-- Snappy -->
<Slider :stiffness="800" :damping="40" :mass="0.5" />

<!-- Bouncy -->
<Slider :stiffness="300" :damping="12" :mass="1" />

<!-- Gooey -->
<Slider :stiffness="150" :damping="15" :mass="3" />`}
      >
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase text-muted-foreground">
              Snappy (stiffness: 800, damping: 40)
            </p>
            <Slider defaultValue={[50]} stiffness={800} damping={40} mass={0.5} />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase text-muted-foreground">
              Bouncy (stiffness: 300, damping: 12)
            </p>
            <Slider defaultValue={[50]} stiffness={300} damping={12} mass={1} />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase text-muted-foreground">
              Gooey (stiffness: 150, damping: 15, mass: 3)
            </p>
            <Slider defaultValue={[50]} stiffness={150} damping={15} mass={3} />
          </div>
        </div>
      </ExampleSection>

      {/* Vertical Orientation */}
      <ExampleSection
        title="Vertical"
        description="Slider in vertical orientation."
        code={`<div className="h-48">
  <Slider defaultValue={[50]} orientation="vertical" />
</div>`}
        vueCode={`<template>
  <div class="h-48">
    <Slider :default-value="[50]" orientation="vertical" />
  </div>
</template>`}
      >
        <div className="flex gap-8 h-48">
          <Slider defaultValue={[30]} orientation="vertical" />
          <Slider defaultValue={[50]} orientation="vertical" />
          <Slider defaultValue={[70]} orientation="vertical" />
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="A disabled slider that cannot be interacted with."
        code={`<Slider defaultValue={[50]} max={100} disabled />`}
        vueCode={`<template>
  <Slider :default-value="[50]" :max="100" disabled />
</template>`}
      >
        <div className="w-full max-w-md">
          <Slider defaultValue={[50]} max={100} disabled />
        </div>
      </ExampleSection>
    </>
  )
}
