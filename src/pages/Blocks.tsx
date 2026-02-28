import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Layout } from '@/components/layout'
import {
  ArrowRight,
  Copy,
  Check,
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
} from 'lucide-react'
import { SEO, pageSEO } from '@/components/SEO'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" onClick={copy} className="gap-2 touch-manipulation">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
    </Button>
  )
}

// Visual preview component for blocks
function BlockPreview({ type, icon: Icon }: { type: string; icon: React.ElementType }) {
  const previewStyles: Record<string, React.ReactNode> = {
    hero: (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <div className="w-16 h-2 bg-primary/60 mb-3" />
        <div className="w-32 h-4 bg-foreground mb-2" />
        <div className="w-24 h-2 bg-muted-foreground/40 mb-4" />
        <div className="flex gap-2">
          <div className="w-16 h-6 bg-primary border-2 border-foreground" />
          <div className="w-16 h-6 bg-muted border-2 border-foreground" />
        </div>
      </div>
    ),
    features: (
      <div className="grid grid-cols-3 gap-2 p-4 h-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center p-2 border-2 border-foreground bg-card">
            <div className="w-6 h-6 bg-primary/20 border-2 border-foreground mb-1" />
            <div className="w-full h-2 bg-foreground mb-1" />
            <div className="w-3/4 h-1 bg-muted-foreground/40" />
          </div>
        ))}
      </div>
    ),
    testimonials: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <MessageSquare className="h-8 w-8 text-primary mb-2" />
        <div className="w-32 h-2 bg-foreground mb-1" />
        <div className="w-24 h-2 bg-foreground mb-3" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted border-2 border-foreground" />
          <div>
            <div className="w-16 h-2 bg-foreground mb-1" />
            <div className="w-12 h-1 bg-muted-foreground/40" />
          </div>
        </div>
      </div>
    ),
    logos: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="w-24 h-2 bg-muted-foreground/40 mb-4" />
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-10 h-10 border-2 border-foreground bg-muted flex items-center justify-center">
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    ),
    cta: (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-primary/10">
        <div className="w-28 h-4 bg-foreground mb-2" />
        <div className="w-20 h-2 bg-muted-foreground/40 mb-4" />
        <div className="w-20 h-8 bg-primary border-2 border-foreground" />
      </div>
    ),
    stats: (
      <div className="grid grid-cols-4 gap-2 p-4 h-full items-center">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center">
            <div className="text-lg font-black text-primary">10K</div>
            <div className="w-full h-1 bg-muted-foreground/40" />
          </div>
        ))}
      </div>
    ),
    team: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="w-20 h-3 bg-foreground mb-4" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-muted border-2 border-foreground mb-1" />
              <div className="w-8 h-1 bg-foreground" />
            </div>
          ))}
        </div>
      </div>
    ),
    faq: (
      <div className="flex flex-col p-4 h-full justify-center">
        <div className="w-16 h-3 bg-foreground mb-3 mx-auto" />
        {[1, 2].map((i) => (
          <div key={i} className="border-2 border-foreground p-2 mb-2 bg-card">
            <div className="flex items-center justify-between">
              <div className="w-20 h-2 bg-foreground" />
              <HelpCircle className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    ),
    footer: (
      <div className="flex flex-col h-full justify-end p-4 bg-muted/50">
        <div className="flex justify-between items-end">
          <div className="w-16 h-4 bg-foreground" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 bg-muted border-2 border-foreground" />
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-foreground mt-2 mb-1" />
        <div className="w-24 h-1 bg-muted-foreground/40" />
      </div>
    ),
    contact: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <Mail className="h-8 w-8 text-primary mb-2" />
        <div className="w-20 h-3 bg-foreground mb-3" />
        <div className="w-full max-w-[120px] space-y-2">
          <div className="h-6 bg-muted border-2 border-foreground" />
          <div className="h-6 bg-muted border-2 border-foreground" />
          <div className="h-6 bg-primary border-2 border-foreground" />
        </div>
      </div>
    ),
    auth: (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-background">
        <LogIn className="h-8 w-8 text-primary mb-2" />
        <div className="w-24 h-3 bg-foreground mb-3" />
        <div className="w-full max-w-[100px] space-y-2">
          <div className="h-5 bg-muted border-2 border-foreground" />
          <div className="h-5 bg-muted border-2 border-foreground" />
          <div className="h-6 bg-primary border-2 border-foreground" />
        </div>
      </div>
    ),
    settings: (
      <div className="flex h-full p-3 bg-background gap-2">
        <div className="w-1/4 space-y-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-4 ${i === 1 ? 'bg-primary/20' : 'bg-muted'} border border-foreground`} />
          ))}
        </div>
        <div className="flex-1 border-2 border-foreground p-2">
          <div className="w-16 h-2 bg-foreground mb-2" />
          <div className="space-y-1">
            <div className="h-4 bg-muted border border-foreground" />
            <div className="h-4 bg-muted border border-foreground" />
          </div>
        </div>
      </div>
    ),
    onboarding: (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-background">
        <Sparkles className="h-8 w-8 text-primary mb-2" />
        <div className="w-24 h-3 bg-foreground mb-2" />
        <div className="w-20 h-2 bg-muted-foreground/40 mb-3" />
        <div className="flex gap-1 mb-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-2 h-2 border border-foreground ${i === 1 ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>
        <div className="w-16 h-6 bg-primary border-2 border-foreground" />
      </div>
    ),
    error: (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-background">
        <FileX className="h-10 w-10 text-destructive mb-2" />
        <div className="text-2xl font-black mb-1">404</div>
        <div className="w-20 h-2 bg-muted-foreground/40 mb-3" />
        <div className="w-16 h-6 bg-primary border-2 border-foreground" />
      </div>
    ),
    invoice: (
      <div className="flex flex-col h-full p-3 bg-background">
        <div className="flex justify-between mb-2">
          <div className="w-12 h-3 bg-foreground" />
          <CreditCard className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 border-2 border-foreground p-2 space-y-1">
          <div className="flex justify-between">
            <div className="w-16 h-2 bg-muted-foreground/40" />
            <div className="w-8 h-2 bg-foreground" />
          </div>
          <div className="flex justify-between">
            <div className="w-12 h-2 bg-muted-foreground/40" />
            <div className="w-8 h-2 bg-foreground" />
          </div>
          <div className="h-px bg-foreground my-1" />
          <div className="flex justify-between">
            <div className="w-10 h-2 bg-foreground" />
            <div className="w-10 h-2 bg-primary" />
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className="h-[160px] md:h-[180px] border-3 border-foreground bg-muted/30 overflow-hidden">
      {previewStyles[type] || (
        <div className="flex items-center justify-center h-full">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}

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
</template>`
    }
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
</template>`
    }
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
</template>`
    }
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
</template>`
    }
  },
  {
    name: 'CTA Section',
    description: 'Call-to-action sections to drive conversions.',
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
</template>`
    }
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
</template>`
    }
  },
  {
    name: 'Team Section',
    description: 'Showcase your team members with profiles.',
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
</template>`
    }
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
</template>`
    }
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
</template>`
    }
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
</template>`
    }
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
</template>`
    }
  },
  {
    name: 'Onboarding Flow',
    description: 'User onboarding components including wizards, profile setup, and welcome screens.',
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
</template>`
    }
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
</template>`
    }
  },
  {
    name: 'Invoice',
    description: 'Invoice and receipt templates for billing and payments.',
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
</template>`
    }
  },
]

