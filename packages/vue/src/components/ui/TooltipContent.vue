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
          'z-50 overflow-hidden border-2 border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class
        )
      "
    >
      <slot />
    </TooltipContentPrimitive>
  </TooltipPortal>
</template>
