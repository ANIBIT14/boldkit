<script setup lang="ts">
import { MenubarSubTrigger as MenubarSubTriggerPrimitive } from 'reka-ui'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  inset?: boolean
}>()
</script>

<template>
  <MenubarSubTriggerPrimitive
    :class="
      cn(
        'flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
        inset && 'pl-8',
        $props.class
      )
    "
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4 stroke-[3]" />
  </MenubarSubTriggerPrimitive>
</template>
