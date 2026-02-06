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
    :height="size * 0.4"
    viewBox="0 0 100 40"
    :class="cn('text-primary', props.class)"
  >
    <path
      d="M0 10 L10 0 L10 10 L90 10 L90 0 L100 10 L100 30 L90 40 L90 30 L10 30 L10 40 L0 30 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
