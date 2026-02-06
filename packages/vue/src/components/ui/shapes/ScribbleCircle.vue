<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  size?: number
  strokeWidth?: number
  filled?: boolean
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  strokeWidth: 3,
  filled: true,
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    :class="cn('text-info', props.class)"
  >
    <circle
      cx="50"
      cy="50"
      r="42"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <path
      d="M20 50 Q30 30 50 25 Q70 20 80 40 Q85 60 70 75 Q50 90 30 75 Q15 60 20 50"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth - 1"
      stroke-dasharray="5,5"
    />
  </svg>
</template>
