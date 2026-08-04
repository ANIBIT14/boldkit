<script lang="ts">
// Injection key + context type live in a plain <script> block — `<script setup>`
// cannot contain ES module `export`s (breaks the consumer's build).
import type { InjectionKey } from 'vue'

export interface ChartContext {
  config: import('vue').ComputedRef<import('./chart-utils').ChartConfig>
}

export const ChartContextKey: InjectionKey<ChartContext> = Symbol('ChartContext')
</script>

<script setup lang="ts">
import { computed, provide, useId } from 'vue'
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
import ChartLoading from './ChartLoading.vue'

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
  /** Render a brutalist placeholder instead of the chart while data is pending. */
  loading?: boolean
  /** Announced while `loading` is true. */
  loadingLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  height: '100%',
  autoresize: true,
  loading: false,
})

// Provide chart config to child components.
// config is exposed as a ComputedRef so injected consumers stay reactive to
// prop changes (a plain snapshot would freeze at first render).
provide(ChartContextKey, {
  config: computed(() => props.config),
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
    :aria-busy="loading || undefined"
    :class="cn(chartContainerVariants({ variant: props.variant }), props.class)"
  >
    <ChartLoading v-if="loading" :label="loadingLabel" />
    <VChart
      v-else
      :option="mergedOption"
      :theme="neubrutalismTheme"
      :autoresize="autoresize"
      :style="{ height, width: '100%' }"
    />
  </div>
</template>
