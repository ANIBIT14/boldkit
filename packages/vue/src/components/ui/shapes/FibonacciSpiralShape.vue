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
  filled: false,
  animation: 'none',
  speed: 'normal',
})

const animClass = computed(() => {
  if (!props.animation || props.animation === 'none') return ''
  const s = props.speed && props.speed !== 'normal' ? `-${props.speed}` : ''
  return `shape-animate-${props.animation}${s}`
})

const fibonacciPath = computed(() => {
  const scale = 1.9
  const arcs: { cx: number; cy: number; r: number; startAngle: number }[] = [
    { cx: 51, cy: 51, r: 1, startAngle: Math.PI },
    { cx: 51, cy: 50, r: 1, startAngle: Math.PI / 2 },
    { cx: 50, cy: 50, r: 2, startAngle: 0 },
    { cx: 50, cy: 52, r: 3, startAngle: -Math.PI / 2 },
    { cx: 53, cy: 52, r: 5, startAngle: Math.PI },
    { cx: 53, cy: 47, r: 8, startAngle: Math.PI / 2 },
    { cx: 45, cy: 47, r: 13, startAngle: 0 },
    { cx: 45, cy: 60, r: 21, startAngle: -Math.PI / 2 },
  ]
  let d = ''
  arcs.forEach(({ cx, cy, r, startAngle }, i) => {
    const endAngle = startAngle - Math.PI / 2
    const sx = cx + r * scale * Math.cos(startAngle)
    const sy = cy + r * scale * Math.sin(startAngle)
    const ex = cx + r * scale * Math.cos(endAngle)
    const ey = cy + r * scale * Math.sin(endAngle)
    const R = r * scale
    if (i === 0) d += `M${sx.toFixed(1)} ${sy.toFixed(1)} `
    d += `A${R.toFixed(1)} ${R.toFixed(1)} 0 0 0 ${ex.toFixed(1)} ${ey.toFixed(1)} `
  })
  return d
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    :class="cn('text-accent', animClass, props.class)"
  >
    <path
      :d="fibonacciPath"
      fill="none"
      :stroke="color || 'currentColor'"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
  </svg>
</template>
