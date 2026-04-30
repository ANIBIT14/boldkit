<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div role="group" :class="cn('flex items-center', $props.class)">
    <slot />
  </div>
</template>
