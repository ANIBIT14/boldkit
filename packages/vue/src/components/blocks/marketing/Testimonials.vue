<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
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
          v-for="(testimonial, index) in testimonials"
          :key="index"
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
          v-for="(testimonial, index) in testimonials"
          :key="index"
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
    :class="cn('py-16 px-4 md:px-8 lg:px-16 bg-primary/5', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="flex justify-center mb-8">
        <div class="flex -space-x-4">
          <Avatar
            v-for="(testimonial, index) in testimonials.slice(0, 5)"
            :key="index"
            class="h-14 w-14 border-3 border-background shadow-[2px_2px_0px_hsl(var(--shadow-color))]"
          >
            <AvatarImage v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.author" />
            <AvatarFallback class="bg-primary text-primary-foreground font-bold">
              {{ getInitials(testimonial.author) }}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <Card
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="border-primary/30 hover:border-primary transition-colors"
        >
          <CardContent class="pt-6">
            <div class="flex items-start gap-4">
              <Avatar class="h-12 w-12 border-2 border-foreground shrink-0">
                <AvatarImage v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.author" />
                <AvatarFallback class="bg-primary text-primary-foreground font-bold">
                  {{ getInitials(testimonial.author) }}
                </AvatarFallback>
              </Avatar>
              <div>
                <p class="font-medium mb-2">{{ testimonial.quote }}</p>
                <p class="font-bold text-sm">{{ testimonial.author }}</p>
                <p v-if="testimonial.role" class="text-xs text-muted-foreground">{{ testimonial.role }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
