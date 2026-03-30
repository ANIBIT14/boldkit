<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { SankeyChart as EChartsSankey } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { neubrutalismTheme } from './chart-utils'

use([CanvasRenderer, EChartsSankey, TooltipComponent])

export interface SankeyNode {
  id: string
  label: string
  color?: string
}

export interface SankeyLink {
  source: string
  target: string
  value: number
}

interface Props {
  nodes: SankeyNode[]
  links: SankeyLink[]
  showTooltip?: boolean
  showLabels?: boolean
  height?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true,
  showLabels: true,
  height: '320px',
})

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--success))',
  'hsl(var(--info))',
  'hsl(var(--warning))',
]

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
  <div :class="cn('w-full', props.class)" :style="{ height }">
    <VChart
      :option="option"
      :theme="neubrutalismTheme"
      :autoresize="true"
      style="width: 100%; height: 100%"
    />
  </div>
</template>
