<script setup lang="ts">
import { NavigationMenuRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <NavigationMenuRoot
    :class="cn('relative z-10 flex max-w-max flex-1 items-center justify-center', $props.class)"
  >
    <slot />
  </NavigationMenuRoot>
</template>
