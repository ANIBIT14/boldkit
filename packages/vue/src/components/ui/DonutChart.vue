<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { neubrutalismTheme, type ChartConfig } from './chart-utils'
import { chartContainerVariants } from './chart-variants'
import type { VariantProps } from 'class-variance-authority'

// Register ECharts components
use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

type ChartVariants = VariantProps<typeof chartContainerVariants>

interface DonutChartData {
  name: string
  value: number
  fill?: string
}

interface DonutChartProps {
  data: DonutChartData[]
  config: ChartConfig
  innerRadius?: string
  outerRadius?: string
  showLabels?: 'none' | 'inside' | 'outside'
  showLegend?: boolean
  height?: string
  variant?: ChartVariants['variant']
  class?: string
}

const props = withDefaults(defineProps<DonutChartProps>(), {
  innerRadius: '60%',
  outerRadius: '80%',
  showLabels: 'none',
  showLegend: false,
  height: '300px',
  variant: 'default',
})

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
  legend: props.showLegend ? {
    orient: 'horizontal',
    bottom: 0,
    textStyle: {
      fontWeight: 'bold',
    },
  } : undefined,
  series: [{
    type: 'pie',
    radius: [props.innerRadius, props.outerRadius],
    center: ['50%', '50%'],
    avoidLabelOverlap: true,
    itemStyle: {
      borderColor: 'hsl(var(--foreground))',
      borderWidth: 3,
    },
    label: props.showLabels === 'none' ? { show: false } : {
      show: true,
      position: props.showLabels,
      fontWeight: 'bold',
      formatter: '{b}',
    },
    labelLine: {
      show: props.showLabels === 'outside',
    },
    data: props.data.map(item => ({
      name: item.name,
      value: item.value,
      itemStyle: item.fill ? { color: item.fill } : undefined,
    })),
  }],
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
