<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

// Fallthrough attrs (name, id, aria-*) must land on the <select>, not the wrapper div.
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  class?: string
  modelValue?: string | number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="relative inline-flex w-full">
    <select
      v-bind="$attrs"
      :value="modelValue"
      :disabled="disabled"
      @change="onChange"
      :class="
        cn(
          'h-11 w-full appearance-none border-3 border-foreground bg-background px-3 pr-10 text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0px_hsl(var(--shadow-color))] outline-none transition-all focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      "
    >
      <slot />
    </select>
    <ChevronDown
      class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 stroke-[3]"
    />
  </div>
</template>
