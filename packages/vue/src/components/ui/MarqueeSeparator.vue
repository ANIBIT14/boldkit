<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('text-2xl font-black text-muted-foreground', $props.class)">
    <slot>/</slot>
  </span>
</template>
