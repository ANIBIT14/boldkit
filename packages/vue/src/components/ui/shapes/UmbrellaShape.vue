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
    :class="cn('text-info', animClass, props.class)"
  >
    <path
      d="M50 10 Q15 10 5 45 L25 45 Q25 30 35 30 Q40 30 40 45 L60 45 Q60 30 65 30 Q75 30 75 45 L95 45 Q85 10 50 10 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <path
      d="M50 10 L50 80 Q50 92 40 92 Q32 92 32 85"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
  </svg>
</template>
