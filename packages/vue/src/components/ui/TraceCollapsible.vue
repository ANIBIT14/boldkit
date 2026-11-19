<script setup lang="ts">
import { CollapsibleRoot, useForwardPropsEmits, type CollapsibleRootEmits, type CollapsibleRootProps } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<CollapsibleRootProps & { class?: string }>()
const emits = defineEmits<CollapsibleRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <CollapsibleRoot
    v-slot="slotProps"
    v-bind="forwarded"
    data-slot="trace-collapsible"
    :class="cn('flex w-full min-w-0 flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </CollapsibleRoot>
</template>
