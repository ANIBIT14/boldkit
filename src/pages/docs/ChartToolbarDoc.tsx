import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { ChartToolbar } from '@/components/ui/chart-toolbar'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import sourceCode from '@/components/ui/chart-toolbar.tsx?raw'

const chartData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 173, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 264, mobile: 140 },
]

const chartConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--primary))' },
  mobile: { label: 'Mobile', color: 'hsl(var(--secondary))' },
}

const usageCode = `import { ChartToolbar } from '@/components/ui/chart-toolbar'
import { ChartContainer } from '@/components/ui/chart'
import { Bar, BarChart, XAxis } from 'recharts'

export default function Example() {
  const data = [
    { month: 'Jan', desktop: 186 },
    { month: 'Feb', desktop: 305 },
    { month: 'Mar', desktop: 237 },
  ]

  return (
    <ChartToolbar data={data} filename="visitors">
      <ChartContainer config={config} className="h-[300px] w-full">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <Bar dataKey="desktop" fill="hsl(var(--primary))" />
        </BarChart>
      </ChartContainer>
    </ChartToolbar>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { ChartToolbar } from '@/components/ui'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
]

const option = {
  xAxis: { type: 'category', data: data.map((d) => d.month) },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: data.map((d) => d.desktop) }],
}
</script>

<template>
  <!-- ECharts renders to <canvas>, so PNG + CSV work; SVG is off by default. -->
  <ChartToolbar :data="data" filename="visitors">
    <VChart :option="option" class="h-[300px] w-full" autoresize />
  </ChartToolbar>
</template>`

function ToolbarBarChart() {
  return (
    <ChartToolbar data={chartData} filename="visitors">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey="desktop" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth={3} />
          <Bar dataKey="mobile" fill="hsl(var(--secondary))" stroke="hsl(var(--foreground))" strokeWidth={3} />
        </BarChart>
      </ChartContainer>
    </ChartToolbar>
  )
}

export function ChartToolbarDoc() {
  return (
    <>
      <ComponentDoc
        name="Chart Toolbar"
        description="Wraps any chart with a brutalist export toolbar — download the chart as PNG or SVG, export its data as CSV, or toggle fullscreen. Engine-agnostic: it reads the wrapped <svg> (Recharts) or <canvas> (ECharts), so it works with both the React and Vue chart families."
        dependencies={['lucide-react']}
        vueDependencies={['lucide-vue-next']}
        sourceCode={sourceCode}
        vueSourceCode={sourceCode /* wrapper mirrors the React surface */}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="max-w-2xl">
          <ToolbarBarChart />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="PNG + SVG + CSV export"
        description="Pass the same data array you feed the chart to enable the CSV button. PNG works everywhere; SVG is emitted only when the engine renders vector output (Recharts). Hover the chart's top-right corner for the toolbar."
        code={`<ChartToolbar data={data} filename="visitors">
  <ChartContainer config={config} className="h-[300px] w-full">
    <BarChart data={data}>
      <XAxis dataKey="month" />
      <Bar dataKey="desktop" fill="hsl(var(--primary))" />
    </BarChart>
  </ChartContainer>
</ChartToolbar>`}
        vueCode={`<ChartToolbar :data="data" filename="visitors">
  <VChart :option="option" class="h-[300px] w-full" autoresize />
</ChartToolbar>`}
      >
        <div className="max-w-2xl">
          <ToolbarBarChart />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Choose which buttons to show"
        description="Every button is opt-out. Hide SVG for canvas-based charts, drop the fullscreen toggle, or omit data to hide CSV. Here only PNG and CSV are shown."
        code={`<ChartToolbar
  data={data}
  filename="visitors"
  svg={false}
  fullscreen={false}
>
  {/* chart */}
</ChartToolbar>`}
        vueCode={`<ChartToolbar
  :data="data"
  filename="visitors"
  :svg="false"
  :fullscreen="false"
>
  <!-- chart -->
</ChartToolbar>`}
      >
        <div className="max-w-2xl">
          <ChartToolbar data={chartData} filename="visitors" svg={false} fullscreen={false}>
            <ChartContainer config={chartConfig} className="h-[260px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Bar dataKey="desktop" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth={3} />
              </BarChart>
            </ChartContainer>
          </ChartToolbar>
        </div>
      </ExampleSection>
    </>
  )
}
