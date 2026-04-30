<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <span
    aria-current="page"
    :class="cn('font-bold text-foreground', $props.class)"
  >
    <slot />
  </span>
</template>
