/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cn, safeHref } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Mail, ArrowRight, createLucideIcon } from 'lucide-react'

// lucide-react 1.x dropped brand icons; these keep the paths 0.x shipped.
const Twitter = createLucideIcon('twitter', [
  ['path', { d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z', key: 'tw1' }],
])
const Github = createLucideIcon('github', [
  ['path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4', key: 'gh1' }],
  ['path', { d: 'M9 18c-4.51 2-5-2-7-2', key: 'gh2' }],
])
const Linkedin = createLucideIcon('linkedin', [
  ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z', key: 'li1' }],
  ['rect', { width: '4', height: '12', x: '2', y: '9', key: 'li2' }],
  ['circle', { cx: '4', cy: '4', r: '2', key: 'li3' }],
])
const Instagram = createLucideIcon('instagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: 'ig1' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: 'ig2' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'ig3' }],
])
const Youtube = createLucideIcon('youtube', [
  ['path', { d: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17', key: 'yt1' }],
  ['path', { d: 'm10 15 5-3-5-3z', key: 'yt2' }],
])

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterSocialLink {
  platform: 'twitter' | 'github' | 'linkedin' | 'instagram' | 'youtube'
  href: string
}

// ============================================================================
// FOOTER VARIANT 1: Multi-Column
// ============================================================================
export interface FooterMultiColumnProps {
  logo?: React.ReactNode
  description?: string
  columns: FooterColumn[]
  socialLinks?: FooterSocialLink[]
  copyright?: string
  className?: string
}

export function FooterMultiColumn({
  logo,
  description,
  columns,
  socialLinks,
  copyright = `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  className,
}: FooterMultiColumnProps) {
  const totalCols = columns.length + 1 // +1 for brand column (counts as 2 on lg)
  const lgCols = Math.min(totalCols + 1, 6) // brand takes 2 slots on lg
  const lgColsClass = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
  }[lgCols] ?? 'lg:grid-cols-6'

  return (
    <footer className={cn('py-16 px-4 md:px-8 lg:px-16 border-t-3 border-foreground', className)}>
      <div className="max-w-7xl mx-auto">
        <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-8 mb-12', lgColsClass)}>
          {/* Brand column */}
          <div className="col-span-2 space-y-4">
            {logo && <div className="font-black text-2xl uppercase">{logo}</div>}
            {description && (
              <p className="text-muted-foreground font-medium max-w-xs">
                {description}
              </p>
            )}
            {socialLinks && (
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <SocialIcon key={`social-${link.platform}`} platform={link.platform} href={safeHref(link.href)} />
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((column, index) => (
            <div key={`col-${index}`} className="space-y-4">
              <h4 className="font-black uppercase text-sm tracking-wide">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={`link-${link.label}`}>
                    <a
                      href={safeHref(link.href)}
                      className="text-muted-foreground hover:text-foreground font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-foreground h-[3px]" />

        <div className="pt-8 text-center text-sm text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// FOOTER VARIANT 2: With Newsletter
// ============================================================================
export interface FooterWithNewsletterProps {
  logo?: React.ReactNode
  columns: FooterColumn[]
  newsletterTitle?: string
  newsletterDescription?: string
  onNewsletterSubmit?: (email: string) => void
  copyright?: string
  className?: string
}

export function FooterWithNewsletter({
  logo,
  columns,
  newsletterTitle = 'Subscribe to our newsletter',
  newsletterDescription = 'Get the latest updates and news delivered to your inbox.',
  onNewsletterSubmit,
  copyright = `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  className,
}: FooterWithNewsletterProps) {
  const [email, setEmail] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNewsletterSubmit?.(email)
    setEmail('')
  }

  return (
    <footer className={cn('py-16 px-4 md:px-8 lg:px-16 border-t-3 border-foreground bg-muted/30', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Newsletter section */}
          <div className="space-y-4">
            {logo && <div className="font-black text-2xl uppercase">{logo}</div>}
            <h4 className="font-black uppercase text-lg">{newsletterTitle}</h4>
            <p className="text-muted-foreground font-medium">
              {newsletterDescription}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" aria-label="Subscribe">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Links section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {columns.map((column, index) => (
              <div key={`col-${index}`} className="space-y-4">
                <h4 className="font-black uppercase text-sm tracking-wide">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={`link-${link.label}`}>
                      <a
                        href={safeHref(link.href)}
                        className="text-muted-foreground hover:text-foreground font-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-foreground h-[3px]" />

        <div className="pt-8 text-center text-sm text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// FOOTER VARIANT 3: Simple Centered
// ============================================================================
export interface FooterSimpleProps {
  logo?: React.ReactNode
  links?: FooterLink[]
  socialLinks?: FooterSocialLink[]
  copyright?: string
  className?: string
}

export function FooterSimple({
  logo,
  links,
  socialLinks,
  copyright = `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  className,
}: FooterSimpleProps) {
  return (
    <footer className={cn('py-12 px-4 md:px-8 lg:px-16 border-t-3 border-foreground', className)}>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {logo && <div className="font-black text-2xl uppercase">{logo}</div>}

        {links && (
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <a
                key={`link-${link.label}`}
                href={safeHref(link.href)}
                className="text-muted-foreground hover:text-foreground font-bold uppercase text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {socialLinks && (
          <div className="flex justify-center gap-2">
            {socialLinks.map((link) => (
              <SocialIcon key={`social-${link.platform}`} platform={link.platform} href={safeHref(link.href)} />
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground">{copyright}</p>
      </div>
    </footer>
  )
}

// ============================================================================
// FOOTER VARIANT 4: Minimal
// ============================================================================
export interface FooterMinimalProps {
  logo?: React.ReactNode
  links?: FooterLink[]
  copyright?: string
  className?: string
}

export function FooterMinimal({
  logo,
  links,
  copyright = `© ${new Date().getFullYear()}`,
  className,
}: FooterMinimalProps) {
  return (
    <footer className={cn('py-8 px-4 md:px-8 lg:px-16 border-t-3 border-foreground', className)}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {logo && <div className="font-black text-lg uppercase">{logo}</div>}
          <span className="text-sm text-muted-foreground">{copyright}</span>
        </div>

        {links && (
          <nav className="flex flex-wrap gap-4">
            {links.map((link) => (
              <a
                key={`link-${link.label}`}
                href={safeHref(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}

// ============================================================================
// FOOTER VARIANT 5: With CTA
// ============================================================================
export interface FooterWithCTAProps {
  logo?: React.ReactNode
  description?: string
  columns: FooterColumn[]
  ctaTitle?: string
  ctaAction?: { label: string; onClick?: () => void }
  socialLinks?: FooterSocialLink[]
  copyright?: string
  className?: string
}

export function FooterWithCTA({
  logo,
  description,
  columns,
  ctaTitle = 'Ready to get started?',
  ctaAction,
  socialLinks,
  copyright = `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  className,
}: FooterWithCTAProps) {
  return (
    <footer className={cn('border-t-3 border-foreground', className)}>
      {/* CTA Banner */}
      <div className="py-12 px-4 md:px-8 lg:px-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl font-black uppercase">{ctaTitle}</h3>
          {ctaAction && (
            <Button
              size="lg"
              variant="outline"
              className="bg-background text-foreground hover:bg-background/90"
              onClick={ctaAction.onClick}
            >
              {ctaAction.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1 space-y-4">
              {logo && <div className="font-black text-xl uppercase">{logo}</div>}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
              {socialLinks && (
                <div className="flex gap-2">
                  {socialLinks.map((link) => (
                    <SocialIcon key={`social-${link.platform}`} platform={link.platform} href={safeHref(link.href)} size="sm" />
                  ))}
                </div>
              )}
            </div>

            {columns.map((column, index) => (
              <div key={`col-${index}`} className="space-y-3">
                <h4 className="font-black uppercase text-xs tracking-wide">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={`link-${link.label}`}>
                      <a
                        href={safeHref(link.href)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-foreground h-[3px]" />

          <div className="pt-6 text-center text-xs text-muted-foreground">
            {copyright}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// Helper Components
// ============================================================================
function SocialIcon({
  platform,
  href,
  size = 'default',
}: {
  platform: FooterSocialLink['platform']
  href: string
  size?: 'sm' | 'default'
}) {
  const icons = {
    twitter: Twitter,
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube,
  }

  const Icon = icons[platform]
  const sizeClasses = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  return (
    <a
      href={safeHref(href)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center justify-center border-2 border-foreground bg-muted hover:bg-primary hover:text-primary-foreground transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        sizeClasses
      )}
    >
      <Icon className={iconSize} />
    </a>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const FooterSection = {
  MultiColumn: FooterMultiColumn,
  WithNewsletter: FooterWithNewsletter,
  Simple: FooterSimple,
  Minimal: FooterMinimal,
  WithCTA: FooterWithCTA,
}
