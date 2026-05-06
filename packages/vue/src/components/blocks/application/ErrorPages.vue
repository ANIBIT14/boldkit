<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { Home, ArrowLeft, RefreshCw, WifiOff, ShieldX, Clock, AlertTriangle } from 'lucide-vue-next'

type ErrorPageVariant = 'notFound' | 'serverError' | 'maintenance' | 'offline' | 'forbidden' | 'comingSoon' | 'generic'

interface ErrorPagesProps {
  variant?: ErrorPageVariant
  title?: string
  description?: string
  homeHref?: string
  launchDate?: Date | string
  class?: string
}

const props = withDefaults(defineProps<ErrorPagesProps>(), {
  variant: 'notFound',
  homeHref: '/',
})

const emit = defineEmits<{
  (e: 'goBack'): void
  (e: 'goHome'): void
  (e: 'retry'): void
  (e: 'notify', email: string): void
}>()

const notifyEmail = ref('')
const submitted = ref(false)
const timeRemaining = ref<{ days: number; hours: number; minutes: number; seconds: number } | null>(null)
let countdownInterval: ReturnType<typeof setInterval> | null = null

function getCountdown(target: Date | string) {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

onMounted(() => {
  if (props.launchDate) {
    timeRemaining.value = getCountdown(props.launchDate)
    countdownInterval = setInterval(() => {
      timeRemaining.value = getCountdown(props.launchDate!)
    }, 1000)
  }
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
})

function handleNotify() {
  emit('notify', notifyEmail.value)
  submitted.value = true
}

const defaultContent: Record<ErrorPageVariant, { title: string; description: string }> = {
  notFound: {
    title: '404',
    description: 'The page you\'re looking for doesn\'t exist or has been moved.',
  },
  serverError: {
    title: '500',
    description: 'Something went wrong on our end. Please try again later.',
  },
  maintenance: {
    title: 'Under Maintenance',
    description: 'We\'re currently performing scheduled maintenance. We\'ll be back shortly.',
  },
  offline: {
    title: 'You\'re Offline',
    description: 'Please check your internet connection and try again.',
  },
  forbidden: {
    title: '403',
    description: 'You don\'t have permission to access this resource.',
  },
  comingSoon: {
    title: 'Coming Soon',
    description: 'We\'re working hard to bring you something amazing. Stay tuned!',
  },
  generic: {
    title: 'Oops!',
    description: 'Something unexpected happened. Please try again.',
  },
}

const content = {
  title: props.title || defaultContent[props.variant].title,
  description: props.description || defaultContent[props.variant].description,
}
</script>

<template>
  <!-- NotFound (404) -->
  <div
    v-if="variant === 'notFound'"
    :class="cn('min-h-screen flex flex-col items-center justify-center p-4', props.class)"
  >
    <div class="text-center space-y-6">
      <h1 class="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-primary">
        {{ content.title }}
      </h1>
      <div class="space-y-2">
        <h2 class="text-3xl font-black uppercase">Page Not Found</h2>
        <p class="text-lg text-muted-foreground font-medium max-w-md mx-auto">
          {{ content.description }}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" @click="emit('goHome')">
          <Home class="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <Button size="lg" variant="outline" @click="emit('goBack')">
          <ArrowLeft class="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  </div>

  <!-- ServerError (500) -->
  <div
    v-else-if="variant === 'serverError'"
    :class="cn('min-h-screen flex flex-col items-center justify-center p-4 bg-destructive/5', props.class)"
  >
    <div class="text-center space-y-6">
      <div class="w-24 h-24 mx-auto border-3 border-foreground bg-destructive shadow-[6px_6px_0px_hsl(var(--shadow-color))] flex items-center justify-center">
        <AlertTriangle class="h-12 w-12 text-destructive-foreground" />
      </div>
      <div class="space-y-2">
        <h1 class="text-6xl md:text-8xl font-black">{{ content.title }}</h1>
        <h2 class="text-2xl font-black uppercase">Server Error</h2>
        <p class="text-lg text-muted-foreground font-medium max-w-md mx-auto">
          {{ content.description }}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" @click="emit('retry')">
          <RefreshCw class="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button size="lg" variant="outline" @click="emit('goHome')">
          <Home class="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  </div>

  <!-- Maintenance -->
  <div
    v-else-if="variant === 'maintenance'"
    :class="cn('min-h-screen flex flex-col items-center justify-center p-4 bg-warning/5', props.class)"
  >
    <div class="text-center space-y-6">
      <div class="w-32 h-32 mx-auto border-3 border-foreground bg-warning shadow-[8px_8px_0px_hsl(var(--shadow-color))] flex items-center justify-center">
        <Clock class="h-16 w-16 text-warning-foreground animate-pulse" />
      </div>
      <div class="space-y-2">
        <h1 class="text-4xl md:text-5xl font-black uppercase">{{ content.title }}</h1>
        <p class="text-lg text-muted-foreground font-medium max-w-md mx-auto">
          {{ content.description }}
        </p>
      </div>
      <div class="border-3 border-foreground bg-card p-6 shadow-[4px_4px_0px_hsl(var(--shadow-color))] max-w-sm mx-auto">
        <p class="font-bold uppercase text-sm mb-2">Estimated Downtime</p>
        <p class="text-2xl font-black">~30 Minutes</p>
      </div>
    </div>
  </div>

  <!-- Offline -->
  <div
    v-else-if="variant === 'offline'"
    :class="cn('min-h-screen flex flex-col items-center justify-center p-4', props.class)"
  >
    <div class="text-center space-y-6">
      <div class="w-32 h-32 mx-auto border-3 border-foreground bg-muted shadow-[8px_8px_0px_hsl(var(--shadow-color))] flex items-center justify-center">
        <WifiOff class="h-16 w-16 text-muted-foreground" />
      </div>
      <div class="space-y-2">
        <h1 class="text-4xl md:text-5xl font-black uppercase">{{ content.title }}</h1>
        <p class="text-lg text-muted-foreground font-medium max-w-md mx-auto">
          {{ content.description }}
        </p>
      </div>
      <Button size="lg" @click="emit('retry')">
        <RefreshCw class="mr-2 h-4 w-4" />
        Retry Connection
      </Button>
    </div>
  </div>

  <!-- Forbidden (403) -->
  <div
    v-else-if="variant === 'forbidden'"
    :class="cn('min-h-screen flex flex-col items-center justify-center p-4', props.class)"
  >
    <div class="text-center space-y-6">
      <div class="w-24 h-24 mx-auto border-3 border-foreground bg-destructive shadow-[6px_6px_0px_hsl(var(--shadow-color))] flex items-center justify-center">
        <ShieldX class="h-12 w-12 text-destructive-foreground" />
      </div>
      <div class="space-y-2">
        <h1 class="text-6xl md:text-8xl font-black">{{ content.title }}</h1>
        <h2 class="text-2xl font-black uppercase">Access Denied</h2>
        <p class="text-lg text-muted-foreground font-medium max-w-md mx-auto">
          {{ content.description }}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" @click="emit('goBack')">
          <ArrowLeft class="mr-2 h-4 w-4" />
          Go Back
        </Button>
        <Button size="lg" variant="outline" @click="emit('goHome')">
          <Home class="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  </div>

  <!-- ComingSoon -->
  <div
    v-else-if="variant === 'comingSoon'"
    :class="cn('min-h-screen flex flex-col items-center justify-center p-4 bg-primary/5', props.class)"
  >
    <div class="text-center space-y-8 max-w-lg w-full">
      <div class="space-y-2">
        <div class="inline-block border-3 border-foreground bg-primary px-4 py-2 shadow-[4px_4px_0px_hsl(var(--shadow-color))] mb-4">
          <span class="font-black uppercase text-primary-foreground">Launching Soon</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black uppercase">{{ content.title }}</h1>
        <p class="text-lg text-muted-foreground font-medium max-w-md mx-auto">
          {{ content.description }}
        </p>
      </div>

      <!-- Countdown timer -->
      <div v-if="timeRemaining" class="flex justify-center gap-4">
        <div
          v-for="unit in [
            { value: timeRemaining.days, label: 'Days' },
            { value: timeRemaining.hours, label: 'Hours' },
            { value: timeRemaining.minutes, label: 'Mins' },
            { value: timeRemaining.seconds, label: 'Secs' },
          ]"
          :key="unit.label"
          class="border-3 border-foreground bg-card shadow-[4px_4px_0px_hsl(var(--shadow-color))] px-4 py-3 min-w-[70px]"
        >
          <div class="text-3xl font-black tabular-nums">{{ String(unit.value).padStart(2, '0') }}</div>
          <div class="text-xs font-bold uppercase tracking-wide text-muted-foreground">{{ unit.label }}</div>
        </div>
      </div>

      <!-- Email capture -->
      <div v-if="!submitted" class="space-y-3">
        <p class="text-sm font-bold uppercase tracking-wide">Get notified when we launch</p>
        <form class="flex gap-2 max-w-sm mx-auto" @submit.prevent="handleNotify">
          <Input
            v-model="notifyEmail"
            type="email"
            placeholder="your@email.com"
            required
            class="flex-1"
          />
          <Button type="submit">Notify Me</Button>
        </form>
      </div>
      <div v-else class="border-3 border-foreground bg-card p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))] max-w-sm mx-auto">
        <p class="font-black uppercase">You're on the list!</p>
        <p class="text-sm text-muted-foreground mt-1">We'll let you know the moment we launch.</p>
      </div>

      <Button size="lg" variant="outline" @click="emit('goBack')">
        <ArrowLeft class="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  </div>

  <!-- Generic -->
  <div
    v-else-if="variant === 'generic'"
    :class="cn('min-h-screen flex flex-col items-center justify-center p-4', props.class)"
  >
    <div class="text-center space-y-6">
      <div class="w-24 h-24 mx-auto border-3 border-foreground bg-secondary shadow-[6px_6px_0px_hsl(var(--shadow-color))] flex items-center justify-center">
        <AlertTriangle class="h-12 w-12 text-secondary-foreground" />
      </div>
      <div class="space-y-2">
        <h1 class="text-4xl md:text-5xl font-black uppercase">{{ content.title }}</h1>
        <p class="text-lg text-muted-foreground font-medium max-w-md mx-auto">
          {{ content.description }}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" @click="emit('retry')">
          <RefreshCw class="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button size="lg" variant="outline" @click="emit('goHome')">
          <Home class="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  </div>
</template>
