<script setup lang="ts">
import { NavigationMenuList } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <NavigationMenuList
    :class="cn('group flex flex-1 list-none items-center justify-center gap-1', $props.class)"
  >
    <slot />
  </NavigationMenuList>
</template>
