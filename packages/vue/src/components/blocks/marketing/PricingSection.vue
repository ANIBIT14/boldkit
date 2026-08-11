<script setup lang="ts">
import { cn, safeHref } from '@/lib/utils'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import { Check } from 'lucide-vue-next'

export interface PricingTier {
  name: string
  price: string
  period?: string
  description?: string
  features: string[]
  cta?: string
  /** Navigate on click. Takes precedence over the `ctaClick` event. */
  ctaHref?: string
  featured?: boolean
}

interface PricingSectionProps {
  title?: string
  subtitle?: string
  tiers: PricingTier[]
  class?: string
}

withDefaults(defineProps<PricingSectionProps>(), {
  title: 'Pricing',
})

// Tuple syntax (Vue 3.3+) rather than the call-signature form — the latter
// trips no-unused-vars on its type-only parameters.
const emit = defineEmits<{ ctaClick: [tier: PricingTier] }>()
</script>

<template>
  <section :class="cn('py-16 px-4 md:px-8 lg:px-16', $props.class)">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12 space-y-3">
        <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tight">{{ title }}</h2>
        <p v-if="subtitle" class="text-muted-foreground max-w-xl mx-auto">{{ subtitle }}</p>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="tier in tiers"
          :key="tier.name"
          :class="cn(
            'flex flex-col border-3 border-foreground bg-card p-6',
            tier.featured
              ? 'shadow-[8px_8px_0px_hsl(var(--shadow-color))] md:-translate-y-2'
              : 'shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
          )"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-black uppercase tracking-wide">{{ tier.name }}</h3>
            <Badge v-if="tier.featured" variant="accent">Popular</Badge>
          </div>
          <p v-if="tier.description" class="mt-2 text-sm text-muted-foreground">
            {{ tier.description }}
          </p>
          <div class="mt-4 flex items-baseline gap-1">
            <span class="text-4xl font-black">{{ tier.price }}</span>
            <span v-if="tier.period" class="text-sm font-bold text-muted-foreground">
              /{{ tier.period }}
            </span>
          </div>
          <ul class="mt-6 space-y-3 flex-1">
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="flex items-start gap-2 text-sm font-medium"
            >
              <span
                class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-foreground bg-success"
              >
                <Check class="h-3 w-3 text-success-foreground" />
              </span>
              {{ feature }}
            </li>
          </ul>
          <Button
            v-if="tier.ctaHref"
            class="mt-6 w-full"
            :variant="tier.featured ? 'default' : 'outline'"
            as-child
          >
            <a :href="safeHref(tier.ctaHref)">{{ tier.cta ?? 'Get started' }}</a>
          </Button>
          <Button
            v-else
            class="mt-6 w-full"
            :variant="tier.featured ? 'default' : 'outline'"
            @click="emit('ctaClick', tier)"
          >
            {{ tier.cta ?? 'Get started' }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
