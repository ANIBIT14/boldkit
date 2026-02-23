<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'

// Register ECharts components
use([CanvasRenderer, BarChart, LineChart, GridComponent])

interface SparklineProps {
  data: number[]
  type?: 'line' | 'area' | 'bar'
  color?: string
  height?: number
  width?: number | string
  showEndDot?: boolean
  strokeWidth?: number
  trend?: 'up' | 'down' | 'neutral'
  animated?: boolean
  class?: string
}

const props = withDefaults(defineProps<SparklineProps>(), {
  type: 'line',
  height: 32,
  width: '100%',
  showEndDot: false,
  strokeWidth: 2,
  animated: true,
})

const resolvedColor = computed(() => {
  if (props.color) return props.color
  if (props.trend === 'up') return 'hsl(var(--success))'
  if (props.trend === 'down') return 'hsl(var(--destructive))'
  return 'hsl(var(--primary))'
})

const strokeColor = 'hsl(var(--foreground))'

const option = computed(() => {
  const baseOption = {
    animation: props.animated,
    animationDuration: 300,
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      show: false,
      data: props.data.map((_, i) => i),
    },
    yAxis: {
      type: 'value',
      show: false,
      min: Math.min(...props.data) * 0.9,
      max: Math.max(...props.data) * 1.1,
    },
  }

  if (props.type === 'bar') {
    return {
      ...baseOption,
      series: [{
        type: 'bar',
        data: props.data,
        itemStyle: {
          color: resolvedColor.value,
          borderColor: strokeColor,
          borderWidth: 1,
        },
      }],
    }
  }

  if (props.type === 'area') {
    return {
      ...baseOption,
      series: [{
        type: 'line',
        data: props.data,
        smooth: true,
        symbol: props.showEndDot ? 'circle' : 'none',
        symbolSize: (_, params) => params.dataIndex === props.data.length - 1 ? 8 : 0,
        lineStyle: {
          color: strokeColor,
          width: props.strokeWidth,
        },
        itemStyle: {
          color: resolvedColor.value,
          borderColor: strokeColor,
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: resolvedColor.value.replace(')', ' / 0.6)').replace('hsl', 'hsla') },
              { offset: 1, color: resolvedColor.value.replace(')', ' / 0.1)').replace('hsl', 'hsla') },
            ],
          },
        },
      }],
    }
  }

  // Default: line
  return {
    ...baseOption,
    series: [{
      type: 'line',
      data: props.data,
      smooth: true,
      symbol: props.showEndDot ? 'circle' : 'none',
      symbolSize: (_, params) => params.dataIndex === props.data.length - 1 ? 8 : 0,
      lineStyle: {
        color: strokeColor,
        width: props.strokeWidth,
      },
      itemStyle: {
        color: resolvedColor.value,
        borderColor: strokeColor,
        borderWidth: 2,
      },
    }],
  }
})
</script>

<template>
  <div
    :class="cn('inline-block', props.class)"
    :style="{ width: typeof width === 'number' ? `${width}px` : width, height: `${height}px` }"
  >
    <VChart :option="option" :autoresize="true" style="width: 100%; height: 100%" />
  </div>
</template>
