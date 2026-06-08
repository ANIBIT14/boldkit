<script setup lang="ts">
import { ContextMenuItem as ContextMenuItemPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  inset?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <ContextMenuItemPrimitive
    :disabled="disabled"
    :class="
      cn(
        'relative flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none transition-all duration-150 focus:bg-accent focus:text-accent-foreground focus:translate-x-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        $props.class
      )
    "
  >
    <slot />
  </ContextMenuItemPrimitive>
</template>
