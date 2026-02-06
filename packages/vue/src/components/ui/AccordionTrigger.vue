<script setup lang="ts">
import { AccordionHeader, AccordionTrigger as AccordionTriggerPrimitive } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTriggerPrimitive
      :class="
        cn(
          'flex flex-1 items-center justify-between bg-background py-4 px-4 font-bold uppercase tracking-wide transition-all duration-200 hover:bg-muted [&[data-state=open]]:bg-accent [&[data-state=open]>svg]:rotate-180',
          $props.class
        )
      "
    >
      <slot />
      <ChevronDown class="h-5 w-5 shrink-0 stroke-[3] transition-transform duration-200" />
    </AccordionTriggerPrimitive>
  </AccordionHeader>
</template>
