<script setup lang="ts">
import { NavigationMenuTrigger } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { navigationMenuTriggerStyle } from './navigation-menu-variants'

defineProps<{
  class?: string
}>()
</script>

<template>
  <NavigationMenuTrigger :class="cn(navigationMenuTriggerStyle(), 'group', $props.class)">
    <slot />
    <ChevronDown
      class="relative top-[1px] ml-1 h-3 w-3 stroke-[3] transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
