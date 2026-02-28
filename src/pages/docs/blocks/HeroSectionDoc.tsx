import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  HeroCentered,
  HeroSplit,
  HeroWithStats,
  HeroMinimal,
  HeroWithVideo,
} from '@/components/blocks/marketing/hero-section'

const variants = [
  {
    name: 'Centered',
    description: 'A centered hero with badge, title highlight, and dual CTAs.',
    preview: (
      <HeroCentered
        badge="New Release"
        title="Build faster with"
        titleHighlight="BoldKit"
        description="The neubrutalism component library for React and Vue. Bold, raw, beautiful."
        primaryAction={{ label: 'Get Started', onClick: () => {} }}
        secondaryAction={{ label: 'Learn More', onClick: () => {} }}
      />
    ),
    reactCode: `import { HeroSection } from '@/components/blocks/marketing'

<HeroSection.Centered
  badge="New Release"
  title="Build faster with"
  titleHighlight="BoldKit"
  description="The neubrutalism component library for React and Vue."
  primaryAction={{ label: 'Get Started', onClick: () => {} }}
  secondaryAction={{ label: 'Learn More', onClick: () => {} }}
/>`,
    vueCode: `<script setup lang="ts">
import { HeroSection } from '@/components/blocks/marketing'
</script>

<template>
  <HeroSection
    variant="centered"
    badge="New Release"
    title="Build faster with"
    title-highlight="BoldKit"
    description="The neubrutalism component library for React and Vue."
    :primary-action="{ label: 'Get Started' }"
    :secondary-action="{ label: 'Learn More' }"
    @primary-click="handleGetStarted"
  />
</template>`,
  },
  {
    name: 'Split',
    description: 'Two-column layout with image and content.',
    preview: (
      <HeroSplit
        title="Design that"
        titleHighlight="stands out"
        description="Create stunning interfaces with our bold, expressive design system."
        primaryAction={{ label: 'Start Building', onClick: () => {} }}
        secondaryAction={{ label: 'Watch Demo', onClick: () => {} }}
        imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
        imagePosition="right"
      />
    ),
    reactCode: `import { HeroSection } from '@/components/blocks/marketing'

<HeroSection.Split
  title="Design that"
  titleHighlight="stands out"
  description="Create stunning interfaces with our bold design system."
  primaryAction={{ label: 'Start Building', onClick: handleClick }}
  secondaryAction={{ label: 'Watch Demo', onClick: handleDemo }}
  imageSrc="/hero-image.jpg"
  imagePosition="right" // or "left"
/>`,
    vueCode: `<script setup lang="ts">
import { HeroSection } from '@/components/blocks/marketing'
</script>

<template>
  <HeroSection
    variant="split"
    title="Design that"
    title-highlight="stands out"
    description="Create stunning interfaces with our bold design system."
    :primary-action="{ label: 'Start Building' }"
    image-src="/hero-image.jpg"
    image-position="right"
  />
</template>`,
  },
  {
    name: 'WithStats',
    description: 'Hero section with stats grid below.',
    preview: (
      <HeroWithStats
        title="Trusted by"
        titleHighlight="thousands"
        description="Join the developers who are building bold, expressive UIs."
        primaryAction={{ label: 'Join Now', onClick: () => {} }}
        stats={[
          { value: '10K+', label: 'Downloads' },
          { value: '50+', label: 'Components' },
          { value: '99%', label: 'Satisfaction' },
          { value: '24/7', label: 'Support' },
        ]}
      />
    ),
    reactCode: `import { HeroSection } from '@/components/blocks/marketing'

<HeroSection.WithStats
  title="Trusted by"
  titleHighlight="thousands"
  description="Join the developers building bold, expressive UIs."
  primaryAction={{ label: 'Join Now', onClick: handleClick }}
  stats={[
    { value: '10K+', label: 'Downloads' },
    { value: '50+', label: 'Components' },
    { value: '99%', label: 'Satisfaction' },
    { value: '24/7', label: 'Support' },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { HeroSection } from '@/components/blocks/marketing'

const stats = [
  { value: '10K+', label: 'Downloads' },
  { value: '50+', label: 'Components' },
  { value: '99%', label: 'Satisfaction' },
  { value: '24/7', label: 'Support' },
]
</script>

<template>
  <HeroSection
    variant="withStats"
    title="Trusted by"
    title-highlight="thousands"
    :stats="stats"
  />
</template>`,
  },
  {
    name: 'Minimal',
    description: 'Clean, minimal hero with large typography.',
    preview: (
      <HeroMinimal
        title="Less is more."
        description="Sometimes simplicity makes the biggest impact. Build bold interfaces with minimal effort."
        primaryAction={{ label: 'Get Started', onClick: () => {} }}
      />
    ),
    reactCode: `import { HeroSection } from '@/components/blocks/marketing'

<HeroSection.Minimal
  title="Less is more."
  description="Sometimes simplicity makes the biggest impact."
  primaryAction={{ label: 'Get Started', onClick: handleClick }}
/>`,
    vueCode: `<script setup lang="ts">
import { HeroSection } from '@/components/blocks/marketing'
</script>

<template>
  <HeroSection
    variant="minimal"
    title="Less is more."
    description="Sometimes simplicity makes the biggest impact."
    :primary-action="{ label: 'Get Started' }"
  />
</template>`,
  },
  {
    name: 'WithVideo',
    description: 'Hero with video thumbnail and play button.',
    preview: (
      <HeroWithVideo
        badge="Featured"
        title="See it in"
        titleHighlight="action"
        description="Watch how BoldKit can transform your development workflow."
        primaryAction={{ label: 'Try It Free', onClick: () => {} }}
        videoThumbnail="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=675&fit=crop"
        onPlayClick={() => alert('Play video!')}
      />
    ),
    reactCode: `import { HeroSection } from '@/components/blocks/marketing'

<HeroSection.WithVideo
  badge="Featured"
  title="See it in"
  titleHighlight="action"
  description="Watch how BoldKit can transform your workflow."
  primaryAction={{ label: 'Try It Free', onClick: handleClick }}
  videoThumbnail="/video-thumbnail.jpg"
  onPlayClick={() => openVideoModal()}
/>`,
    vueCode: `<script setup lang="ts">
import { HeroSection } from '@/components/blocks/marketing'
</script>

<template>
  <HeroSection
    variant="withVideo"
    badge="Featured"
    title="See it in"
    title-highlight="action"
    video-thumbnail="/video-thumbnail.jpg"
    @play-click="openVideoModal"
  />
</template>`,
  },
]

export function HeroSectionDoc() {
  return (
    <BlockDoc
      name="Hero Section"
      description="Eye-catching hero sections with various layouts for landing pages. Includes centered, split, stats, minimal, and video variants."
      category="marketing"
      variants={variants}
    />
  )
}

export default HeroSectionDoc
