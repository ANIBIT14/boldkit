<script setup lang="ts">
import { useSlots } from 'vue'
import { cn } from '@/lib/utils'
import { codeBlockLineVariants, type CodeBlockLineVariants } from './code-block-variants'

const props = withDefaults(
  defineProps<{
    variant?: NonNullable<CodeBlockLineVariants['variant']>
    class?: string
  }>(),
  { variant: 'default' }
)

const slots = useSlots()

// An empty line holds a newline so a copied selection keeps blank lines.
function isEmpty() {
  const nodes = slots.default?.() ?? []
  return nodes.every((node) => typeof node.children === 'string' && node.children === '')
}
</script>

<template>
  <span
    data-slot="code-block-line"
    :data-variant="props.variant"
    :class="cn(codeBlockLineVariants({ variant: props.variant }), props.class)"
  ><span
      v-if="props.variant === 'added' || props.variant === 'removed'"
      class="sr-only select-none"
    >{{ props.variant === 'added' ? 'Added: ' : 'Removed: ' }}</span><span data-slot="code-block-line-content" class="min-w-0"><template v-if="isEmpty()">{{ '\n' }}</template><slot v-else /></span></span>
</template>
