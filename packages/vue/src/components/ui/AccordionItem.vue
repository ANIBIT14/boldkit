<script setup lang="ts">
import { AccordionItem as AccordionItemPrimitive, type AccordionItemProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends AccordionItemProps {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <AccordionItemPrimitive
    v-bind="props"
    :class="
      cn(
        'border-3 border-foreground border-b-0 last:border-b-3 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        props.class
      )
    "
  >
    <slot />
  </AccordionItemPrimitive>
</template>