function BlockCard({ block, framework }: { block: BlockInfo; framework: string }) {
  const [showCode, setShowCode] = useState(false)
  const Icon = block.icon

  return (
    <Card className="overflow-hidden flex flex-col">
      {/* Preview */}
      <BlockPreview type={block.previewType} icon={Icon} />

      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border-3 border-foreground bg-primary/10 shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base sm:text-lg uppercase truncate">{block.name}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">{block.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        {/* Variants */}
        <div>
          <h4 className="font-bold uppercase text-xs mb-2">Variants:</h4>
          <div className="flex flex-wrap gap-1.5">
            {block.variants.slice(0, 4).map((variant) => (
              <Badge key={variant} variant="secondary" className="text-xs">
                {variant}
              </Badge>
            ))}
            {block.variants.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{block.variants.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Code Toggle */}
        <div className="flex-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="w-full justify-between touch-manipulation"
          >
            <span className="font-bold uppercase text-xs">
              Code ({framework === 'react' ? 'React' : 'Vue'})
            </span>
            <span className="text-xs">{showCode ? 'Hide' : 'Show'}</span>
          </Button>
          {showCode && (
            <div className="mt-2">
              <div className="flex justify-end mb-1">
                <CopyButton text={block.code[framework]} />
              </div>
              <pre className="bg-muted border-3 border-foreground p-3 text-xs overflow-x-auto max-h-32">
                <code>{block.code[framework]}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2">
          <Button size="sm" className="w-full gap-2 touch-manipulation" asChild>
            <Link to={block.docPath}>
              View Documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
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
      <SEO {...pageSEO.blocks} />
      <Layout>
        {/* Header */}
        <div className="border-b-3 border-foreground bg-muted/30">
          <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary">Free Blocks</Badge>
              <Badge variant={framework === 'react' ? 'info' : 'success'} className="gap-1.5">
                {framework === 'react' ? <ReactIcon className="h-4 w-4" /> : <VueIcon className="h-4 w-4" />}
                {framework === 'react' ? 'React' : 'Vue 3'}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Section Blocks
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-6">
              Pre-built section components for marketing pages and applications.
              Mix and match to build complete pages quickly.
            </p>
            <FrameworkToggle />
          </div>
        </div>

        {/* Blocks */}
        <div className="container mx-auto px-4 py-6 md:py-12">
          <Tabs defaultValue="marketing">
            <TabsList className="mb-6 md:mb-8 w-full sm:w-auto flex">
              <TabsTrigger value="marketing" className="flex-1 sm:flex-none gap-2 touch-manipulation">
                <LayoutIcon className="h-4 w-4 hidden sm:block" />
                Marketing ({marketingBlocks.length})
              </TabsTrigger>
              <TabsTrigger value="application" className="flex-1 sm:flex-none gap-2 touch-manipulation">
                <Settings className="h-4 w-4 hidden sm:block" />
                Application ({applicationBlocks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marketing">
              <div className="mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-black uppercase mb-2">Marketing Blocks</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Landing page sections, feature showcases, testimonials, and more.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {marketingBlocks.map((block) => (
                  <BlockCard key={block.name} block={block} framework={framework} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="application">
              <div className="mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-black uppercase mb-2">Application Blocks</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Auth forms, settings pages, onboarding flows, error pages, and invoices.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {applicationBlocks.map((block) => (
                  <BlockCard key={block.name} block={block} framework={framework} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Stats */}
          <div className="mt-8 md:mt-12 border-3 border-foreground bg-primary/5 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
              <div>
                <div className="text-2xl md:text-4xl font-black">15</div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase font-bold">Total Blocks</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-black">65+</div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase font-bold">Variants</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-black">2</div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase font-bold">Frameworks</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-black">Free</div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase font-bold">Forever</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 md:mt-12 text-center">
            <h3 className="text-xl md:text-2xl font-bold uppercase mb-4">Need a Custom Block?</h3>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              Can't find what you need? Request a new block or contribute your own.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button variant="outline" className="touch-manipulation" asChild>
                <a
                  href="https://github.com/ANIBIT14/boldkit/issues/new?title=Block%20Request&body=I%20would%20like%20a%20block%20for..."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request a Block
                </a>
              </Button>
              <Button className="touch-manipulation" asChild>
                <Link to="/docs">
                  View Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Blocks
