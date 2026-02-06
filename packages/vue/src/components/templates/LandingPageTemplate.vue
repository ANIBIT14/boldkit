<script setup lang="ts">
import { Check, ArrowRight, Zap, Shield, Sparkles, Users } from 'lucide-vue-next'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Sticker,
  BurstShape,
  Star5Shape,
  LightningShape,
  HeartShape,
} from '@/components/ui'

// Feature card component
interface FeatureCardProps {
  icon: 'zap' | 'shield' | 'users' | 'sparkles' | 'heart' | 'lightning'
  title: string
  description: string
  index?: number
}

const featureColors = ['bg-primary/10', 'bg-secondary/10', 'bg-accent/10', 'bg-info/10', 'bg-success/10', 'bg-warning/10']
const iconColors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-info', 'bg-success', 'bg-warning']

// Pricing data
interface PricingPlan {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  buttonText?: string
}

const pricingPlans: PricingPlan[] = [
  {
    title: 'Starter',
    price: '$0',
    period: 'month',
    description: 'Perfect for trying out',
    features: ['5 projects', '1 team member', 'Basic analytics', 'Email support'],
  },
  {
    title: 'Pro',
    price: '$29',
    period: 'month',
    description: 'Best for growing teams',
    features: ['Unlimited projects', '10 team members', 'Advanced analytics', 'Priority support', 'Custom integrations'],
    popular: true,
  },
  {
    title: 'Enterprise',
    price: '$99',
    period: 'month',
    description: 'For large organizations',
    features: ['Everything in Pro', 'Unlimited team members', 'Dedicated account manager', 'Custom SLA', 'On-premise option'],
    buttonText: 'Contact Sales',
  },
]

// Testimonial data
interface Testimonial {
  quote: string
  author: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'This product has completely transformed how our team works. The interface is intuitive and the features are exactly what we needed.',
    author: 'Sarah Chen',
    role: 'CEO at TechStart',
  },
  {
    quote: "We've tried many solutions before, but nothing comes close to this. The support team is amazing and always helpful.",
    author: 'Mike Johnson',
    role: 'CTO at BuildCo',
  },
  {
    quote: "The best investment we've made for our team. Productivity has increased by 40% since we started using this.",
    author: 'Emily Davis',
    role: 'Product Lead at ScaleUp',
  },
]

// Features data
const features: FeatureCardProps[] = [
  { icon: 'zap', title: 'Lightning Fast', description: 'Optimized for speed and performance. Your users will love the instant response times.' },
  { icon: 'shield', title: 'Secure by Default', description: 'Enterprise-grade security built in from day one. Your data is always protected.' },
  { icon: 'users', title: 'Team Collaboration', description: 'Work together seamlessly with your team. Real-time updates and easy sharing.' },
  { icon: 'sparkles', title: 'AI Powered', description: 'Smart suggestions and automation to help you work faster and smarter.' },
  { icon: 'heart', title: 'User Friendly', description: 'Intuitive interface designed for everyone. No learning curve required.' },
  { icon: 'lightning', title: 'Always Available', description: '99.99% uptime guarantee. Your service is always online when you need it.' },
]

