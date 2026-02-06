<script setup lang="ts">
import {
  ArrowRight,
  Mail,
  Briefcase,
  Code2,
  Palette,
  Smartphone,
  ExternalLink,
  MapPin,
  Star,
} from 'lucide-vue-next'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Textarea,
  Sticker,
  BurstShape,
  Star5Shape,
  HeartShape,
} from '@/components/ui'

// Portfolio data - customize for your own portfolio
const portfolioData = {
  name: 'Alex Johnson',
  title: 'UI/UX Designer & Developer',
  tagline: 'I Turn Ideas Into',
  taglineHighlight: 'Realities',
  description:
    'I am a UI/UX designer with a passion for crafting performant, scalable, and user-friendly interfaces that make a real impact.',
  email: 'hello@alexjohnson.dev',
  location: 'San Francisco, CA',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  resumeUrl: '#',
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
}

interface Service {
  icon: 'code' | 'smartphone' | 'palette'
  title: string
  description: string
  color: string
}

const services: Service[] = [
  {
    icon: 'code',
    title: 'Web Development',
    description: 'Building modern web applications with React, Next.js, and Tailwind CSS.',
    color: 'bg-primary',
  },
  {
    icon: 'smartphone',
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile apps with React Native and Flutter.',
    color: 'bg-secondary',
  },
  {
    icon: 'palette',
    title: 'UI/UX Design',
    description: 'Designing intuitive interfaces that prioritize user experience and accessibility.',
    color: 'bg-accent',
  },
]

interface Experience {
  year: string
  title: string
  company: string
  description: string
  color: string
}

const experience: Experience[] = [
  {
    year: '2024',
    title: 'Senior Product Designer',
    company: 'TechCorp Inc.',
    description: 'Leading design initiatives and mentoring junior designers.',
    color: 'bg-primary',
  },
  {
    year: '2022',
    title: 'Product Designer',
    company: 'StartupXYZ',
    description: 'Contributed to product growth reaching 10M+ users.',
    color: 'bg-secondary',
  },
  {
    year: '2020',
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    description: 'Created design systems for enterprise clients.',
    color: 'bg-accent',
  },
]

interface Project {
  title: string
  category: string
  description: string
  image: string
  tags: string[]
  color: string
  link: string
}

const projects: Project[] = [
  {
    title: 'E-commerce Platform Redesign',
    category: 'Web Design',
    description: 'Complete redesign of a major e-commerce platform, resulting in 40% increase in conversions.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['Figma', 'React', 'Tailwind'],
    color: 'bg-success',
    link: '#',
  },
  {
    title: 'Mobile Banking App',
    category: 'Mobile Design',
    description: 'Designed a user-friendly mobile banking experience for over 5M users.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    tags: ['Figma', 'React Native', 'iOS'],
    color: 'bg-info',
    link: '#',
  },
  {
    title: 'SaaS Dashboard',
    category: 'Product Design',
    description: 'Created a comprehensive analytics dashboard for a B2B SaaS platform.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tags: ['Design System', 'React', 'D3.js'],
    color: 'bg-warning',
    link: '#',
  },
]

