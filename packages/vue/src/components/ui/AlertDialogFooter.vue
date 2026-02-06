<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', $props.class)">
    <slot />
  </div>
</template>
