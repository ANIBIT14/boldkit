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
    :class="cn('text-primary', props.class)"
  >
    <path
      d="M5 55 Q5 10 50 10 Q95 10 95 55"
      fill="none"
      :stroke="filled ? (color || 'currentColor') : 'none'"
      stroke-width="12"
      stroke-linecap="round"
    />
    <path
      d="M5 55 Q5 10 50 10 Q95 10 95 55"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
    <path
      d="M15 55 Q15 22 50 22 Q85 22 85 55"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
    <path
      d="M25 55 Q25 34 50 34 Q75 34 75 55"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
  </svg>
</template>
