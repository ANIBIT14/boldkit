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
    :height="size"
    viewBox="0 0 100 100"
    :class="cn('text-warning', animClass, props.class)"
  >
    <path
      d="M10 5 L10 95"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <path
      d="M10 5 L90 5 L75 30 L90 55 L10 55 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
