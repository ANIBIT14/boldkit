<script setup lang="ts">
import { AlertDialogTrigger as AlertDialogTriggerPrimitive } from 'reka-ui'
</script>

<template>
  <AlertDialogTriggerPrimitive as-child>
    <slot />
  </AlertDialogTriggerPrimitive>
</template>
