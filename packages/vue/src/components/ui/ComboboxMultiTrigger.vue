<script setup lang="ts">
import { PopoverTrigger as PopoverTriggerPrimitive } from 'reka-ui'
import { ChevronsUpDown, X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

/**
 * Multi-select trigger. Each entry in `values` has a `value` (identifier)
 * and a `label` (display text). The `remove` emit receives the `value`
 * of the chip that was dismissed, so you can remove it from state directly.
 */
const props = withDefaults(
  defineProps<{
    class?: string
    placeholder?: string
    values?: { value: string; label: string }[]
    open?: boolean
  }>(),
  {
    placeholder: 'Select...',
    values: () => [],
  }
)

const emit = defineEmits<{
  remove: [value: string]
}>()
</script>

<template>
  <PopoverTriggerPrimitive as-child>
    <button
      role="combobox"
      :aria-expanded="props.open"
      :class="
        cn(
          'flex min-h-11 w-full flex-wrap items-center gap-1.5 border-3 border-input bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))] focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
          props.class
        )
      "
    >
      <span class="flex flex-1 flex-wrap items-center gap-1">
        <template v-if="props.values && props.values.length > 0">
          <span
            v-for="item in props.values"
            :key="item.value"
            class="flex items-center gap-1 border-2 border-foreground bg-accent px-1.5 py-0.5 text-xs font-bold"
          >
            {{ item.label }}
            <X
              class="h-3 w-3 cursor-pointer hover:opacity-70"
              :stroke-width="3"
              @click.stop="emit('remove', item.value)"
            />
          </span>
        </template>
        <span v-else class="text-muted-foreground">{{ props.placeholder }}</span>
      </span>
      <ChevronsUpDown class="ml-auto h-4 w-4 shrink-0 opacity-50" :stroke-width="2.5" />
    </button>
  </PopoverTriggerPrimitive>
</template>
