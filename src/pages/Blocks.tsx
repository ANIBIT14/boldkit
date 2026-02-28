import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Layout } from '@/components/layout'
import { ExternalLink, Copy, Check, Layers, Layout as LayoutIcon, Users, Settings, Rocket, FileText, AlertTriangle, Receipt } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" onClick={copy} className="gap-2">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  )
}

interface BlockInfo {
  name: string
  description: string
  variants: string[]
  category: 'marketing' | 'application'
  icon: React.ReactNode
  code: Record<string, string>
  docPath: string
}

const marketingBlocks: BlockInfo[] = [
  {
    name: 'Hero Section',
    description: 'Eye-catching hero sections with various layouts for landing pages.',
    variants: ['Centered', 'Split', 'WithStats', 'Minimal', 'WithVideo'],
    category: 'marketing',
    icon: <LayoutIcon className="h-5 w-5" />,
    docPath: '/docs/blocks/hero-section',
    code: {
      react: `import { HeroSection } from '@/components/blocks/marketing'

<HeroSection.Centered
  badge="New Release"
  title="Build faster with"
  titleHighlight="BoldKit"
  description="The neubrutalism component library"
  primaryAction={{ label: 'Get Started', href: '/docs' }}
  secondaryAction={{ label: 'Learn More', href: '/about' }}
/>`,
      vue: `<script setup lang="ts">
import { HeroSection } from '@/components/blocks/marketing'
</script>

<template>
  <HeroSection.Centered
    badge="New Release"
    title="Build faster with"
    title-highlight="BoldKit"
    description="The neubrutalism component library"
    :primary-action="{ label: 'Get Started', href: '/docs' }"
    :secondary-action="{ label: 'Learn More', href: '/about' }"
  />
</template>`
    }
  },
  {
    name: 'Feature Grid',
    description: 'Showcase product features in organized, visually appealing grids.',
    variants: ['WithIcons', 'WithImages', 'Alternating', 'Bento'],
    category: 'marketing',
    icon: <Layers className="h-5 w-5" />,
    docPath: '/docs/blocks/feature-grid',
    code: {
      react: `import { FeatureGrid } from '@/components/blocks/marketing'

<FeatureGrid.WithIcons
  title="Features"
  subtitle="Why Choose Us"
  features={[
    { icon: <Zap />, title: 'Fast', description: 'Lightning quick' },
    { icon: <Shield />, title: 'Secure', description: 'Enterprise-grade' },
  ]}
/>`,
      vue: `<script setup lang="ts">
import { FeatureGrid } from '@/components/blocks/marketing'
</script>

<template>
  <FeatureGrid.WithIcons
    title="Features"
    subtitle="Why Choose Us"
    :features="features"
  />
</template>`
    }
  },
  {
    name: 'Testimonials',
    description: 'Display customer reviews and testimonials in various layouts.',
    variants: ['Grid', 'Single', 'Masonry', 'WithAvatars'],
    category: 'marketing',
    icon: <Users className="h-5 w-5" />,
    docPath: '/docs/blocks/testimonials',
    code: {
      react: `import { Testimonials } from '@/components/blocks/marketing'

<Testimonials.Grid
  title="What our customers say"
  testimonials={[
    { quote: '...', author: 'Jane Doe', role: 'CEO', avatar: '/...' },
  ]}
/>`,
      vue: `<script setup lang="ts">
import { Testimonials } from '@/components/blocks/marketing'
</script>

<template>
  <Testimonials.Grid
    title="What our customers say"
    :testimonials="testimonials"
  />
</template>`
    }
  },
  {
    name: 'Logo Cloud',
    description: 'Showcase partner and client logos with various display styles.',
    variants: ['Grid', 'Marquee', 'Cards', 'WithStats'],
    category: 'marketing',
    icon: <Layers className="h-5 w-5" />,
    docPath: '/docs/blocks/logo-cloud',
    code: {
      react: `import { LogoCloud } from '@/components/blocks/marketing'

<LogoCloud.Marquee
  title="Trusted by"
  logos={[
    { name: 'Acme', logo: <AcmeLogo /> },
  ]}
/>`,
      vue: `<script setup lang="ts">
import { LogoCloud } from '@/components/blocks/marketing'
</script>

<template>
  <LogoCloud.Marquee title="Trusted by" :logos="logos" />
</template>`
    }
  },
  {
    name: 'CTA Section',
    description: 'Call-to-action sections to drive conversions.',
    variants: ['Simple', 'WithBackground', 'Newsletter', 'Split', 'Banner'],
    category: 'marketing',
    icon: <Rocket className="h-5 w-5" />,
    docPath: '/docs/blocks/cta-section',
    code: {
      react: `import { CTASection } from '@/components/blocks/marketing'

<CTASection.Simple
  title="Ready to get started?"
  description="Join thousands of users today."
  primaryAction={{ label: 'Sign Up Free' }}
/>`,
      vue: `<script setup lang="ts">
import { CTASection } from '@/components/blocks/marketing'
</script>

<template>
  <CTASection.Simple
    title="Ready to get started?"
    description="Join thousands of users today."
    :primary-action="{ label: 'Sign Up Free' }"
  />
</template>`
    }
  },
  {
    name: 'Stats Section',
    description: 'Display key metrics and statistics with impact.',
    variants: ['Grid', 'Cards', 'Split', 'Inline', 'WithIcons'],
    category: 'marketing',
    icon: <Layers className="h-5 w-5" />,
    docPath: '/docs/blocks/stats-section',
    code: {
      react: `import { StatsSection } from '@/components/blocks/marketing'

<StatsSection.Cards
  stats={[
    { value: '10K+', label: 'Users', trend: 'up' },
    { value: '99%', label: 'Uptime' },
  ]}
/>`,
      vue: `<script setup lang="ts">
import { StatsSection } from '@/components/blocks/marketing'
</script>

<template>
  <StatsSection.Cards :stats="stats" />
</template>`
    }
  },
  {
    name: 'Team Section',
    description: 'Showcase your team members with profiles.',
    variants: ['Grid', 'List', 'LargePhotos', 'Compact'],
    category: 'marketing',
    icon: <Users className="h-5 w-5" />,
    docPath: '/docs/blocks/team-section',
    code: {
      react: `import { TeamSection } from '@/components/blocks/marketing'

<TeamSection.Grid
  title="Meet the team"
  members={[
    { name: 'Jane', role: 'CEO', avatar: '/...' },
  ]}
/>`,
      vue: `<script setup lang="ts">
import { TeamSection } from '@/components/blocks/marketing'
</script>

<template>
  <TeamSection.Grid title="Meet the team" :members="members" />
</template>`
    }
  },
  {
    name: 'FAQ Section',
    description: 'Frequently asked questions with accordion layouts.',
    variants: ['Accordion', 'TwoColumns', 'WithCategories', 'WithContact', 'SimpleList'],
    category: 'marketing',
    icon: <FileText className="h-5 w-5" />,
    docPath: '/docs/blocks/faq-section',
    code: {
      react: `import { FAQSection } from '@/components/blocks/marketing'

<FAQSection.Accordion
  title="FAQ"
  items={[
    { question: 'How does it work?', answer: '...' },
  ]}
/>`,
      vue: `<script setup lang="ts">
import { FAQSection } from '@/components/blocks/marketing'
</script>

<template>
  <FAQSection.Accordion title="FAQ" :items="items" />
</template>`
    }
  },
  {
    name: 'Footer Section',
    description: 'Page footers with links, newsletter, and social icons.',
    variants: ['MultiColumn', 'WithNewsletter', 'Simple', 'Minimal', 'WithCTA'],
    category: 'marketing',
    icon: <LayoutIcon className="h-5 w-5" />,
    docPath: '/docs/blocks/footer-section',
    code: {
      react: `import { FooterSection } from '@/components/blocks/marketing'

<FooterSection.MultiColumn
  logo="BoldKit"
  columns={[
    { title: 'Product', links: [...] },
  ]}
/>`,
      vue: `<script setup lang="ts">
import { FooterSection } from '@/components/blocks/marketing'
</script>

<template>
  <FooterSection.MultiColumn logo="BoldKit" :columns="columns" />
</template>`
    }
  },
  {
    name: 'Contact Section',
    description: 'Contact forms with various layouts and contact info.',
    variants: ['Split', 'Centered', 'WithCards', 'WithMap'],
    category: 'marketing',
    icon: <FileText className="h-5 w-5" />,
    docPath: '/docs/blocks/contact-section',
    code: {
      react: `import { ContactSection } from '@/components/blocks/marketing'

<ContactSection.Split
  title="Get in touch"
  contactInfo={{ email: 'hello@example.com' }}
  onSubmit={(data) => console.log(data)}
/>`,
      vue: `<script setup lang="ts">
import { ContactSection } from '@/components/blocks/marketing'
</script>

<template>
  <ContactSection.Split
    title="Get in touch"
    :contact-info="{ email: 'hello@example.com' }"
    @submit="handleSubmit"
  />
</template>`
    }
  },
]

