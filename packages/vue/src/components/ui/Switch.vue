<script setup lang="ts">
import { computed } from 'vue'
import { SwitchRoot, SwitchThumb, type SwitchRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

// Public API mirrors Radix/React: `checked` + `update:checked` (supports v-model:checked).
// Reka UI v2's SwitchRoot uses `modelValue`/`update:modelValue`, so translate internally.
interface Props extends Omit<SwitchRootProps, 'modelValue'> {
  class?: string
  checked?: SwitchRootProps['modelValue']
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
  <SwitchRoot
    v-bind="delegatedProps"
    :model-value="checked"
    :class="
      cn(
        'peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        props.class
      )
    "
    @update:model-value="emit('update:checked', $event as boolean)"
  >
    <SwitchThumb
      class="pointer-events-none block h-5 w-5 border-2 border-foreground bg-background shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
    />
  </SwitchRoot>
</template>
