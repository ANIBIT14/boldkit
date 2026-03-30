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
    :class="cn('text-primary', animClass, props.class)"
  >
    <path
      d="M5 55 Q5 10 50 10 Q95 10 95 55"
      fill="none"
      :stroke="filled ? (color || 'hsl(var(--destructive))') : 'none'"
      stroke-width="10"
      stroke-linecap="round"
    />
    <path
      d="M15 55 Q15 22 50 22 Q85 22 85 55"
      fill="none"
      :stroke="filled ? (color || 'hsl(var(--warning))') : 'none'"
      stroke-width="10"
      stroke-linecap="round"
    />
    <path
      d="M25 55 Q25 34 50 34 Q75 34 75 55"
      fill="none"
      :stroke="filled ? (color || 'hsl(var(--info))') : 'none'"
      stroke-width="10"
      stroke-linecap="round"
    />
    <path
      d="M5 55 Q5 10 50 10 Q95 10 95 55"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
    <path
      d="M15 55 Q15 22 50 22 Q85 22 85 55"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
    <path
      d="M25 55 Q25 34 50 34 Q75 34 75 55"
      fill="none"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
  </svg>
</template>
