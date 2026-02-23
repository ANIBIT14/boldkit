import { GaugeChart } from '@/components/ui/chart'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gaugeChartVariants = cva(
  'relative flex items-center justify-center border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
  {
    variants: {
      size: {
        sm: 'w-32 h-20',
        md: 'w-48 h-28',
        lg: 'w-64 h-36',
      },
      variant: {
        semicircle: '',
        full: 'aspect-square h-auto',
        meter: '',
      },
    },
    defaultVariants: { size: 'md', variant: 'semicircle' },
  }
)

export interface GaugeChartZone {
  from: number
  to: number
  color: string
  label?: string
}

export interface GaugeChartProps {
  value: number
  min?: number
  max?: number
  zones?: GaugeChartZone[]
  label?: string
  valueFormatter?: (value: number) => string
  showTicks?: boolean
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const DEFAULT_ZONES = [
  { from: 0, to: 33, color: 'hsl(var(--destructive))', label: 'Low' },
  { from: 33, to: 66, color: 'hsl(var(--warning))', label: 'Medium' },
  { from: 66, to: 100, color: 'hsl(var(--success))', label: 'High' },
]

export { GaugeChart, gaugeChartVariants }`

const vueSourceCode = `<script setup lang="ts">
import { computed, ref } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gaugeChartVariants = cva(
  'relative flex items-center justify-center border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
  {
    variants: {
      size: {
        sm: 'w-32 h-20',
        md: 'w-48 h-28',
        lg: 'w-64 h-36',
      },
    },
  }
)

interface Zone {
  from: number
  to: number
  color: string
  label?: string
}

interface Props {
  value: number
  min?: number
  max?: number
  zones?: Zone[]
  label?: string
  valueFormatter?: (value: number) => string
  showTicks?: boolean
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  showTicks: true,
  animated: true,
  size: 'md',
})
</script>

<template>
  <div :class="gaugeChartVariants({ size })">
    <!-- SVG gauge implementation -->
  </div>
</template>`

const usageCode = `import { GaugeChart } from '@/components/ui/chart'

export default function Example() {
  return (
    <GaugeChart
      value={72}
      label="Performance"
      valueFormatter={(v) => \`\${v}%\`}
    />
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { GaugeChart } from '@/components/ui'

const formatValue = (v) => \`\${v}%\`
</script>

<template>
  <GaugeChart
    :value="72"
    label="Performance"
    :value-formatter="formatValue"
  />
</template>`

export function GaugeChartDoc() {
  return (
    <>
      <ComponentDoc
        name="GaugeChart"
        description="Speedometer-style gauge chart with color zones and animated needle."
        dependencies={['class-variance-authority']}
        vueDependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex justify-center">
          <GaugeChart value={72} label="Performance" />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Default Zones"
        description="Built-in color zones for low, medium, and high values."
        code={`<GaugeChart value={25} label="Low" />
<GaugeChart value={50} label="Medium" />
<GaugeChart value={85} label="High" />`}
        vueCode={`<template>
  <GaugeChart :value="25" label="Low" />
  <GaugeChart :value="50" label="Medium" />
  <GaugeChart :value="85" label="High" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-2">
            <GaugeChart value={25} label="Low" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <GaugeChart value={50} label="Medium" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <GaugeChart value={85} label="High" />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Available gauge sizes for different layouts."
        code={`<GaugeChart value={72} size="sm" />
<GaugeChart value={72} size="md" />
<GaugeChart value={72} size="lg" />`}
        vueCode={`<template>
  <GaugeChart :value="72" size="sm" />
  <GaugeChart :value="72" size="md" />
  <GaugeChart :value="72" size="lg" />
</template>`}
      >
        <div className="flex flex-wrap items-end justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <GaugeChart value={72} size="sm" />
            <span className="text-xs font-bold uppercase">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <GaugeChart value={72} size="md" />
            <span className="text-xs font-bold uppercase">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <GaugeChart value={72} size="lg" />
            <span className="text-xs font-bold uppercase">Large</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Custom Zones"
        description="Define your own color zones with custom thresholds."
        code={`<GaugeChart
  value={65}
  zones={[
    { from: 0, to: 50, color: 'hsl(var(--info))', label: 'Normal' },
    { from: 50, to: 80, color: 'hsl(var(--warning))', label: 'Elevated' },
    { from: 80, to: 100, color: 'hsl(var(--destructive))', label: 'Critical' },
  ]}
  label="Temperature"
/>`}
        vueCode={`<template>
  <GaugeChart
    :value="65"
    :zones="[
      { from: 0, to: 50, color: 'hsl(var(--info))', label: 'Normal' },
      { from: 50, to: 80, color: 'hsl(var(--warning))', label: 'Elevated' },
      { from: 80, to: 100, color: 'hsl(var(--destructive))', label: 'Critical' },
    ]"
    label="Temperature"
  />
</template>`}
      >
        <div className="flex justify-center">
          <GaugeChart
            value={65}
            zones={[
              { from: 0, to: 50, color: 'hsl(var(--info))', label: 'Normal' },
              { from: 50, to: 80, color: 'hsl(var(--warning))', label: 'Elevated' },
              { from: 80, to: 100, color: 'hsl(var(--destructive))', label: 'Critical' },
            ]}
            label="Temperature"
          />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Custom Value Formatter"
        description="Format the displayed value with custom units."
        code={`<GaugeChart
  value={3500}
  min={0}
  max={6000}
  valueFormatter={(v) => \`\${(v / 1000).toFixed(1)}K RPM\`}
  label="Engine Speed"
/>`}
        vueCode={`<template>
  <GaugeChart
    :value="3500"
    :min="0"
    :max="6000"
    :value-formatter="(v) => \`\${(v / 1000).toFixed(1)}K RPM\`"
    label="Engine Speed"
  />
</template>`}
      >
        <div className="flex justify-center">
          <GaugeChart
            value={3500}
            min={0}
            max={6000}
            valueFormatter={(v: number) => `${(v / 1000).toFixed(1)}K`}
            label="RPM"
            zones={[
              { from: 0, to: 2000, color: 'hsl(var(--info))' },
              { from: 2000, to: 4500, color: 'hsl(var(--success))' },
              { from: 4500, to: 6000, color: 'hsl(var(--destructive))' },
            ]}
          />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Without Ticks"
        description="Hide tick marks for a cleaner appearance."
        code={`<GaugeChart value={72} showTicks={false} />`}
        vueCode={`<template>
  <GaugeChart :value="72" :show-ticks="false" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-2">
            <GaugeChart value={72} showTicks />
            <span className="text-xs font-bold uppercase">With Ticks</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <GaugeChart value={72} showTicks={false} />
            <span className="text-xs font-bold uppercase">Without Ticks</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Dashboard Example"
        description="Multiple gauges for a monitoring dashboard."
        code={`<div className="grid grid-cols-3 gap-4">
  <GaugeChart value={45} size="sm" label="CPU" />
  <GaugeChart value={72} size="sm" label="Memory" />
  <GaugeChart value={28} size="sm" label="Disk" />
</div>`}
        vueCode={`<template>
  <div class="grid grid-cols-3 gap-4">
    <GaugeChart :value="45" size="sm" label="CPU" />
    <GaugeChart :value="72" size="sm" label="Memory" />
    <GaugeChart :value="28" size="sm" label="Disk" />
  </div>
</template>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <GaugeChart value={45} size="sm" label="CPU" />
          </div>
          <div className="flex flex-col items-center">
            <GaugeChart value={72} size="sm" label="Memory" />
          </div>
          <div className="flex flex-col items-center">
            <GaugeChart value={28} size="sm" label="Disk" />
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
