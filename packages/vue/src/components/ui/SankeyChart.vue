<script setup lang="ts">
import { computed, ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { SankeyChart as EChartsSankey } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { useResolvedChart, toCssSize } from './chart-utils'
import ChartEmpty from './ChartEmpty.vue'
import type { SankeyNode, SankeyLink } from './chart-types'

use([CanvasRenderer, EChartsSankey, TooltipComponent])

interface Props {
  nodes: SankeyNode[]
  links: SankeyLink[]
  showTooltip?: boolean
  showLabels?: boolean
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
  ariaLabel: 'Sankey chart',
  showTooltip: true,
  showLabels: true,
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

const isEmpty = computed(() => !props.nodes || props.nodes.length === 0 || !props.links || props.links.length === 0)

const option = computed(() => ({
  tooltip: props.showTooltip ? {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter: (params: { dataType: string; name: string; value: number; data: { source: string; target: string } }) => {
      if (params.dataType === 'edge') {
        return `${params.data.source} → ${params.data.target}: <b>${params.value}</b>`
      }
      return params.name
    },
    backgroundColor: 'hsl(var(--background))',
    borderColor: 'hsl(var(--foreground))',
    borderWidth: 3,
    padding: [6, 10],
    textStyle: { color: 'hsl(var(--foreground))', fontFamily: "'DM Mono', monospace", fontSize: 12 },
    extraCssText: 'border-radius: 0; box-shadow: 4px 4px 0px hsl(var(--foreground));',
  } : undefined,
  series: [{
    type: 'sankey',
    layout: 'none',
    emphasis: { focus: 'adjacency' },
    nodeWidth: 16,
    nodeGap: 10,
    itemStyle: {
      borderColor: 'hsl(var(--foreground))',
      borderWidth: 3,
    },
    label: {
      show: props.showLabels,
      fontWeight: 'bold',
      fontFamily: "'DM Mono', monospace",
      fontSize: 11,
      color: 'hsl(var(--foreground))',
    },
    lineStyle: {
      color: 'source',
      opacity: 0.45,
      curveness: 0.5,
    },
    data: props.nodes.map((n, i) => ({
      name: n.id,
      label: { formatter: n.label },
      itemStyle: { color: n.color || COLORS[i % COLORS.length] },
    })),
    links: props.links.map(l => ({
      source: l.source,
      target: l.target,
      value: l.value,
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
