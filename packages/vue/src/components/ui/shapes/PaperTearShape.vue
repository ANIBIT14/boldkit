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
    :height="size * 0.3"
    viewBox="0 0 100 30"
    :class="cn('text-card', animClass, props.class)"
  >
    <path
      d="M0 0 L100 0 L100 15 L95 20 L90 12 L85 22 L80 10 L75 25 L70 8 L65 20 L60 12 L55 28 L50 10 L45 22 L40 15 L35 25 L30 10 L25 20 L20 8 L15 18 L10 12 L5 22 L0 15 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
