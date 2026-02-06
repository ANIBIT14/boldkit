<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <h3 :class="cn('text-xl font-bold uppercase tracking-wide', $props.class)">
    <slot />
  </h3>
</template>
