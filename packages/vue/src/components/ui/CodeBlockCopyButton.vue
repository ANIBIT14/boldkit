<script setup lang="ts">
// Copies `value` to the clipboard. A consumer @click that calls
// event.preventDefault() cancels the copy.
import { onBeforeUnmount, ref } from 'vue'
import { Check, Copy } from '@lucide/vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  /** The text written to the clipboard. */
  value: string
  class?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const copied = ref(false)
let timeout: ReturnType<typeof setTimeout> | undefined

function onClick(event: MouseEvent) {
  emit('click', event)
  if (event.defaultPrevented || typeof navigator === 'undefined' || !navigator.clipboard) return
  navigator.clipboard
    .writeText(props.value)
    .then(() => {
      copied.value = true
      clearTimeout(timeout)
      timeout = setTimeout(() => (copied.value = false), 2000)
    })
    .catch(() => {})
}

onBeforeUnmount(() => clearTimeout(timeout))
</script>

<template>
  <button
    type="button"
    data-slot="code-block-copy-button"
    :data-copied="copied || undefined"
    :aria-label="copied ? 'Copied' : 'Copy code'"
    :class="
      cn(
        'inline-flex size-7 shrink-0 items-center justify-center border-2 border-foreground bg-background text-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] bk-interactive hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[copied]:bg-success data-[copied]:text-success-foreground [&_svg]:size-3.5',
        props.class
      )
    "
    @click="onClick"
  >
    <Check v-if="copied" key="check" aria-hidden="true" class="animate-pop" :stroke-width="3" />
    <Copy v-else key="copy" aria-hidden="true" :stroke-width="2.5" />
  </button>
  <span aria-live="polite" class="sr-only">{{ copied ? 'Copied' : '' }}</span>
</template>
