<script setup lang="ts">
import { AccordionContent as AccordionContentPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <AccordionContentPrimitive
    class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down border-t-3 border-foreground"
  >
    <div :class="cn('p-4', $props.class)">
      <slot />
    </div>
  </AccordionContentPrimitive>
</template>
