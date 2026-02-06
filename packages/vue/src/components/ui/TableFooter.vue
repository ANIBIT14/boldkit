<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <tfoot :class="cn('border-t-3 bg-muted/50 font-bold [&>tr]:last:border-b-0', $props.class)">
    <slot />
  </tfoot>
</template>
