<script setup lang="ts">
import { NavigationMenuContent } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <NavigationMenuContent
    :class="
      cn(
        'absolute left-0 top-full z-50 mt-2 min-w-[12rem] border-3 border-foreground bg-popover text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
        $props.class
      )
    "
  >
    <slot />
  </NavigationMenuContent>
</template>
