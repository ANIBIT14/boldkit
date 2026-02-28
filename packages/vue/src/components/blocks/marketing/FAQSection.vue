<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Accordion from '@/components/ui/Accordion.vue'
import AccordionItem from '@/components/ui/AccordionItem.vue'
import AccordionTrigger from '@/components/ui/AccordionTrigger.vue'
import AccordionContent from '@/components/ui/AccordionContent.vue'
import Button from '@/components/ui/Button.vue'
import { Mail, MessageCircle } from 'lucide-vue-next'

type FAQVariant = 'accordion' | 'twoColumns' | 'withCategories' | 'withContact' | 'simpleList'

interface FAQItem {
  question: string
  answer: string
  category?: string
}

interface FAQSectionProps {
  variant?: FAQVariant
  title?: string
  subtitle?: string
  description?: string
  faqs: FAQItem[]
  contactEmail?: string
  class?: string
}

const props = withDefaults(defineProps<FAQSectionProps>(), {
  variant: 'accordion',
})

const emit = defineEmits<{
  (e: 'contact'): void
}>()

const categories = [...new Set(props.faqs.map((faq) => faq.category).filter(Boolean))]
</script>

<template>
  <!-- Accordion Variant -->
  <section
    v-if="variant === 'accordion'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-3xl mx-auto">
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

      <Accordion type="single" collapsible class="space-y-4">
        <AccordionItem
          v-for="(faq, index) in faqs"
          :key="index"
          :value="`item-${index}`"
          class="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-card"
        >
          <AccordionTrigger class="px-6 font-bold uppercase text-left">
            {{ faq.question }}
          </AccordionTrigger>
          <AccordionContent class="px-6 pb-4">
            {{ faq.answer }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>

  <!-- TwoColumns Variant -->
  <section
    v-else-if="variant === 'twoColumns'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
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

      <div class="grid md:grid-cols-2 gap-8">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="space-y-2"
        >
          <h3 class="font-bold uppercase">{{ faq.question }}</h3>
          <p class="text-muted-foreground">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- WithCategories Variant -->
  <section
    v-else-if="variant === 'withCategories'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div v-if="title || subtitle" class="text-center mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-accent">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <Card
          v-for="(category, catIndex) in categories"
          :key="catIndex"
        >
          <CardHeader>
            <CardTitle class="uppercase">{{ category }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <div
              v-for="(faq, faqIndex) in faqs.filter((f) => f.category === category)"
              :key="faqIndex"
              class="space-y-2"
            >
              <h4 class="font-bold">{{ faq.question }}</h4>
              <p class="text-sm text-muted-foreground">{{ faq.answer }}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- WithContact Variant -->
  <section
    v-else-if="variant === 'withContact'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2">
          <div v-if="title || subtitle" class="mb-8 space-y-2">
            <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
              {{ subtitle }}
            </p>
            <h2 v-if="title" class="text-3xl font-black uppercase tracking-tight">
              {{ title }}
            </h2>
          </div>

          <Accordion type="single" collapsible class="space-y-4">
            <AccordionItem
              v-for="(faq, index) in faqs"
              :key="index"
              :value="`item-${index}`"
              class="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-card"
            >
              <AccordionTrigger class="px-6 font-bold text-left">
                {{ faq.question }}
              </AccordionTrigger>
              <AccordionContent class="px-6 pb-4">
                {{ faq.answer }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <Card class="sticky top-8">
            <CardHeader>
              <CardTitle class="uppercase">Still have questions?</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-muted-foreground">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div class="space-y-3">
                <Button class="w-full gap-2" @click="emit('contact')">
                  <MessageCircle class="h-4 w-4" />
                  Chat with us
                </Button>
                <Button v-if="contactEmail" variant="outline" class="w-full gap-2" as="a" :href="`mailto:${contactEmail}`">
                  <Mail class="h-4 w-4" />
                  Email support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>

  <!-- SimpleList Variant -->
  <section
    v-else-if="variant === 'simpleList'"
    :class="cn('py-16 px-4 md:px-8 lg:px-16', props.class)"
  >
    <div class="max-w-3xl mx-auto">
      <div v-if="title || subtitle" class="mb-12 space-y-4">
        <p v-if="subtitle" class="text-sm font-bold uppercase tracking-widest text-primary">
          {{ subtitle }}
        </p>
        <h2 v-if="title" class="text-3xl md:text-4xl font-black uppercase tracking-tight">
          {{ title }}
        </h2>
      </div>

      <div class="space-y-8">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border-b-3 border-foreground pb-8 last:border-0"
        >
          <h3 class="font-black uppercase text-lg mb-3">{{ faq.question }}</h3>
          <p class="text-muted-foreground font-medium">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
