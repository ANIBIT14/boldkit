<script setup lang="ts">
import { ComboboxEmpty } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <ComboboxEmpty :class="cn('py-6 text-center text-sm', $props.class)">
    <slot />
  </ComboboxEmpty>
</template>
