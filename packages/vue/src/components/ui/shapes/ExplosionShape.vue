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
    :class="cn('text-warning', props.class)"
  >
    <path
      d="M50 5 L55 30 L80 15 L65 35 L95 35 L70 50 L95 65 L65 65 L80 85 L55 70 L50 95 L45 70 L20 85 L35 65 L5 65 L30 50 L5 35 L35 35 L20 15 L45 30 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
