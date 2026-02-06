<script setup lang="ts">
import { TabsContent as TabsContentPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  value: string
}>()
</script>

<template>
  <TabsContentPrimitive
    :value="value"
    :class="
      cn(
        'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        $props.class
      )
    "
  >
    <slot />
  </TabsContentPrimitive>
</template>
