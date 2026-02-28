<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import Avatar from '@/components/ui/Avatar.vue'
import AvatarImage from '@/components/ui/AvatarImage.vue'
import AvatarFallback from '@/components/ui/AvatarFallback.vue'
import Button from '@/components/ui/Button.vue'

type TeamVariant = 'grid' | 'list' | 'largePhotos' | 'compact'

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'website'
  url: string
}

interface TeamMember {
  name: string
  role: string
  bio?: string
  image?: string
  socials?: SocialLink[]
}

interface TeamSectionProps {
  variant?: TeamVariant
  title?: string
  subtitle?: string
  description?: string
  members: TeamMember[]
  class?: string
}

const props = withDefaults(defineProps<TeamSectionProps>(), {
  variant: 'grid',
})

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const teamColors = [
  'bg-primary text-primary-foreground',
  'bg-secondary text-secondary-foreground',
  'bg-accent text-accent-foreground',
  'bg-success text-success-foreground',
  'bg-info text-info-foreground',
]
</script>

<template>
  <!-- Grid Variant -->
  <section
    v-if="variant === 'grid'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="title || subtitle || description" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
        <p v-if="description" class="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
          {{ description }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="(member, index) in members"
          :key="index"
          class="group text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
        >
          <CardContent class="pt-6">
            <div class="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] overflow-hidden mb-4 mx-auto w-32 h-32">
              <img
                v-if="member.image"
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover"
              />
              <div v-else :class="cn('w-full h-full flex items-center justify-center text-2xl font-black', teamColors[index % 5])">
                {{ getInitials(member.name) }}
              </div>
            </div>
            <h3 class="font-black uppercase text-lg">{{ member.name }}</h3>
            <p class="text-sm text-muted-foreground font-medium">{{ member.role }}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- List Variant -->
  <section
    v-else-if="variant === 'list'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-4xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-secondary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="space-y-4">
        <Card
          v-for="(member, index) in members"
          :key="index"
          class="hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
        >
          <CardContent class="pt-6">
            <div class="flex items-center gap-6">
              <Avatar class="h-16 w-16 border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                <AvatarImage v-if="member.image" :src="member.image" :alt="member.name" />
                <AvatarFallback :class="teamColors[index % 5]">
                  {{ getInitials(member.name) }}
                </AvatarFallback>
              </Avatar>
              <div class="flex-1">
                <h3 class="font-black uppercase">{{ member.name }}</h3>
                <p class="text-sm text-muted-foreground font-medium">{{ member.role }}</p>
                <p v-if="member.bio" class="text-sm mt-2">{{ member.bio }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- LargePhotos Variant -->
  <section
    v-else-if="variant === 'largePhotos'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', props.class)"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="title || subtitle || description" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-accent">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
        <p v-if="description" class="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
          {{ description }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(member, index) in members"
          :key="index"
          class="group"
        >
          <div class="border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--shadow-color))] overflow-hidden mb-4 aspect-[4/5] group-hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all">
            <img
              v-if="member.image"
              :src="member.image"
              :alt="member.name"
              class="w-full h-full object-cover"
            />
            <div v-else :class="cn('w-full h-full flex items-center justify-center text-6xl font-black', teamColors[index % 5])">
              {{ getInitials(member.name) }}
            </div>
          </div>
          <h3 class="font-black uppercase text-xl">{{ member.name }}</h3>
          <p class="text-muted-foreground font-medium">{{ member.role }}</p>
          <p v-if="member.bio" class="text-sm mt-2">{{ member.bio }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Compact Variant -->
  <section
    v-else-if="variant === 'compact'"
    :class="cn('py-12 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div v-if="title" class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
        <Button v-if="description" variant="outline" size="sm">
          {{ description }}
        </Button>
      </div>

      <div class="flex flex-wrap gap-4 justify-center">
        <div
          v-for="(member, index) in members"
          :key="index"
          class="flex items-center gap-3 border-3 border-foreground px-4 py-2 shadow-[3px_3px_0px_hsl(var(--shadow-color))] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all bg-card"
        >
          <Avatar class="h-10 w-10 border-2 border-foreground">
            <AvatarImage v-if="member.image" :src="member.image" :alt="member.name" />
            <AvatarFallback :class="teamColors[index % 5]">
              {{ getInitials(member.name) }}
            </AvatarFallback>
          </Avatar>
          <div>
            <p class="font-bold text-sm">{{ member.name }}</p>
            <p class="text-xs text-muted-foreground">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
