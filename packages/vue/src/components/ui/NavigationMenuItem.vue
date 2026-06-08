<script setup lang="ts">
import { NavigationMenuItem } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <NavigationMenuItem :class="cn('relative', $props.class)">
    <slot />
  </NavigationMenuItem>
</template>
