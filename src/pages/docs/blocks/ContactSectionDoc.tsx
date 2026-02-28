import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  ContactSplit,
  ContactCentered,
  ContactWithCards,
  ContactWithMap,
} from '@/components/blocks/marketing/contact-section'
import { Mail, Phone, MessageSquare } from 'lucide-react'

const contactInfo = {
  email: 'hello@boldkit.dev',
  phone: '+1 (555) 123-4567',
  address: '123 Design Street, San Francisco, CA 94102',
  hours: 'Mon-Fri 9AM-6PM PST',
}

const contactMethods = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email Us',
    description: 'Get a response within 24 hours.',
    action: { label: 'Send Email', href: 'mailto:hello@boldkit.dev' },
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Call Us',
    description: 'Available Monday to Friday.',
    action: { label: 'Call Now', href: 'tel:+15551234567' },
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Live Chat',
    description: 'Chat with our support team.',
    action: { label: 'Start Chat', href: '#' },
  },
]

const variants = [
  {
    name: 'Split',
    description: 'Two-column layout with info and contact form.',
    preview: (
      <ContactSplit
        title="Get in touch"
        description="We'd love to hear from you. Send us a message."
        contactInfo={contactInfo}
        onSubmit={(data) => console.log('Contact:', data)}
      />
    ),
    reactCode: `import { ContactSection } from '@/components/blocks/marketing'

<ContactSection.Split
  title="Get in touch"
  description="We'd love to hear from you."
  contactInfo={{
    email: 'hello@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Street, City, State',
    hours: 'Mon-Fri 9AM-6PM',
  }}
  onSubmit={(data) => handleSubmit(data)}
/>`,
    vueCode: `<script setup lang="ts">
import { ContactSection } from '@/components/blocks/marketing'

const contactInfo = {
  email: 'hello@company.com',
  phone: '+1 (555) 123-4567',
}
</script>

<template>
  <ContactSection
    variant="split"
    title="Get in touch"
    :contact-info="contactInfo"
    @submit="handleSubmit"
  />
</template>`,
  },
  {
    name: 'Centered',
    description: 'Centered contact form with subject field.',
    preview: (
      <ContactCentered
        title="Contact Us"
        description="Fill out the form and we'll get back to you."
        onSubmit={(data) => console.log('Contact:', data)}
      />
    ),
    reactCode: `import { ContactSection } from '@/components/blocks/marketing'

<ContactSection.Centered
  title="Contact Us"
  description="Fill out the form."
  onSubmit={(data) => handleSubmit(data)}
/>`,
    vueCode: `<template>
  <ContactSection
    variant="centered"
    title="Contact Us"
    @submit="handleSubmit"
  />
</template>`,
  },
  {
    name: 'WithCards',
    description: 'Contact method cards with icons.',
    preview: (
      <ContactWithCards
        title="Get in touch"
        description="Choose your preferred way to reach us."
        contactMethods={contactMethods}
      />
    ),
    reactCode: `import { ContactSection } from '@/components/blocks/marketing'
import { Mail, Phone, MessageSquare } from 'lucide-react'

<ContactSection.WithCards
  title="Get in touch"
  description="Choose your preferred way to reach us."
  contactMethods={[
    {
      icon: <Mail />,
      title: 'Email Us',
      description: 'Response within 24 hours.',
      action: { label: 'Send Email', href: 'mailto:...' },
    },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { ContactSection } from '@/components/blocks/marketing'
import { Mail, Phone } from 'lucide-vue-next'

const contactMethods = [
  { icon: Mail, title: 'Email Us', action: { label: 'Send Email', href: 'mailto:...' } },
]
</script>

<template>
  <ContactSection variant="withCards" :contact-methods="contactMethods" />
</template>`,
  },
  {
    name: 'WithMap',
    description: 'Contact form with map/location display.',
    preview: (
      <ContactWithMap
        title="Visit Us"
        contactInfo={contactInfo}
        onSubmit={(data) => console.log('Contact:', data)}
      />
    ),
    reactCode: `import { ContactSection } from '@/components/blocks/marketing'

<ContactSection.WithMap
  title="Visit Us"
  contactInfo={contactInfo}
  mapPlaceholder={<GoogleMap />} // or any map component
  onSubmit={(data) => handleSubmit(data)}
/>`,
    vueCode: `<template>
  <ContactSection
    variant="withMap"
    title="Visit Us"
    :contact-info="contactInfo"
    @submit="handleSubmit"
  >
    <template #map>
      <GoogleMap />
    </template>
  </ContactSection>
</template>`,
  },
]

export function ContactSectionDoc() {
  return (
    <BlockDoc
      name="Contact Section"
      description="Contact forms and information sections with various layouts including split view, centered form, contact method cards, and map integration."
      category="marketing"
      variants={variants}
    />
  )
}

export default ContactSectionDoc
