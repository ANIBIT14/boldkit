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
    :height="size * 0.6"
    viewBox="0 0 100 60"
    :class="cn('text-accent', props.class)"
  >
    <path
      d="M10 5 L75 5 L95 30 L75 55 L10 55 L10 5 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <circle
      cx="22"
      cy="30"
      r="8"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <line
      x1="5"
      y1="30"
      x2="14"
      y2="30"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
