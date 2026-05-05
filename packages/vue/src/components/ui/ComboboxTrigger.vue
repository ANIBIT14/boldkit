<script setup lang="ts">
import { PopoverTrigger as PopoverTriggerPrimitive } from 'reka-ui'
import { ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: string
    placeholder?: string
    value?: string
    open?: boolean
  }>(),
  {
    placeholder: 'Select...',
  }
)
</script>

<template>
  <PopoverTriggerPrimitive as-child>
    <button
      role="combobox"
      :aria-expanded="props.open"
      :class="
        cn(
          'flex h-11 w-full items-center justify-between border-3 border-input bg-background px-4 py-2 text-sm font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))] focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
          props.class
        )
      "
    >
      <span :class="cn('truncate', !props.value && 'text-muted-foreground')">
        {{ props.value || props.placeholder }}
      </span>
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" :stroke-width="2.5" />
    </button>
  </PopoverTriggerPrimitive>
</template>
