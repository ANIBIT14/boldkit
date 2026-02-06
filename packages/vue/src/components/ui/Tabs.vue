<script setup lang="ts">
import { TabsRoot, type TabsRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends TabsRootProps {
  class?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<template>
  <TabsRoot
    v-bind="props"
    :class="cn('w-full', props.class)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </TabsRoot>
</template>
