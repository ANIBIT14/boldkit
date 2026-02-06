<script setup lang="ts">
import { TabsList as TabsListPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <TabsListPrimitive
    :class="
      cn(
        'inline-flex h-12 items-center justify-center border-3 border-foreground bg-background p-1 text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        $props.class
      )
    "
  >
    <slot />
  </TabsListPrimitive>
</template>
