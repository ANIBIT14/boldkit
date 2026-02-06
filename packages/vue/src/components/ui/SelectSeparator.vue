<script setup lang="ts">
import { SelectSeparator as SelectSeparatorPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <SelectSeparatorPrimitive :class="cn('-mx-1 my-1 h-px bg-foreground', $props.class)" />
</template>
