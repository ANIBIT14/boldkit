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
  if (!props.animation || props.animation === 'none') return ''
  const s = props.speed && props.speed !== 'normal' ? `-${props.speed}` : ''
  return `shape-animate-${props.animation}${s}`
})
</script>

<template>
  <svg
    :width="size"
    :height="size * 0.6"
    viewBox="0 0 100 60"
    :class="cn('text-secondary', animClass, props.class)"
  >
    <path
      d="M5 15 Q15 5 30 10 Q50 18 70 8 Q85 3 95 15 Q100 25 95 35 Q85 47 70 42 Q50 35 30 45 Q15 52 5 42 Q0 35 5 25 Q5 20 5 15 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <!-- Inner detail line showing the twist crossing -->
    <path
      d="M30 30 Q50 42 70 30"
      :stroke="color || 'currentColor'"
      stroke-width="1.5"
      stroke-opacity="0.7"
      stroke-linecap="round"
      fill="none"
    />
  </svg>
</template>
