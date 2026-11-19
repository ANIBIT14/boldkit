<script setup lang="ts">
import { TabsRoot, useForwardProps, type TabsRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends TabsRootProps {
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
  <TabsRoot
    v-bind="forwarded"
    :class="cn('w-full', props.class)"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <slot />
  </TabsRoot>
</template>
