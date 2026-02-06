<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <h5 :class="cn('mb-1 font-bold uppercase tracking-wide leading-none', $props.class)">
    <slot />
  </h5>
</template>
