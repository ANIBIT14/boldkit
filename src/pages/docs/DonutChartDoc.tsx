import { DonutChart, DonutChartCenter } from '@/components/ui/chart'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import type { ChartConfig } from '@/components/ui/chart'
import sourceCode from '@/components/ui/chart/donut-chart.tsx?raw'
import vueSourceCode from '@vue-ui/DonutChart.vue?raw'



const usageCode = `import { DonutChart, DonutChartCenter } from '@/components/ui/chart'

const data = [
  { name: 'Chrome', value: 275, fill: 'hsl(var(--primary))' },
  { name: 'Safari', value: 200, fill: 'hsl(var(--secondary))' },
  { name: 'Firefox', value: 187, fill: 'hsl(var(--accent))' },
]

const config = {
  chrome: { label: 'Chrome', color: 'hsl(var(--primary))' },
  safari: { label: 'Safari', color: 'hsl(var(--secondary))' },
  firefox: { label: 'Firefox', color: 'hsl(var(--accent))' },
}

export default function Example() {
  return (
    <DonutChart
      data={data}
      config={config}
      centerContent={<DonutChartCenter value="662" label="Total" />}
    />
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { DonutChart, DonutChartCenter } from '@/components/ui'

const data = [
  { name: 'Chrome', value: 275, fill: 'hsl(var(--primary))' },
  { name: 'Safari', value: 200, fill: 'hsl(var(--secondary))' },
  { name: 'Firefox', value: 187, fill: 'hsl(var(--accent))' },
]
</script>

<template>
  <DonutChart :data="data">
    <template #center>
      <DonutChartCenter value="662" label="Total" />
    </template>
  </DonutChart>
</template>`

export function DonutChartDoc() {
  const data = [
    { name: 'Chrome', value: 275, fill: 'hsl(var(--primary))' },
    { name: 'Safari', value: 200, fill: 'hsl(var(--secondary))' },
    { name: 'Firefox', value: 187, fill: 'hsl(var(--accent))' },
    { name: 'Edge', value: 173, fill: 'hsl(var(--success))' },
    { name: 'Other', value: 90, fill: 'hsl(var(--muted))' },
  ]

  const config: ChartConfig = {
    chrome: { label: 'Chrome', color: 'hsl(var(--primary))' },
    safari: { label: 'Safari', color: 'hsl(var(--secondary))' },
    firefox: { label: 'Firefox', color: 'hsl(var(--accent))' },
    edge: { label: 'Edge', color: 'hsl(var(--success))' },
    other: { label: 'Other', color: 'hsl(var(--muted))' },
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <>
      <ComponentDoc
        name="DonutChart"
        registryName="donut-chart"
        description="Pie chart with center hole for displaying KPIs and totals."
        dependencies={['recharts']}
        vueDependencies={['vue-echarts', 'echarts']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="max-w-[300px]">
          <DonutChart
            data={data}
            config={config}
            centerContent={<DonutChartCenter value={total} label="Total" />}
          />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Center Content"
        description="Display a KPI or label in the center of the donut."
        code={`<DonutChart
  data={data}
  config={config}
  centerContent={<DonutChartCenter value="925" label="Visitors" />}
/>`}
        vueCode={`<template>
  <DonutChart :data="data">
    <template #center>
      <DonutChartCenter value="925" label="Visitors" />
    </template>
  </DonutChart>
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">With Center KPI</p>
            <DonutChart
              data={data}
              config={config}
              centerContent={<DonutChartCenter value={total} label="Visitors" />}
            />
          </div>
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Custom Center</p>
            <DonutChart
              data={data}
              config={config}
              centerContent={
                <div className="text-center">
                  <div className="text-lg font-black">67%</div>
                  <div className="text-xs text-muted-foreground">Chrome</div>
                </div>
              }
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Separated Variant"
        description="Add gaps between segments for a more distinct look."
        code={`<DonutChart data={data} config={config} variant="separated" />`}
        vueCode={`<template>
  <DonutChart :data="data" variant="separated" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Default</p>
            <DonutChart data={data} config={config} />
          </div>
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Separated</p>
            <DonutChart data={data} config={config} variant="separated" />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Labels"
        description="Show labels inside or outside the chart."
        code={`<DonutChart data={data} config={config} showLabels="inside" />
<DonutChart data={data} config={config} showLabels="outside" />`}
        vueCode={`<template>
  <DonutChart :data="data" show-labels="inside" />
  <DonutChart :data="data" show-labels="outside" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Inside Labels</p>
            <DonutChart data={data} config={config} showLabels="inside" />
          </div>
          <div className="max-w-[300px]">
            <p className="text-xs font-bold uppercase mb-2">Outside Labels</p>
            <DonutChart data={data} config={config} showLabels="outside" />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Custom Radius"
        description="Adjust inner and outer radius for different donut thickness."
        code={`<DonutChart data={data} config={config} innerRadius="40%" outerRadius="90%" />`}
        vueCode={`<template>
  <DonutChart :data="data" inner-radius="40%" outer-radius="90%" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="max-w-[200px]">
            <p className="text-xs font-bold uppercase mb-2">Thin</p>
            <DonutChart data={data} config={config} innerRadius="70%" outerRadius="85%" />
          </div>
          <div className="max-w-[200px]">
            <p className="text-xs font-bold uppercase mb-2">Default</p>
            <DonutChart data={data} config={config} />
          </div>
          <div className="max-w-[200px]">
            <p className="text-xs font-bold uppercase mb-2">Thick</p>
            <DonutChart data={data} config={config} innerRadius="40%" outerRadius="85%" />
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
