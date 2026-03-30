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
    :height="size * 0.6"
    viewBox="0 0 100 60"
    :class="cn('text-warning', animClass, props.class)"
  >
    <path
      d="M15 5 L85 5 L100 30 L85 55 L15 55 L0 30 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <circle cx="20" cy="30" r="6" fill="hsl(var(--foreground))" />
  </svg>
</template>
