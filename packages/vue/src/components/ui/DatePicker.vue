<script setup lang="ts">
import { computed, ref } from 'vue'
import type { DateValue } from 'reka-ui'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import Popover from './Popover.vue'
import PopoverTrigger from './PopoverTrigger.vue'
import PopoverContent from './PopoverContent.vue'
import Button from './Button.vue'
import Calendar from './Calendar.vue'

interface Props {
  modelValue?: DateValue
  placeholder?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pick a date',
})

const emit = defineEmits<{
  'update:modelValue': [value: DateValue | undefined]
}>()

const open = ref(false)
const internal = ref<DateValue | undefined>(props.modelValue)
const selected = computed(() => props.modelValue ?? internal.value)

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const label = computed(() => {
  const v = selected.value
  if (!v) return props.placeholder
  return `${MONTHS[v.month - 1]} ${String(v.day).padStart(2, '0')}, ${v.year}`
})

function handleSelect(value: DateValue | undefined) {
  internal.value = value
  emit('update:modelValue', value)
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <Button
        variant="outline"
        :disabled="disabled"
        :class="
          cn(
            'w-[260px] justify-start gap-2 font-bold normal-case',
            !selected && 'text-muted-foreground',
            props.class
          )
        "
      >
        <CalendarIcon class="h-4 w-4" />
        {{ label }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <!-- cast: reka-ui's DateValue union vs the Calendar prop's intersection brand (type-only) -->
      <Calendar :model-value="selected as never" @update:model-value="handleSelect" />
    </PopoverContent>
  </Popover>
</template>
