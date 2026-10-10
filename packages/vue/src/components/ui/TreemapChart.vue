<script setup lang="ts">
import { computed, ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreemapChart as EChartsTreemap } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { useResolvedChart, toCssSize } from './chart-utils'
import ChartEmpty from './ChartEmpty.vue'

use([CanvasRenderer, EChartsTreemap, TooltipComponent])

export interface TreemapChartData {
  name: string
  value?: number
  children?: TreemapChartData[]
}

interface Props {
  data: TreemapChartData[]
  showTooltip?: boolean
  animated?: boolean
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

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Treemap chart',
  showTooltip: true,
  animated: true,
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

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--success))',
  'hsl(var(--info))',
  'hsl(var(--warning))',
]

const isEmpty = computed(() => !props.data || props.data.length === 0)

const option = computed(() => ({
  tooltip: props.showTooltip ? {
    trigger: 'item',
    formatter: (params: { name: string; value: number }) =>
      `${params.name}: ${params.value?.toLocaleString() ?? ''}`,
    backgroundColor: 'hsl(var(--background))',
    borderColor: 'hsl(var(--foreground))',
    borderWidth: 3,
    padding: [6, 10],
    textStyle: {
      color: 'hsl(var(--foreground))',
      fontFamily: "'DM Mono', monospace",
      fontSize: 12,
    },
    extraCssText: 'border-radius: 0; box-shadow: 4px 4px 0px hsl(var(--foreground));',
  } : undefined,
  series: [{
    type: 'treemap',
    animation: props.animated,
    animationDuration: 400,
    itemStyle: {
      borderColor: 'hsl(var(--foreground))',
      borderWidth: 3,
      gapWidth: 4,
    },
    label: {
      show: true,
      fontWeight: 'bold',
      fontFamily: 'inherit',
      fontSize: 13,
      color: 'hsl(var(--foreground))',
    },
    upperLabel: {
      show: false,
    },
    levels: [
      {
        colorSaturation: [0.7, 1],
        itemStyle: {
          borderWidth: 3,
          borderColor: 'hsl(var(--foreground))',
          gapWidth: 4,
        },
      },
    ],
    data: props.data.map((d, i) => ({
      ...d,
      itemStyle: { color: COLORS[i % COLORS.length] },
    })),
  }],
}))
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
    />
  </div>
</template>
