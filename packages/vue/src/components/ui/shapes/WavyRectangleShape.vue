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
    :height="size * 0.7"
    viewBox="0 0 100 70"
    :class="cn('text-accent', animClass, props.class)"
  >
    <path
      d="M10 15 Q15 10 20 15 Q25 20 30 15 Q35 10 40 15 Q45 20 50 15 Q55 10 60 15 Q65 20 70 15 Q75 10 80 15 Q85 20 90 15 L90 20 Q95 25 90 30 Q85 35 90 40 Q95 45 90 50 Q85 55 90 55 L90 60 Q85 65 80 60 Q75 55 70 60 Q65 65 60 60 Q55 55 50 60 Q45 65 40 60 Q35 55 30 60 Q25 65 20 60 Q15 55 10 60 L10 55 Q5 50 10 45 Q15 40 10 35 Q5 30 10 25 Q15 20 10 20 Z"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
