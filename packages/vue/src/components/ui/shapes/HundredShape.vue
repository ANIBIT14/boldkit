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
    :height="size * 0.8"
    viewBox="0 0 100 80"
    :class="cn('text-destructive', animClass, props.class)"
  >
    <path
      d="M8 16 L22 8 L28 8 L28 54 L17 54 L17 22 L8 26 Z M36 31 a14 23 0 1 0 28 0 a14 23 0 1 0 -28 0 Z M43 31 a7 14 0 1 0 14 0 a7 14 0 1 0 -14 0 Z M70 31 a13 23 0 1 0 26 0 a13 23 0 1 0 -26 0 Z M77 31 a6 14 0 1 0 12 0 a6 14 0 1 0 -12 0 Z M6 62 L94 60 L94 66 L6 68 Z M12 72 L88 70 L88 76 L12 78 Z"
      fill-rule="evenodd"
      stroke-linejoin="round"
      :fill="filled ? (color || 'currentColor') : 'none'"
      :stroke="strokeValue"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