interface Testimonial {
  quote: string
  author: string
  role: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Alex's work completely transformed our product. Their attention to detail and user-centric approach is unmatched.",
    author: 'Sarah Chen',
    role: 'CEO, TechStartup',
    color: 'bg-accent',
  },
  {
    quote: "One of the most talented designers I've worked with. They deliver exceptional results consistently.",
    author: 'Michael Brown',
    role: 'Product Lead, BigCorp',
    color: 'bg-success',
  },
  {
    quote: 'Working with Alex was a game-changer for our team. Highly recommend for any design project.',
    author: 'Emily Davis',
    role: 'Founder, DesignCo',
    color: 'bg-primary',
  },
]
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 border-b-3 border-foreground bg-background">
      <div class="container mx-auto flex h-16 items-center justify-between px-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary border-3 border-foreground" />
          <span class="font-black text-xl uppercase">{{ portfolioData.name.split(' ')[0] }}</span>
        </div>
        <div class="hidden md:flex items-center gap-6">
          <a href="#services" class="font-bold hover:text-primary transition-colors">Services</a>
          <a href="#experience" class="font-bold hover:text-primary transition-colors">Experience</a>
          <a href="#projects" class="font-bold hover:text-primary transition-colors">Projects</a>
          <a href="#contact" class="font-bold hover:text-primary transition-colors">Contact</a>
        </div>
        <Button>Hire Me</Button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b-3 border-foreground">
      <div class="absolute inset-0 grid-pattern opacity-30" />
      <BurstShape
        :size="120"
        class="absolute top-10 right-10 text-accent hidden lg:block animate-[brutal-wiggle_3s_ease-in-out_infinite]"
      />
      <Star5Shape :size="80" class="absolute bottom-20 left-20 text-secondary hidden lg:block" />

      <div class="container mx-auto px-4 py-20 md:py-32 relative">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" class="mb-6 shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
              <span class="flex items-center gap-1">
                <span class="w-2 h-2 bg-success rounded-full animate-pulse" />
                Available for work
              </span>
            </Badge>
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6">
              {{ portfolioData.tagline }}
              <span class="relative inline-block bg-accent px-3 py-1 border-3 border-foreground transform -rotate-2 shadow-[4px_4px_0px_hsl(var(--shadow-color))] ml-2">
                {{ portfolioData.taglineHighlight }}
              </span>
            </h1>
            <p class="text-xl text-muted-foreground mb-8 max-w-lg">
              {{ portfolioData.description }}
            </p>
            <div class="flex flex-wrap gap-4">
              <Button size="lg" class="gap-2" animation="pulse">
                Get In Touch
                <ArrowRight class="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">View Resume</Button>
            </div>
          </div>

          <div class="relative">
            <div class="relative w-full max-w-md mx-auto">
              <div class="border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden bg-muted">
                <img
                  :src="portfolioData.avatar"
                  :alt="portfolioData.name"
                  class="w-full aspect-square object-cover"
                />
              </div>
              <Sticker variant="primary" rotation="medium-right" class="absolute -top-4 -right-4 z-10">
                Hire Me!
              </Sticker>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 border-b-3 border-foreground bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <Badge variant="outline" class="mb-4">Services</Badge>
          <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight">What I Do</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <Card
            v-for="service in services"
            :key="service.title"
            class="group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
          >
            <CardHeader :class="service.color">
              <div class="w-14 h-14 flex items-center justify-center bg-background border-3 border-foreground mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                <Code2 v-if="service.icon === 'code'" class="h-6 w-6" />
                <Smartphone v-else-if="service.icon === 'smartphone'" class="h-6 w-6" />
                <Palette v-else-if="service.icon === 'palette'" class="h-6 w-6" />
              </div>
              <CardTitle class="uppercase">{{ service.title }}</CardTitle>
            </CardHeader>
            <CardContent class="pt-4">
              <CardDescription class="text-foreground/70">{{ service.description }}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-20 border-b-3 border-foreground">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Badge variant="outline" class="mb-4">Experience</Badge>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">My Journey</h2>
            <p class="text-lg text-muted-foreground mb-8">
              Over the years, I've had the privilege of working with amazing teams
              and building products that impact millions of users.
            </p>
            <Button variant="outline" class="gap-2">
              Download Resume
              <ArrowRight class="h-4 w-4" />
            </Button>
          </div>

          <div class="space-y-6">
            <div
              v-for="exp in experience"
              :key="exp.year"
              class="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-foreground"
            >
              <div :class="['absolute left-[-6px] top-0 w-4 h-4 border-3 border-foreground', exp.color]" />
              <Card>
                <CardHeader class="pb-2">
                  <div class="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">{{ exp.year }}</Badge>
                  </div>
                  <CardTitle class="text-xl">{{ exp.title }}</CardTitle>
                  <CardDescription class="flex items-center gap-1 font-medium">
                    <Briefcase class="h-4 w-4" />
                    {{ exp.company }}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-muted-foreground">{{ exp.description }}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 border-b-3 border-foreground bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <Badge variant="outline" class="mb-4">Portfolio</Badge>
          <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Featured Projects</h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work across web, mobile, and product design.
          </p>
        </div>

        <div class="space-y-8">
          <Card v-for="(project, index) in projects" :key="project.title" class="overflow-hidden">
            <div :class="['grid lg:grid-cols-2', index % 2 === 1 ? 'lg:flex-row-reverse' : '']">
              <div
                :class="[
                  'border-b-3 lg:border-b-0 border-foreground',
                  index % 2 === 0 ? 'lg:border-r-3' : 'lg:border-l-3 lg:order-2',
                ]"
              >
                <img :src="project.image" :alt="project.title" class="w-full h-64 lg:h-full object-cover" />
              </div>

              <div :class="['p-8 flex flex-col justify-center', index % 2 === 1 ? 'lg:order-1' : '']">
                <Badge variant="outline" :class="`w-fit mb-4 border-0 ${project.color}`">
                  {{ project.category }}
                </Badge>
                <h3 class="text-2xl font-black uppercase mb-4">{{ project.title }}</h3>
                <p class="text-muted-foreground mb-6">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                  <Badge v-for="tag in project.tags" :key="tag" variant="secondary">{{ tag }}</Badge>
                </div>
                <Button class="w-fit gap-2">
                  View Project
                  <ExternalLink class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 border-b-3 border-foreground">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <Badge variant="outline" class="mb-4">Testimonials</Badge>
          <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight">What Clients Say</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <Card
            v-for="testimonial in testimonials"
            :key="testimonial.author"
            :class="`relative overflow-hidden ${testimonial.color}/10`"
          >
            <HeartShape :size="60" :class="`absolute -top-2 -right-2 opacity-20 ${testimonial.color.replace('bg-', 'text-')}`" />
            <CardContent class="pt-6">
              <div class="flex gap-1 mb-4">
                <Star v-for="i in 5" :key="i" class="h-5 w-5 fill-warning text-warning" />
              </div>
              <p class="text-lg mb-6">"{{ testimonial.quote }}"</p>
              <div class="flex items-center gap-3">
                <div :class="['w-12 h-12 border-3 border-foreground flex items-center justify-center font-bold text-lg', testimonial.color]">
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

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-primary">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Let's Work Together</h2>
            <p class="text-lg mb-6 text-primary-foreground/80">
              Have a project in mind? I'd love to hear about it. Drop me a message
              and let's create something amazing together.
            </p>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-background border-3 border-foreground flex items-center justify-center">
                  <Mail class="h-5 w-5" />
                </div>
                <a :href="`mailto:${portfolioData.email}`" class="font-medium hover:underline">
                  {{ portfolioData.email }}
                </a>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-background border-3 border-foreground flex items-center justify-center">
                  <MapPin class="h-5 w-5" />
                </div>
                <span class="font-medium">{{ portfolioData.location }}</span>
              </div>
            </div>
          </div>

          <Card class="bg-background">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Your Email" type="email" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Tell me about your project..." class="min-h-[120px]" />
              <Button class="w-full gap-2">
                Send Message
                <ArrowRight class="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 bg-foreground text-background border-t-3 border-foreground">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary border-3 border-background" />
            <span class="font-black uppercase">{{ portfolioData.name }}</span>
          </div>
          <p class="text-sm text-background/70">
            &copy; {{ new Date().getFullYear() }} {{ portfolioData.name }}. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <a
              :href="portfolioData.social.github"
              target="_blank"
              rel="noopener noreferrer"
              class="text-background/70 hover:text-background transition-colors"
            >
              GitHub
            </a>
            <a
              :href="portfolioData.social.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="text-background/70 hover:text-background transition-colors"
            >
              LinkedIn
            </a>
            <a
              :href="portfolioData.social.twitter"
              target="_blank"
              rel="noopener noreferrer"
              class="text-background/70 hover:text-background transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
