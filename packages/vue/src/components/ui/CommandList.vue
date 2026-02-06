<script setup lang="ts">
import { ComboboxContent, type ComboboxContentProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */ ComboboxContentProps {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <ComboboxContent
    v-bind="props"
    :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)"
  >
    <slot />
  </ComboboxContent>
</template>
