import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  TestimonialsGrid,
  TestimonialsSingle,
  TestimonialsMasonry,
  TestimonialsWithAvatars,
} from '@/components/blocks/marketing/testimonials'

const sampleTestimonials = [
  { quote: 'BoldKit transformed our development workflow. The neubrutalism style is exactly what we needed.', author: 'Sarah Chen', role: 'CTO', company: 'TechStart', rating: 5 },
  { quote: 'Finally, a design system that stands out. Our clients love the bold aesthetic.', author: 'Mike Johnson', role: 'Design Lead', company: 'Creative Agency', rating: 5 },
  { quote: 'The components are well-documented and easy to customize. Highly recommended!', author: 'Emma Wilson', role: 'Developer', company: 'StartupXYZ', rating: 4 },
]

const variants = [
  {
    name: 'Grid',
    description: 'Testimonials displayed in a responsive grid layout.',
    preview: (
      <TestimonialsGrid
        title="What Our Users Say"
        subtitle="Testimonials"
        testimonials={sampleTestimonials}
        columns={3}
      />
    ),
    reactCode: `import { Testimonials } from '@/components/blocks/marketing'

<Testimonials.Grid
  title="What Our Users Say"
  subtitle="Testimonials"
  testimonials={[
    { quote: '...', author: 'Name', role: 'Role', company: 'Company', rating: 5 },
  ]}
  columns={3}
/>`,
    vueCode: `<script setup lang="ts">
import { Testimonials } from '@/components/blocks/marketing'

const testimonials = [
  { quote: '...', author: 'Name', role: 'Role', company: 'Company', rating: 5 },
]
</script>

<template>
  <Testimonials
    variant="grid"
    title="What Our Users Say"
    :testimonials="testimonials"
    :columns="3"
  />
</template>`,
  },
  {
    name: 'Single',
    description: 'Large, centered single testimonial display.',
    preview: (
      <TestimonialsSingle testimonial={sampleTestimonials[0]} />
    ),
    reactCode: `import { Testimonials } from '@/components/blocks/marketing'

<Testimonials.Single
  testimonial={{
    quote: 'BoldKit transformed our development workflow.',
    author: 'Sarah Chen',
    role: 'CTO',
    company: 'TechStart',
  }}
/>`,
    vueCode: `<script setup lang="ts">
import { Testimonials } from '@/components/blocks/marketing'

const testimonial = {
  quote: 'BoldKit transformed our development workflow.',
  author: 'Sarah Chen',
  role: 'CTO',
  company: 'TechStart',
}
</script>

<template>
  <Testimonials variant="single" :testimonial="testimonial" />
</template>`,
  },
  {
    name: 'Masonry',
    description: 'Pinterest-style masonry layout for varied testimonials.',
    preview: (
      <TestimonialsMasonry
        title="Customer Stories"
        testimonials={sampleTestimonials}
      />
    ),
    reactCode: `import { Testimonials } from '@/components/blocks/marketing'

<Testimonials.Masonry
  title="Customer Stories"
  testimonials={testimonials}
/>`,
    vueCode: `<template>
  <Testimonials variant="masonry" title="Customer Stories" :testimonials="testimonials" />
</template>`,
  },
  {
    name: 'WithAvatars',
    description: 'Interactive testimonials with clickable avatars.',
    preview: (
      <TestimonialsWithAvatars
        title="Trusted by Leaders"
        description="See what industry experts have to say."
        testimonials={sampleTestimonials}
      />
    ),
    reactCode: `import { Testimonials } from '@/components/blocks/marketing'

<Testimonials.WithAvatars
  title="Trusted by Leaders"
  description="See what industry experts have to say."
  testimonials={testimonials}
/>`,
    vueCode: `<template>
  <Testimonials
    variant="withAvatars"
    title="Trusted by Leaders"
    :testimonials="testimonials"
  />
</template>`,
  },
]

export function TestimonialsDoc() {
  return (
    <BlockDoc
      name="Testimonials"
      description="Display customer testimonials and reviews in various layouts including grid, single quote, masonry, and interactive avatar-based displays."
      category="marketing"
      variants={variants}
    />
  )
}

export default TestimonialsDoc
