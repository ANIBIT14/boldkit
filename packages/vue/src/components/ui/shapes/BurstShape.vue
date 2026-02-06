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
    :class="cn('text-primary', props.class)"
  >
    <path
      d="M50 0 L58 35 L95 20 L68 45 L100 50 L68 55 L95 80 L58 65 L50 100 L42 65 L5 80 L32 55 L0 50 L32 45 L5 20 L42 35 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
