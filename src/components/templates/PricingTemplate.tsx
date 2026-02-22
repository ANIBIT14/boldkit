import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Sticker } from '@/components/ui/sticker'
import { Marquee } from '@/components/ui/marquee'
import { ExplosionShape, ZigzagBanner, Star5Shape, ShieldShape } from '@/components/ui/shapes'
import { SEO } from '@/components/SEO'
import { Check, X, Sparkles, ArrowRight, Zap, Crown, Building2, HelpCircle, Mail, MessageSquare, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

// ============================================
// PRICING TEMPLATE - NEUBRUTALISM STYLE
// ============================================
// A 3-tier pricing comparison with feature table and FAQ

interface PricingTierProps {
  name: string
  price: number
  yearlyPrice: number
  description: string
  features: { name: string; included: boolean }[]
  popular?: boolean
  enterprise?: boolean
  isYearly: boolean
}

function PricingTier({ name, price, yearlyPrice, description, features, popular, enterprise, isYearly }: PricingTierProps) {
  const displayPrice = isYearly ? yearlyPrice : price
  const monthlyEquivalent = isYearly ? Math.round(yearlyPrice / 12) : price

  return (
    <Card
      className={`relative transition-all duration-300 ${
        popular
          ? 'border-primary bg-primary/5 lg:scale-105 lg:-translate-y-2 shadow-[8px_8px_0px_hsl(var(--primary))]'
          : ''
      }`}
    >
      {popular && (
        <>
          <Sticker variant="primary" className="absolute -top-3 -right-3 z-10">
            Most Popular
          </Sticker>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <ZigzagBanner size={60} className="text-warning" />
          </div>
        </>
      )}

      <CardHeader className={`${popular ? 'bg-primary text-primary-foreground' : enterprise ? 'bg-foreground text-background' : 'bg-muted'} relative overflow-hidden`}>
        {enterprise && (
          <Crown className="absolute top-4 right-4 h-8 w-8 text-warning" />
        )}
        <div className="flex items-center gap-2 mb-2">
          {enterprise ? <Building2 className="h-5 w-5" /> : popular ? <Sparkles className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
          <CardTitle className="uppercase">{name}</CardTitle>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black">${monthlyEquivalent}</span>
          <span className={`${popular ? 'text-primary-foreground/70' : enterprise ? 'text-background/70' : 'text-muted-foreground'}`}>
            /month
          </span>
        </div>
        {isYearly && (
          <p className={`text-sm ${popular ? 'text-primary-foreground/70' : enterprise ? 'text-background/70' : 'text-muted-foreground'}`}>
            Billed ${displayPrice}/year
          </p>
        )}
        <CardDescription className={popular ? 'text-primary-foreground/80' : enterprise ? 'text-background/80' : ''}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              {feature.included ? (
                <div className="w-5 h-5 bg-success border-2 border-foreground flex items-center justify-center">
                  <Check className="h-3 w-3 text-success-foreground" />
                </div>
              ) : (
                <div className="w-5 h-5 bg-muted border-2 border-foreground/30 flex items-center justify-center">
                  <X className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
              <span className={!feature.included ? 'text-muted-foreground' : ''}>{feature.name}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={popular ? 'default' : enterprise ? 'secondary' : 'outline'}
          className="w-full gap-2"
          size="lg"
        >
          {enterprise ? 'Contact Sales' : 'Get Started'}
          <ArrowRight className="h-4 w-4" />
        </Button>

        {popular && (
          <p className="text-center text-sm text-muted-foreground mt-3">
            No credit card required
          </p>
        )}
      </CardContent>
    </Card>
  )
}

const tiers = [
  {
    name: 'Starter',
    price: 0,
    yearlyPrice: 0,
    description: 'Perfect for individuals and small projects',
    features: [
      { name: '3 projects', included: true },
      { name: '1 team member', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Email support', included: true },
      { name: 'Custom domains', included: false },
      { name: 'Advanced integrations', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom branding', included: false },
    ],
  },
  {
    name: 'Pro',
    price: 29,
    yearlyPrice: 290,
    description: 'Best for growing teams and businesses',
    features: [
      { name: 'Unlimited projects', included: true },
      { name: '10 team members', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Priority support', included: true },
      { name: 'Custom domains', included: true },
      { name: 'Advanced integrations', included: true },
      { name: 'API access', included: true },
      { name: 'Custom branding', included: false },
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    yearlyPrice: 990,
    description: 'For large organizations with custom needs',
    features: [
      { name: 'Unlimited everything', included: true },
      { name: 'Unlimited team members', included: true },
      { name: 'Enterprise analytics', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'Custom domains', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Full API access', included: true },
      { name: 'Custom branding', included: true },
    ],
    enterprise: true,
  },
]

const comparisonFeatures = [
  { name: 'Projects', starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Team members', starter: '1', pro: '10', enterprise: 'Unlimited' },
  { name: 'Storage', starter: '1 GB', pro: '50 GB', enterprise: 'Unlimited' },
  { name: 'API calls', starter: '1K/month', pro: '100K/month', enterprise: 'Unlimited' },
  { name: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Enterprise' },
  { name: 'Support', starter: 'Email', pro: 'Priority', enterprise: 'Dedicated' },
  { name: 'Custom domain', starter: false, pro: true, enterprise: true },
  { name: 'Integrations', starter: false, pro: true, enterprise: true },
  { name: 'SSO', starter: false, pro: false, enterprise: true },
  { name: 'SLA', starter: false, pro: false, enterprise: true },
]

const faqs = [
  {
    question: 'Can I change plans at any time?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference. When downgrading, the remaining balance will be credited to your account.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required. You\'ll have full access to all features during the trial period.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.',
  },
  {
    question: 'What happens when I reach my limits?',
    answer: 'We\'ll notify you when you\'re approaching your limits. You can upgrade your plan at any time to continue using the service without interruption.',
  },
  {
    question: 'Do you offer discounts for nonprofits?',
    answer: 'Yes! We offer a 50% discount for verified nonprofit organizations. Contact our sales team to learn more about our nonprofit program.',
  },
]

const trustedLogos = ['Acme Corp', 'Globex', 'Umbrella', 'Massive Dynamic', 'Stark Industries', 'Wayne Enterprises']

export function PricingTemplate() {
  const [isYearly, setIsYearly] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [isThemeAnimating, setIsThemeAnimating] = useState(false)

  const handleThemeToggle = () => {
    setIsThemeAnimating(true)
    setTimeout(() => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      setTimeout(() => {
        setIsThemeAnimating(false)
      }, 200)
    }, 200)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Transition Overlay */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none bg-foreground transition-opacity duration-200 ${
          isThemeAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Theme Toggle */}
      <button
        onClick={handleThemeToggle}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full border-4 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--foreground))] flex items-center justify-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--foreground))] transition-all"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      <SEO
        title="Pricing Template"
        description="A 3-tier pricing page template with feature comparison, FAQ, and social proof. Built with BoldKit neubrutalism components."
        keywords="pricing template, pricing page, react pricing, vue pricing, saas pricing, neubrutalism template"
        canonical="https://boldkit.dev/templates/pricing"
        breadcrumbs={[
          { name: 'Home', url: 'https://boldkit.dev/' },
          { name: 'Templates', url: 'https://boldkit.dev/templates' },
          { name: 'Pricing' },
        ]}
      />

      {/* Navigation */}
      <nav className="border-b-3 border-foreground bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary border-3 border-foreground" />
            <span className="font-black text-xl uppercase">YourBrand</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="font-bold hover:text-primary transition-colors">Features</a>
            <a href="#" className="font-bold text-primary">Pricing</a>
            <a href="#" className="font-bold hover:text-primary transition-colors">Docs</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost">Log in</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b-3 border-foreground bg-primary/10 py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <Star5Shape size={80} className="absolute top-10 left-10 text-warning hidden lg:block animate-[brutal-wiggle_3s_ease-in-out_infinite]" />
        <ShieldShape size={60} className="absolute bottom-20 right-20 text-success hidden lg:block" />

        <div className="container mx-auto px-4 text-center relative">
          <Badge variant="accent" className="mb-6 shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
            Simple & Transparent
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free, upgrade when you need. No hidden fees, no surprises.
            Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Label htmlFor="billing" className={`font-bold ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </Label>
            <Switch
              id="billing"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing" className={`font-bold ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
            </Label>
            {isYearly && (
              <div className="relative">
                <ExplosionShape size={60} className="text-warning" />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-black">
                  -17%
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 border-b-3 border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <PricingTier key={tier.name} {...tier} isYearly={isYearly} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 border-b-3 border-foreground bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Compare Plans</Badge>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              Feature Comparison
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See what's included in each plan to find the perfect fit for your needs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-3 border-foreground bg-background">
              <thead>
                <tr className="border-b-3 border-foreground bg-foreground text-background">
                  <th className="text-left p-4 font-bold uppercase">Feature</th>
                  <th className="text-center p-4 font-bold uppercase">Starter</th>
                  <th className="text-center p-4 font-bold uppercase bg-primary text-primary-foreground">Pro</th>
                  <th className="text-center p-4 font-bold uppercase">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr key={feature.name} className={`border-b-2 border-foreground/20 ${i % 2 === 0 ? '' : 'bg-muted/30'}`}>
                    <td className="p-4 font-medium">{feature.name}</td>
                    <td className="text-center p-4">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? (
                          <Check className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        feature.starter
                      )}
                    </td>
                    <td className="text-center p-4 bg-primary/5">
                      {typeof feature.pro === 'boolean' ? (
                        feature.pro ? (
                          <Check className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="font-bold">{feature.pro}</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? (
                          <Check className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        feature.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-b-3 border-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <HelpCircle className="h-3 w-3 mr-1" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <Accordion key={i} type="single" collapsible>
                <AccordionItem value={`faq-${i}`} className="border-3 border-foreground bg-background">
                  <AccordionTrigger className="px-4 font-bold text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-b-3 border-foreground bg-muted">
        <div className="container mx-auto px-4 text-center mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Trusted by 10,000+ companies worldwide
          </p>
        </div>
        <Marquee className="py-4" pauseOnHover>
          {trustedLogos.map((logo) => (
            <div
              key={logo}
              className="mx-8 text-2xl font-black text-muted-foreground/50 whitespace-nowrap"
            >
              {logo}
            </div>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Still Have Questions?
          </h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" size="lg" className="gap-2">
              <Mail className="h-5 w-5" />
              Contact Sales
            </Button>
            <Button variant="outline" size="lg" className="gap-2 border-background text-background hover:bg-background hover:text-foreground">
              <MessageSquare className="h-5 w-5" />
              Live Chat
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t-3 border-foreground bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 YourBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default PricingTemplate
