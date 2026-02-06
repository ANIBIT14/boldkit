<script setup lang="ts">
import { TooltipPortal, TooltipContent as TooltipContentPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  sideOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 6,
})
</script>

<template>
  <TooltipPortal>
    <TooltipContentPrimitive
      :side-offset="props.sideOffset"
      :class="
        cn(
          'z-50 overflow-hidden border-2 border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
          props.class
        )
      "
    >
      <slot />
    </TooltipContentPrimitive>
  </TooltipPortal>
</template>
