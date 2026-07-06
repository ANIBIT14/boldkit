<script setup lang="ts">
/**
 * BoldKit <Reveal> — scroll-triggered entrance (Vue adapter).
 * Mirrors the React <Reveal> surface. Wraps motion-core's observeReveal.
 */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { cn } from '@/lib/utils'
import { observeReveal } from '@/lib/motion-core'

const props = withDefaults(
  defineProps<{
    class?: string
    /** Direction to slide in from. Default 'up'. */
    direction?: 'up' | 'down' | 'left' | 'right'
    /** Custom IntersectionObserver rootMargin. */
    rootMargin?: string
    /** Intersection ratio threshold. 0 = any pixel visible. */
    threshold?: number
    /** Unobserve after first reveal. Default true. */
    once?: boolean
    /** Delay before applying the reveal-in class, in ms. */
    delay?: number
    /** Element tag to render. Default 'div'. */
    as?: string
  }>(),
  { direction: 'up', as: 'div' }
)

const el = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

function observe() {
  cleanup?.()
  if (!el.value) return
  cleanup = observeReveal(el.value, {
    rootMargin: props.rootMargin,
    threshold: props.threshold,
    once: props.once,
    delay: props.delay,
  })
}

onMounted(observe)
watch(() => [props.rootMargin, props.threshold, props.once, props.delay], observe)
onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <component
    :is="as"
    ref="el"
    :class="cn('bk-reveal', `bk-reveal-${direction}`, $props.class)"
  >
    <slot />
  </component>
</template>
