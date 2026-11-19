<script setup lang="ts">
import { RadioGroupRoot, useForwardProps, type RadioGroupRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends RadioGroupRootProps {
  class?: string
}

const props = defineProps<Props>()
// Forward only props the caller set: Vue casts absent booleans to false,
// which would pin `open` closed and override Reka defaults (loop, unmountOnHide).
const forwarded = useForwardProps(props)
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <RadioGroupRoot
    v-bind="forwarded"
    :class="cn('grid gap-2', props.class)"
    @update:model-value="(v) => emit('update:modelValue', String(v ?? ''))"
  >
    <slot />
  </RadioGroupRoot>
</template>
