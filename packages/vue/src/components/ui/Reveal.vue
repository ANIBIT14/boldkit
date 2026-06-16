<script setup lang="ts">
/**
 * BoldKit Motion — <Reveal>
 * Scroll-triggered entrance. Vue mirror of the React adapter; same prop names.
 */
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { observeReveal } from '@/lib/motion-core'
import { cn } from '@/lib/utils'

type RevealDirection = 'up' | 'down' | 'left' | 'right'

interface RevealProps extends PrimitiveProps {
  direction?: RevealDirection
  rootMargin?: string
  threshold?: number
  once?: boolean
  delay?: number
  class?: string
}

const props = withDefaults(defineProps<RevealProps>(), {
  as: 'div',
  direction: 'up',
  once: true,
  delay: 0,
})

const elRef = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

function attach() {
  cleanup?.()
  const el = elRef.value
  if (!el) return
  cleanup = observeReveal(el, {
    rootMargin: props.rootMargin,
    threshold: props.threshold,
    once: props.once,
    delay: props.delay,
  })
}

onMounted(attach)
onUnmounted(() => cleanup?.())
watch(
  () => [props.rootMargin, props.threshold, props.once, props.delay],
  attach
)
</script>

<template>
  <Primitive
    :as="as"
    :class="cn('bk-reveal', `bk-reveal-${direction}`, props.class)"
    ref="elRef"
  >
    <slot />
  </Primitive>
</template>
