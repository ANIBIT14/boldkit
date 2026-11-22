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
    :class="cn('text-warning', animClass, props.class)"
  >
    <path
      d="M8 62 C8 30 26 8 50 8 C74 8 92 30 92 62 L92 72 Q92 80 85 80 Q79 80 79 87 Q79 95 71 95 Q63 95 63 86 L63 83 Q63 78 57 78 L31 78 Q25 78 25 85 Q25 92 17 92 Q9 92 9 84 Z"
      stroke-linejoin="round"
      :fill="filled ? (color || 'currentColor') : 'none'"
      :stroke="strokeValue"
      :stroke-width="strokeWidth"
    />
    <circle
      cx="34"
      cy="42"
      r="6"
      fill="hsl(var(--foreground))"
    />
    <ellipse
      cx="66"
      cy="46"
      rx="5"
      ry="9"
      transform="rotate(-20 66 46)"
      fill="hsl(var(--foreground))"
    />
    <path
      d="M28 64 Q36 56 44 63 T60 62 T76 58"
      fill="none"
      :stroke="strokeValue"
      :stroke-width="strokeWidth + 1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
