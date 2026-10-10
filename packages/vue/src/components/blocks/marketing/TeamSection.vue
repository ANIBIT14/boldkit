<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Globe, createLucideIcon } from '@lucide/vue'

// @lucide/vue ships no brand icons; these keep the paths lucide-vue-next used.
const Twitter = createLucideIcon('twitter', [
  ['path', { d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' }],
])
const Linkedin = createLucideIcon('linkedin', [
  ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }],
  ['rect', { width: '4', height: '12', x: '2', y: '9' }],
  ['circle', { cx: '4', cy: '4', r: '2' }],
])
const Github = createLucideIcon('github', [
  ['path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' }],
  ['path', { d: 'M9 18c-4.51 2-5-2-7-2' }],
])

import { Card, CardContent } from '@/components/ui'
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

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  website: Globe,
} as const
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
          :key="`team-${member.name}`"
          class="group text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition"
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
            <div v-if="member.socials?.length" class="flex justify-center gap-2 mt-3">
              <a
                v-for="social in member.socials"
                :key="social.platform"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 flex items-center justify-center border-2 border-foreground bg-muted transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:bg-primary hover:text-primary-foreground"
              >
                <component :is="socialIcons[social.platform]" class="h-4 w-4" />
              </a>
            </div>
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
          :key="`team-${member.name}`"
          class="hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition"
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
                <div v-if="member.socials?.length" class="flex gap-2 mt-3">
                  <a
                    v-for="social in member.socials"
                    :key="social.platform"
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-8 h-8 flex items-center justify-center border-2 border-foreground bg-muted transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:bg-primary hover:text-primary-foreground"
                  >
                    <component :is="socialIcons[social.platform]" class="h-4 w-4" />
                  </a>
                </div>
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
          :key="`team-${member.name}`"
          class="group"
        >
          <div class="border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--shadow-color))] overflow-hidden mb-4 aspect-[4/5] group-hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition">
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
          <div v-if="member.socials?.length" class="flex gap-2 mt-3">
            <a
              v-for="social in member.socials"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 flex items-center justify-center border-2 border-foreground bg-background transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_hsl(var(--shadow-color))] hover:bg-primary hover:text-primary-foreground"
            >
              <component :is="socialIcons[social.platform]" class="h-4 w-4" />
            </a>
          </div>
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
          :key="`team-${member.name}`"
          class="flex items-center gap-3 border-3 border-foreground px-4 py-2 shadow-[3px_3px_0px_hsl(var(--shadow-color))] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition bg-card"
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
