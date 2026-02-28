import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Quote, Star } from 'lucide-react'

export interface TestimonialItem {
  quote: string
  author: string
  role: string
  company?: string
  avatar?: string
  rating?: number
}

// ============================================================================
// TESTIMONIALS VARIANT 1: Cards Grid
// ============================================================================
export interface TestimonialsGridProps {
  title?: string
  subtitle?: string
  testimonials: TestimonialItem[]
  columns?: 2 | 3
  className?: string
}

export function TestimonialsGrid({
  title,
  subtitle,
  testimonials,
  columns = 3,
  className,
}: TestimonialsGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12 space-y-4">
            {subtitle && (
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className={cn('grid gap-6', gridCols[columns])}>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="h-8 w-8 text-primary" />

                {testimonial.rating && (
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < testimonial.rating!
                            ? 'fill-warning text-warning'
                            : 'text-muted-foreground'
                        )}
                      />
                    ))}
                  </div>
                )}

                <p className="text-lg font-medium leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t-2 border-foreground">
                  <Avatar className="h-12 w-12 border-2 border-foreground">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="font-bold">
                      {testimonial.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
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

// ============================================================================
// TESTIMONIALS VARIANT 2: Single Quote (Large)
// ============================================================================
export interface TestimonialsSingleProps {
  testimonial: TestimonialItem
  className?: string
}

export function TestimonialsSingle({
  testimonial,
  className,
}: TestimonialsSingleProps) {
  return (
    <section className={cn('py-20 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <Quote className="h-16 w-16 text-primary mx-auto" />

        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
          "{testimonial.quote}"
        </blockquote>

        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-16 w-16 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
            <AvatarImage src={testimonial.avatar} />
            <AvatarFallback className="font-bold text-xl">
              {testimonial.author.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-black text-lg uppercase">{testimonial.author}</p>
            <p className="text-muted-foreground font-medium">
              {testimonial.role}
              {testimonial.company && ` at ${testimonial.company}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TESTIMONIALS VARIANT 3: Masonry Layout
// ============================================================================
export interface TestimonialsMasonryProps {
  title?: string
  testimonials: TestimonialItem[]
  className?: string
}

export function TestimonialsMasonry({
  title,
  testimonials,
  className,
}: TestimonialsMasonryProps) {
  // Split testimonials into columns
  const columns = [
    testimonials.filter((_, i) => i % 3 === 0),
    testimonials.filter((_, i) => i % 3 === 1),
    testimonials.filter((_, i) => i % 3 === 2),
  ]

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-center mb-12">
            {title}
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="space-y-6">
              {column.map((testimonial, index) => (
                <Card
                  key={index}
                  className="hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition-all"
                >
                  <CardContent className="p-6 space-y-4">
                    <p className="font-medium leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-foreground">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback className="font-bold text-sm">
                          {testimonial.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TESTIMONIALS VARIANT 4: With Avatars Row
// ============================================================================
export interface TestimonialsWithAvatarsProps {
  title?: string
  description?: string
  testimonials: TestimonialItem[]
  className?: string
}

export function TestimonialsWithAvatars({
  title,
  description,
  testimonials,
  className,
}: TestimonialsWithAvatarsProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeTestimonial = testimonials[activeIndex]

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16 bg-muted/30', className)}>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {(title || description) && (
          <div className="space-y-4">
            {title && (
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground font-medium">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="border-3 border-foreground bg-card p-8 shadow-[6px_6px_0px_hsl(var(--shadow-color))]">
          <Quote className="h-10 w-10 text-primary mx-auto mb-6" />

          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
            "{activeTestimonial.quote}"
          </blockquote>

          <div>
            <p className="font-black uppercase">{activeTestimonial.author}</p>
            <p className="text-sm text-muted-foreground">
              {activeTestimonial.role}
              {activeTestimonial.company && ` at ${activeTestimonial.company}`}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'transition-all',
                index === activeIndex
                  ? 'scale-110'
                  : 'opacity-50 hover:opacity-100'
              )}
            >
              <Avatar
                className={cn(
                  'h-12 w-12 border-3 border-foreground',
                  index === activeIndex && 'shadow-[3px_3px_0px_hsl(var(--shadow-color))]'
                )}
              >
                <AvatarImage src={testimonial.avatar} />
                <AvatarFallback className="font-bold">
                  {testimonial.author.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const Testimonials = {
  Grid: TestimonialsGrid,
  Single: TestimonialsSingle,
  Masonry: TestimonialsMasonry,
  WithAvatars: TestimonialsWithAvatars,
}
