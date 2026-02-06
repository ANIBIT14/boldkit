<script setup lang="ts">
import { CollapsibleContent as CollapsibleContentPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <CollapsibleContentPrimitive
    :class="
      cn(
        'overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
        $props.class
      )
    "
  >
    <slot />
  </CollapsibleContentPrimitive>
</template>
