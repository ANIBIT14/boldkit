<script setup lang="ts">
import { computed, ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart as ERadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, RadarComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { extent, type ChartConfig, CHART_PALETTES, useResolvedChart, toCssSize } from './chart-utils'
import { chartContainerVariants, splitChartVariant, type ChartContainerVariant } from './chart-variants'
import ChartEmpty from './ChartEmpty.vue'

// Register ECharts components
use([CanvasRenderer, ERadarChart, TooltipComponent, LegendComponent, RadarComponent])

interface RadarChartProps {
  data: Array<{ subject: string; [key: string]: number | string }>
  dataKeys: string[]
  config: ChartConfig
  showLegend?: boolean
  showGrid?: boolean
  fillOpacity?: number
  /** Number = px (as in React); string = any CSS length. */
  height?: number | string
  /**
   * Chart geometry, same values as React. Container styles (`elevated`, `flat`,
   * …) are still accepted here for pre-v3.6 code — @deprecated, use `containerVariant`.
   */
  variant?: 'default' | 'filled' | 'outlined' | ChartContainerVariant
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

const props = withDefaults(defineProps<RadarChartProps>(), {
  ariaLabel: 'Radar chart',
  showLegend: true,
  showGrid: true,
  fillOpacity: 0.6,
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

const variants = computed(() => splitChartVariant(props.variant, props.containerVariant, ['default', 'filled', 'outlined'] as const))

const isEmpty = computed(() => !props.data || props.data.length === 0 || !props.dataKeys || props.dataKeys.length === 0)

const indicators = computed(() => {
  if (props.data.length === 0 || props.dataKeys.length === 0) {
    return props.data.map(d => ({ name: d.subject, max: 100 }))
  }

  const maxValues: Record<string, number> = {}
  props.dataKeys.forEach(key => {
    const values = props.data.map(d => (d[key] as number) || 0)
    maxValues[key] = extent(values).max
  })

  // Scale to the data max, matching React's PolarRadiusAxis domain [0, 'dataMax'].
  const globalMax = Math.max(extent(props.dataKeys.map(key => maxValues[key])).max, 0)

  return props.data.map(d => ({
    name: d.subject,
    max: Math.max(globalMax, 1),
  }))
})

const seriesData = computed(() => {
  const outlined = variants.value.geometry === 'outlined'
  return props.dataKeys.map((key, index) => {
    const color = props.config[key]?.color || CHART_PALETTES.bold[index % CHART_PALETTES.bold.length]
    return {
      name: props.config[key]?.label || key,
      value: props.data.map(d => d[key] as number),
      itemStyle: { color },
      areaStyle: { opacity: outlined ? 0 : props.fillOpacity },
      lineStyle: {
        width: 3,
        color: outlined ? color : 'hsl(var(--foreground))',
      },
    }
  })
})

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
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
  radar: {
    indicator: indicators.value,
    shape: 'polygon',
    axisLine: {
      lineStyle: {
        color: 'hsl(var(--foreground))',
        width: 2,
      },
    },
    splitLine: {
      lineStyle: {
        color: 'hsl(var(--muted-foreground) / 0.3)',
        width: props.showGrid ? 2 : 0,
      },
    },
    splitArea: {
      show: false,
    },
    axisName: {
      fontWeight: 'bold',
      color: 'hsl(var(--foreground))',
    },
  },
  series: [{
    type: 'radar',
    data: seriesData.value,
    symbol: 'circle',
    symbolSize: 8,
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
    <VChart
      v-else
      :option="resolvedOption"
      :theme="resolvedTheme"
      :autoresize="true"
      :style="{ width: '100%', height: toCssSize(height) }"
    />
  </div>
</template>
