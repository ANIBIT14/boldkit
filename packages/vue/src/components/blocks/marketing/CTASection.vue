<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { ArrowRight, Mail, X } from 'lucide-vue-next'

type CTAVariant = 'simple' | 'withBackground' | 'newsletter' | 'split' | 'banner'

interface CTASectionProps {
  variant?: CTAVariant
  title: string
  description?: string
  primaryAction?: { label: string; onClick?: () => void }
  secondaryAction?: { label: string; onClick?: () => void }
  backgroundImage?: string
  class?: string
}

const props = withDefaults(defineProps<CTASectionProps>(), {
  variant: 'simple',
})

const emit = defineEmits<{
  (e: 'subscribe', email: string): void
  (e: 'dismiss'): void
}>()

const email = ref('')
const bannerVisible = ref(true)

const handleSubscribe = () => {
  if (email.value) {
    emit('subscribe', email.value)
    email.value = ''
  }
}
</script>

<template>
  <!-- Simple Variant -->
  <section
    v-if="variant === 'simple'"
    :class="cn('py-20 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-4xl mx-auto text-center space-y-6">
      <h2 class="text-3xl md:text-4xl font-black uppercase tracking-tight">
        {{ title }}
      </h2>
      <p v-if="description" class="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
        {{ description }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button v-if="primaryAction" size="lg" @click="primaryAction.onClick">
          {{ primaryAction.label }}
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
        <Button v-if="secondaryAction" size="lg" variant="outline" @click="secondaryAction.onClick">
          {{ secondaryAction.label }}
        </Button>
      </div>
    </div>
  </section>

  <!-- WithBackground Variant -->
  <section
    v-else-if="variant === 'withBackground'"
    :class="cn('py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden', props.class)"
  >
    <div
      v-if="backgroundImage"
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    />
    <div class="absolute inset-0 bg-foreground/80" />

    <div class="relative max-w-4xl mx-auto text-center space-y-6">
      <h2 class="text-3xl md:text-4xl font-black uppercase tracking-tight text-background">
        {{ title }}
      </h2>
      <p v-if="description" class="text-lg text-background/80 font-medium max-w-2xl mx-auto">
        {{ description }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button v-if="primaryAction" size="lg" variant="secondary" @click="primaryAction.onClick">
          {{ primaryAction.label }}
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
        <Button v-if="secondaryAction" size="lg" variant="outline" class="border-background text-background hover:bg-background hover:text-foreground" @click="secondaryAction.onClick">
          {{ secondaryAction.label }}
        </Button>
      </div>
    </div>
  </section>

  <!-- Newsletter Variant -->
  <section
    v-else-if="variant === 'newsletter'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16 bg-primary', props.class)"
  >
    <div class="max-w-4xl mx-auto">
      <div class="border-3 border-foreground bg-background p-8 md:p-12 shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">
              {{ title }}
            </h2>
            <p v-if="description" class="text-muted-foreground font-medium">
              {{ description }}
            </p>
          </div>
          <div class="flex gap-3">
            <div class="relative flex-1">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="pl-10"
              />
            </div>
            <Button @click="handleSubscribe">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Split Variant -->
  <section
    v-else-if="variant === 'split'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8 items-center border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--shadow-color))]">
        <div class="p-8 md:p-12 bg-primary text-primary-foreground">
          <h2 class="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            {{ title }}
          </h2>
          <p v-if="description" class="font-medium opacity-90">
            {{ description }}
          </p>
        </div>
        <div class="p-8 md:p-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button v-if="primaryAction" size="lg" @click="primaryAction.onClick">
            {{ primaryAction.label }}
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
          <Button v-if="secondaryAction" size="lg" variant="outline" @click="secondaryAction.onClick">
            {{ secondaryAction.label }}
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- Banner Variant -->
  <div
    v-else-if="variant === 'banner' && bannerVisible"
    :class="cn('fixed bottom-0 left-0 right-0 z-50 border-t-3 border-foreground bg-accent p-4', props.class)"
  >
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <p class="font-bold text-accent-foreground">
          {{ title }}
        </p>
        <p v-if="description" class="text-sm text-accent-foreground/80 hidden md:block">
          {{ description }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Button v-if="primaryAction" size="sm" @click="primaryAction.onClick">
          {{ primaryAction.label }}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          class="h-8 w-8"
          @click="bannerVisible = false; emit('dismiss')"
        >
          <X class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
