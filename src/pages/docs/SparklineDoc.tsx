import { Sparkline } from '@/components/ui/chart'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
} from 'recharts'

export interface SparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[]
  type?: 'line' | 'area' | 'bar'
  color?: string
  height?: number
  width?: number | string
  showEndDot?: boolean
  strokeWidth?: number
  trend?: 'up' | 'down' | 'neutral'
  animated?: boolean
}

const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
  ({ data, type = 'line', color, height = 32, width = '100%', showEndDot = false, strokeWidth = 2, trend, animated = true, className, ...props }, ref) => {
    // Renders a minimal chart based on type
  }
)

export { Sparkline }`

const vueSourceCode = `<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'

use([CanvasRenderer, LineChart, BarChart])

interface Props {
  data: number[]
  type?: 'line' | 'area' | 'bar'
  color?: string
  height?: number
  width?: number | string
  showEndDot?: boolean
  strokeWidth?: number
  trend?: 'up' | 'down' | 'neutral'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'line',
  height: 32,
  width: '100%',
  strokeWidth: 2,
})

const option = computed(() => ({
  grid: { top: 0, right: 0, bottom: 0, left: 0 },
  xAxis: { show: false, type: 'category', data: props.data.map((_, i) => i) },
  yAxis: { show: false, type: 'value' },
  series: [{
    type: props.type === 'bar' ? 'bar' : 'line',
    data: props.data,
    areaStyle: props.type === 'area' ? { opacity: 0.4 } : undefined,
    lineStyle: { width: props.strokeWidth },
    symbol: props.showEndDot ? 'circle' : 'none',
  }]
}))
</script>

<template>
  <VChart :option="option" :style="{ width, height: height + 'px' }" autoresize />
</template>`

const usageCode = `import { Sparkline } from '@/components/ui/chart'

export default function Example() {
  const data = [10, 15, 8, 20, 14, 25, 18, 30]

  return <Sparkline data={data} />
}`

const vueUsageCode = `<script setup lang="ts">
import { Sparkline } from '@/components/ui'

const data = [10, 15, 8, 20, 14, 25, 18, 30]
</script>

<template>
  <Sparkline :data="data" />
</template>`

export function SparklineDoc() {
  const upTrend = [10, 12, 15, 14, 18, 20, 22, 25, 28, 30]
  const downTrend = [30, 28, 25, 22, 20, 18, 15, 14, 12, 10]
  const volatile = [10, 25, 15, 30, 12, 28, 18, 35, 20, 32]

  return (
    <>
      <ComponentDoc
        name="Sparkline"
        description="Tiny inline trend charts for tables, stat cards, and compact data displays."
        dependencies={['recharts']}
        vueDependencies={['vue-echarts', 'echarts']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex items-center gap-4">
          <Sparkline data={upTrend} width={100} />
          <span className="text-sm font-bold">+20%</span>
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Chart Types"
        description="Line, area, and bar sparklines for different data visualizations."
        code={`<Sparkline data={data} type="line" />
<Sparkline data={data} type="area" />
<Sparkline data={data} type="bar" />`}
        vueCode={`<template>
  <Sparkline :data="data" type="line" />
  <Sparkline :data="data" type="area" />
  <Sparkline :data="data" type="bar" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border-3 border-foreground bg-muted/30">
            <p className="text-xs font-bold uppercase mb-3">Line</p>
            <Sparkline data={upTrend} type="line" width="100%" height={40} />
          </div>
          <div className="p-4 border-3 border-foreground bg-muted/30">
            <p className="text-xs font-bold uppercase mb-3">Area</p>
            <Sparkline data={upTrend} type="area" width="100%" height={40} />
          </div>
          <div className="p-4 border-3 border-foreground bg-muted/30">
            <p className="text-xs font-bold uppercase mb-3">Bar</p>
            <Sparkline data={upTrend} type="bar" width="100%" height={40} />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Trend Colors"
        description="Automatic coloring based on trend direction."
        code={`<Sparkline data={upData} trend="up" />
<Sparkline data={downData} trend="down" />
<Sparkline data={neutralData} trend="neutral" />`}
        vueCode={`<template>
  <Sparkline :data="upData" trend="up" />
  <Sparkline :data="downData" trend="down" />
  <Sparkline :data="neutralData" trend="neutral" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border-3 border-foreground bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase">Trending Up</span>
              <span className="text-sm font-bold text-success">+12%</span>
            </div>
            <Sparkline data={upTrend} type="area" trend="up" width="100%" height={40} />
          </div>
          <div className="p-4 border-3 border-foreground bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase">Trending Down</span>
              <span className="text-sm font-bold text-destructive">-8%</span>
            </div>
            <Sparkline data={downTrend} type="area" trend="down" width="100%" height={40} />
          </div>
          <div className="p-4 border-3 border-foreground bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase">Volatile</span>
              <span className="text-sm font-bold">~5%</span>
            </div>
            <Sparkline data={volatile} type="area" trend="neutral" width="100%" height={40} />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="End Dot"
        description="Show a dot at the end of the line to highlight the current value."
        code={`<Sparkline data={data} showEndDot />`}
        vueCode={`<template>
  <Sparkline :data="data" show-end-dot />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border-3 border-foreground bg-muted/30">
            <p className="text-xs font-bold uppercase mb-3">Without End Dot</p>
            <Sparkline data={upTrend} type="line" width="100%" height={40} />
          </div>
          <div className="p-4 border-3 border-foreground bg-muted/30">
            <p className="text-xs font-bold uppercase mb-3">With End Dot</p>
            <Sparkline data={upTrend} type="line" showEndDot width="100%" height={40} />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="In Table"
        description="Use sparklines inline within table cells."
        code={`<Table>
  <TableRow>
    <TableCell>Revenue</TableCell>
    <TableCell><Sparkline data={data} width={80} height={24} /></TableCell>
    <TableCell>+12%</TableCell>
  </TableRow>
</Table>`}
        vueCode={`<template>
  <Table>
    <TableRow>
      <TableCell>Revenue</TableCell>
      <TableCell><Sparkline :data="data" :width="80" :height="24" /></TableCell>
      <TableCell>+12%</TableCell>
    </TableRow>
  </Table>
</template>`}
      >
        <div className="border-3 border-foreground overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr className="border-b-3 border-foreground">
                <th className="p-3 text-left font-bold uppercase text-sm">Metric</th>
                <th className="p-3 text-left font-bold uppercase text-sm">Trend</th>
                <th className="p-3 text-right font-bold uppercase text-sm">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-foreground/20">
                <td className="p-3 font-bold">Revenue</td>
                <td className="p-3"><Sparkline data={upTrend} trend="up" width={80} height={24} /></td>
                <td className="p-3 text-right font-bold text-success">+12%</td>
              </tr>
              <tr className="border-b-2 border-foreground/20">
                <td className="p-3 font-bold">Users</td>
                <td className="p-3"><Sparkline data={volatile} trend="neutral" width={80} height={24} /></td>
                <td className="p-3 text-right font-bold">+3%</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Churn</td>
                <td className="p-3"><Sparkline data={downTrend} trend="down" width={80} height={24} /></td>
                <td className="p-3 text-right font-bold text-destructive">-5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ExampleSection>
    </>
  )
}
