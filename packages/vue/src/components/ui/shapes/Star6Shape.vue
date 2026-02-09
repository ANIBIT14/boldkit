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
    :class="cn('text-accent', props.class)"
  >
    <!-- 6-pointed star (hexagram) with 12 points alternating -->
    <path
      d="M50 2 L56 30 L85 15 L65 40 L98 50 L65 60 L85 85 L56 70 L50 98 L44 70 L15 85 L35 60 L2 50 L35 40 L15 15 L44 30 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
