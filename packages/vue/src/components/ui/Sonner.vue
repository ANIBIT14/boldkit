<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import { useTheme } from '@/composables/useTheme'

const { resolvedTheme } = useTheme()
</script>

<template>
  <Toaster
    :theme="resolvedTheme"
    class="toaster group"
    :toast-options="{
      classes: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-3 group-[.toaster]:border-foreground group-[.toaster]:shadow-[4px_4px_0px_hsl(var(--shadow-color))] group-[.toaster]:rounded-none group-[.toaster]:font-bold',
        title: 'group-[.toast]:font-black group-[.toast]:uppercase group-[.toast]:tracking-wide',
        description: 'group-[.toast]:text-muted-foreground group-[.toast]:font-medium',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:font-bold group-[.toast]:uppercase group-[.toast]:rounded-none group-[.toast]:shadow-[2px_2px_0px_hsl(var(--foreground))] group-[.toast]:hover:translate-x-[2px] group-[.toast]:hover:translate-y-[2px] group-[.toast]:hover:shadow-none group-[.toast]:transition-all',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:font-bold group-[.toast]:uppercase group-[.toast]:rounded-none',
        success:
          'group-[.toaster]:bg-success group-[.toaster]:text-success-foreground group-[.toaster]:border-foreground',
        error:
          'group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-foreground',
        warning:
          'group-[.toaster]:bg-warning group-[.toaster]:text-warning-foreground group-[.toaster]:border-foreground',
        info:
          'group-[.toaster]:bg-info group-[.toaster]:text-info-foreground group-[.toaster]:border-foreground',
        closeButton:
          'group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:hover:bg-muted group-[.toast]:rounded-none',
      },
    }"
  />
</template>
