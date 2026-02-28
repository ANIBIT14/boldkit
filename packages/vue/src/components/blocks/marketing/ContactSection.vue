<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Label from '@/components/ui/Label.vue'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-vue-next'

type ContactVariant = 'split' | 'centered' | 'withCards' | 'withMap'

interface ContactInfo {
  email?: string
  phone?: string
  address?: string
  hours?: string
}

interface ContactSectionProps {
  variant?: ContactVariant
  title?: string
  subtitle?: string
  description?: string
  contactInfo?: ContactInfo
  mapEmbedUrl?: string
  class?: string
}

const props = withDefaults(defineProps<ContactSectionProps>(), {
  variant: 'split',
})

const emit = defineEmits<{
  (e: 'submit', data: { name: string; email: string; message: string }): void
}>()

const name = ref('')
const email = ref('')
const message = ref('')

const handleSubmit = () => {
  emit('submit', {
    name: name.value,
    email: email.value,
    message: message.value,
  })
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <!-- Split Variant -->
  <section
    v-if="variant === 'split'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12">
        <div class="space-y-8">
          <div>
            <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary mb-2">
              {{ subtitle }}
            </p>
            <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              {{ title }}
            </h2>
            <p v-if="description" class="text-lg text-muted-foreground font-medium">
              {{ description }}
            </p>
          </div>

          <div v-if="contactInfo" class="space-y-4">
            <div v-if="contactInfo.email" class="flex items-center gap-4">
              <div class="w-12 h-12 flex items-center justify-center border-3 border-foreground bg-primary shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                <Mail class="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p class="font-bold text-sm uppercase">Email</p>
                <a :href="`mailto:${contactInfo.email}`" class="text-muted-foreground hover:text-foreground">
                  {{ contactInfo.email }}
                </a>
              </div>
            </div>

            <div v-if="contactInfo.phone" class="flex items-center gap-4">
              <div class="w-12 h-12 flex items-center justify-center border-3 border-foreground bg-secondary shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                <Phone class="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p class="font-bold text-sm uppercase">Phone</p>
                <a :href="`tel:${contactInfo.phone}`" class="text-muted-foreground hover:text-foreground">
                  {{ contactInfo.phone }}
                </a>
              </div>
            </div>

            <div v-if="contactInfo.address" class="flex items-center gap-4">
              <div class="w-12 h-12 flex items-center justify-center border-3 border-foreground bg-accent shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                <MapPin class="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p class="font-bold text-sm uppercase">Address</p>
                <p class="text-muted-foreground">{{ contactInfo.address }}</p>
              </div>
            </div>

            <div v-if="contactInfo.hours" class="flex items-center gap-4">
              <div class="w-12 h-12 flex items-center justify-center border-3 border-foreground bg-success shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                <Clock class="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <p class="font-bold text-sm uppercase">Hours</p>
                <p class="text-muted-foreground">{{ contactInfo.hours }}</p>
              </div>
            </div>
          </div>
        </div>

        <Card class="shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
          <CardHeader>
            <CardTitle class="uppercase">Send us a message</CardTitle>
            <CardDescription>Fill out the form and we'll get back to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form class="space-y-4" @submit.prevent="handleSubmit">
              <div class="space-y-2">
                <Label for="name">Name</Label>
                <Input id="name" v-model="name" placeholder="Your name" required />
              </div>
              <div class="space-y-2">
                <Label for="email">Email</Label>
                <Input id="email" v-model="email" type="email" placeholder="your@email.com" required />
              </div>
              <div class="space-y-2">
                <Label for="message">Message</Label>
                <Textarea id="message" v-model="message" placeholder="How can we help?" rows="4" required />
              </div>
              <Button type="submit" class="w-full">
                Send Message
                <Send class="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Centered Variant -->
  <section
    v-else-if="variant === 'centered'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-2xl mx-auto">
      <div v-if="title || subtitle || description" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
        <p v-if="description" class="text-lg text-muted-foreground font-medium">
          {{ description }}
        </p>
      </div>

      <Card class="shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
        <CardContent class="pt-6">
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="name-centered">Name</Label>
                <Input id="name-centered" v-model="name" placeholder="Your name" required />
              </div>
              <div class="space-y-2">
                <Label for="email-centered">Email</Label>
                <Input id="email-centered" v-model="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="message-centered">Message</Label>
              <Textarea id="message-centered" v-model="message" placeholder="How can we help?" rows="6" required />
            </div>
            <Button type="submit" class="w-full" size="lg">
              Send Message
              <Send class="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </section>

  <!-- WithCards Variant -->
  <section
    v-else-if="variant === 'withCards'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-secondary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <Card v-if="contactInfo?.email" class="text-center hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all">
          <CardContent class="pt-6">
            <div class="w-16 h-16 mx-auto flex items-center justify-center border-3 border-foreground bg-primary mb-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <Mail class="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 class="font-bold uppercase mb-2">Email Us</h3>
            <a :href="`mailto:${contactInfo.email}`" class="text-muted-foreground hover:text-foreground">
              {{ contactInfo.email }}
            </a>
          </CardContent>
        </Card>

        <Card v-if="contactInfo?.phone" class="text-center hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all">
          <CardContent class="pt-6">
            <div class="w-16 h-16 mx-auto flex items-center justify-center border-3 border-foreground bg-secondary mb-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <Phone class="h-7 w-7 text-secondary-foreground" />
            </div>
            <h3 class="font-bold uppercase mb-2">Call Us</h3>
            <a :href="`tel:${contactInfo.phone}`" class="text-muted-foreground hover:text-foreground">
              {{ contactInfo.phone }}
            </a>
          </CardContent>
        </Card>

        <Card class="text-center hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all">
          <CardContent class="pt-6">
            <div class="w-16 h-16 mx-auto flex items-center justify-center border-3 border-foreground bg-accent mb-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <MessageCircle class="h-7 w-7 text-accent-foreground" />
            </div>
            <h3 class="font-bold uppercase mb-2">Live Chat</h3>
            <p class="text-muted-foreground">Available 24/7</p>
          </CardContent>
        </Card>
      </div>

      <Card class="max-w-2xl mx-auto shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
        <CardHeader>
          <CardTitle class="uppercase text-center">Send a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="name-cards">Name</Label>
                <Input id="name-cards" v-model="name" placeholder="Your name" required />
              </div>
              <div class="space-y-2">
                <Label for="email-cards">Email</Label>
                <Input id="email-cards" v-model="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="message-cards">Message</Label>
              <Textarea id="message-cards" v-model="message" placeholder="How can we help?" rows="4" required />
            </div>
            <Button type="submit" class="w-full">
              Send Message
              <Send class="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </section>

  <!-- WithMap Variant -->
  <section
    v-else-if="variant === 'withMap'"
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

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--shadow-color))] overflow-hidden h-[400px]">
          <iframe
            v-if="mapEmbedUrl"
            :src="mapEmbedUrl"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen
            loading="lazy"
          />
          <div v-else class="w-full h-full bg-muted flex items-center justify-center">
            <MapPin class="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <Card class="shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
          <CardHeader>
            <CardTitle class="uppercase">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <form class="space-y-4" @submit.prevent="handleSubmit">
              <div class="space-y-2">
                <Label for="name-map">Name</Label>
                <Input id="name-map" v-model="name" placeholder="Your name" required />
              </div>
              <div class="space-y-2">
                <Label for="email-map">Email</Label>
                <Input id="email-map" v-model="email" type="email" placeholder="your@email.com" required />
              </div>
              <div class="space-y-2">
                <Label for="message-map">Message</Label>
                <Textarea id="message-map" v-model="message" placeholder="How can we help?" rows="4" required />
              </div>
              <Button type="submit" class="w-full">
                Send Message
                <Send class="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
