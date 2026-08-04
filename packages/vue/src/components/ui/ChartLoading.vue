<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

/** Static silhouette — a chart-shaped placeholder, not real data. */
const BAR_HEIGHTS = ['45%', '70%', '35%', '85%', '55%', '75%', '40%']

interface ChartLoadingProps {
  /** Announced to screen readers while the chart is pending. */
  label?: string
  /** Number of placeholder bars. Defaults to 7. */
  bars?: number
  class?: string
}

// `bars` is literal, not BAR_HEIGHTS.length: defineProps() defaults are hoisted
// out of setup(), so they cannot reference locally declared variables.
const props = withDefaults(defineProps<ChartLoadingProps>(), {
  label: 'Loading chart',
  bars: 7,
})

const placeholders = computed(() =>
  Array.from({ length: props.bars }, (_, i) => ({
    height: BAR_HEIGHTS[i % BAR_HEIGHTS.length],
    animationDelay: `${i * 90}ms`,
  }))
)
</script>

<template>
  <div
    role="status"
    aria-live="polite"
    aria-busy="true"
    :class="cn('flex min-h-[120px] w-full items-end justify-center gap-2 p-6', $props.class)"
  >
    <span class="sr-only">{{ label }}</span>
    <div
      v-for="(bar, i) in placeholders"
      :key="i"
      aria-hidden="true"
      class="bk-skeleton-stamp w-full max-w-10 border-2 border-foreground/20 bg-muted"
      :style="bar"
    />
  </div>
</template>
