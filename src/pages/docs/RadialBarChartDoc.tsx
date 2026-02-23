import { RadialBarChart } from '@/components/ui/chart'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import type { ChartConfig } from '@/components/ui/chart'

const sourceCode = `import * as React from 'react'
import { cn } from '@/lib/utils'
import { RadialBarChart as RechartsRadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from './index'
import type { ChartConfig } from './types'

export interface RadialBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{ name: string; value: number; fill?: string }>
  config: ChartConfig
  variant?: 'default' | 'stacked' | 'nested'
  innerRadius?: string | number
  outerRadius?: string | number
  showLabel?: boolean
  showBackground?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  startAngle?: number
  endAngle?: number
  animated?: boolean
  maxValue?: number
}

export { RadialBarChart }`

const vueSourceCode = `<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { PolarComponent } from 'echarts/components'

use([CanvasRenderer, PieChart, PolarComponent])

interface Props {
  data: Array<{ name: string; value: number; fill?: string }>
  innerRadius?: string
  outerRadius?: string
  showLabel?: boolean
  showBackground?: boolean
  maxValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  innerRadius: '30%',
  outerRadius: '100%',
  showLabel: true,
  showBackground: true,
})
</script>

<template>
  <div class="border-3 border-foreground bg-background p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
    <VChart :option="option" class="h-[300px] w-full" autoresize />
  </div>
</template>`

const usageCode = `import { RadialBarChart } from '@/components/ui/chart'

const data = [
  { name: 'Progress', value: 75, fill: 'hsl(var(--primary))' },
  { name: 'Goals', value: 60, fill: 'hsl(var(--secondary))' },
  { name: 'Tasks', value: 45, fill: 'hsl(var(--accent))' },
]

const config = {
  progress: { label: 'Progress', color: 'hsl(var(--primary))' },
  goals: { label: 'Goals', color: 'hsl(var(--secondary))' },
  tasks: { label: 'Tasks', color: 'hsl(var(--accent))' },
}

export default function Example() {
  return <RadialBarChart data={data} config={config} />
}`

const vueUsageCode = `<script setup lang="ts">
import { RadialBarChart } from '@/components/ui'

const data = [
  { name: 'Progress', value: 75, fill: 'hsl(var(--primary))' },
  { name: 'Goals', value: 60, fill: 'hsl(var(--secondary))' },
  { name: 'Tasks', value: 45, fill: 'hsl(var(--accent))' },
]
</script>

<template>
  <RadialBarChart :data="data" />
</template>`

export function RadialBarChartDoc() {
  const data = [
    { name: 'Progress', value: 75, fill: 'hsl(var(--primary))' },
    { name: 'Goals', value: 60, fill: 'hsl(var(--secondary))' },
    { name: 'Tasks', value: 45, fill: 'hsl(var(--accent))' },
  ]

  const config: ChartConfig = {
    progress: { label: 'Progress', color: 'hsl(var(--primary))' },
    goals: { label: 'Goals', color: 'hsl(var(--secondary))' },
    tasks: { label: 'Tasks', color: 'hsl(var(--accent))' },
  }

  const singleData = [{ name: 'Completion', value: 72, fill: 'hsl(var(--primary))' }]

  return (
    <>
      <ComponentDoc
        name="RadialBarChart"
        description="Circular progress bars with nested rings for displaying multiple metrics."
        dependencies={['recharts']}
        vueDependencies={['vue-echarts', 'echarts']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="max-w-[300px]">
          <RadialBarChart data={data} config={config} />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Single Progress"
        description="Display a single progress metric as a radial bar."
        code={`<RadialBarChart
  data={[{ name: 'Completion', value: 72, fill: 'hsl(var(--primary))' }]}
  config={config}
  maxValue={100}
/>`}
        vueCode={`<template>
  <RadialBarChart
    :data="[{ name: 'Completion', value: 72, fill: 'hsl(var(--primary))' }]"
    :max-value="100"
  />
</template>`}
      >
        <div className="max-w-[250px]">
          <RadialBarChart data={singleData} config={config} maxValue={100} />
        </div>
      </ExampleSection>

      <ExampleSection
        title="With Background Track"
        description="Show a background track to indicate the full range."
        code={`<RadialBarChart data={data} config={config} showBackground />`}
        vueCode={`<template>
  <RadialBarChart :data="data" show-background />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Without Background</p>
            <RadialBarChart data={data} config={config} showBackground={false} />
          </div>
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">With Background</p>
            <RadialBarChart data={data} config={config} showBackground />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="With Labels"
        description="Show value labels inside the bars."
        code={`<RadialBarChart data={data} config={config} showLabel />`}
        vueCode={`<template>
  <RadialBarChart :data="data" show-label />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Without Labels</p>
            <RadialBarChart data={data} config={config} showLabel={false} />
          </div>
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">With Labels</p>
            <RadialBarChart data={data} config={config} showLabel />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="With Legend"
        description="Add a legend to identify each ring."
        code={`<RadialBarChart data={data} config={config} showLegend />`}
        vueCode={`<template>
  <RadialBarChart :data="data" show-legend />
</template>`}
      >
        <div className="max-w-[300px]">
          <RadialBarChart data={data} config={config} showLegend />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Custom Angles"
        description="Customize the start and end angles for different arc shapes."
        code={`<RadialBarChart data={data} config={config} startAngle={180} endAngle={0} />`}
        vueCode={`<template>
  <RadialBarChart :data="data" :start-angle="180" :end-angle="0" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Full Circle (default)</p>
            <RadialBarChart data={data} config={config} />
          </div>
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Semi Circle</p>
            <RadialBarChart data={data} config={config} startAngle={180} endAngle={0} />
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
