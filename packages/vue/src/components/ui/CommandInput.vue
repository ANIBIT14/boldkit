<script setup lang="ts">
import { ComboboxInput, type ComboboxInputProps } from 'reka-ui'
import { Search } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */ ComboboxInputProps {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex items-center border-b-3 border-foreground px-3" cmdk-input-wrapper="">
    <Search class="mr-2 h-4 w-4 shrink-0 opacity-50 stroke-[3]" />
    <ComboboxInput
      v-bind="props"
      :class="
        cn(
          'flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      "
    />
  </div>
</template>
