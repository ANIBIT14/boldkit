<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Separator from '@/components/ui/Separator.vue'
import { Mail, ArrowRight } from 'lucide-vue-next'
import type { Component } from 'vue'

type FooterVariant = 'multiColumn' | 'withNewsletter' | 'simple' | 'minimal' | 'withCTA'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  icon: Component
  href: string
  label: string
}

interface FooterSectionProps {
  variant?: FooterVariant
  logo?: string | Component
  companyName?: string
  description?: string
  columns?: FooterColumn[]
  socials?: SocialLink[]
  copyright?: string
  ctaTitle?: string
  ctaDescription?: string
  class?: string
}

const props = withDefaults(defineProps<FooterSectionProps>(), {
  variant: 'multiColumn',
})

const emit = defineEmits<{
  (e: 'subscribe', email: string): void
  (e: 'ctaClick'): void
}>()

const email = ref('')

const handleSubscribe = () => {
  if (email.value) {
    emit('subscribe', email.value)
    email.value = ''
  }
}
</script>

<template>
  <!-- MultiColumn Variant -->
  <footer
    v-if="variant === 'multiColumn'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16 border-t-3 border-foreground bg-muted/30', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div class="lg:col-span-2">
          <div v-if="logo || companyName" class="flex items-center gap-3 mb-4">
            <component v-if="typeof logo !== 'string' && logo" :is="logo" class="h-8 w-8" />
            <img v-else-if="logo" :src="logo" alt="Logo" class="h-8 w-auto" />
            <span v-if="companyName" class="font-black uppercase text-xl">{{ companyName }}</span>
          </div>
          <p v-if="description" class="text-muted-foreground font-medium max-w-sm">
            {{ description }}
          </p>
          <div v-if="socials" class="flex gap-3 mt-6">
            <a
              v-for="(social, index) in socials"
              :key="index"
              :href="social.href"
              :aria-label="social.label"
              class="w-10 h-10 flex items-center justify-center border-3 border-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <component :is="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <div
          v-for="(column, index) in columns"
          :key="index"
        >
          <h3 class="font-bold uppercase text-sm mb-4">{{ column.title }}</h3>
          <ul class="space-y-3">
            <li v-for="(link, linkIndex) in column.links" :key="linkIndex">
              <a
                :href="link.href"
                class="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator class="my-8 bg-foreground h-[3px]" />

      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>{{ copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.` }}</p>
      </div>
    </div>
  </footer>

  <!-- WithNewsletter Variant -->
  <footer
    v-else-if="variant === 'withNewsletter'"
    :class="cn('border-t-3 border-foreground', props.class)"
  >
    <div class="py-12 px-4 md:px-8 lg:px-16 bg-primary">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-2xl font-black uppercase text-primary-foreground mb-2">
              Subscribe to our newsletter
            </h3>
            <p class="text-primary-foreground/80 font-medium">
              Get the latest updates delivered to your inbox.
            </p>
          </div>
          <div class="flex gap-3">
            <div class="relative flex-1">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="pl-10 bg-background"
              />
            </div>
            <Button variant="secondary" @click="handleSubscribe">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="py-12 px-4 md:px-8 lg:px-16 bg-muted/30">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div v-if="logo || companyName" class="flex items-center gap-3 mb-4">
              <component v-if="typeof logo !== 'string' && logo" :is="logo" class="h-8 w-8" />
              <img v-else-if="logo" :src="logo" alt="Logo" class="h-8 w-auto" />
              <span v-if="companyName" class="font-black uppercase text-xl">{{ companyName }}</span>
            </div>
            <p v-if="description" class="text-muted-foreground font-medium">
              {{ description }}
            </p>
          </div>

          <div
            v-for="(column, index) in columns"
            :key="index"
          >
            <h3 class="font-bold uppercase text-sm mb-4">{{ column.title }}</h3>
            <ul class="space-y-2">
              <li v-for="(link, linkIndex) in column.links" :key="linkIndex">
                <a
                  :href="link.href"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator class="my-8 bg-foreground h-[3px]" />

        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{{ copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.` }}</p>
          <div v-if="socials" class="flex gap-4">
            <a
              v-for="(social, index) in socials"
              :key="index"
              :href="social.href"
              :aria-label="social.label"
              class="hover:text-foreground transition-colors"
            >
              <component :is="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Simple Variant -->
  <footer
    v-else-if="variant === 'simple'"
    :class="cn('py-12 px-4 md:px-8 lg:px-16 border-t-3 border-foreground', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-3">
          <component v-if="typeof logo !== 'string' && logo" :is="logo" class="h-8 w-8" />
          <img v-else-if="logo" :src="logo" alt="Logo" class="h-8 w-auto" />
          <span v-if="companyName" class="font-black uppercase text-xl">{{ companyName }}</span>
        </div>

        <nav v-if="columns && columns[0]" class="flex flex-wrap gap-6">
          <a
            v-for="(link, index) in columns[0].links"
            :key="index"
            :href="link.href"
            class="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            {{ link.label }}
          </a>
        </nav>

        <div v-if="socials" class="flex gap-4">
          <a
            v-for="(social, index) in socials"
            :key="index"
            :href="social.href"
            :aria-label="social.label"
            class="text-muted-foreground hover:text-foreground transition-colors"
          >
            <component :is="social.icon" class="h-5 w-5" />
          </a>
        </div>
      </div>

      <Separator class="my-8 bg-foreground h-[3px]" />

      <p class="text-center text-sm text-muted-foreground">
        {{ copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.` }}
      </p>
    </div>
  </footer>

  <!-- Minimal Variant -->
  <footer
    v-else-if="variant === 'minimal'"
    :class="cn('py-8 px-4 md:px-8 lg:px-16 border-t-3 border-foreground', props.class)"
  >
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-sm text-muted-foreground">
        {{ copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.` }}
      </p>
      <div v-if="socials" class="flex gap-4">
        <a
          v-for="(social, index) in socials"
          :key="index"
          :href="social.href"
          :aria-label="social.label"
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          <component :is="social.icon" class="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>

  <!-- WithCTA Variant -->
  <footer
    v-else-if="variant === 'withCTA'"
    :class="cn('border-t-3 border-foreground', props.class)"
  >
    <div class="py-16 px-4 md:px-8 lg:px-16">
      <div class="max-w-4xl mx-auto text-center border-3 border-foreground bg-accent p-8 md:p-12 shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
        <h3 class="text-2xl md:text-3xl font-black uppercase mb-4">
          {{ ctaTitle || 'Ready to get started?' }}
        </h3>
        <p class="text-muted-foreground font-medium mb-6 max-w-xl mx-auto">
          {{ ctaDescription || 'Join thousands of satisfied customers using our platform.' }}
        </p>
        <Button size="lg" @click="emit('ctaClick')">
          Get Started
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>

    <div class="py-8 px-4 md:px-8 lg:px-16 bg-muted/30">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-3">
          <component v-if="typeof logo !== 'string' && logo" :is="logo" class="h-6 w-6" />
          <img v-else-if="logo" :src="logo" alt="Logo" class="h-6 w-auto" />
          <span v-if="companyName" class="font-bold uppercase">{{ companyName }}</span>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.` }}
        </p>
        <div v-if="socials" class="flex gap-4">
          <a
            v-for="(social, index) in socials"
            :key="index"
            :href="social.href"
            :aria-label="social.label"
            class="text-muted-foreground hover:text-foreground transition-colors"
          >
            <component :is="social.icon" class="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
