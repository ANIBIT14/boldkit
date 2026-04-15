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
    :height="size * 0.7"
    viewBox="0 0 100 70"
    :class="cn('text-primary', animClass, props.class)"
  >
    <ellipse
      cx="50"
      cy="35"
      rx="46"
      ry="28"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
    />
    <line
      x1="4"
      y1="35"
      x2="96"
      y2="35"
      stroke="hsl(var(--foreground))"
      stroke-dasharray="4,4"
      :stroke-width="strokeWidth - 1"
    />
    <line
      x1="50"
      y1="7"
      x2="50"
      y2="63"
      stroke="hsl(var(--foreground))"
      stroke-dasharray="4,4"
      :stroke-width="strokeWidth - 1"
    />
  </svg>
</template>
