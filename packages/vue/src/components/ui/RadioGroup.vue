<script setup lang="ts">
import { RadioGroupRoot, type RadioGroupRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends RadioGroupRootProps {
  class?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <RadioGroupRoot
    v-bind="props"
    :class="cn('grid gap-2', props.class)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </RadioGroupRoot>
</template>
