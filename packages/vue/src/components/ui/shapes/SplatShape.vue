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
      d="M50 5 Q55 20 70 15 Q65 30 85 25 Q75 40 95 50 Q75 55 85 75 Q65 65 70 85 Q55 75 50 95 Q45 75 30 85 Q35 65 15 75 Q25 55 5 50 Q25 40 15 25 Q35 30 30 15 Q45 20 50 5 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
