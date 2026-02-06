<script setup lang="ts">
import { SelectValue as SelectValuePrimitive, type SelectValueProps } from 'reka-ui'

defineProps<SelectValueProps>()
</script>

<template>
  <SelectValuePrimitive v-bind="$props">
    <slot />
  </SelectValuePrimitive>
</template>
