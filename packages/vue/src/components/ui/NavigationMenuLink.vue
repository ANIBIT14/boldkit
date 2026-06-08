<script setup lang="ts">
import { NavigationMenuLink } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <NavigationMenuLink :class="cn($props.class)">
    <slot />
  </NavigationMenuLink>
</template>
