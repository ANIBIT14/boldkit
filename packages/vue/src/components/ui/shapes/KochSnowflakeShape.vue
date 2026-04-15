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

const kochPath = computed(() => {
  let pts = [{ x: 50, y: 8 }, { x: 91, y: 73 }, { x: 9, y: 73 }]
  const cos60 = 0.5, sin60 = Math.sqrt(3) / 2
  for (let iter = 0; iter < 2; iter++) {
    const next: { x: number; y: number }[] = []
    for (let j = 0; j < pts.length; j++) {
      const a = pts[j], b = pts[(j + 1) % pts.length]
      const dx = (b.x - a.x) / 3, dy = (b.y - a.y) / 3
      const p1 = { x: a.x + dx, y: a.y + dy }
      const p2 = { x: a.x + 2 * dx, y: a.y + 2 * dy }
      const peak = { x: p1.x + dx * cos60 + dy * sin60, y: p1.y - dx * sin60 + dy * cos60 }
      next.push(a, p1, peak, p2)
    }
    pts = next
  }
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z'
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
      :d="kochPath"
      :fill="filled ? (color || 'currentColor') : 'none'"
      stroke="hsl(var(--foreground))"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />
  </svg>
</template>
