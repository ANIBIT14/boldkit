<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <nav aria-label="breadcrumb" :class="$props.class">
    <slot />
  </nav>
</template>
