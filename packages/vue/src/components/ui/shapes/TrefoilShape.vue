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

const trefoilPath = computed(() => {
  const n = 120, scale = 14
  let d = ''
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * 2 * Math.PI
    const x = 50 + scale * (Math.sin(t) + 2 * Math.sin(2 * t))
    const y = 50 + scale * (Math.cos(t) - 2 * Math.cos(2 * t))
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)} `
  }
  return d + 'Z'
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    :class="cn('text-primary', animClass, props.class)"
  >
    <path
      :d="trefoilPath"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />
  </svg>
</template>
