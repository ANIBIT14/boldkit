<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  size?: number
  strokeWidth?: number
  filled?: boolean
  color?: string
  animation?: 'none' | 'spin' | 'pulse' | 'float' | 'wiggle' | 'bounce' | 'glitch'
  speed?: 'slow' | 'normal' | 'fast'
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  strokeWidth: 3,
  filled: true,
  animation: 'none',
  speed: 'normal',
})

const animClass = computed(() => {
  const a = props.animation
  if (!a || a === 'none') return ''
  const s = props.speed && props.speed !== 'normal' ? `-${props.speed}` : ''
  return `shape-animate-${a}${s}`
})
</script>

<template>
  <svg
    :width="size"
    :height="size * 0.5"
    viewBox="0 0 100 50"
    :class="cn('text-success', animClass, props.class)"
  >
    <path
      d="M5 5 L95 5 L95 15 Q90 15 90 20 Q90 25 95 25 L95 35 Q90 35 90 40 Q90 45 95 45 L5 45 L5 35 Q10 35 10 30 Q10 25 5 25 L5 15 Q10 15 10 10 Q10 5 5 5 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <line
      x1="35"
      y1="10"
      x2="35"
      y2="40"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth - 1"
      stroke-dasharray="4,4"
    />
  </svg>
</template>
