<script setup lang="ts">
import { MenubarMenu } from 'reka-ui'

defineProps<{
  value?: string
}>()
</script>

<template>
  <MenubarMenu :value="value">
    <slot />
  </MenubarMenu>
</template>
