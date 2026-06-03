<script setup lang="ts">
import { computed } from 'vue'
import { type DialogRootProps } from 'reka-ui'
import Dialog from './Dialog.vue'
import DialogContent from './DialogContent.vue'
import DialogTitle from './DialogTitle.vue'
import DialogDescription from './DialogDescription.vue'
import Command from './Command.vue'

interface Props extends DialogRootProps {
  class?: string
  /** Accessible title for the dialog (visually hidden). */
  title?: string
  /** Accessible description for the dialog (visually hidden). */
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Command Menu',
  description: 'Search for a command to run.',
})
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

// Don't forward the visually-hidden title/description (and local class) to the
// renderless Dialog root.
const dialogProps = computed(() => {
  const { title: _title, description: _description, class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <Dialog v-bind="dialogProps" @update:open="emit('update:open', $event)">
    <DialogContent class="overflow-hidden p-0">
      <DialogTitle class="sr-only">{{ title }}</DialogTitle>
      <DialogDescription class="sr-only">{{ description }}</DialogDescription>
      <Command
        class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
      >
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
