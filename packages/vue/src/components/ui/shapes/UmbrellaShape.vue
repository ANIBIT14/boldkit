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
    <path
      d="M50 10 Q15 10 5 45 L25 45 Q25 30 35 30 Q40 30 40 45 L60 45 Q60 30 65 30 Q75 30 75 45 L95 45 Q85 10 50 10 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <path
      d="M50 10 L50 80 Q50 92 40 92 Q32 92 32 85"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
  </svg>
</template>
