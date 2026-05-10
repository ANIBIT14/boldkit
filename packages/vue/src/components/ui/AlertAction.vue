<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: string
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    loading: false,
    disabled: false,
  }
)

defineOptions({ inheritAttrs: true })
</script>

<template>
  <button
    v-bind="$attrs"
    data-alert-action=""
    :disabled="props.disabled || props.loading"
    :class="
      cn(
        'mt-3 inline-flex items-center gap-1.5 max-w-full min-w-0',
        'rounded-none border border-current',
        'px-4 py-1 text-xs font-bold uppercase tracking-wide',
        'opacity-80 transition-all duration-150',
        'hover:opacity-100 hover:bg-current/10',
        'active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        props.class
      )
    "
  >
    <span
      v-if="props.loading"
      data-testid="alert-action-spinner"
      aria-hidden="true"
      class="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    <span class="inline-flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
      <slot />
    </span>
  </button>
</template>
