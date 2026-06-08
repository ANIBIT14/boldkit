<script setup lang="ts">
import { MenubarSeparator as MenubarSeparatorPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <MenubarSeparatorPrimitive :class="cn('-mx-1 my-1 h-px bg-foreground', $props.class)" />
</template>