const applicationBlocks: BlockInfo[] = [
  {
    name: 'Auth Forms',
    description: 'Authentication forms including login, signup, forgot password, and OTP.',
    variants: ['Login', 'SignUp', 'ForgotPassword', 'OTPVerification', 'SplitLayout'],
    category: 'application',
    icon: <Users className="h-5 w-5" />,
    docPath: '/docs/blocks/auth-forms',
    code: {
      react: `import { AuthForms } from '@/components/blocks/application'

<AuthForms.Login
  title="Welcome back"
  onSubmit={(data) => console.log(data)}
  socialProviders={['google', 'github']}
/>`,
      vue: `<script setup lang="ts">
import { AuthForms } from '@/components/blocks/application'
</script>

<template>
  <AuthForms.Login
    title="Welcome back"
    @submit="handleSubmit"
    :social-providers="['google', 'github']"
  />
</template>`
    }
  },
  {
    name: 'Settings Page',
    description: 'User settings sections for profile, notifications, security, and appearance.',
    variants: ['Profile', 'Notifications', 'Security', 'Appearance', 'DangerZone', 'Page'],
    category: 'application',
    icon: <Settings className="h-5 w-5" />,
    docPath: '/docs/blocks/settings-page',
    code: {
      react: `import { SettingsBlocks } from '@/components/blocks/application'

<SettingsBlocks.Page defaultTab="profile" />

// Or use individual sections:
<SettingsBlocks.Profile user={user} onSave={handleSave} />
<SettingsBlocks.Security twoFactorEnabled={true} />`,
      vue: `<script setup lang="ts">
import { SettingsBlocks } from '@/components/blocks/application'
</script>

<template>
  <SettingsBlocks.Page default-tab="profile" />
</template>`
    }
  },
  {
    name: 'Onboarding Flow',
    description: 'User onboarding components including wizards, profile setup, and welcome screens.',
    variants: ['Wizard', 'Welcome', 'ProfileSetup', 'WorkspaceSetup', 'GoalSelection', 'Completion'],
    category: 'application',
    icon: <Rocket className="h-5 w-5" />,
    docPath: '/docs/blocks/onboarding-flow',
    code: {
      react: `import { OnboardingFlow } from '@/components/blocks/application'

<OnboardingFlow.Wizard
  steps={[
    { id: 'profile', title: 'Profile', content: <ProfileForm /> },
    { id: 'workspace', title: 'Workspace', content: <WorkspaceForm /> },
  ]}
  onComplete={() => console.log('Done!')}
/>`,
      vue: `<script setup lang="ts">
import { OnboardingFlow } from '@/components/blocks/application'
</script>

<template>
  <OnboardingFlow.Wizard :steps="steps" @complete="handleComplete" />
</template>`
    }
  },
  {
    name: 'Error Pages',
    description: 'Error and status pages for 404, 500, maintenance, offline, and more.',
    variants: ['NotFound', 'ServerError', 'Maintenance', 'Offline', 'Forbidden', 'ComingSoon', 'Generic'],
    category: 'application',
    icon: <AlertTriangle className="h-5 w-5" />,
    docPath: '/docs/blocks/error-pages',
    code: {
      react: `import { ErrorPages } from '@/components/blocks/application'

<ErrorPages.NotFound
  showSearch
  onSearch={(query) => console.log(query)}
  homeHref="/"
/>

<ErrorPages.Maintenance
  estimatedTime="2 hours"
  features={['Performance improvements', 'New features']}
/>`,
      vue: `<script setup lang="ts">
import { ErrorPages } from '@/components/blocks/application'
</script>

<template>
  <ErrorPages.NotFound show-search @search="handleSearch" home-href="/" />
</template>`
    }
  },
  {
    name: 'Invoice',
    description: 'Invoice and receipt templates for billing and payments.',
    variants: ['Full', 'Receipt', 'Summary', 'List'],
    category: 'application',
    icon: <Receipt className="h-5 w-5" />,
    docPath: '/docs/blocks/invoice',
    code: {
      react: `import { InvoiceBlocks } from '@/components/blocks/application'

<InvoiceBlocks.Full
  data={invoiceData}
  logo={<Logo />}
  onDownload={() => downloadPDF()}
/>

<InvoiceBlocks.Receipt data={receiptData} />`,
      vue: `<script setup lang="ts">
import { InvoiceBlocks } from '@/components/blocks/application'
</script>

<template>
  <InvoiceBlocks.Full :data="invoiceData" @download="handleDownload" />
</template>`
    }
  },
]

