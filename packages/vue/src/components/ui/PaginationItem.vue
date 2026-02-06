<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <li :class="cn('', $props.class)">
    <slot />
  </li>
</template>