const companies = ['Company A', 'Company B', 'Company C', 'Company D', 'Company E']
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <nav class="border-b-3 border-foreground bg-background sticky top-0 z-50">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary border-3 border-foreground" />
          <span class="font-black text-xl uppercase">YourBrand</span>
        </div>
        <div class="hidden md:flex items-center gap-6">
          <a href="#features" class="font-bold hover:text-primary transition-colors">Features</a>
          <a href="#pricing" class="font-bold hover:text-primary transition-colors">Pricing</a>
          <a href="#testimonials" class="font-bold hover:text-primary transition-colors">Testimonials</a>
        </div>
        <div class="flex items-center gap-3">
          <Button variant="ghost">Log in</Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b-3 border-foreground bg-accent/20">
      <div class="absolute inset-0 grid-pattern opacity-30" />
      <div class="absolute top-0 left-0 w-32 h-32 bg-primary/30 border-r-3 border-b-3 border-foreground hidden lg:block" />
      <div class="absolute bottom-0 right-0 w-48 h-48 bg-secondary/30 border-l-3 border-t-3 border-foreground hidden lg:block" />
      <div class="container mx-auto px-4 py-20 md:py-32 relative">
        <div class="max-w-3xl mx-auto text-center">
          <Badge variant="accent" class="mb-6 shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
            <Sparkles class="h-3 w-3 mr-1" />
            Now in Public Beta
          </Badge>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6">
            Build Something
            <span class="bg-primary text-primary-foreground px-3 py-1 border-3 border-foreground inline-block transform -rotate-1 ml-2">Bold</span>
          </h1>
          <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The platform that helps you create amazing products with less effort.
            Simple, powerful, and designed to make you stand out.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" class="gap-2" animation="pulse">
              Get Started Free
              <ArrowRight class="h-5 w-5" />
            </Button>
            <Button size="lg" variant="secondary">View Demo</Button>
          </div>
        </div>

        <!-- Decorative shapes -->
        <BurstShape :size="100" class="absolute top-10 left-10 text-accent hidden lg:block animate-[brutal-wiggle_3s_ease-in-out_infinite]" />
        <Star5Shape :size="80" class="absolute bottom-20 right-20 text-secondary hidden lg:block" />
        <LightningShape :size="70" class="absolute top-1/2 right-10 text-warning hidden lg:block" />
        <HeartShape :size="50" class="absolute bottom-10 left-1/4 text-primary hidden lg:block" />
      </div>
    </section>

    <!-- Logos Section -->
    <section class="border-b-3 border-foreground bg-muted py-8">
      <div class="container mx-auto px-4">
        <p class="text-center text-sm font-bold uppercase tracking-wide text-muted-foreground mb-6">
          Trusted by innovative teams
        </p>
        <div class="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div v-for="company in companies" :key="company" class="text-xl font-black text-muted-foreground/50">
            {{ company }}
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 border-b-3 border-foreground">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <Badge variant="outline" class="mb-4">Features</Badge>
          <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Everything You Need</h2>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features to help you build, launch, and scale your product.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="(feature, index) in features"
            :key="feature.title"
            :class="`group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all ${featureColors[index % 6]}`"
          >
            <CardHeader>
              <div :class="['w-14 h-14 flex items-center justify-center border-3 border-foreground mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]', iconColors[index % 6]]">
                <Zap v-if="feature.icon === 'zap'" class="h-6 w-6" />
                <Shield v-else-if="feature.icon === 'shield'" class="h-6 w-6" />
                <Users v-else-if="feature.icon === 'users'" class="h-6 w-6" />
                <Sparkles v-else-if="feature.icon === 'sparkles'" class="h-6 w-6" />
                <HeartShape v-else-if="feature.icon === 'heart'" :size="24" class="text-foreground" />
                <LightningShape v-else-if="feature.icon === 'lightning'" :size="24" class="text-foreground" />
              </div>
              <CardTitle class="uppercase">{{ feature.title }}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription class="text-foreground/70">{{ feature.description }}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 border-b-3 border-foreground bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <Badge variant="outline" class="mb-4">Pricing</Badge>
          <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Simple Pricing</h2>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            No hidden fees. No surprises. Choose the plan that works for you.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card
            v-for="plan in pricingPlans"
            :key="plan.title"
            :class="`relative ${plan.popular ? 'border-primary bg-primary/5' : ''}`"
          >
            <Sticker v-if="plan.popular" variant="primary" class="absolute -top-3 -right-3 z-10">Popular</Sticker>
            <CardHeader :class="plan.popular ? 'bg-primary' : 'bg-muted'">
              <CardTitle class="uppercase">{{ plan.title }}</CardTitle>
              <div class="flex items-baseline gap-1">
                <span class="text-4xl font-black">{{ plan.price }}</span>
                <span class="text-muted-foreground">/{{ plan.period }}</span>
              </div>
              <CardDescription :class="plan.popular ? 'text-primary-foreground/80' : ''">
                {{ plan.description }}
              </CardDescription>
            </CardHeader>
            <CardContent class="pt-6">
              <ul class="space-y-3 mb-6">
                <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2">
                  <Check class="h-5 w-5 text-success" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
              <Button :variant="plan.popular ? 'default' : 'outline'" class="w-full">
                {{ plan.buttonText || 'Get Started' }}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 border-b-3 border-foreground">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <Badge variant="outline" class="mb-4">Testimonials</Badge>
          <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Loved by Teams</h2>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our customers are saying about their experience.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <Card v-for="testimonial in testimonials" :key="testimonial.author">
            <CardContent class="pt-6">
              <p class="text-lg mb-4">"{{ testimonial.quote }}"</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-secondary border-3 border-foreground flex items-center justify-center font-bold">
                  {{ testimonial.author.charAt(0) }}
                </div>
                <div>
                  <p class="font-bold">{{ testimonial.author }}</p>
                  <p class="text-sm text-muted-foreground">{{ testimonial.role }}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary border-b-3 border-foreground">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-primary-foreground">
          Ready to Get Started?
        </h2>
        <p class="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using our platform. Start free, no credit card required.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Input placeholder="Enter your email" class="bg-background" />
          <Button variant="secondary" size="lg" class="whitespace-nowrap">Start Free Trial</Button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 bg-foreground text-background">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 bg-primary border-3 border-background" />
              <span class="font-black text-xl uppercase">YourBrand</span>
            </div>
            <p class="text-background/70">Building the future of productivity, one feature at a time.</p>
          </div>
          <div>
            <h4 class="font-bold uppercase mb-4">Product</h4>
            <ul class="space-y-2 text-background/70">
              <li><a href="#" class="hover:text-background">Features</a></li>
              <li><a href="#" class="hover:text-background">Pricing</a></li>
              <li><a href="#" class="hover:text-background">Changelog</a></li>
              <li><a href="#" class="hover:text-background">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold uppercase mb-4">Company</h4>
            <ul class="space-y-2 text-background/70">
              <li><a href="#" class="hover:text-background">About</a></li>
              <li><a href="#" class="hover:text-background">Blog</a></li>
              <li><a href="#" class="hover:text-background">Careers</a></li>
              <li><a href="#" class="hover:text-background">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold uppercase mb-4">Legal</h4>
            <ul class="space-y-2 text-background/70">
              <li><a href="#" class="hover:text-background">Privacy</a></li>
              <li><a href="#" class="hover:text-background">Terms</a></li>
              <li><a href="#" class="hover:text-background">Security</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-background/20 pt-8 text-center text-background/50">
          <p>&copy; 2025 YourBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
