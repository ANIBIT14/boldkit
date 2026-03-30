<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { FunnelChart as EChartsFunnel } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { neubrutalismTheme } from './chart-utils'

use([CanvasRenderer, EChartsFunnel, TooltipComponent, LegendComponent])

export interface FunnelChartData {
  name: string
  value: number
  fill?: string
}

interface Props {
  data: FunnelChartData[]
  showLabels?: boolean
  showTooltip?: boolean
  animated?: boolean
  height?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  showLabels: true,
  showTooltip: true,
  animated: true,
  height: '300px',
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
    formatter: '{b}: {c}',
  } : undefined,
  series: [{
    type: 'funnel',
    left: '10%',
    width: '80%',
    sort: 'descending',
    gap: 4,
    animation: props.animated,
    animationDuration: 400,
    itemStyle: {
      borderColor: 'hsl(var(--foreground))',
      borderWidth: 3,
    },
    label: {
      show: props.showLabels,
      position: 'inside',
      fontWeight: 'bold',
      fontFamily: "'DM Mono', monospace",
      fontSize: 12,
      color: 'hsl(var(--foreground))',
      formatter: '{b}',
    },
    data: props.data.map((d, i) => ({
      name: d.name,
      value: d.value,
      itemStyle: { color: d.fill || COLORS[i % COLORS.length] },
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
