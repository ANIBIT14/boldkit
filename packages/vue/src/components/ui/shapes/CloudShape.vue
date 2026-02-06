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
    :height="size * 0.7"
    viewBox="0 0 100 70"
    :class="cn('text-info', props.class)"
  >
    <path
      d="M25 60 Q5 60 5 45 Q5 30 20 30 Q20 15 40 15 Q55 10 65 20 Q75 10 90 25 Q100 35 90 50 Q95 65 75 65 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
