<script setup lang="ts">
import { ComboboxRoot, type ComboboxRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */ Omit<ComboboxRootProps, 'open' | 'searchTerm'> {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <ComboboxRoot
    v-bind="props"
    :open="true"
    :class="
      cn(
        'flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground',
        props.class
      )
    "
  >
    <slot />
  </ComboboxRoot>
</template>
