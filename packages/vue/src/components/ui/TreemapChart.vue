<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreemapChart as EChartsTreemap } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { neubrutalismTheme } from './chart-utils'

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
  height?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true,
  animated: true,
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
    formatter: (params: { name: string; value: number }) =>
      `${params.name}: ${params.value?.toLocaleString() ?? ''}`,
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
  <div :class="cn('w-full', props.class)" :style="{ height }">
    <VChart
      :option="option"
      :theme="neubrutalismTheme"
      :autoresize="true"
      style="width: 100%; height: 100%"
    />
  </div>
</template>
