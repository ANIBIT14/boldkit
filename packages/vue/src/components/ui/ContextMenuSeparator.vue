<script setup lang="ts">
import { ContextMenuSeparator as ContextMenuSeparatorPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <ContextMenuSeparatorPrimitive :class="cn('-mx-1 my-1 h-px bg-foreground', $props.class)" />
</template>
