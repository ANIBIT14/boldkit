import { RadialBarChart } from '@/components/ui/chart'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import type { ChartConfig } from '@/components/ui/chart'
import sourceCode from '@/components/ui/chart/radial-bar-chart.tsx?raw'
import vueSourceCode from '@vue-ui/RadialBarChart.vue?raw'



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
        registryName="radial-bar-chart"
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
