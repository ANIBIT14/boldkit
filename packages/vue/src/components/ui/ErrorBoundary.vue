<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import Button from './Button.vue'
import Card from './Card.vue'
import CardHeader from './CardHeader.vue'
import CardTitle from './CardTitle.vue'
import CardContent from './CardContent.vue'
import { AlertTriangle, RefreshCw, Home } from 'lucide-vue-next'

const hasError = ref(false)
const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  hasError.value = true
  error.value = err instanceof Error ? err : new Error(String(err))
  if (import.meta.env.DEV) {
    console.error('Error caught by boundary:', err)
  }
  // Returning false stops the error from propagating further up.
  return false
})

function handleReload() {
  window.location.reload()
}

function handleGoHome() {
  window.location.href = '/'
}
</script>

<template>
  <div
    v-if="hasError"
    class="min-h-screen bg-background flex items-center justify-center p-4"
  >
    <Card class="max-w-lg w-full">
      <CardHeader class="bg-destructive">
        <CardTitle class="flex items-center gap-3">
          <AlertTriangle class="h-6 w-6 stroke-[3]" />
          Something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent class="pt-6 space-y-4">
        <p class="text-muted-foreground">
          An unexpected error occurred. This has been logged and we'll look into it.
        </p>
        <pre
          v-if="error && import.meta.env.DEV"
          class="bg-muted border-3 border-foreground p-4 text-sm overflow-x-auto"
        ><code>{{ error.message }}</code></pre>
        <div class="flex gap-3">
          <Button class="gap-2" @click="handleReload">
            <RefreshCw class="h-4 w-4" />
            Reload Page
          </Button>
          <Button variant="outline" class="gap-2" @click="handleGoHome">
            <Home class="h-4 w-4" />
            Go Home
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
  <slot v-else />
</template>
