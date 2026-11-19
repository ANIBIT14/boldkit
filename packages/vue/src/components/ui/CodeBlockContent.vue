<script setup lang="ts">
/*
 * Pass plain text through `code` (split into one CodeBlockLine per row when
 * `line-numbers` is on), or your own markup / CodeBlockLines through the slot.
 */
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import CodeBlockLine from './CodeBlockLine.vue'

const props = withDefaults(
  defineProps<{
    code?: string
    /** Wrap long lines instead of scrolling horizontally. */
    wrap?: boolean
    /** Number each line. */
    lineNumbers?: boolean
    /** Number of the first line. */
    startLine?: number
    class?: string
  }>(),
  { wrap: false, lineNumbers: false, startLine: 1 }
)

const lines = computed(() =>
  props.lineNumbers && props.code != null ? props.code.replace(/\n$/, '').split('\n') : null
)
</script>

<template>
  <pre
    data-slot="code-block-content"
    :data-wrap="props.wrap || undefined"
    :data-numbered="props.lineNumbers || undefined"
    dir="ltr"
    tabindex="0"
    :style="{ counterReset: `line ${props.startLine - 1}` }"
    :class="
      cn(
        'bk-scrollbar min-h-0 min-w-0 overflow-auto p-4 text-start font-mono leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring group-data-[size=sm]/code-block:p-2.5 data-[wrap]:whitespace-pre-wrap data-[wrap]:break-words',
        props.class
      )
    "
  ><code
      data-slot="code-block-code"
      class="grid min-w-max content-start [[data-numbered]>&]:grid-cols-[auto_1fr] [[data-wrap]>&]:min-w-0"
    ><template v-if="lines"><CodeBlockLine v-for="(line, index) in lines" :key="index">{{ line }}</CodeBlockLine></template><template v-else-if="props.code != null">{{ props.code }}</template><slot v-else /></code></pre>
</template>
