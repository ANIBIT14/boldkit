<script setup lang="ts">
import { computed, ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { HeatmapChart as EChartsHeatmap } from 'echarts/charts'
import { TooltipComponent, VisualMapComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { extent, useResolvedChart, toCssSize } from './chart-utils'
import ChartEmpty from './ChartEmpty.vue'
import type { HeatmapCellData } from './chart-types'

use([CanvasRenderer, EChartsHeatmap, TooltipComponent, VisualMapComponent, GridComponent])

interface Props {
  data: HeatmapCellData[]
  rows: string[]
  cols: string[]
  showTooltip?: boolean
  /** Number = px (as in React); string = any CSS length. */
  height?: number | string
  class?: string
  emptyMessage?: string
  /** React calls this `emptyState`. Accepted here so the same prop name works
   *  in both frameworks; `emptyMessage` stays supported. */
  emptyState?: string
  /** Accessible name. React exposes this on every chart; without it the
   *  chart ships with no name at all. */
  ariaLabel?: string
}

const emit = defineEmits<{
  cellClick: [cell: HeatmapCellData]
}>()

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Heatmap chart',
  showTooltip: true,
  height: 320,
})

// Prefer the React-compatible name when both are given.
const resolvedEmptyMessage = computed(() => props.emptyState ?? props.emptyMessage)

// ECharts draws to a canvas, which has no CSS cascade: an
// `hsl(var(--primary))` string assigned to fillStyle is silently dropped.
// Resolve the option and theme against this element before they reach VChart.
const rootEl = ref<HTMLElement | null>(null)
const { theme: resolvedTheme, resolve } = useResolvedChart(rootEl)
const resolvedOption = computed(() => resolve(option.value))

const isEmpty = computed(() => !props.data || props.data.length === 0)

const handleClick = (params: unknown) => {
  const data = (params as { data?: unknown }).data
  if (!Array.isArray(data) || data.length < 3) return
  const [ci, ri, value] = data as [number, number, number]
  emit('cellClick', { row: props.rows[ri], col: props.cols[ci], value })
}

const option = computed(() => {
  const vals = props.data.length > 0 ? props.data.map(d => d.value) : [0]
  const { min: minVal, max: rawMax } = extent(vals)
  const maxVal = rawMax || 1 // prevent min === max when all values are 0

  const seriesData = props.data
    .filter(d => props.cols.includes(d.col) && props.rows.includes(d.row))
    .map(d => [
      props.cols.indexOf(d.col),
      props.rows.indexOf(d.row),
      d.value,
    ])

  return {
    tooltip: props.showTooltip ? {
      position: 'top',
      formatter: (params: { data: number[] }) => {
        const [ci, ri, val] = params.data
        return `${props.rows[ri]} × ${props.cols[ci]}: <b>${val}</b>`
      },
      backgroundColor: 'hsl(var(--background))',
      borderColor: 'hsl(var(--foreground))',
      borderWidth: 3,
      padding: [6, 10],
      textStyle: { color: 'hsl(var(--foreground))', fontFamily: "'DM Mono', monospace", fontSize: 12 },
      extraCssText: 'border-radius: 0; box-shadow: 4px 4px 0px hsl(var(--foreground));',
    } : undefined,
    grid: { top: 40, bottom: 60, left: 80, right: 20 },
    xAxis: {
      type: 'category',
      data: props.cols,
      axisLabel: { rotate: 45, fontWeight: 'bold', fontSize: 11 },
      axisTick: { alignWithLabel: true },
    },
    yAxis: {
      type: 'category',
      data: props.rows,
      axisLabel: { fontWeight: 'bold', fontSize: 11 },
    },
    visualMap: {
      show: false,
      min: minVal,
      max: maxVal,
      inRange: {
        color: [
          'hsl(var(--primary) / 0.08)',
          'hsl(var(--primary))',
        ],
      },
    },
    series: [{
      type: 'heatmap',
      data: seriesData,
      itemStyle: {
        borderColor: 'hsl(var(--foreground) / 0.3)',
        borderWidth: 1,
      },
      emphasis: {
        itemStyle: {
          borderColor: 'hsl(var(--foreground))',
          borderWidth: 2,
        },
      },
    }],
  }
})
</script>

<template>
  <div ref="rootEl" role="img" :aria-label="ariaLabel" :class="cn('w-full', props.class)" :style="{ height: toCssSize(height) }">
    <ChartEmpty v-if="isEmpty" :message="resolvedEmptyMessage" />
    <VChart
      v-else
      :option="resolvedOption"
      :theme="resolvedTheme"
      :autoresize="true"
      style="width: 100%; height: 100%"
      @click="handleClick"
    />
  </div>
</template>
