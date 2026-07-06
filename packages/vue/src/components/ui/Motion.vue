<script setup lang="ts">
/**
 * BoldKit Motion — Vue adapter (L3).
 *
 * Thin wrapper around motion-core. Mirrors the React <Motion> surface 1:1
 * so apps can switch frameworks without re-learning the API.
 *
 * Requires `motion.css` (L2 recipes) to be loaded. BoldKit's globals.css
 * already imports it.
 */
import { cn } from '@/lib/utils'

withDefaults(
  defineProps<{
    class?: string
    /** Element tag to render. Default 'div'. */
    as?: string
    /** Apply .bk-press for interactive shadow choreography. */
    press?: boolean
    /** Apply .bk-stamp-in entrance. */
    stamp?: boolean
    /** Apply .bk-pulse-shadow. */
    pulse?: boolean
  }>(),
  { as: 'div' }
)
</script>

<template>
  <component
    :is="as"
    :class="
      cn(
        press && 'bk-press',
        stamp && 'bk-stamp-in',
        pulse && 'bk-pulse-shadow',
        $props.class
      )
    "
  >
    <slot />
  </component>
</template>
