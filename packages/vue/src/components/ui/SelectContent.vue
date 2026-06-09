<script setup lang="ts">
import {
  SelectPortal,
  SelectContent as SelectContentPrimitive,
  SelectViewport,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from 'reka-ui'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  position?: 'item-aligned' | 'popper'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'popper',
})
</script>

<template>
  <SelectPortal>
    <SelectContentPrimitive
      :position="props.position"
      :class="
        cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden border-3 border-foreground bg-popover text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          props.class
        )
      "
    >
      <SelectScrollUpButton class="flex cursor-default items-center justify-center py-1">
        <ChevronUp class="h-4 w-4 stroke-[3]" />
      </SelectScrollUpButton>
      <SelectViewport
        :class="
          cn(
            'p-1',
            props.position === 'popper' &&
              'h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)]'
          )
        "
      >
        <slot />
      </SelectViewport>
      <SelectScrollDownButton class="flex cursor-default items-center justify-center py-1">
        <ChevronDown class="h-4 w-4 stroke-[3]" />
      </SelectScrollDownButton>
    </SelectContentPrimitive>
  </SelectPortal>
</template>
