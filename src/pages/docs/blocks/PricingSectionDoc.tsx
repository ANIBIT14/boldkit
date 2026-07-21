import { BlockDoc } from '@/components/docs/BlockDoc'
import { PricingSection } from '@/components/blocks/marketing/pricing-section'

const tiers = [
  { name: 'Starter', price: '$0', period: 'mo', description: 'For side projects', features: ['1 project', 'Community support', 'Basic components'] },
  { name: 'Pro', price: '$29', period: 'mo', featured: true, description: 'For teams shipping fast', features: ['Unlimited projects', 'Priority support', 'All blocks & charts'] },
  { name: 'Team', price: '$99', period: 'mo', description: 'For organizations', features: ['Everything in Pro', 'SSO & SAML', 'Dedicated support'] },
]

const variants = [
  {
    name: 'Tiers',
    description: 'Three pricing tiers with a featured plan.',
    preview: <PricingSection title="Pricing" subtitle="Simple, transparent pricing." tiers={tiers} />,
    reactCode: `import { PricingSection } from '@/components/blocks/marketing'

<PricingSection
  title="Pricing"
  tiers={[
    { name: 'Starter', price: '$0', period: 'mo', features: ['1 project', 'Community support'] },
    { name: 'Pro', price: '$29', period: 'mo', featured: true, features: ['Unlimited projects', 'Priority support'] },
    { name: 'Team', price: '$99', period: 'mo', features: ['Everything in Pro', 'SSO'] },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { PricingSection } from '@/components/blocks/marketing'
const tiers = [
  { name: 'Starter', price: '$0', period: 'mo', features: ['1 project'] },
  { name: 'Pro', price: '$29', period: 'mo', featured: true, features: ['Unlimited projects'] },
  { name: 'Team', price: '$99', period: 'mo', features: ['Everything in Pro'] },
]
</script>

<template>
  <PricingSection title="Pricing" :tiers="tiers" />
</template>`,
  },
]

export function PricingSectionDoc() {
  return (
    <BlockDoc
      name="Pricing Section"
      description="Pricing tiers with a featured plan and an optional checkout summary panel."
      category="marketing"
      variants={variants}
      sourcePaths={{
        react: 'src/components/blocks/marketing/pricing-section.tsx',
        vue: 'packages/vue/src/components/blocks/marketing/PricingSection.vue',
      }}
    />
  )
}

export default PricingSectionDoc
