<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { neubrutalismTheme, type ChartConfig, CHART_PALETTES } from './chart-utils'
import { chartContainerVariants } from './chart-variants'
import type { VariantProps } from 'class-variance-authority'

// Register ECharts components
use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

type ChartVariants = VariantProps<typeof chartContainerVariants>

interface RadialBarData {
  name: string
  value: number
  fill?: string
}

interface RadialBarChartProps {
  data: RadialBarData[]
  config: ChartConfig
  innerRadius?: string
  outerRadius?: string
  showLabel?: boolean
  showBackground?: boolean
  maxValue?: number
  height?: string
  variant?: ChartVariants['variant']
  class?: string
}

const props = withDefaults(defineProps<RadialBarChartProps>(), {
  innerRadius: '30%',
  outerRadius: '90%',
  showLabel: true,
  showBackground: true,
  height: '300px',
  variant: 'default',
})

const maxVal = computed(() => props.maxValue || Math.max(...props.data.map(d => d.value)) * 1.2)

// Create stacked rings for radial bar effect
const seriesData = computed(() => {
  const numItems = props.data.length
  const radiusStep = (90 - 30) / numItems // Percentage range divided by items

  return props.data.map((item, index) => {
    const innerR = 30 + (index * radiusStep)
    const outerR = innerR + radiusStep - 2 // Small gap between rings

    return {
      type: 'pie',
      radius: [`${innerR}%`, `${outerR}%`],
      center: ['50%', '50%'],
      startAngle: 90,
      itemStyle: {
        borderColor: 'hsl(var(--foreground))',
        borderWidth: 3,
      },
      label: props.showLabel && index === numItems - 1 ? {
        show: true,
        position: 'center',
        formatter: () => '',
      } : { show: false },
      data: [
        {
          name: item.name,
          value: item.value,
          itemStyle: {
            color: item.fill || props.config[item.name]?.color || CHART_PALETTES.bold[index % CHART_PALETTES.bold.length],
          },
        },
        props.showBackground ? {
          name: 'background',
          value: maxVal.value - item.value,
          itemStyle: {
            color: 'hsl(var(--muted))',
            borderWidth: 0,
          },
          emphasis: { disabled: true },
        } : null,
      ].filter(Boolean),
    }
  })
})

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: (params: { name: string; value: number; percent: number }) => {
      if (params.name === 'background') return ''
      return `${params.name}: ${params.value}`
    },
  },
  series: seriesData.value,
}))
</script>

<template>
  <div
    data-slot="chart"
    :class="cn(chartContainerVariants({ variant }), props.class)"
  >
    <div class="relative" :style="{ height }">
      <VChart
        :option="option"
        :theme="neubrutalismTheme"
        :autoresize="true"
        style="width: 100%; height: 100%"
      />
      <!-- Center content slot -->
      <div
        v-if="$slots.default"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
