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
    :class="cn('text-secondary', props.class)"
  >
    <circle
      cx="50"
      cy="50"
      r="28"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <ellipse
      cx="50"
      cy="50"
      rx="45"
      ry="14"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      transform="rotate(-25 50 50)"
    />
  </svg>
</template>
