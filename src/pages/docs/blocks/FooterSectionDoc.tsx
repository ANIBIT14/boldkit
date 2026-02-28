import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  FooterMultiColumn,
  FooterWithNewsletter,
  FooterSimple,
  FooterMinimal,
  FooterWithCTA,
} from '@/components/blocks/marketing/footer-section'

const sampleColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Documentation', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
]

const socialLinks = [
  { platform: 'twitter' as const, href: '#' },
  { platform: 'github' as const, href: '#' },
  { platform: 'linkedin' as const, href: '#' },
]

const variants = [
  {
    name: 'MultiColumn',
    description: 'Full footer with multiple link columns.',
    preview: (
      <FooterMultiColumn
        logo="BoldKit"
        description="Build bold interfaces with neubrutalism design."
        columns={sampleColumns}
        socialLinks={socialLinks}
      />
    ),
    reactCode: `import { FooterSection } from '@/components/blocks/marketing'

<FooterSection.MultiColumn
  logo={<Logo />}
  description="Build bold interfaces."
  columns={[
    {
      title: 'Product',
      links: [{ label: 'Features', href: '/features' }],
    },
  ]}
  socialLinks={[
    { platform: 'twitter', href: 'https://twitter.com/...' },
  ]}
  copyright="© 2024 Company. All rights reserved."
/>`,
    vueCode: `<script setup lang="ts">
import { FooterSection } from '@/components/blocks/marketing'
</script>

<template>
  <FooterSection
    variant="multiColumn"
    :columns="columns"
    :social-links="socialLinks"
  >
    <template #logo>
      <Logo />
    </template>
  </FooterSection>
</template>`,
  },
  {
    name: 'WithNewsletter',
    description: 'Footer with newsletter signup form.',
    preview: (
      <FooterWithNewsletter
        logo="BoldKit"
        columns={sampleColumns.slice(0, 2)}
        newsletterTitle="Stay updated"
        newsletterDescription="Get the latest news and updates."
        onNewsletterSubmit={(email) => console.log('Subscribed:', email)}
      />
    ),
    reactCode: `import { FooterSection } from '@/components/blocks/marketing'

<FooterSection.WithNewsletter
  logo={<Logo />}
  columns={columns}
  newsletterTitle="Stay updated"
  newsletterDescription="Get the latest news."
  onNewsletterSubmit={(email) => subscribe(email)}
/>`,
    vueCode: `<template>
  <FooterSection
    variant="withNewsletter"
    :columns="columns"
    newsletter-title="Stay updated"
    @newsletter-submit="handleSubscribe"
  />
</template>`,
  },
  {
    name: 'Simple',
    description: 'Centered footer with links and social icons.',
    preview: (
      <FooterSimple
        logo="BoldKit"
        links={[
          { label: 'Home', href: '#' },
          { label: 'About', href: '#' },
          { label: 'Contact', href: '#' },
        ]}
        socialLinks={socialLinks}
      />
    ),
    reactCode: `import { FooterSection } from '@/components/blocks/marketing'

<FooterSection.Simple
  logo={<Logo />}
  links={[{ label: 'Home', href: '/' }]}
  socialLinks={socialLinks}
/>`,
    vueCode: `<template>
  <FooterSection
    variant="simple"
    :links="links"
    :social-links="socialLinks"
  />
</template>`,
  },
  {
    name: 'Minimal',
    description: 'Single-line minimal footer.',
    preview: (
      <FooterMinimal
        logo="BoldKit"
        links={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
        ]}
      />
    ),
    reactCode: `import { FooterSection } from '@/components/blocks/marketing'

<FooterSection.Minimal
  logo={<Logo />}
  links={[{ label: 'Privacy', href: '/privacy' }]}
  copyright="© 2024"
/>`,
    vueCode: `<template>
  <FooterSection variant="minimal" :links="links" />
</template>`,
  },
  {
    name: 'WithCTA',
    description: 'Footer with prominent call-to-action banner.',
    preview: (
      <FooterWithCTA
        logo="BoldKit"
        description="The neubrutalism UI library."
        columns={sampleColumns.slice(0, 2)}
        ctaTitle="Ready to get started?"
        ctaAction={{ label: 'Start Free Trial', onClick: () => {} }}
        socialLinks={socialLinks}
      />
    ),
    reactCode: `import { FooterSection } from '@/components/blocks/marketing'

<FooterSection.WithCTA
  logo={<Logo />}
  columns={columns}
  ctaTitle="Ready to get started?"
  ctaAction={{ label: 'Start Free Trial', onClick: handleStart }}
  socialLinks={socialLinks}
/>`,
    vueCode: `<template>
  <FooterSection
    variant="withCTA"
    :columns="columns"
    cta-title="Ready to get started?"
    :cta-action="{ label: 'Start Free Trial' }"
    @cta-click="handleStart"
  />
</template>`,
  },
]

export function FooterSectionDoc() {
  return (
    <BlockDoc
      name="Footer Section"
      description="Website footers with various layouts including multi-column, newsletter signup, simple centered, minimal single-line, and with call-to-action banners."
      category="marketing"
      variants={variants}
    />
  )
}

export default FooterSectionDoc
