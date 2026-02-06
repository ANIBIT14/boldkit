<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('animate-pulse bg-muted border-2 border-foreground/20', $props.class)"
  />
</template>
