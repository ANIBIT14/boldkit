<script setup lang="ts">
import { computed, ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { type ChartConfig, useResolvedChart, toCssSize } from './chart-utils'
import { chartContainerVariants, splitChartVariant, type ChartContainerVariant } from './chart-variants'
import ChartEmpty from './ChartEmpty.vue'

// Register ECharts components
use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

interface DonutChartData {
  name: string
  value: number
  fill?: string
}

interface DonutChartProps {
  data: DonutChartData[]
  config: ChartConfig
  innerRadius?: string
  outerRadius?: string
  showLabels?: 'none' | 'inside' | 'outside'
  showLegend?: boolean
  /** Number = px (as in React); string = any CSS length. */
  height?: number | string
  /**
   * Chart geometry, same values as React. Container styles (`elevated`, `flat`,
   * …) are still accepted here for pre-v3.6 code — @deprecated, use `containerVariant`.
   */
  variant?: 'default' | 'separated' | ChartContainerVariant
  /** Container border/shadow style (React: same prop name). */
  containerVariant?: ChartContainerVariant
  class?: string
  emptyMessage?: string
  /** React calls this `emptyState`. Accepted here so the same prop name works
   *  in both frameworks; `emptyMessage` stays supported. */
  emptyState?: string
  /** Accessible name. React exposes this on every chart; without it the
   *  chart ships with no name at all. */
  ariaLabel?: string
}

const props = withDefaults(defineProps<DonutChartProps>(), {
  ariaLabel: 'Donut chart',
  innerRadius: '60%',
  outerRadius: '80%',
  showLabels: 'none',
  showLegend: false,
  height: 300,
  variant: 'default',
})

// Prefer the React-compatible name when both are given.
const resolvedEmptyMessage = computed(() => props.emptyState ?? props.emptyMessage)

// ECharts draws to a canvas, which has no CSS cascade: an
// `hsl(var(--primary))` string assigned to fillStyle is silently dropped.
// Resolve the option and theme against this element before they reach VChart.
const rootEl = ref<HTMLElement | null>(null)
const { theme: resolvedTheme, resolve } = useResolvedChart(rootEl)
const resolvedOption = computed(() => resolve(option.value))

const variants = computed(() => splitChartVariant(props.variant, props.containerVariant, ['default', 'separated'] as const))

const isEmpty = computed(() => !props.data || props.data.length === 0)

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
    backgroundColor: 'hsl(var(--background))',
    borderColor: 'hsl(var(--foreground))',
    borderWidth: 3,
    padding: [6, 10],
    textStyle: { color: 'hsl(var(--foreground))', fontFamily: "'DM Mono', monospace", fontSize: 12 },
    extraCssText: 'border-radius: 0; box-shadow: 4px 4px 0px hsl(var(--foreground));',
  },
  legend: props.showLegend ? {
    orient: 'horizontal',
    bottom: 0,
    textStyle: {
      fontWeight: 'bold',
    },
  } : undefined,
  series: [{
    type: 'pie',
    radius: [props.innerRadius, props.outerRadius],
    center: ['50%', '50%'],
    padAngle: variants.value.geometry === 'separated' ? 4 : 0,
    avoidLabelOverlap: true,
    itemStyle: {
      borderColor: 'hsl(var(--foreground))',
      borderWidth: 3,
    },
    label: props.showLabels === 'none' ? { show: false } : {
      show: true,
      position: props.showLabels,
      fontWeight: 'bold',
      formatter: '{b}',
    },
    labelLine: {
      show: props.showLabels === 'outside',
    },
    data: props.data.map(item => ({
      name: item.name,
      value: item.value,
      itemStyle: item.fill ? { color: item.fill } : undefined,
    })),
  }],
}))
</script>

<template>
  <div
    ref="rootEl"
    role="img"
    :aria-label="ariaLabel"
    data-slot="chart"
    :class="cn(chartContainerVariants({ variant: variants.container }), props.class)"
  >
    <ChartEmpty v-if="isEmpty" :message="resolvedEmptyMessage" />
    <div v-else class="relative w-full" :style="{ height: toCssSize(height) }">
      <VChart
        :option="resolvedOption"
        :theme="resolvedTheme"
        :autoresize="true"
        style="width: 100%; height: 100%"
      />
      <!-- Center content slot -->
      <div
        v-if="$slots.default"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
