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
    :class="cn('text-warning', props.class)"
  >
    <path
      d="M0 0 L100 0 L100 35 L90 50 L80 35 L70 50 L60 35 L50 50 L40 35 L30 50 L20 35 L10 50 L0 35 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
