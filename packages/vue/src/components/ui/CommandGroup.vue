<script setup lang="ts">
import { ComboboxGroup, ComboboxLabel } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  heading?: string
}>()
</script>

<template>
  <ComboboxGroup
    :class="
      cn(
        'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground',
        $props.class
      )
    "
  >
    <ComboboxLabel v-if="heading" cmdk-group-heading="" class="px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
