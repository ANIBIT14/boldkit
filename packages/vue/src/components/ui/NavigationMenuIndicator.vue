<script setup lang="ts">
import { NavigationMenuIndicator } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <NavigationMenuIndicator
    :class="
      cn(
        'top-full z-[1] flex h-2.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
        $props.class
      )
    "
  >
    <div class="relative top-[60%] h-2 w-2 rotate-45 border-3 border-foreground bg-popover" />
  </NavigationMenuIndicator>
</template>
