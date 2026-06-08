<script setup lang="ts">
import { MenubarPortal, MenubarContent as MenubarContentPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  sideOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
  alignOffset: -3,
  sideOffset: 8,
})
</script>

<template>
  <MenubarPortal>
    <MenubarContentPrimitive
      :align="props.align"
      :align-offset="props.alignOffset"
      :side-offset="props.sideOffset"
      :class="
        cn(
          'z-50 min-w-[12rem] overflow-hidden border-3 border-foreground bg-popover p-1 text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
          props.class
        )
      "
    >
      <slot />
    </MenubarContentPrimitive>
  </MenubarPortal>
</template>
