<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxRoot, CheckboxIndicator, type CheckboxRootProps } from 'reka-ui'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

// Public API mirrors Radix/React: `checked` + `update:checked` (supports v-model:checked).
// Reka UI v2's CheckboxRoot uses `modelValue`/`update:modelValue`, so translate internally.
interface Props extends Omit<CheckboxRootProps, 'modelValue'> {
  class?: string
  checked?: CheckboxRootProps['modelValue']
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:checked': [value: boolean]
}>()

// Forward every Reka prop except the ones we translate/handle ourselves.
const delegatedProps = computed(() => {
  const { checked: _checked, class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <CheckboxRoot
    v-bind="delegatedProps"
    :model-value="checked"
    :class="
      cn(
        'peer h-5 w-5 shrink-0 border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        props.class
      )
    "
    @update:model-value="emit('update:checked', $event as boolean)"
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <Check class="h-4 w-4 stroke-[3]" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
