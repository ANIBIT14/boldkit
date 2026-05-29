import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Layout } from '@/components/layout'
import {
  ArrowRight,
  Layers,
  Layout as LayoutIcon,
  Users,
  Settings,
  Rocket,
  Star,
  MessageSquare,
  Building2,
  Mail,
  HelpCircle,
  LogIn,
  UserCog,
  Sparkles,
  FileX,
  CreditCard,
  ChevronRight,
} from 'lucide-react'
import { SEO, pageSEO } from '@/components/SEO'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'
import type { CSSProperties } from 'react'

const DISPLAY: CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" }
const MONO: CSSProperties = { fontFamily: "'DM Mono', monospace" }

// ─── Richer Block Preview Sketches ──────────────────────────────────────────

function BlockPreview({ type, icon: Icon }: { type: string; icon: React.ElementType }) {
  const previews: Record<string, React.ReactNode> = {
    hero: (
      <div className="flex flex-col items-center justify-center h-full p-5 gap-3">
        <div className="w-14 h-1.5 bg-primary/60" />
        <div className="w-40 h-5 bg-foreground" />
        <div className="w-28 h-2.5 bg-muted-foreground/30" />
        <div className="w-32 h-1.5 bg-muted-foreground/20" />
        <div className="flex gap-2 mt-1">
          <div className="w-20 h-7 bg-primary border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]" />
          <div className="w-20 h-7 bg-card border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]" />
        </div>
      </div>
    ),
    features: (
      <div className="p-4 h-full flex flex-col gap-2 justify-center">
        <div className="w-24 h-3.5 bg-foreground mx-auto mb-1" />
        <div className="grid grid-cols-3 gap-2">
          {['bg-primary/20', 'bg-secondary/20', 'bg-accent/20'].map((bg, i) => (
            <div key={i} className="flex flex-col items-center p-2 border-2 border-foreground gap-1.5">
              <div className={`w-7 h-7 ${bg} border-2 border-foreground`} />
              <div className="w-full h-2 bg-foreground" />
              <div className="w-3/4 h-1.5 bg-muted-foreground/30" />
              <div className="w-1/2 h-1.5 bg-muted-foreground/20" />
            </div>
          ))}
        </div>
      </div>
    ),
    testimonials: (
      <div className="p-4 h-full flex flex-col gap-3 justify-center">
        <div className="w-6 h-6 bg-primary/30 border-2 border-foreground mx-auto" />
        <div className="border-2 border-foreground p-3 bg-card space-y-1.5">
          <div className="w-full h-1.5 bg-foreground/60" />
          <div className="w-5/6 h-1.5 bg-foreground/60" />
          <div className="w-3/4 h-1.5 bg-foreground/60" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted border-2 border-foreground flex-shrink-0" />
          <div className="space-y-1">
            <div className="w-16 h-2 bg-foreground" />
            <div className="w-12 h-1.5 bg-muted-foreground/30" />
          </div>
          <div className="ml-auto flex gap-0.5">
            {[1,2,3].map(i => <div key={i} className="w-2 h-2 bg-primary/40 border border-foreground" />)}
          </div>
        </div>
      </div>
    ),
    logos: (
      <div className="flex flex-col items-center justify-center h-full p-4 gap-3">
        <div className="w-20 h-2 bg-muted-foreground/30" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-11 h-11 border-2 border-foreground bg-card flex items-center justify-center shadow-[2px_2px_0px_hsl(var(--shadow-color))]">
              <Building2 className="h-5 w-5 text-muted-foreground/60" />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          {[1,2,3,4,4,3].map((w, i) => (
            <div key={i} className="h-1 bg-muted-foreground/20" style={{ width: `${w * 10}px` }} />
          ))}
        </div>
      </div>
    ),
    cta: (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-primary/8 gap-3">
        <div className="w-8 h-8 bg-primary border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))] flex items-center justify-center">
          <Rocket className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="text-center space-y-1.5">
          <div className="w-32 h-4 bg-foreground mx-auto" />
          <div className="w-24 h-2 bg-muted-foreground/30 mx-auto" />
        </div>
        <div className="w-24 h-8 bg-primary border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]" />
      </div>
    ),
    stats: (
      <div className="h-full flex flex-col justify-center">
        <div className="grid grid-cols-4 border-2 border-foreground overflow-hidden">
          {[
            { v: '10K', bg: 'bg-primary/20' },
            { v: '99%', bg: 'bg-secondary/20' },
            { v: '50+', bg: 'bg-accent/20' },
            { v: '24h', bg: 'bg-muted' },
          ].map(({ v, bg }, i) => (
            <div key={i} className={`${bg} p-3 flex flex-col gap-1 ${i < 3 ? 'border-r-2 border-foreground' : ''}`}>
              <div className="text-sm font-black" style={DISPLAY}>{v}</div>
              <div className="w-8 h-1 bg-muted-foreground/30" />
            </div>
          ))}
        </div>
      </div>
    ),
    team: (
      <div className="p-4 h-full flex flex-col gap-3 justify-center">
        <div className="w-20 h-3.5 bg-foreground mx-auto" />
        <div className="flex justify-center gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 bg-muted border-2 border-foreground" />
              <div className="w-10 h-1.5 bg-foreground" />
              <div className="w-8 h-1 bg-muted-foreground/30" />
            </div>
          ))}
        </div>
      </div>
    ),
    faq: (
      <div className="p-4 h-full flex flex-col gap-2 justify-center">
        <div className="w-16 h-3.5 bg-foreground mx-auto mb-1" />
        {[1, 2, 3].map(i => (
          <div key={i} className="border-2 border-foreground bg-card p-2 flex items-center justify-between">
            <div className="w-24 h-2 bg-foreground/70" />
            <div className={`w-4 h-4 border-2 border-foreground ${i === 1 ? 'bg-primary/20' : ''}`} />
          </div>
        ))}
      </div>
    ),
    footer: (
      <div className="h-full flex flex-col justify-end p-3 bg-foreground/5">
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[1, 2, 3].map(col => (
            <div key={col} className="space-y-1.5">
              <div className="w-full h-2 bg-foreground" />
              {[1, 2, 3].map(r => (
                <div key={r} className="w-3/4 h-1.5 bg-muted-foreground/30" />
              ))}
            </div>
          ))}
        </div>
        <div className="w-full h-px bg-foreground mb-2" />
        <div className="flex justify-between items-center">
          <div className="w-16 h-2 bg-foreground" />
          <div className="flex gap-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-5 h-5 bg-muted border-2 border-foreground" />
            ))}
          </div>
        </div>
      </div>
    ),
    contact: (
      <div className="p-4 h-full flex flex-col gap-2.5 justify-center">
        <div className="flex items-center gap-2 mb-1">
          <Mail className="h-5 w-5 text-primary" />
          <div className="w-20 h-3.5 bg-foreground" />
        </div>
        <div className="space-y-2">
          <div className="h-7 bg-card border-2 border-foreground" />
          <div className="h-7 bg-card border-2 border-foreground" />
          <div className="h-12 bg-card border-2 border-foreground" />
          <div className="h-7 bg-primary border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]" />
        </div>
      </div>
    ),
    auth: (
      <div className="p-4 h-full flex flex-col items-center gap-3 justify-center bg-card/50">
        <div className="w-10 h-10 bg-primary/20 border-3 border-foreground flex items-center justify-center shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
          <LogIn className="h-5 w-5 text-primary" />
        </div>
        <div className="w-full max-w-[130px] space-y-2">
          <div className="w-24 h-3 bg-foreground mx-auto" />
          <div className="h-7 bg-card border-2 border-foreground" />
          <div className="h-7 bg-card border-2 border-foreground" />
          <div className="h-7 bg-primary border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]" />
          <div className="flex gap-1.5 justify-center">
            {[1,2].map(i => <div key={i} className="flex-1 h-5 bg-muted border border-foreground" />)}
          </div>
        </div>
      </div>
    ),
    settings: (
      <div className="flex h-full p-3 gap-2">
        <div className="w-1/4 space-y-1.5 pt-1">
          {['bg-primary/20', 'bg-muted', 'bg-muted', 'bg-muted'].map((bg, i) => (
            <div key={i} className={`h-5 ${bg} border border-foreground px-1 flex items-center`}>
              <div className="w-2 h-2 bg-foreground/40 mr-1" />
              <div className="flex-1 h-1 bg-foreground/40" />
            </div>
          ))}
        </div>
        <div className="flex-1 border-2 border-foreground p-2 space-y-2">
          <div className="w-16 h-2.5 bg-foreground" />
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-muted border-2 border-foreground" />
            <div className="space-y-1">
              <div className="w-14 h-1.5 bg-foreground" />
              <div className="w-10 h-1 bg-muted-foreground/30" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-5 bg-muted border border-foreground" />
            <div className="h-5 bg-muted border border-foreground" />
          </div>
        </div>
      </div>
    ),
    onboarding: (
      <div className="p-4 h-full flex flex-col items-center gap-3 justify-center">
        <div className="flex gap-1.5 mb-1">
          {[1,2,3,4].map(i => (
            <div key={i} className={`h-1.5 ${i === 1 ? 'w-8 bg-primary' : 'w-4 bg-muted-foreground/30'} border border-foreground`} />
          ))}
        </div>
        <div className="w-10 h-10 bg-secondary/20 border-3 border-foreground flex items-center justify-center shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
          <Sparkles className="h-5 w-5 text-secondary" />
        </div>
        <div className="text-center space-y-1.5">
          <div className="w-28 h-3.5 bg-foreground mx-auto" />
          <div className="w-20 h-2 bg-muted-foreground/30 mx-auto" />
        </div>
        <div className="flex gap-2">
          <div className="w-14 h-7 bg-card border-2 border-foreground" />
          <div className="w-20 h-7 bg-primary border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]" />
        </div>
      </div>
    ),
    error: (
      <div className="p-4 h-full flex flex-col items-center gap-3 justify-center">
        <div className="text-5xl font-black text-destructive/80 leading-none" style={DISPLAY}>404</div>
        <div className="w-8 h-0.5 bg-foreground/30" />
        <div className="text-center space-y-1.5">
          <div className="w-24 h-2.5 bg-foreground mx-auto" />
          <div className="w-20 h-1.5 bg-muted-foreground/30 mx-auto" />
        </div>
        <div className="w-20 h-7 bg-primary border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]" />
      </div>
    ),
    invoice: (
      <div className="p-3 h-full flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="w-16 h-3.5 bg-foreground" />
            <div className="w-10 h-1.5 bg-muted-foreground/30" />
          </div>
          <div className="w-8 h-8 bg-primary/20 border-2 border-foreground flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="border-2 border-foreground p-2 flex-1 space-y-1.5">
          {[1,2,3].map(i => (
            <div key={i} className="flex justify-between items-center">
              <div className="w-20 h-1.5 bg-muted-foreground/40" />
              <div className="w-10 h-1.5 bg-foreground" />
            </div>
          ))}
          <div className="h-px bg-foreground/30 my-1" />
          <div className="flex justify-between items-center">
            <div className="w-12 h-2 bg-foreground font-bold" />
            <div className="w-14 h-2 bg-primary" />
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="flex-1 h-5 bg-muted border border-foreground" />
          <div className="flex-1 h-5 bg-primary/80 border border-foreground" />
        </div>
      </div>
    ),
  }

  return (
    <div className="h-[200px] sm:h-[220px] border-b-3 border-foreground bg-muted/30 overflow-hidden relative">
      {previews[type] ?? (
        <div className="flex items-center justify-center h-full">
          <Icon className="h-10 w-10 text-muted-foreground/40" />
        </div>
      )}
    </div>
  )
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlockInfo {
  name: string
  description: string
  variants: string[]
  category: 'marketing' | 'application'
  icon: React.ElementType
  code: Record<string, string>
  docPath: string
  previewType: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const marketingBlocks: BlockInfo[] = [
  {
    name: 'Hero Section',
    description: 'Eye-catching hero sections with various layouts for landing pages.',
    variants: ['Centered', 'Split', 'WithStats', 'Minimal', 'WithVideo'],
    category: 'marketing',
    icon: LayoutIcon,
    docPath: '/blocks/hero-section',
    previewType: 'hero',
    code: {
      react: `import { HeroSection } from '@/components/blocks/marketing'

<HeroSection.Centered
  badge="New Release"
  title="Build faster with"
  titleHighlight="BoldKit"
  description="The neubrutalism component library"
  primaryAction={{ label: 'Get Started', href: '/docs' }}
/>`,
      vue: `<template>
  <HeroSection variant="centered" badge="New Release" title="Build faster with" />
</template>`,
    },
  },
  {
    name: 'Feature Grid',
    description: 'Showcase product features in organized, visually appealing grids.',
    variants: ['WithIcons', 'WithImages', 'Alternating', 'Bento'],
    category: 'marketing',
    icon: Layers,
    docPath: '/blocks/feature-grid',
    previewType: 'features',
    code: {
      react: `import { FeatureGrid } from '@/components/blocks/marketing'

<FeatureGrid.WithIcons
  title="Features"
  features={[
    { icon: <Zap />, title: 'Fast', description: 'Lightning quick' },
  ]}
/>`,
      vue: `<template>
  <FeatureGrid variant="withIcons" :features="features" />
</template>`,
    },
  },
  {
    name: 'Testimonials',
    description: 'Display customer reviews and testimonials in various layouts.',
    variants: ['Grid', 'Single', 'Masonry', 'WithAvatars'],
    category: 'marketing',
    icon: Star,
    docPath: '/blocks/testimonials',
    previewType: 'testimonials',
    code: {
      react: `import { Testimonials } from '@/components/blocks/marketing'

<Testimonials.Grid
  testimonials={[
    { quote: '...', author: 'Jane Doe', role: 'CEO' },
  ]}
/>`,
      vue: `<template>
  <Testimonials variant="grid" :testimonials="testimonials" />
</template>`,
    },
  },
  {
    name: 'Logo Cloud',
    description: 'Showcase partner and client logos with various display styles.',
    variants: ['Grid', 'Marquee', 'Cards', 'WithStats'],
    category: 'marketing',
    icon: Building2,
    docPath: '/blocks/logo-cloud',
    previewType: 'logos',
    code: {
      react: `import { LogoCloud } from '@/components/blocks/marketing'

<LogoCloud.Marquee
  title="Trusted by"
  logos={[{ name: 'Acme', logo: <AcmeLogo /> }]}
/>`,
      vue: `<template>
  <LogoCloud variant="marquee" :logos="logos" />
</template>`,
    },
  },
  {
    name: 'CTA Section',
    description: 'Call-to-action sections to drive conversions and sign-ups.',
    variants: ['Simple', 'WithBackground', 'Newsletter', 'Split', 'Banner'],
    category: 'marketing',
    icon: Rocket,
    docPath: '/blocks/cta-section',
    previewType: 'cta',
    code: {
      react: `import { CTASection } from '@/components/blocks/marketing'

<CTASection.Simple
  title="Ready to get started?"
  primaryAction={{ label: 'Sign Up Free' }}
/>`,
      vue: `<template>
  <CTASection variant="simple" title="Ready?" />
</template>`,
    },
  },
  {
    name: 'Stats Section',
    description: 'Display key metrics and statistics with impact.',
    variants: ['Grid', 'Cards', 'Split', 'Inline', 'WithIcons'],
    category: 'marketing',
    icon: Layers,
    docPath: '/blocks/stats-section',
    previewType: 'stats',
    code: {
      react: `import { StatsSection } from '@/components/blocks/marketing'

<StatsSection.Cards
  stats={[
    { value: '10K+', label: 'Users' },
  ]}
/>`,
      vue: `<template>
  <StatsSection variant="cards" :stats="stats" />
</template>`,
    },
  },
  {
    name: 'Team Section',
    description: 'Showcase your team members with profiles and social links.',
    variants: ['Grid', 'List', 'LargePhotos', 'Compact'],
    category: 'marketing',
    icon: Users,
    docPath: '/blocks/team-section',
    previewType: 'team',
    code: {
      react: `import { TeamSection } from '@/components/blocks/marketing'

<TeamSection.Grid
  members={[{ name: 'Jane', role: 'CEO' }]}
/>`,
      vue: `<template>
  <TeamSection variant="grid" :members="members" />
</template>`,
    },
  },
  {
    name: 'FAQ Section',
    description: 'Frequently asked questions with accordion layouts.',
    variants: ['Accordion', 'TwoColumns', 'WithCategories', 'WithContact', 'SimpleList'],
    category: 'marketing',
    icon: HelpCircle,
    docPath: '/blocks/faq-section',
    previewType: 'faq',
    code: {
      react: `import { FAQSection } from '@/components/blocks/marketing'

<FAQSection.Accordion
  items={[{ question: 'How?', answer: '...' }]}
/>`,
      vue: `<template>
  <FAQSection variant="accordion" :items="items" />
</template>`,
    },
  },
  {
    name: 'Footer Section',
    description: 'Page footers with links, newsletter, and social icons.',
    variants: ['MultiColumn', 'WithNewsletter', 'Simple', 'Minimal', 'WithCTA'],
    category: 'marketing',
    icon: LayoutIcon,
    docPath: '/blocks/footer-section',
    previewType: 'footer',
    code: {
      react: `import { FooterSection } from '@/components/blocks/marketing'

<FooterSection.MultiColumn
  logo="BoldKit"
  columns={[{ title: 'Product', links: [...] }]}
/>`,
      vue: `<template>
  <FooterSection variant="multiColumn" :columns="columns" />
</template>`,
    },
  },
  {
    name: 'Contact Section',
    description: 'Contact forms with various layouts and contact info.',
    variants: ['Split', 'Centered', 'WithCards', 'WithMap'],
    category: 'marketing',
    icon: Mail,
    docPath: '/blocks/contact-section',
    previewType: 'contact',
    code: {
      react: `import { ContactSection } from '@/components/blocks/marketing'

<ContactSection.Split
  title="Get in touch"
  onSubmit={(data) => console.log(data)}
/>`,
      vue: `<template>
  <ContactSection variant="split" @submit="handleSubmit" />
</template>`,
    },
  },
]

const applicationBlocks: BlockInfo[] = [
  {
    name: 'Auth Forms',
    description: 'Authentication forms including login, signup, forgot password, and OTP.',
    variants: ['Login', 'SignUp', 'ForgotPassword', 'OTPVerification', 'SplitLayout'],
    category: 'application',
    icon: LogIn,
    docPath: '/blocks/auth-forms',
    previewType: 'auth',
    code: {
      react: `import { AuthForms } from '@/components/blocks/application'

<AuthForms.Login
  onSubmit={(data) => console.log(data)}
  socialProviders={['google', 'github']}
/>`,
      vue: `<template>
  <AuthForms variant="login" :social-providers="['google']" />
</template>`,
    },
  },
  {
    name: 'Settings Page',
    description: 'User settings sections for profile, notifications, security, and appearance.',
    variants: ['Profile', 'Notifications', 'Security', 'Appearance', 'DangerZone', 'Page'],
    category: 'application',
    icon: UserCog,
    docPath: '/blocks/settings-page',
    previewType: 'settings',
    code: {
      react: `import { SettingsBlocks } from '@/components/blocks/application'

<SettingsBlocks.Page defaultTab="profile" />`,
      vue: `<template>
  <SettingsBlocks default-tab="profile" />
</template>`,
    },
  },
  {
    name: 'Onboarding Flow',
    description: 'User onboarding components: wizards, profile setup, and welcome screens.',
    variants: ['Wizard', 'Welcome', 'ProfileSetup', 'WorkspaceSetup', 'GoalSelection', 'Completion'],
    category: 'application',
    icon: Sparkles,
    docPath: '/blocks/onboarding-flow',
    previewType: 'onboarding',
    code: {
      react: `import { OnboardingFlow } from '@/components/blocks/application'

<OnboardingFlow.Wizard
  steps={[{ id: 'profile', content: <Form /> }]}
  onComplete={() => console.log('Done!')}
/>`,
      vue: `<template>
  <OnboardingFlow :steps="steps" @complete="handleComplete" />
</template>`,
    },
  },
  {
    name: 'Error Pages',
    description: 'Error and status pages for 404, 500, maintenance, offline, and more.',
    variants: ['NotFound', 'ServerError', 'Maintenance', 'Offline', 'Forbidden', 'ComingSoon', 'Generic'],
    category: 'application',
    icon: FileX,
    docPath: '/blocks/error-pages',
    previewType: 'error',
    code: {
      react: `import { ErrorPages } from '@/components/blocks/application'

<ErrorPages.NotFound
  homeHref="/"
  showSearch
/>`,
      vue: `<template>
  <ErrorPages variant="notFound" home-href="/" />
</template>`,
    },
  },
  {
    name: 'Invoice',
    description: 'Invoice and receipt templates for billing and payment flows.',
    variants: ['Full', 'Receipt', 'Summary', 'List'],
    category: 'application',
    icon: CreditCard,
    docPath: '/blocks/invoice',
    previewType: 'invoice',
    code: {
      react: `import { InvoiceBlocks } from '@/components/blocks/application'

<InvoiceBlocks.Full
  data={invoiceData}
  onDownload={() => downloadPDF()}
/>`,
      vue: `<template>
  <InvoiceBlocks :data="invoiceData" @download="handleDownload" />
</template>`,
    },
  },
]

// ─── Block Card ───────────────────────────────────────────────────────────────

const accentColors = [
  'bg-primary/15 border-primary/40',
  'bg-secondary/15 border-secondary/40',
  'bg-accent/15 border-accent/40',
  'bg-warning/15 border-warning/40',
  'bg-info/15 border-info/40',
]

function BlockCard({ block, framework, index }: { block: BlockInfo; framework: string; index: number }) {
  const [showCode, setShowCode] = useState(false)
  const Icon = block.icon
  const accentClass = accentColors[index % accentColors.length]

  return (
    <article className="group border-3 border-foreground bg-card shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_hsl(var(--shadow-color))] transition-all duration-150 flex flex-col overflow-hidden">
      {/* Preview */}
      <BlockPreview type={block.previewType} icon={Icon} />

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center border-2 border-foreground ${accentClass}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-black uppercase text-base leading-tight tracking-wide" style={DISPLAY}>
              {block.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
              {block.description}
            </p>
          </div>
        </div>

        {/* Variants */}
        <div className="flex flex-wrap gap-1">
          {block.variants.slice(0, 5).map((v) => (
            <span
              key={v}
              className="text-[10px] font-bold uppercase tracking-wide border border-foreground/50 bg-muted/60 px-1.5 py-0.5"
            >
              {v}
            </span>
          ))}
          {block.variants.length > 5 && (
            <span className="text-[10px] font-bold border border-dashed border-foreground/40 px-1.5 py-0.5 text-muted-foreground">
              +{block.variants.length - 5}
            </span>
          )}
        </div>

        {/* Install + Code */}
        <div className="border-2 border-foreground bg-foreground/4 mt-auto">
          {/* Install bar */}
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-foreground/20">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" style={MONO}>
              install
            </span>
            <CopyButton text={installCmd} mini />
          </div>
          <div className="px-2.5 py-1.5 overflow-x-auto">
            <code className="text-[10px] text-foreground/70 whitespace-nowrap" style={MONO}>
              npx shadcn add &quot;boldkit.dev/r/{block.name.toLowerCase().replace(/\s+/g, '-')}&quot;
            </code>
          </div>

          {/* Code snippet toggle */}
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 border-t border-foreground/20 hover:bg-foreground/5 transition-colors touch-manipulation"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest" style={MONO}>
              {framework === 'react' ? 'React' : 'Vue'} usage
            </span>
            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${showCode ? 'rotate-90' : ''}`} />
          </button>
          {showCode && (
            <div className="border-t border-foreground/20">
              <pre className="p-2.5 text-[10px] overflow-x-auto max-h-28 text-foreground/80" style={MONO}>
                <code>{block.code[framework]}</code>
              </pre>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          to={block.docPath}
          className="flex items-center justify-between border-2 border-foreground bg-foreground text-background px-3 py-2 font-bold uppercase text-xs tracking-wide hover:bg-primary hover:border-primary transition-colors touch-manipulation mt-1"
        >
          <span>View Docs</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  num,
  label,
  desc,
  count,
}: {
  num: string
  label: string
  desc: string
  count: number
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b-3 border-foreground">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1" style={MONO}>
          {num}
        </div>
        <h2 className="text-4xl sm:text-5xl font-black uppercase leading-none" style={DISPLAY}>
          {label}
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5">{desc}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-3xl font-black leading-none" style={DISPLAY}>{count}</span>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">blocks</span>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function Blocks() {
  const { framework } = useFramework()
  const [activeTab, setActiveTab] = useState<'marketing' | 'application'>('marketing')

  const totalVariants = [...marketingBlocks, ...applicationBlocks].reduce(
    (acc, b) => acc + b.variants.length,
    0
  )

  return (
    <>
      <SEO {...pageSEO.blocks} />
      <Layout>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <div className="relative border-b-3 border-foreground bg-muted overflow-hidden">
          <div className="grid-pattern absolute inset-0 opacity-15 pointer-events-none" />

          {/* Stats bar — top strip */}
          <div className="border-b-3 border-foreground flex overflow-x-auto">
            {[
              { value: String(marketingBlocks.length + applicationBlocks.length), label: 'Blocks', bg: 'bg-primary' },
              { value: String(totalVariants) + '+', label: 'Variants', bg: 'bg-secondary' },
              { value: '2', label: 'Frameworks', bg: 'bg-accent' },
              { value: 'Free', label: 'Forever', bg: 'bg-success' },
            ].map((s) => (
              <div
                key={s.label}
                className={`${s.bg} flex-shrink-0 flex items-center gap-2 px-4 py-2.5 border-r-3 border-foreground last:border-r-0`}
              >
                <span className="text-xl font-black leading-none" style={DISPLAY}>{s.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">{s.label}</span>
              </div>
            ))}
            <div className="flex-1" />
          </div>

          {/* Main heading */}
          <div className="relative container mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge variant="secondary" className="text-xs">Pre-built</Badge>
              <Badge
                variant={framework === 'react' ? 'info' : 'success'}
                className="gap-1.5 text-xs"
              >
                {framework === 'react'
                  ? <ReactIcon className="h-3.5 w-3.5" />
                  : <VueIcon className="h-3.5 w-3.5" />}
                {framework === 'react' ? 'React' : 'Vue 3'}
              </Badge>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h1
                  className="text-6xl sm:text-7xl md:text-8xl font-black uppercase leading-none tracking-tight"
                  style={DISPLAY}
                >
                  Section
                  <br />
                  <span className="text-primary">Blocks</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Drop-in section components for marketing pages and apps.
                  Mix and match to build complete pages in minutes.
                </p>
              </div>

              {/* Category tabs + framework toggle — right side on desktop */}
              <div className="flex flex-col items-start lg:items-end gap-3 self-start lg:self-end">
              <FrameworkToggle size="sm" />
              <div className="flex gap-0 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
                <button
                  onClick={() => setActiveTab('marketing')}
                  className={`flex items-center gap-2 px-4 py-2.5 font-bold uppercase text-sm tracking-wide transition-colors touch-manipulation ${
                    activeTab === 'marketing'
                      ? 'bg-foreground text-background'
                      : 'bg-card hover:bg-muted'
                  }`}
                >
                  <LayoutIcon className="h-4 w-4" />
                  <span>Marketing</span>
                  <span className={`text-xs font-black px-1.5 py-0.5 border ${activeTab === 'marketing' ? 'border-background/30 bg-background/20' : 'border-foreground/30 bg-muted'}`}>
                    {marketingBlocks.length}
                  </span>
                </button>
                <div className="w-px bg-foreground" />
                <button
                  onClick={() => setActiveTab('application')}
                  className={`flex items-center gap-2 px-4 py-2.5 font-bold uppercase text-sm tracking-wide transition-colors touch-manipulation ${
                    activeTab === 'application'
                      ? 'bg-foreground text-background'
                      : 'bg-card hover:bg-muted'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Application</span>
                  <span className={`text-xs font-black px-1.5 py-0.5 border ${activeTab === 'application' ? 'border-background/30 bg-background/20' : 'border-foreground/30 bg-muted'}`}>
                    {applicationBlocks.length}
                  </span>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Blocks Grid ────────────────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {activeTab === 'marketing' && (
            <section>
              <SectionHeader
                num="01"
                label="Marketing"
                desc="Landing page sections, feature showcases, testimonials, and more."
                count={marketingBlocks.length}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {marketingBlocks.map((block, i) => (
                  <BlockCard key={block.name} block={block} framework={framework} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeTab === 'application' && (
            <section>
              <SectionHeader
                num="02"
                label="Application"
                desc="Auth forms, settings pages, onboarding flows, error pages, and invoices."
                count={applicationBlocks.length}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {applicationBlocks.map((block, i) => (
                  <BlockCard key={block.name} block={block} framework={framework} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* ── CTA ──────────────────────────────────────────────── */}
          <div className="mt-14 sm:mt-16 grid sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Request block */}
            <div className="border-3 border-foreground bg-accent bk-shadow p-6 sm:p-8 flex flex-col gap-4">
              <div className="w-10 h-10 border-3 border-foreground bg-foreground flex items-center justify-center shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                <MessageSquare className="h-5 w-5 text-background" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase leading-tight" style={DISPLAY}>
                  Need a custom block?
                </h3>
                <p className="text-sm text-foreground/70 mt-1.5 leading-relaxed">
                  Can't find what you need? Request a new block or contribute your own to the library.
                </p>
              </div>
              <Button variant="outline" className="self-start touch-manipulation" asChild>
                <a
                  href="https://github.com/ANIBIT14/boldkit/issues/new?title=Block%20Request&body=I%20would%20like%20a%20block%20for..."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request a Block
                </a>
              </Button>
            </div>

            {/* Explore more */}
            <div className="border-3 border-foreground bg-muted p-6 sm:p-8 flex flex-col gap-4">
              <div className="w-10 h-10 border-3 border-foreground bg-primary flex items-center justify-center shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                <Rocket className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase leading-tight" style={DISPLAY}>
                  Explore more
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  50+ UI components, 10 chart types, 45 shapes, and full-page templates.
                </p>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="touch-manipulation" asChild>
                  <Link to="/components">UI Components</Link>
                </Button>
                <Button variant="outline" size="sm" className="touch-manipulation" asChild>
                  <Link to="/templates">Templates</Link>
                </Button>
                <Button variant="outline" size="sm" className="touch-manipulation" asChild>
                  <Link to="/charts">Charts</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Blocks
