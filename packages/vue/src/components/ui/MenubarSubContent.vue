<script setup lang="ts">
import { MenubarSubContent as MenubarSubContentPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <MenubarSubContentPrimitive
    :class="
      cn(
        'z-50 min-w-[8rem] overflow-hidden border-3 border-foreground bg-popover p-1 text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        $props.class
      )
    "
  >
    <slot />
  </MenubarSubContentPrimitive>
</template>
