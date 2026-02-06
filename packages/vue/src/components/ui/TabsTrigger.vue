<script setup lang="ts">
import { TabsTrigger as TabsTriggerPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  value: string
}>()
</script>

<template>
  <TabsTriggerPrimitive
    :value="value"
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap border-2 border-transparent px-4 py-1.5 gap-1.5 text-sm font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-foreground',
        $props.class
      )
    "
  >
    <slot />
  </TabsTriggerPrimitive>
</template>
