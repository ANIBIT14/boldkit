<script setup lang="ts">
import { DropdownMenuLabel as DropdownMenuLabelPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  inset?: boolean
}>()
</script>

<template>
  <DropdownMenuLabelPrimitive
    :class="
      cn(
        'px-2 py-1.5 text-sm font-bold uppercase tracking-wide',
        inset && 'pl-8',
        $props.class
      )
    "
  >
    <slot />
  </DropdownMenuLabelPrimitive>
</template>
