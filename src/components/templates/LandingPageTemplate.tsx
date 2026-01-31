import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { BurstShape, Star5Shape, LightningShape, HeartShape } from '@/components/ui/shapes'
import { Sticker } from '@/components/ui/sticker'
import { Check, ArrowRight, Zap, Shield, Sparkles, Users } from 'lucide-react'

// ============================================
// LANDING PAGE TEMPLATE - NEUBRUTALISM STYLE
// ============================================
// Copy this template and customize for your project
// All components use BoldKit neubrutalism styling

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const featureColors = ['bg-primary/10', 'bg-secondary/10', 'bg-accent/10', 'bg-info/10', 'bg-success/10', 'bg-warning/10']
const iconColors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-info', 'bg-success', 'bg-warning']

function FeatureCard({ icon, title, description, index = 0 }: FeatureCardProps & { index?: number }) {
  return (
    <Card className={`group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all ${featureColors[index % 6]}`}>
      <CardHeader>
        <div className={`w-14 h-14 flex items-center justify-center ${iconColors[index % 6]} border-3 border-foreground mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]`}>
          {icon}
        </div>
        <CardTitle className="uppercase">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-foreground/70">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  buttonText?: string
}

function PricingCard({ title, price, period, description, features, popular, buttonText = "Get Started" }: PricingCardProps) {
  return (
    <Card className={`relative ${popular ? 'border-primary bg-primary/5' : ''}`}>
      {popular && (
        <Sticker variant="primary" className="absolute -top-3 -right-3 z-10">
          Popular
        </Sticker>
      )}
      <CardHeader className={popular ? 'bg-primary' : 'bg-muted'}>
        <CardTitle className="uppercase">{title}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        <CardDescription className={popular ? 'text-primary-foreground/80' : ''}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button variant={popular ? 'default' : 'outline'} className="w-full">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar?: string
}

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-lg mb-4">"{quote}"</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary border-3 border-foreground flex items-center justify-center font-bold">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-bold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function LandingPageTemplate() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b-3 border-foreground bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary border-3 border-foreground" />
            <span className="font-black text-xl uppercase">YourBrand</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="font-bold hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="font-bold hover:text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="font-bold hover:text-primary transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost">Log in</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-3 border-foreground bg-accent/20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        {/* Colorful background blocks */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/30 border-r-3 border-b-3 border-foreground hidden lg:block" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/30 border-l-3 border-t-3 border-foreground hidden lg:block" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-6 shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
              <Sparkles className="h-3 w-3 mr-1" />
              Now in Public Beta
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6">
              Build Something{' '}
              <span className="bg-primary text-primary-foreground px-3 py-1 border-3 border-foreground inline-block transform -rotate-1">Bold</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The platform that helps you create amazing products with less effort.
              Simple, powerful, and designed to make you stand out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2" animation="pulse">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="secondary">
                View Demo
              </Button>
            </div>
          </div>

          {/* Decorative shapes - more vibrant */}
          <BurstShape size={100} className="absolute top-10 left-10 text-accent hidden lg:block animate-[brutal-wiggle_3s_ease-in-out_infinite]" />
          <Star5Shape size={80} className="absolute bottom-20 right-20 text-secondary hidden lg:block" />
          <LightningShape size={70} className="absolute top-1/2 right-10 text-warning hidden lg:block" />
          <HeartShape size={50} className="absolute bottom-10 left-1/4 text-primary hidden lg:block" />
        </div>
      </section>

      {/* Logos Section */}
      <section className="border-b-3 border-foreground bg-muted py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-bold uppercase tracking-wide text-muted-foreground mb-6">
            Trusted by innovative teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map((company) => (
              <div key={company} className="text-xl font-black text-muted-foreground/50">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-b-3 border-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you build, launch, and scale your product.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              index={0}
              icon={<Zap className="h-6 w-6" />}
              title="Lightning Fast"
              description="Optimized for speed and performance. Your users will love the instant response times."
            />
            <FeatureCard
              index={1}
              icon={<Shield className="h-6 w-6" />}
              title="Secure by Default"
              description="Enterprise-grade security built in from day one. Your data is always protected."
            />
            <FeatureCard
              index={2}
              icon={<Users className="h-6 w-6" />}
              title="Team Collaboration"
              description="Work together seamlessly with your team. Real-time updates and easy sharing."
            />
            <FeatureCard
              index={3}
              icon={<Sparkles className="h-6 w-6" />}
              title="AI Powered"
              description="Smart suggestions and automation to help you work faster and smarter."
            />
            <FeatureCard
              index={4}
              icon={<HeartShape size={24} className="text-foreground" />}
              title="User Friendly"
              description="Intuitive interface designed for everyone. No learning curve required."
            />
            <FeatureCard
              index={5}
              icon={<LightningShape size={24} className="text-foreground" />}
              title="Always Available"
              description="99.99% uptime guarantee. Your service is always online when you need it."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 border-b-3 border-foreground bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. No surprises. Choose the plan that works for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <PricingCard
              title="Starter"
              price="$0"
              period="month"
              description="Perfect for trying out"
              features={[
                '5 projects',
                '1 team member',
                'Basic analytics',
                'Email support',
              ]}
            />
            <PricingCard
              title="Pro"
              price="$29"
              period="month"
              description="Best for growing teams"
              features={[
                'Unlimited projects',
                '10 team members',
                'Advanced analytics',
                'Priority support',
                'Custom integrations',
              ]}
              popular
            />
            <PricingCard
              title="Enterprise"
              price="$99"
              period="month"
              description="For large organizations"
              features={[
                'Everything in Pro',
                'Unlimited team members',
                'Dedicated account manager',
                'Custom SLA',
                'On-premise option',
              ]}
              buttonText="Contact Sales"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 border-b-3 border-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Loved by Teams
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers are saying about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="This product has completely transformed how our team works. The interface is intuitive and the features are exactly what we needed."
              author="Sarah Chen"
              role="CEO at TechStart"
            />
            <TestimonialCard
              quote="We've tried many solutions before, but nothing comes close to this. The support team is amazing and always helpful."
              author="Mike Johnson"
              role="CTO at BuildCo"
            />
            <TestimonialCard
              quote="The best investment we've made for our team. Productivity has increased by 40% since we started using this."
              author="Emily Davis"
              role="Product Lead at ScaleUp"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary border-b-3 border-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-primary-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using our platform. Start free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-background"
            />
            <Button variant="secondary" size="lg" className="whitespace-nowrap">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary border-3 border-background" />
                <span className="font-black text-xl uppercase">YourBrand</span>
              </div>
              <p className="text-background/70">
                Building the future of productivity, one feature at a time.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4">Product</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background">Features</a></li>
                <li><a href="#" className="hover:text-background">Pricing</a></li>
                <li><a href="#" className="hover:text-background">Changelog</a></li>
                <li><a href="#" className="hover:text-background">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4">Company</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background">About</a></li>
                <li><a href="#" className="hover:text-background">Blog</a></li>
                <li><a href="#" className="hover:text-background">Careers</a></li>
                <li><a href="#" className="hover:text-background">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4">Legal</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background">Privacy</a></li>
                <li><a href="#" className="hover:text-background">Terms</a></li>
                <li><a href="#" className="hover:text-background">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/50">
            <p>&copy; 2025 YourBrand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPageTemplate
