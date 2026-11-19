<script setup lang="ts">
/*
 * Inside a header: sits at the end of the row. Placed directly in the
 * CodeBlock: floats over the top-right corner and appears on hover/focus
 * (always visible on touch screens).
 */
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="code-block-actions"
    :class="
      cn(
        'ms-auto flex shrink-0 items-center gap-1.5',
        '[[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:right-2 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:pointer-coarse:opacity-100',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
