<script setup lang="ts">
import { ComboboxItem, type ComboboxItemProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends ComboboxItemProps {
  class?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  select: [event: Event]
}>()
</script>

<template>
  <ComboboxItem
    v-bind="props"
    :class="
      cn(
        'relative flex cursor-default gap-2 select-none items-center px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        props.class
      )
    "
    @select="emit('select', $event)"
  >
    <slot />
  </ComboboxItem>
</template>
