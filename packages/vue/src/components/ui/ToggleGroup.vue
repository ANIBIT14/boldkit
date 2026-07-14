<script lang="ts">
// Injection key + context type live in a plain <script> block — `<script setup>`
// cannot contain ES module `export`s (breaks the consumer's build).
import type { InjectionKey } from 'vue'

type TGV = import('class-variance-authority').VariantProps<
  typeof import('./toggle-variants').toggleVariants
>

export interface ToggleGroupContext {
  variant: TGV['variant']
  size: TGV['size']
}

export const ToggleGroupContextKey: InjectionKey<ToggleGroupContext> = Symbol('ToggleGroupContext')
</script>

<script setup lang="ts">
import { ToggleGroupRoot, type ToggleGroupRootProps } from 'reka-ui'
import { type VariantProps } from 'class-variance-authority'
import { provide } from 'vue'
import { cn } from '@/lib/utils'
import { toggleVariants } from './toggle-variants'

type ToggleVariants = VariantProps<typeof toggleVariants>

interface Props extends ToggleGroupRootProps {
  class?: string
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | null]
}>()

provide(ToggleGroupContextKey, {
  variant: props.variant,
  size: props.size,
})
</script>

<template>
  <ToggleGroupRoot
    v-bind="props"
    :class="cn('flex items-center justify-center gap-1', props.class)"
    @update:model-value="(val) => emit('update:modelValue', val as string | string[] | null)"
  >
    <slot />
  </ToggleGroupRoot>
</template>
