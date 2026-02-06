<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('text-xl font-bold uppercase tracking-wide leading-none', $props.class)"
  >
    <slot />
  </div>
</template>
