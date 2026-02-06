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
    :class="cn('text-secondary', props.class)"
  >
    <path
      d="M5 30 Q25 5 50 5 Q75 5 95 30 Q75 55 50 55 Q25 55 5 30 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <circle cx="50" cy="30" r="12" fill="hsl(var(--foreground))" />
  </svg>
</template>
