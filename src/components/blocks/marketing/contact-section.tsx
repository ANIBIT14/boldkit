import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

export interface ContactInfo {
  email?: string
  phone?: string
  address?: string
  hours?: string
}

// ============================================================================
// CONTACT VARIANT 1: Split with Form
// ============================================================================
export interface ContactSplitProps {
  title?: string
  description?: string
  contactInfo?: ContactInfo
  onSubmit?: (data: { name: string; email: string; message: string }) => void
  className?: string
}

export function ContactSplit({
  title = 'Get in touch',
  description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  contactInfo,
  onSubmit,
  className,
}: ContactSplitProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                {description}
              </p>
            </div>

            {contactInfo && (
              <div className="space-y-4">
                {contactInfo.email && (
                  <ContactInfoItem
                    icon={<Mail className="h-5 w-5" />}
                    label="Email"
                    value={contactInfo.email}
                    href={`mailto:${contactInfo.email}`}
                  />
                )}
                {contactInfo.phone && (
                  <ContactInfoItem
                    icon={<Phone className="h-5 w-5" />}
                    label="Phone"
                    value={contactInfo.phone}
                    href={`tel:${contactInfo.phone}`}
                  />
                )}
                {contactInfo.address && (
                  <ContactInfoItem
                    icon={<MapPin className="h-5 w-5" />}
                    label="Address"
                    value={contactInfo.address}
                  />
                )}
                {contactInfo.hours && (
                  <ContactInfoItem
                    icon={<Clock className="h-5 w-5" />}
                    label="Hours"
                    value={contactInfo.hours}
                  />
                )}
              </div>
            )}
          </div>

          {/* Form side */}
          <div className="border-3 border-foreground bg-card p-8 shadow-[6px_6px_0px_hsl(var(--shadow-color))]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold uppercase text-sm">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold uppercase text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-bold uppercase text-sm">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help?"
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CONTACT VARIANT 2: Centered Form
// ============================================================================
export interface ContactCenteredProps {
  title?: string
  description?: string
  onSubmit?: (data: { name: string; email: string; subject: string; message: string }) => void
  className?: string
}

export function ContactCentered({
  title = 'Contact Us',
  description = 'Fill out the form below and we\'ll get back to you as soon as possible.',
  onSubmit,
  className,
}: ContactCenteredProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', className)}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 space-y-4">
          <MessageSquare className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-muted-foreground font-medium">
            {description}
          </p>
        </div>

        <div className="border-3 border-foreground bg-card p-8 shadow-[6px_6px_0px_hsl(var(--shadow-color))]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold uppercase text-sm">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold uppercase text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="font-bold uppercase text-sm">
                Subject
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-bold uppercase text-sm">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us more..."
                rows={6}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CONTACT VARIANT 3: With Cards
// ============================================================================
export interface ContactWithCardsProps {
  title?: string
  description?: string
  contactMethods: Array<{
    icon: React.ReactNode
    title: string
    description: string
    action: { label: string; href: string }
  }>
  className?: string
}

export function ContactWithCards({
  title = 'Get in touch',
  description = 'Choose your preferred way to reach us.',
  contactMethods,
  className,
}: ContactWithCardsProps) {
  const cardColors = [
    'bg-primary/10',
    'bg-secondary/10',
    'bg-accent/10',
  ]

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className={cn(
                'hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all',
                cardColors[index % 3]
              )}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 mx-auto flex items-center justify-center border-3 border-foreground bg-card shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
                  {method.icon}
                </div>
                <h3 className="font-black uppercase text-lg">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.description}</p>
                <Button variant="outline" asChild>
                  <a href={method.action.href}>{method.action.label}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CONTACT VARIANT 4: With Map Placeholder
// ============================================================================
export interface ContactWithMapProps {
  title?: string
  contactInfo?: ContactInfo
  mapPlaceholder?: React.ReactNode
  onSubmit?: (data: { name: string; email: string; message: string }) => void
  className?: string
}

export function ContactWithMap({
  title = 'Visit Us',
  contactInfo,
  mapPlaceholder,
  onSubmit,
  className,
}: ContactWithMapProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-center mb-12">
          {title}
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map/Image placeholder */}
          <div className="border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--shadow-color))] overflow-hidden h-[400px] lg:h-auto">
            {mapPlaceholder || (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <MapPin className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Contact info and form */}
          <div className="space-y-8">
            {contactInfo && (
              <div className="space-y-4">
                {contactInfo.address && (
                  <ContactInfoItem
                    icon={<MapPin className="h-5 w-5" />}
                    label="Address"
                    value={contactInfo.address}
                  />
                )}
                {contactInfo.phone && (
                  <ContactInfoItem
                    icon={<Phone className="h-5 w-5" />}
                    label="Phone"
                    value={contactInfo.phone}
                    href={`tel:${contactInfo.phone}`}
                  />
                )}
                {contactInfo.email && (
                  <ContactInfoItem
                    icon={<Mail className="h-5 w-5" />}
                    label="Email"
                    value={contactInfo.email}
                    href={`mailto:${contactInfo.email}`}
                  />
                )}
                {contactInfo.hours && (
                  <ContactInfoItem
                    icon={<Clock className="h-5 w-5" />}
                    label="Hours"
                    value={contactInfo.hours}
                  />
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
              />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your email"
                required
              />
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message"
                rows={4}
                required
              />
              <Button type="submit" className="w-full">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Helper Components
// ============================================================================
function ContactInfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 flex items-center justify-center border-2 border-foreground bg-muted shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    )
  }

  return content
}

// ============================================================================
// Export all variants
// ============================================================================
export const ContactSection = {
  Split: ContactSplit,
  Centered: ContactCentered,
  WithCards: ContactWithCards,
  WithMap: ContactWithMap,
}
