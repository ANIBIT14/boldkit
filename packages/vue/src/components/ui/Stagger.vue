<script setup lang="ts">
/**
 * BoldKit <Stagger> — sequence children entrance (Vue adapter).
 * Mirrors the React <Stagger> surface. Wraps motion-core's staggerChildren.
 */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { staggerChildren } from '@/lib/motion-core'

const props = withDefaults(
  defineProps<{
    class?: string
    /** Delay between siblings, in ms. Default 75. */
    delay?: number
    /** Initial delay before the first child, in ms. */
    initialDelay?: number
    /** CSS selector to filter children. Default '*'. */
    selector?: string
    /** Element tag to render. Default 'div'. */
    as?: string
  }>(),
  { as: 'div' }
)

const el = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

function apply() {
  cleanup?.()
  if (!el.value) return
  cleanup = staggerChildren(el.value, {
    delay: props.delay,
    initialDelay: props.initialDelay,
    selector: props.selector,
  })
}

onMounted(apply)
watch(() => [props.delay, props.initialDelay, props.selector], apply)
onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <component :is="as" ref="el" :class="$props.class">
    <slot />
  </component>
</template>
