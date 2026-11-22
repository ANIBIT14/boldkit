<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  size?: number
  strokeWidth?: number
  filled?: boolean
  /** Fill colour when `filled`, outline colour when not. */
  color?: string
  /** Outline colour. Defaults to the foreground token. */
  strokeColor?: string
  animation?:
    | 'none'
    // smooth presets
    | 'spin' | 'pulse' | 'float' | 'wiggle' | 'bounce' | 'glitch'
    // stepped presets — hard, non-interpolated motion (v3.5)
    | 'spin-step' | 'pulse-hard' | 'marquee-stamp'
  speed?: 'slow' | 'normal' | 'fast'
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  strokeWidth: 3,
  filled: true,
  animation: 'none',
  speed: 'normal',
})

/**
 * Resolve the outline colour.
 *
 * `color` used to apply to `fill` only, so `<Shape :filled="false" color="red" />`
 * rendered a black outline and the prop was a silent no-op. When the shape *is*
 * its outline, `color` is what the caller meant.
 */
const strokeValue = computed(() => {
  if (props.strokeColor) return props.strokeColor
  if (!props.filled && props.color) return props.color
  return 'hsl(var(--foreground))'
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
    :class="cn('text-destructive', animClass, props.class)"
  >
    <path
      d="M50 4 C56 20 74 30 78 50 C84 74 70 96 50 96 C30 96 16 80 20 60 C22 48 30 42 32 30 C40 38 42 46 42 52 C48 40 52 22 50 4 Z"
      stroke-linejoin="round"
      :fill="filled ? (color || 'currentColor') : 'none'"
      :stroke="strokeValue"
      :stroke-width="strokeWidth"
    />
    <path
      d="M50 54 C54 62 64 68 64 78 C64 88 58 92 50 92 C42 92 36 86 37 78 C38 70 46 66 50 54 Z"
      fill="hsl(var(--warning))"
      :stroke="strokeValue"
      :stroke-width="Math.max(1, strokeWidth - 1)"
      stroke-linejoin="round"
    />
  </svg>
</template>
