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
    :class="cn('text-secondary', props.class)"
  >
    <path
      d="M0 25 Q12.5 0 25 25 Q37.5 50 50 25 Q62.5 0 75 25 Q87.5 50 100 25 L100 50 L0 50 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
