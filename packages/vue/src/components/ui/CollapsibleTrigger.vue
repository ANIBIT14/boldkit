<script setup lang="ts">
import { CollapsibleTrigger as CollapsibleTriggerPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <CollapsibleTriggerPrimitive
    :class="cn('transition-all duration-150 [&[data-state=open]>svg]:rotate-180', $props.class)"
  >
    <slot />
  </CollapsibleTriggerPrimitive>
</template>
