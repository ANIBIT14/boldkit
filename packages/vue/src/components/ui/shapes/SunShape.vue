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
    <circle
      cx="50"
      cy="50"
      r="22"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <path
      d="M50 5 L54 22 L46 22 Z M50 95 L54 78 L46 78 Z M5 50 L22 46 L22 54 Z M95 50 L78 46 L78 54 Z M18 18 L32 28 L28 32 Z M82 18 L68 28 L72 32 Z M18 82 L28 68 L32 72 Z M82 82 L72 68 L68 72 Z"
      fill="hsl(var(--foreground))"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth - 2"
      stroke-linejoin="round"
    />
  </svg>
</template>
