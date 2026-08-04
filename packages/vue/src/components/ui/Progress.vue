<script setup lang="ts">
import { computed } from 'vue'
import { ProgressRoot, ProgressIndicator, type ProgressRootProps } from 'reka-ui'
import { cn } from '@/lib/utils'

type ProgressVariant = 'smooth' | 'stepped' | 'marquee'

interface Props extends ProgressRootProps {
  class?: string
  /**
   * smooth  — continuous fill (the pre-v3.5 default)
   * stepped — fill snaps forward in ten discrete notches
   * marquee — indeterminate; a block travelling the track, ignores modelValue
   */
  variant?: ProgressVariant
}

const props = withDefaults(defineProps<Props>(), { variant: 'smooth' })

const indeterminate = computed(() => props.variant === 'marquee')

const clampedValue = computed(() => Math.max(0, Math.min(100, props.modelValue ?? 0)))

// Reka reads null as indeterminate and drops aria-valuenow. Clamp so an
// out-of-range modelValue can't trip its range warning, and keep an omitted
// value indeterminate.
const rootValue = computed(() =>
  indeterminate.value || props.modelValue == null ? null : clampedValue.value
)

// Only the primitive's own props reach ProgressRoot — `class` and `variant`
// are ours and would otherwise land on the DOM node as stray attributes.
const rootProps = computed<ProgressRootProps>(() => ({
  max: props.max,
  getValueLabel: props.getValueLabel,
  asChild: props.asChild,
  as: props.as,
  modelValue: rootValue.value,
}))
</script>

<template>
  <ProgressRoot
    v-bind="rootProps"
    :class="
      cn(
        'relative h-5 w-full overflow-hidden border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        props.class
      )
    "
  >
    <ProgressIndicator
      :class="
        cn(
          'h-full w-full flex-1 bg-primary transition duration-500 ease-out',
          props.variant === 'stepped' && 'bk-progress-stepped',
          indeterminate && 'bk-progress-marquee'
        )
      "
      :style="indeterminate ? undefined : { transform: `translateX(-${100 - clampedValue}%)` }"
    />
  </ProgressRoot>
</template>
