<script setup lang="ts">
import { SplitterGroup, type SplitterGroupProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<SplitterGroupProps & { class?: string }>(),
  {
    direction: 'horizontal',
  }
)
</script>

<template>
  <SplitterGroup
    v-bind="props"
    :class="
      cn(
        'flex h-full w-full data-[panel-group-direction=vertical]:flex-col data-[orientation=vertical]:flex-col',
        props.class
      )
    "
  >
    <slot />
  </SplitterGroup>
</template>
