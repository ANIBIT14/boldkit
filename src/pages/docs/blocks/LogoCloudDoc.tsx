import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  LogoCloudGrid,
  LogoCloudMarquee,
  LogoCloudCards,
  LogoCloudWithStats,
} from '@/components/blocks/marketing/logo-cloud'

const sampleLogos = [
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/000000' },
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/000000' },
  { name: 'Linear', logo: 'https://cdn.simpleicons.org/linear/5E6AD2' },
  { name: 'Notion', logo: 'https://cdn.simpleicons.org/notion/000000' },
  { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/6772E5' },
]

const variants = [
  {
    name: 'Grid',
    description: 'Simple grid layout for client logos.',
    preview: (
      <LogoCloudGrid
        title="Trusted by Industry Leaders"
        subtitle="Our Partners"
        logos={sampleLogos}
        columns={5}
      />
    ),
    reactCode: `import { LogoCloud } from '@/components/blocks/marketing'

<LogoCloud.Grid
  title="Trusted by Industry Leaders"
  subtitle="Our Partners"
  logos={[
    { name: 'Company', logo: '/logo.png', url: 'https://...' },
  ]}
  columns={5}
/>`,
    vueCode: `<script setup lang="ts">
import { LogoCloud } from '@/components/blocks/marketing'

const logos = [
  { name: 'Company', logo: '/logo.png', url: 'https://...' },
]
</script>

<template>
  <LogoCloud variant="grid" title="Trusted by Leaders" :logos="logos" :columns="5" />
</template>`,
  },
  {
    name: 'Marquee',
    description: 'Animated scrolling logo marquee.',
    preview: (
      <LogoCloudMarquee
        title="Trusted by leading companies"
        logos={sampleLogos}
        speed="normal"
      />
    ),
    reactCode: `import { LogoCloud } from '@/components/blocks/marketing'

<LogoCloud.Marquee
  title="Trusted by leading companies"
  logos={logos}
  speed="normal" // 'slow' | 'normal' | 'fast'
  direction="left" // or 'right'
/>`,
    vueCode: `<template>
  <LogoCloud variant="marquee" :logos="logos" speed="normal" direction="left" />
</template>`,
  },
  {
    name: 'Cards',
    description: 'Logos displayed in bordered card containers.',
    preview: (
      <LogoCloudCards
        title="Our Partners"
        subtitle="Working With"
        logos={sampleLogos.slice(0, 4)}
      />
    ),
    reactCode: `import { LogoCloud } from '@/components/blocks/marketing'

<LogoCloud.Cards
  title="Our Partners"
  subtitle="Working With"
  logos={logos}
/>`,
    vueCode: `<template>
  <LogoCloud variant="cards" title="Our Partners" :logos="logos" />
</template>`,
  },
  {
    name: 'WithStats',
    description: 'Logo cloud combined with statistics.',
    preview: (
      <LogoCloudWithStats
        title="Join thousands of companies"
        logos={sampleLogos}
        stats={[
          { value: '500+', label: 'Companies' },
          { value: '10M+', label: 'Users' },
          { value: '99%', label: 'Uptime' },
          { value: '24/7', label: 'Support' },
        ]}
      />
    ),
    reactCode: `import { LogoCloud } from '@/components/blocks/marketing'

<LogoCloud.WithStats
  title="Join thousands of companies"
  logos={logos}
  stats={[
    { value: '500+', label: 'Companies' },
    { value: '10M+', label: 'Users' },
  ]}
/>`,
    vueCode: `<template>
  <LogoCloud variant="withStats" :logos="logos" :stats="stats" />
</template>`,
  },
]

export function LogoCloudDoc() {
  return (
    <BlockDoc
      name="Logo Cloud"
      description="Display client or partner logos with various layouts including grids, animated marquees, bordered cards, and combined with statistics."
      category="marketing"
      variants={variants}
    />
  )
}

export default LogoCloudDoc
