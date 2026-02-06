<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <thead :class="cn('bg-muted [&_tr]:border-b-3', $props.class)">
    <slot />
  </thead>
</template>
