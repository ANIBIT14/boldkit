<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootProps } from 'reka-ui'

const props = defineProps<DropdownMenuRootProps>()
</script>

<template>
  <DropdownMenuRoot v-bind="props">
    <slot />
  </DropdownMenuRoot>
</template>
