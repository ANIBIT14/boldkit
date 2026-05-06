<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui'
import Avatar from '@/components/ui/Avatar.vue'
import AvatarImage from '@/components/ui/AvatarImage.vue'
import AvatarFallback from '@/components/ui/AvatarFallback.vue'
import { Quote } from 'lucide-vue-next'

type TestimonialsVariant = 'grid' | 'single' | 'masonry' | 'withAvatars'

interface TestimonialItem {
  quote: string
  author: string
  role?: string
  company?: string
  avatar?: string
  rating?: number
}

interface TestimonialsProps {
  variant?: TestimonialsVariant
  title?: string
  subtitle?: string
  testimonials: TestimonialItem[]
  class?: string
}

const props = withDefaults(defineProps<TestimonialsProps>(), {
  variant: 'grid',
})

const activeIndex = ref(0)
const activeTestimonial = computed(() => props.testimonials[activeIndex.value] ?? props.testimonials[0])

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <!-- Grid Variant -->
  <section
    v-if="variant === 'grid'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="testimonial in testimonials"
          :key="testimonial.author"
          class="group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
        >
          <CardContent class="pt-6">
            <Quote class="h-8 w-8 text-primary mb-4" />
            <p class="text-base mb-6 font-medium">{{ testimonial.quote }}</p>
            <div class="flex items-center gap-3">
              <Avatar class="h-10 w-10 border-2 border-foreground">
                <AvatarImage v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.author" />
                <AvatarFallback class="bg-primary text-primary-foreground font-bold text-sm">
                  {{ getInitials(testimonial.author) }}
                </AvatarFallback>
              </Avatar>
              <div>
                <p class="font-bold text-sm uppercase">{{ testimonial.author }}</p>
                <p v-if="testimonial.role || testimonial.company" class="text-xs text-muted-foreground">
                  {{ testimonial.role }}{{ testimonial.role && testimonial.company ? ' at ' : '' }}{{ testimonial.company }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Single Variant -->
  <section
    v-else-if="variant === 'single'"
    :class="cn('py-20 px-4 md:px-8 lg:px-16 bg-muted/30', props.class)"
  >
    <div class="max-w-4xl mx-auto text-center">
      <Quote class="h-16 w-16 text-primary mx-auto mb-8" />
      <p class="text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
        "{{ testimonials[0]?.quote }}"
      </p>
      <div class="flex items-center justify-center gap-4">
        <Avatar class="h-14 w-14 border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
          <AvatarImage v-if="testimonials[0]?.avatar" :src="testimonials[0]?.avatar" :alt="testimonials[0]?.author" />
          <AvatarFallback class="bg-primary text-primary-foreground font-bold">
            {{ getInitials(testimonials[0]?.author || '') }}
          </AvatarFallback>
        </Avatar>
        <div class="text-left">
          <p class="font-black uppercase">{{ testimonials[0]?.author }}</p>
          <p v-if="testimonials[0]?.role || testimonials[0]?.company" class="text-muted-foreground font-medium">
            {{ testimonials[0]?.role }}{{ testimonials[0]?.role && testimonials[0]?.company ? ', ' : '' }}{{ testimonials[0]?.company }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Masonry Variant -->
  <section
    v-else-if="variant === 'masonry'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-accent">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <Card
          v-for="testimonial in testimonials"
          :key="testimonial.author"
          class="break-inside-avoid group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
        >
          <CardContent class="pt-6">
            <p class="text-base mb-6 font-medium">{{ testimonial.quote }}</p>
            <div class="flex items-center gap-3">
              <Avatar class="h-10 w-10 border-2 border-foreground">
                <AvatarImage v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.author" />
                <AvatarFallback class="bg-secondary text-secondary-foreground font-bold text-sm">
                  {{ getInitials(testimonial.author) }}
                </AvatarFallback>
              </Avatar>
              <div>
                <p class="font-bold text-sm">{{ testimonial.author }}</p>
                <p v-if="testimonial.role" class="text-xs text-muted-foreground">{{ testimonial.role }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- WithAvatars Variant -->
  <section
    v-else-if="variant === 'withAvatars'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', props.class)"
  >
    <div v-if="testimonials.length" class="max-w-4xl mx-auto text-center space-y-8">
      <div v-if="title || subtitle" class="space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <!-- Active quote display -->
      <div class="border-3 border-foreground bg-card p-8 shadow-[6px_6px_0px_hsl(var(--shadow-color))]">
        <Quote class="h-10 w-10 text-primary mx-auto mb-6" />
        <blockquote class="text-xl md:text-2xl font-medium leading-relaxed mb-6">
          "{{ activeTestimonial.quote }}"
        </blockquote>
        <div>
          <p class="font-black uppercase">{{ activeTestimonial.author }}</p>
          <p class="text-sm text-muted-foreground">
            {{ activeTestimonial.role }}{{ activeTestimonial.company ? ` at ${activeTestimonial.company}` : '' }}
          </p>
        </div>
      </div>

      <!-- Clickable avatar navigation -->
      <div class="flex justify-center gap-2">
        <button
          v-for="(testimonial, index) in testimonials"
          :key="`avatar-${testimonial.author}`"
          :aria-label="`View testimonial from ${testimonial.author}`"
          :aria-pressed="index === activeIndex"
          class="transition-all"
          :class="index === activeIndex ? 'scale-110' : 'opacity-50 hover:opacity-100'"
          @click="activeIndex = index"
        >
          <Avatar
            class="h-12 w-12 border-3 border-foreground"
            :class="index === activeIndex ? 'shadow-[3px_3px_0px_hsl(var(--shadow-color))]' : ''"
          >
            <AvatarImage v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.author" />
            <AvatarFallback class="font-bold">{{ getInitials(testimonial.author) }}</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </div>
  </section>
</template>
