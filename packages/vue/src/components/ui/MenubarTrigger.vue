<script setup lang="ts">
import { MenubarTrigger as MenubarTriggerPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <MenubarTriggerPrimitive
    :class="
      cn(
        'flex cursor-default select-none items-center px-3 py-1 text-sm font-bold uppercase tracking-wide outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        $props.class
      )
    "
  >
    <slot />
  </MenubarTriggerPrimitive>
</template>
