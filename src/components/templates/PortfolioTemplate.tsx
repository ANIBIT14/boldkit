import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BurstShape, Star5Shape, HeartShape } from '@/components/ui/shapes'
import { Sticker } from '@/components/ui/sticker'
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
} from 'lucide-react'
import { SEO } from '@/components/SEO'

// ============================================
// PORTFOLIO TEMPLATE - NEUBRUTALISM STYLE
// ============================================
// Inspired by modern portfolio designs with bold neubrutalism aesthetics
// Customize the content below for your own portfolio

// --- CUSTOMIZATION DATA ---
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

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Building modern web applications with React, Next.js, and Tailwind CSS.',
    color: 'bg-primary',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile apps with React Native and Flutter.',
    color: 'bg-secondary',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Designing intuitive interfaces that prioritize user experience and accessibility.',
    color: 'bg-accent',
  },
]

const experience = [
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

const projects = [
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

const testimonials = [
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

// --- COMPONENT SECTIONS ---

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b-3 border-foreground">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      {/* Decorative shapes */}
      <BurstShape
        size={120}
        className="absolute top-10 right-10 text-accent hidden lg:block animate-[brutal-wiggle_3s_ease-in-out_infinite]"
      />
      <Star5Shape size={80} className="absolute bottom-20 left-20 text-secondary hidden lg:block" />

      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-6 shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                Available for work
              </span>
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6">
              {portfolioData.tagline}{' '}
              <span className="relative inline-block bg-accent px-3 py-1 border-3 border-foreground transform -rotate-2 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
                {portfolioData.taglineHighlight}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              {portfolioData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" animation="pulse">
                Get In Touch
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                View Resume
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main image */}
              <div className="border-3 border-foreground shadow-[8px_8px_0px_hsl(var(--shadow-color))] overflow-hidden bg-muted">
                <img
                  src={portfolioData.avatar}
                  alt={portfolioData.name}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating sticker */}
              <Sticker
                variant="primary"
                rotation="medium-right"
                className="absolute -top-4 -right-4 z-10"
              >
                Hire Me!
              </Sticker>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="py-20 border-b-3 border-foreground bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Services</Badge>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            What I Do
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
            >
              <CardHeader className={service.color}>
                <div className="w-14 h-14 flex items-center justify-center bg-background border-3 border-foreground mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="uppercase">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-foreground/70">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section className="py-20 border-b-3 border-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Badge variant="outline" className="mb-4">Experience</Badge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
              My Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Over the years, I've had the privilege of working with amazing teams
              and building products that impact millions of users.
            </p>
            <Button variant="outline" className="gap-2">
              Download Resume
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-foreground"
              >
                <div
                  className={`absolute left-[-6px] top-0 w-4 h-4 ${exp.color} border-3 border-foreground`}
                />
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary">{exp.year}</Badge>
                    </div>
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 font-medium">
                      <Briefcase className="h-4 w-4" />
                      {exp.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section className="py-20 border-b-3 border-foreground bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Portfolio</Badge>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work across web, mobile, and product design.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div
                  className={`border-b-3 lg:border-b-0 ${index % 2 === 0 ? 'lg:border-r-3' : 'lg:border-l-3 lg:order-2'} border-foreground`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Badge variant="outline" className={`w-fit mb-4 ${project.color} border-0`}>
                    {project.category}
                  </Badge>
                  <h3 className="text-2xl font-black uppercase mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-fit gap-2">
                    View Project
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="py-20 border-b-3 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            What Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${testimonial.color}/10`}
            >
              <HeartShape
                size={60}
                className={`absolute -top-2 -right-2 ${testimonial.color.replace('bg-', 'text-')} opacity-20`}
              />
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-lg mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${testimonial.color} border-3 border-foreground flex items-center justify-center font-bold text-lg`}
                  >
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg mb-6 text-primary-foreground/80">
              Have a project in mind? I'd love to hear about it. Drop me a message
              and let's create something amazing together.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background border-3 border-foreground flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <a href={`mailto:${portfolioData.email}`} className="font-medium hover:underline">
                  {portfolioData.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background border-3 border-foreground flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="font-medium">{portfolioData.location}</span>
              </div>
            </div>
          </div>

          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Your Email" type="email" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Tell me about your project..." className="min-h-[120px]" />
              <Button className="w-full gap-2">
                Send Message
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function PortfolioFooter() {
  return (
    <footer className="py-8 bg-foreground text-background border-t-3 border-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary border-3 border-background" />
            <span className="font-black uppercase">{portfolioData.name}</span>
          </div>
          <p className="text-sm text-background/70">
            &copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={portfolioData.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// --- MAIN TEMPLATE ---
export function PortfolioTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Portfolio Template"
        description="A professional portfolio template for developers and designers with hero, services, projects, and contact sections. Built with BoldKit neubrutalism components."
        keywords="portfolio template, developer portfolio, designer portfolio, react portfolio, vue portfolio, neubrutalism portfolio"
        canonical="https://boldkit.dev/templates/portfolio"
        breadcrumbs={[
          { name: 'Home', url: 'https://boldkit.dev/' },
          { name: 'Templates', url: 'https://boldkit.dev/templates' },
          { name: 'Portfolio' },
        ]}
      />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b-3 border-foreground bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary border-3 border-foreground" />
            <span className="font-black text-xl uppercase">{portfolioData.name.split(' ')[0]}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="font-bold hover:text-primary transition-colors">
              Services
            </a>
            <a href="#experience" className="font-bold hover:text-primary transition-colors">
              Experience
            </a>
            <a href="#projects" className="font-bold hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#contact" className="font-bold hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          <Button>Hire Me</Button>
        </div>
      </nav>

      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="experience">
        <ExperienceSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <TestimonialsSection />
      <div id="contact">
        <ContactSection />
      </div>
      <PortfolioFooter />
    </div>
  )
}

export default PortfolioTemplate
