import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  CTASimple,
  CTAWithBackground,
  CTANewsletter,
  CTASplit,
  CTABanner,
} from '@/components/blocks/marketing/cta-section'

const variants = [
  {
    name: 'Simple',
    description: 'Centered CTA with title, description, and action buttons.',
    preview: (
      <CTASimple
        title="Ready to get started?"
        description="Join thousands of developers building with BoldKit."
        primaryAction={{ label: 'Get Started', onClick: () => {} }}
        secondaryAction={{ label: 'Learn More', onClick: () => {} }}
      />
    ),
    reactCode: `import { CTASection } from '@/components/blocks/marketing'

<CTASection.Simple
  title="Ready to get started?"
  description="Join thousands of developers building with BoldKit."
  primaryAction={{ label: 'Get Started', onClick: handleClick }}
  secondaryAction={{ label: 'Learn More', onClick: handleLearnMore }}
/>`,
    vueCode: `<script setup lang="ts">
import { CTASection } from '@/components/blocks/marketing'
</script>

<template>
  <CTASection
    variant="simple"
    title="Ready to get started?"
    description="Join thousands of developers."
    :primary-action="{ label: 'Get Started' }"
    @primary-click="handleClick"
  />
</template>`,
  },
  {
    name: 'WithBackground',
    description: 'CTA with colored background and icon.',
    preview: (
      <CTAWithBackground
        title="Start building today"
        description="No credit card required. Get started in minutes."
        primaryAction={{ label: 'Try It Free', onClick: () => {} }}
        backgroundColor="primary"
      />
    ),
    reactCode: `import { CTASection } from '@/components/blocks/marketing'

<CTASection.WithBackground
  title="Start building today"
  description="No credit card required."
  primaryAction={{ label: 'Try It Free', onClick: handleClick }}
  backgroundColor="primary" // 'primary' | 'secondary' | 'accent' | 'muted'
/>`,
    vueCode: `<template>
  <CTASection
    variant="withBackground"
    title="Start building today"
    background-color="primary"
    :primary-action="{ label: 'Try It Free' }"
  />
</template>`,
  },
  {
    name: 'Newsletter',
    description: 'Email newsletter signup form.',
    preview: (
      <CTANewsletter
        title="Subscribe to our newsletter"
        description="Get the latest updates and news delivered to your inbox."
        onSubmit={(email) => console.log('Subscribed:', email)}
      />
    ),
    reactCode: `import { CTASection } from '@/components/blocks/marketing'

<CTASection.Newsletter
  title="Subscribe to our newsletter"
  description="Get the latest updates."
  placeholder="Enter your email"
  buttonLabel="Subscribe"
  onSubmit={(email) => handleSubscribe(email)}
/>`,
    vueCode: `<template>
  <CTASection
    variant="newsletter"
    title="Subscribe to our newsletter"
    @submit="handleSubscribe"
  />
</template>`,
  },
  {
    name: 'Split',
    description: 'Two-column CTA with image.',
    preview: (
      <CTASplit
        title="Transform your workflow"
        description="Experience the power of bold, expressive design."
        primaryAction={{ label: 'Get Started', onClick: () => {} }}
        imageSrc="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop"
        imagePosition="right"
      />
    ),
    reactCode: `import { CTASection } from '@/components/blocks/marketing'

<CTASection.Split
  title="Transform your workflow"
  description="Experience the power of bold design."
  primaryAction={{ label: 'Get Started', onClick: handleClick }}
  imageSrc="/cta-image.jpg"
  imagePosition="right" // or 'left'
/>`,
    vueCode: `<template>
  <CTASection
    variant="split"
    title="Transform your workflow"
    image-src="/cta-image.jpg"
    image-position="right"
    :primary-action="{ label: 'Get Started' }"
  />
</template>`,
  },
  {
    name: 'Banner',
    description: 'Slim banner CTA for announcements.',
    preview: (
      <CTABanner
        text="🎉 New release! Check out BoldKit with 15 new blocks."
        action={{ label: 'Learn More', onClick: () => {} }}
        variant="primary"
      />
    ),
    reactCode: `import { CTASection } from '@/components/blocks/marketing'

<CTASection.Banner
  text="🎉 New release!"
  action={{ label: 'Learn More', onClick: handleClick }}
  variant="primary" // 'primary' | 'secondary' | 'accent' | 'warning'
  dismissible
  onDismiss={() => {}}
/>`,
    vueCode: `<template>
  <CTASection
    variant="banner"
    text="🎉 New release!"
    :action="{ label: 'Learn More' }"
    dismissible
    @dismiss="handleDismiss"
  />
</template>`,
  },
]

export function CTASectionDoc() {
  return (
    <BlockDoc
      name="CTA Section"
      description="Call-to-action sections with various layouts including simple centered, background colored, newsletter signup, split with image, and banner styles."
      category="marketing"
      variants={variants}
    />
  )
}

export default CTASectionDoc
