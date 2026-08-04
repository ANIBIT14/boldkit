<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type SkeletonVariant = 'pulse' | 'stamp' | 'blocks' | 'scan' | 'none'

const props = withDefaults(
  defineProps<{
    class?: string
    /**
     * pulse  — soft opacity breathe (the pre-v3.5 default)
     * stamp  — hard on/off, no interpolated fade
     * blocks — marching cells on a stepped loop
     * scan   — a hard bar sweeping across the block
     * none   — no motion at all
     */
    variant?: SkeletonVariant
  }>(),
  { variant: 'pulse' }
)

// Decorative placeholder — hidden from AT. Announce loading on the container
// instead (aria-busy / role="status"), not per-skeleton.
const variantClass = computed(
  () =>
    ({
      pulse: 'animate-pulse',
      stamp: 'bk-skeleton-stamp',
      blocks: 'bk-skeleton-blocks',
      scan: 'bk-skeleton-scan',
      none: '',
    })[props.variant]
)
</script>

<!--
  A comment here would make this a multi-root fragment and kill attribute
  fallthrough — keep the template to a single root element.
-->
<template>
  <div
    aria-hidden="true"
    :class="cn('bg-muted border-2 border-foreground/20', variantClass, props.class)"
  />
</template>
