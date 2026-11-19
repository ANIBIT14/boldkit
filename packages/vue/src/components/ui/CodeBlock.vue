<script setup lang="ts">
/*
 * CodeBlock — code, terminal output, logs and diffs. A bordered slab with a
 * hard shadow; `size="sm"` drops to a 2px border and 2px shadow for tool
 * output nested inside a Trace.
 *
 * Highlighting is out of scope: pass plain text through CodeBlockContent's
 * `code` prop (split into numbered lines when `line-numbers` is on), or your
 * own highlighter's markup through its slot.
 */
import { cn } from '@/lib/utils'
import { codeBlockVariants, type CodeBlockVariants } from './code-block-variants'

const props = withDefaults(
  defineProps<{
    variant?: NonNullable<CodeBlockVariants['variant']>
    size?: NonNullable<CodeBlockVariants['size']>
    class?: string
  }>(),
  { variant: 'default', size: 'default' }
)
</script>

<template>
  <div
    data-slot="code-block"
    :data-variant="props.variant"
    :data-size="props.size"
    :class="cn(codeBlockVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot />
  </div>
</template>