function BlockCard({ block, framework }: { block: BlockInfo; framework: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center border-3 border-foreground bg-primary/10 shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
              {block.icon}
            </div>
            <div>
              <CardTitle className="text-lg uppercase">{block.name}</CardTitle>
              <CardDescription className="text-sm">{block.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Variants */}
        <div>
          <h4 className="font-bold uppercase text-xs mb-2">Variants:</h4>
          <div className="flex flex-wrap gap-1.5">
            {block.variants.map((variant) => (
              <Badge key={variant} variant="secondary" className="text-xs">
                {variant}
              </Badge>
            ))}
          </div>
        </div>

        {/* Code Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold uppercase text-xs">Usage ({framework === 'react' ? 'React' : 'Vue 3'}):</h4>
            <CopyButton text={block.code[framework]} />
          </div>
          <pre className="bg-muted border-3 border-foreground p-3 text-xs overflow-x-auto max-h-40">
            <code>{block.code[framework]}</code>
          </pre>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="gap-2" asChild>
            <a href={block.docPath}>
              View Docs
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function Blocks() {
  const { framework } = useFramework()

  return (
    <>
      <SEO
        title="Blocks - BoldKit"
        description="Pre-built section blocks for marketing pages and applications. Hero sections, feature grids, testimonials, auth forms, settings pages, and more."
      />
      <Layout>
        {/* Header */}
        <div className="border-b-3 border-foreground bg-muted/30">
          <div className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">Free Blocks</Badge>
              <Badge variant={framework === 'react' ? 'info' : 'success'} className="gap-1.5">
                {framework === 'react' ? <ReactIcon className="h-4 w-4" /> : <VueIcon className="h-4 w-4" />}
                {framework === 'react' ? 'React' : 'Vue 3'}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Section Blocks
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-6">
              Pre-built section components for marketing pages and applications.
              Mix and match to build complete pages quickly. Each block comes with multiple variants.
            </p>
            <FrameworkToggle />
          </div>
        </div>

        {/* Blocks */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Tabs defaultValue="marketing">
            <TabsList className="mb-8">
              <TabsTrigger value="marketing" className="gap-2">
                <LayoutIcon className="h-4 w-4" />
                Marketing ({marketingBlocks.length})
              </TabsTrigger>
              <TabsTrigger value="application" className="gap-2">
                <Settings className="h-4 w-4" />
                Application ({applicationBlocks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marketing">
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase mb-2">Marketing Blocks</h2>
                <p className="text-muted-foreground">
                  Landing page sections, feature showcases, testimonials, and more.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {marketingBlocks.map((block) => (
                  <BlockCard key={block.name} block={block} framework={framework} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="application">
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase mb-2">Application Blocks</h2>
                <p className="text-muted-foreground">
                  Auth forms, settings pages, onboarding flows, error pages, and invoices.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {applicationBlocks.map((block) => (
                  <BlockCard key={block.name} block={block} framework={framework} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Stats */}
          <div className="mt-12 border-3 border-foreground bg-primary/5 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-black">15</div>
                <div className="text-sm text-muted-foreground uppercase font-bold">Total Blocks</div>
              </div>
              <div>
                <div className="text-4xl font-black">65+</div>
                <div className="text-sm text-muted-foreground uppercase font-bold">Variants</div>
              </div>
              <div>
                <div className="text-4xl font-black">2</div>
                <div className="text-sm text-muted-foreground uppercase font-bold">Frameworks</div>
              </div>
              <div>
                <div className="text-4xl font-black">Free</div>
                <div className="text-sm text-muted-foreground uppercase font-bold">Forever</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold uppercase mb-4">Need a Custom Block?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you need? Request a new block or contribute your own.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/ANIBIT14/boldkit/issues/new?title=Block%20Request&body=I%20would%20like%20a%20block%20for..."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request a Block
                </a>
              </Button>
              <Button asChild>
                <a href="/docs/contributing">
                  Contribute
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Blocks
