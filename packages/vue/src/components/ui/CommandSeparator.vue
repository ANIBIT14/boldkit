<script setup lang="ts">
import { ComboboxSeparator } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <ComboboxSeparator :class="cn('-mx-1 h-px bg-foreground', $props.class)" />
</template>
