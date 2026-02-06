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
    :height="size * 0.5"
    viewBox="0 0 100 50"
    :class="cn('text-success', props.class)"
  >
    <path
      d="M5 0 L95 0 Q100 0 100 5 L100 20 Q90 20 90 25 Q90 30 100 30 L100 45 Q100 50 95 50 L5 50 Q0 50 0 45 L0 30 Q10 30 10 25 Q10 20 0 20 L0 5 Q0 0 5 0 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
