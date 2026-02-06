<script setup lang="ts">
import { PinInputRoot, type PinInputRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends PinInputRootProps {
  class?: string
  containerClass?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  complete: [value: string[]]
}>()
</script>

<template>
  <PinInputRoot
    v-bind="props"
    :class="cn('disabled:cursor-not-allowed', props.class)"
    @update:model-value="emit('update:modelValue', $event)"
    @complete="emit('complete', $event)"
  >
    <div :class="cn('flex items-center gap-2 has-[:disabled]:opacity-50', props.containerClass)">
      <slot />
    </div>
  </PinInputRoot>
</template>
