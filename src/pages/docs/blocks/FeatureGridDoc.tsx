import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  FeatureGridWithIcons,
  FeatureGridWithImages,
  FeatureGridAlternating,
  FeatureBentoGrid,
} from '@/components/blocks/marketing/feature-grid'
import { Zap, Shield, Palette, Code, Layers, Rocket } from 'lucide-react'

const sampleFeatures = [
  { icon: <Zap className="h-6 w-6" />, title: 'Lightning Fast', description: 'Optimized for performance with zero runtime overhead.' },
  { icon: <Shield className="h-6 w-6" />, title: 'Secure by Default', description: 'Built with security best practices in mind.' },
  { icon: <Palette className="h-6 w-6" />, title: 'Fully Customizable', description: 'Easily adapt to your brand with CSS variables.' },
  { icon: <Code className="h-6 w-6" />, title: 'Developer First', description: 'TypeScript support with great DX.' },
  { icon: <Layers className="h-6 w-6" />, title: 'Composable', description: 'Mix and match components freely.' },
  { icon: <Rocket className="h-6 w-6" />, title: 'Production Ready', description: 'Battle-tested in real applications.' },
]

const imageFeatures = [
  { image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop', title: 'Mobile First', description: 'Responsive design that works on all devices.' },
  { image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop', title: 'Modern Stack', description: 'Built with the latest technologies.' },
  { image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop', title: 'Great DX', description: 'Developer experience is our priority.' },
]

const alternatingFeatures = [
  { icon: <Zap className="h-7 w-7" />, title: 'Lightning Fast Performance', description: 'Our components are optimized for speed and efficiency. Zero runtime overhead means your app stays snappy.', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop' },
  { icon: <Shield className="h-7 w-7" />, title: 'Enterprise Security', description: 'Built with security best practices. All components follow OWASP guidelines and are regularly audited.', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop' },
]

const bentoFeatures = [
  { icon: <Zap className="h-5 w-5" />, title: 'Fast', description: 'Optimized performance', span: 'normal' as const },
  { icon: <Shield className="h-5 w-5" />, title: 'Secure', description: 'Enterprise-grade security with best practices', span: 'wide' as const },
  { icon: <Palette className="h-5 w-5" />, title: 'Customizable', description: 'Easy theming with CSS variables for complete brand control', span: 'tall' as const },
  { icon: <Code className="h-5 w-5" />, title: 'TypeScript', description: 'Full type safety', span: 'normal' as const },
  { icon: <Layers className="h-5 w-5" />, title: 'Composable', description: 'Mix and match', span: 'normal' as const },
]

const variants = [
  {
    name: 'WithIcons',
    description: 'Feature cards with icon headers.',
    preview: (
      <FeatureGridWithIcons
        title="Why Choose BoldKit?"
        subtitle="Features"
        description="Everything you need to build stunning interfaces."
        features={sampleFeatures}
        columns={3}
      />
    ),
    reactCode: `import { FeatureGrid } from '@/components/blocks/marketing'
import { Zap, Shield, Palette } from 'lucide-react'

<FeatureGrid.WithIcons
  title="Why Choose Us?"
  subtitle="Features"
  description="Everything you need to build stunning interfaces."
  features={[
    { icon: <Zap />, title: 'Fast', description: 'Optimized performance' },
    { icon: <Shield />, title: 'Secure', description: 'Enterprise-grade' },
    { icon: <Palette />, title: 'Customizable', description: 'Easy theming' },
  ]}
  columns={3}
/>`,
    vueCode: `<script setup lang="ts">
import { FeatureGrid } from '@/components/blocks/marketing'
import { Zap, Shield, Palette } from 'lucide-vue-next'

const features = [
  { icon: Zap, title: 'Fast', description: 'Optimized performance' },
  { icon: Shield, title: 'Secure', description: 'Enterprise-grade' },
]
</script>

<template>
  <FeatureGrid
    variant="withIcons"
    title="Why Choose Us?"
    :features="features"
    :columns="3"
  />
</template>`,
  },
  {
    name: 'WithImages',
    description: 'Feature cards with image headers.',
    preview: (
      <FeatureGridWithImages
        title="Our Capabilities"
        subtitle="What We Do"
        features={imageFeatures}
      />
    ),
    reactCode: `import { FeatureGrid } from '@/components/blocks/marketing'

<FeatureGrid.WithImages
  title="Our Capabilities"
  subtitle="What We Do"
  features={[
    { image: '/feature1.jpg', title: 'Mobile First', description: 'Responsive design' },
    { image: '/feature2.jpg', title: 'Modern Stack', description: 'Latest tech' },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { FeatureGrid } from '@/components/blocks/marketing'

const features = [
  { image: '/feature1.jpg', title: 'Mobile First', description: 'Responsive' },
]
</script>

<template>
  <FeatureGrid variant="withImages" title="Capabilities" :features="features" />
</template>`,
  },
  {
    name: 'Alternating',
    description: 'Features with alternating image/text layout.',
    preview: (
      <FeatureGridAlternating features={alternatingFeatures} />
    ),
    reactCode: `import { FeatureGrid } from '@/components/blocks/marketing'
import { Zap } from 'lucide-react'

<FeatureGrid.Alternating
  features={[
    {
      icon: <Zap />,
      title: 'Lightning Fast',
      description: 'Optimized for speed.',
      image: '/feature.jpg',
    },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { FeatureGrid } from '@/components/blocks/marketing'

const features = [
  { icon: Zap, title: 'Fast', description: 'Speed optimized', image: '/f.jpg' },
]
</script>

<template>
  <FeatureGrid variant="alternating" :features="features" />
</template>`,
  },
  {
    name: 'Bento',
    description: 'Bento grid with varied card sizes.',
    preview: (
      <FeatureBentoGrid
        title="Everything You Need"
        subtitle="Features"
        features={bentoFeatures}
      />
    ),
    reactCode: `import { FeatureGrid } from '@/components/blocks/marketing'

<FeatureGrid.Bento
  title="Everything You Need"
  subtitle="Features"
  features={[
    { icon: <Zap />, title: 'Fast', description: '...', span: 'normal' },
    { icon: <Shield />, title: 'Secure', description: '...', span: 'wide' },
    { icon: <Palette />, title: 'Custom', description: '...', span: 'tall' },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { FeatureGrid } from '@/components/blocks/marketing'

const features = [
  { icon: Zap, title: 'Fast', description: '...', span: 'wide' },
]
</script>

<template>
  <FeatureGrid variant="bento" :features="features" />
</template>`,
  },
]

export function FeatureGridDoc() {
  return (
    <BlockDoc
      name="Feature Grid"
      description="Showcase product features in organized, visually appealing grids with icons, images, or bento layouts."
      category="marketing"
      variants={variants}
    />
  )
}

export default FeatureGridDoc
