<script setup lang="ts">
import { computed, ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '@/lib/utils'
import { type ChartConfig, CHART_PALETTES, useResolvedChart, toCssSize } from './chart-utils'
import { chartContainerVariants, splitChartVariant, type ChartContainerVariant } from './chart-variants'
import ChartEmpty from './ChartEmpty.vue'

// Register ECharts components
use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

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
  /** Number = px (as in React); string = any CSS length. */
  height?: number | string
  /**
   * Chart geometry, same values as React. Container styles (`elevated`, `flat`,
   * …) are still accepted here for pre-v3.6 code — @deprecated, use `containerVariant`.
   */
  variant?: 'default' | 'stacked' | 'nested' | ChartContainerVariant
  /** Container border/shadow style (React: same prop name). */
  containerVariant?: ChartContainerVariant
  class?: string
  emptyMessage?: string
  /** React calls this `emptyState`. Accepted here so the same prop name works
   *  in both frameworks; `emptyMessage` stays supported. */
  emptyState?: string
  /** Accessible name. React exposes this on every chart; without it the
   *  chart ships with no name at all. */
  ariaLabel?: string
}

const props = withDefaults(defineProps<RadialBarChartProps>(), {
  ariaLabel: 'Radial bar chart',
  innerRadius: '30%',
  outerRadius: '90%',
  showLabel: true,
  showBackground: true,
  height: 300,
  variant: 'default',
})

// Prefer the React-compatible name when both are given.
const resolvedEmptyMessage = computed(() => props.emptyState ?? props.emptyMessage)

// ECharts draws to a canvas, which has no CSS cascade: an
// `hsl(var(--primary))` string assigned to fillStyle is silently dropped.
// Resolve the option and theme against this element before they reach VChart.
const rootEl = ref<HTMLElement | null>(null)
const { theme: resolvedTheme, resolve } = useResolvedChart(rootEl)
const resolvedOption = computed(() => resolve(option.value))

const variants = computed(() => splitChartVariant(props.variant, props.containerVariant, ['default', 'stacked', 'nested'] as const))

const isEmpty = computed(() => !props.data || props.data.length === 0)

// Nullish coalescing (not ||) so an explicit maxValue of 0 is honored rather than
// silently replaced by the computed default.
// reduce (not spread) avoids a RangeError on very large datasets; the `|| 1`
// floor keeps the domain positive for empty/all-negative data.
// No headroom: the largest value fills its ring, as in React.
const maxVal = computed(() => props.maxValue ?? (props.data.reduce((m, d) => Math.max(m, d.value), 0) || 1))

// Create stacked rings for radial bar effect
const seriesData = computed(() => {
  const numItems = props.data.length
  // Parse innerRadius/outerRadius props (accept "30%" or 30)
  const innerPct = typeof props.innerRadius === 'string' ? parseInt(props.innerRadius) : (props.innerRadius ?? 30)
  const outerPct = typeof props.outerRadius === 'string' ? parseInt(props.outerRadius) : (props.outerRadius ?? 90)
  const radiusStep = numItems > 0 ? (outerPct - innerPct) / numItems : 0

  return props.data.map((item, index) => {
    const innerR = innerPct + (index * radiusStep)
    // Small gap between rings, but never let the ring collapse/invert when there
    // are many items (radiusStep <= 2).
    // `nested` draws thinner rings (React: barSize 15 vs 20). `stacked` renders
    // like `default`, as it does in React (one dataKey, nothing to stack).
    const thickness = variants.value.geometry === 'nested' ? radiusStep * 0.75 : radiusStep
    const outerR = Math.max(innerR + 1, innerR + thickness - 2)

    return {
      type: 'pie',
      radius: [`${innerR}%`, `${outerR}%`],
      center: ['50%', '50%'],
      startAngle: 90,
      itemStyle: {
        borderColor: 'hsl(var(--foreground))',
        borderWidth: 3,
      },
      label: props.showLabel ? {
        show: true,
        position: 'inside',
        fontWeight: 'bold',
        fontSize: 11,
        color: 'hsl(var(--foreground))',
        formatter: (params: { name: string; value: number }) =>
          params.name !== 'background' ? String(params.value) : '',
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
          value: Math.max(0, maxVal.value - item.value),
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
    backgroundColor: 'hsl(var(--background))',
    borderColor: 'hsl(var(--foreground))',
    borderWidth: 3,
    padding: [6, 10],
    textStyle: { color: 'hsl(var(--foreground))', fontFamily: "'DM Mono', monospace", fontSize: 12 },
    extraCssText: 'border-radius: 0; box-shadow: 4px 4px 0px hsl(var(--foreground));',
  },
  series: seriesData.value,
}))
</script>

<template>
  <div
    ref="rootEl"
    role="img"
    :aria-label="ariaLabel"
    data-slot="chart"
    :class="cn(chartContainerVariants({ variant: variants.container }), props.class)"
  >
    <ChartEmpty v-if="isEmpty" :message="resolvedEmptyMessage" />
    <div v-else class="relative w-full" :style="{ height: toCssSize(height) }">
      <VChart
        :option="resolvedOption"
        :theme="resolvedTheme"
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
