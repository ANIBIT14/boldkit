<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart as ERadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, RadarComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { neubrutalismTheme, type ChartConfig, CHART_PALETTES } from './chart-utils'
import { chartContainerVariants } from './chart-variants'
import type { VariantProps } from 'class-variance-authority'

// Register ECharts components
use([CanvasRenderer, ERadarChart, TooltipComponent, LegendComponent, RadarComponent])

type ChartVariants = VariantProps<typeof chartContainerVariants>

interface RadarChartProps {
  data: Array<{ subject: string; [key: string]: number | string }>
  dataKeys: string[]
  config: ChartConfig
  showLegend?: boolean
  showGrid?: boolean
  fillOpacity?: number
  height?: string
  variant?: ChartVariants['variant']
  class?: string
}

const props = withDefaults(defineProps<RadarChartProps>(), {
  showLegend: false,
  showGrid: true,
  fillOpacity: 0.6,
  height: '300px',
  variant: 'default',
})

const indicators = computed(() => {
  const maxValues: Record<string, number> = {}
  props.dataKeys.forEach(key => {
    maxValues[key] = Math.max(...props.data.map(d => (d[key] as number) || 0))
  })

  return props.data.map(d => ({
    name: d.subject,
    max: Math.max(...props.dataKeys.map(key => maxValues[key])) * 1.2,
  }))
})

const seriesData = computed(() => {
  return props.dataKeys.map((key, index) => ({
    name: props.config[key]?.label || key,
    value: props.data.map(d => d[key] as number),
    itemStyle: {
      color: props.config[key]?.color || CHART_PALETTES.bold[index % CHART_PALETTES.bold.length],
    },
    areaStyle: {
      opacity: props.fillOpacity,
    },
    lineStyle: {
      width: 3,
      color: 'hsl(var(--foreground))',
    },
  }))
})

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
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
    data-slot="chart"
    :class="cn(chartContainerVariants({ variant }), props.class)"
  >
    <VChart
      :option="option"
      :theme="neubrutalismTheme"
      :autoresize="true"
      :style="{ width: '100%', height }"
    />
  </div>
</template>
