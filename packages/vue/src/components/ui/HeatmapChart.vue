<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { HeatmapChart as EChartsHeatmap } from 'echarts/charts'
import { TooltipComponent, VisualMapComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { neubrutalismTheme } from './chart-utils'

use([CanvasRenderer, EChartsHeatmap, TooltipComponent, VisualMapComponent, GridComponent])

export interface HeatmapCellData {
  row: string
  col: string
  value: number
}

interface Props {
  data: HeatmapCellData[]
  rows: string[]
  cols: string[]
  showTooltip?: boolean
  height?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true,
  height: '320px',
})

const option = computed(() => {
  const vals = props.data.map(d => d.value)
  const minVal = Math.min(...vals)
  const maxVal = Math.max(...vals)

  const seriesData = props.data.map(d => [
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
  <div :class="cn('w-full', props.class)" :style="{ height }">
    <VChart
      :option="option"
      :theme="neubrutalismTheme"
      :autoresize="true"
      style="width: 100%; height: 100%"
    />
  </div>
</template>
