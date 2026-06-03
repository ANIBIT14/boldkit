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
    aria-hidden="true"
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    :class="cn('text-success', animClass, props.class)"
  >
    <path
      d="M50 5 Q60 5 65 12 Q72 8 78 15 Q85 12 88 22 Q95 22 95 32 Q100 40 95 50 Q100 60 95 68 Q95 78 88 78 Q85 88 78 85 Q72 92 65 88 Q60 95 50 95 Q40 95 35 88 Q28 92 22 85 Q15 88 12 78 Q5 78 5 68 Q0 60 5 50 Q0 40 5 32 Q5 22 12 22 Q15 12 22 15 Q28 8 35 12 Q40 5 50 5 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
