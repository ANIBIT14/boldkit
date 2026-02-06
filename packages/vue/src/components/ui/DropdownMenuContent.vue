<script setup lang="ts">
import { DropdownMenuPortal, DropdownMenuContent as DropdownMenuContentPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  sideOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 4,
})
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContentPrimitive
      :side-offset="props.sideOffset"
      :class="
        cn(
          'z-50 min-w-[8rem] overflow-hidden border-3 border-foreground bg-popover p-1 text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
          props.class
        )
      "
    >
      <slot />
    </DropdownMenuContentPrimitive>
  </DropdownMenuPortal>
</template>
