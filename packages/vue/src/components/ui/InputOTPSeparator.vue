<script setup lang="ts">
import { Dot } from 'lucide-vue-next'
</script>

<template>
  <div role="presentation" aria-hidden="true">
    <slot>
      <Dot class="h-4 w-4" />
    </slot>
  </div>
</template>
