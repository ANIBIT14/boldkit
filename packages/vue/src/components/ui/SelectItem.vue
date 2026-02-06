<script setup lang="ts">
import { SelectItem as SelectItemPrimitive, SelectItemText, SelectItemIndicator } from 'reka-ui'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  value: string
  disabled?: boolean
}>()
</script>

<template>
  <SelectItemPrimitive
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        'relative flex w-full cursor-default select-none items-center py-2 pl-8 pr-2 text-sm outline-none transition-all duration-150 focus:bg-accent focus:text-accent-foreground focus:translate-x-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        $props.class
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Check class="h-4 w-4 stroke-[3]" />
      </SelectItemIndicator>
    </span>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItemPrimitive>
</template>
