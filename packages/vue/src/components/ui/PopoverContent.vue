<script setup lang="ts">
import { PopoverPortal, PopoverContent as PopoverContentPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  sideOffset: 4,
})
</script>

<template>
  <PopoverPortal>
    <PopoverContentPrimitive
      :align="props.align"
      :side-offset="props.sideOffset"
      :class="
        cn(
          'z-50 w-72 border-3 border-foreground bg-popover p-4 text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] outline-none',
          props.class
        )
      "
    >
      <slot />
    </PopoverContentPrimitive>
  </PopoverPortal>
</template>
