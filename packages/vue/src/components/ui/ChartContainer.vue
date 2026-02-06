<script setup lang="ts">
import { computed, provide, useId, type InjectionKey } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { chartContainerVariants } from './chart-variants'
import { neubrutalismTheme, type ChartConfig } from './chart-utils'

// Register ECharts components
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

type ChartVariants = VariantProps<typeof chartContainerVariants>

interface Props {
  class?: string
  variant?: ChartVariants['variant']
  config: ChartConfig
  option: Record<string, unknown>
  height?: string
  autoresize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  height: '100%',
  autoresize: true,
})

// Provide chart config to child components
export interface ChartContext {
  config: ChartConfig
}

export const ChartContextKey: InjectionKey<ChartContext> = Symbol('ChartContext')

provide(ChartContextKey, {
  config: props.config,
})

const chartId = `chart-${useId().replace(/:/g, '')}`

// Merge theme with user options
const mergedOption = computed(() => ({
  ...props.option,
}))
</script>

<template>
  <div
    data-slot="chart"
    :data-chart="chartId"
    :class="cn(chartContainerVariants({ variant: props.variant }), props.class)"
  >
    <VChart
      :option="mergedOption"
      :theme="neubrutalismTheme"
      :autoresize="autoresize"
      :style="{ height, width: '100%' }"
    />
  </div>
</template>
