<script setup lang="ts">
import { AvatarImage as AvatarImagePrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  src?: string
  alt?: string
}>()
</script>

<template>
  <AvatarImagePrimitive
    :src="props.src ?? ''"
    :alt="props.alt"
    :class="cn('aspect-square h-full w-full object-cover', props.class)"
  />
</template>
