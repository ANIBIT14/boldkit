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
    :class="cn('text-destructive', props.class)"
  >
    <path
      d="M50 25 Q30 20 15 35 Q0 55 15 75 Q25 92 40 95 Q50 97 50 90 Q50 97 60 95 Q75 92 85 75 Q100 55 85 35 Q70 20 50 25 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <path
      d="M50 25 Q55 10 60 5"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
    <path
      d="M58 12 Q68 8 72 15 Q70 20 62 18"
      fill="hsl(var(--foreground))"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth - 2"
    />
  </svg>
</template>
