import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  FAQAccordion,
  FAQTwoColumns,
  FAQWithCategories,
  FAQWithContact,
  FAQSimpleList,
} from '@/components/blocks/marketing/faq-section'

const sampleFAQs = [
  { question: 'What is BoldKit?', answer: 'BoldKit is a neubrutalism UI component library for React and Vue, designed to help developers build bold, expressive interfaces.' },
  { question: 'Is BoldKit free to use?', answer: 'Yes, BoldKit is open source and free for personal and commercial use under the MIT license.' },
  { question: 'Does BoldKit support dark mode?', answer: 'Absolutely! All components are designed with dark mode support out of the box using CSS variables.' },
  { question: 'Can I customize the components?', answer: 'Yes, all components are fully customizable using Tailwind CSS classes and CSS variables.' },
]

const categories = [
  { name: 'General', items: sampleFAQs.slice(0, 2) },
  { name: 'Pricing', items: [{ question: 'Is it free?', answer: 'Yes, BoldKit is completely free.' }] },
  { name: 'Technical', items: sampleFAQs.slice(2) },
]

const variants = [
  {
    name: 'Accordion',
    description: 'Expandable accordion-style FAQ list.',
    preview: (
      <FAQAccordion
        title="Frequently Asked Questions"
        subtitle="FAQ"
        items={sampleFAQs}
      />
    ),
    reactCode: `import { FAQSection } from '@/components/blocks/marketing'

<FAQSection.Accordion
  title="Frequently Asked Questions"
  subtitle="FAQ"
  items={[
    { question: 'What is BoldKit?', answer: 'A UI library...' },
  ]}
/>`,
    vueCode: `<script setup lang="ts">
import { FAQSection } from '@/components/blocks/marketing'

const items = [
  { question: 'What is BoldKit?', answer: 'A UI library...' },
]
</script>

<template>
  <FAQSection variant="accordion" title="FAQ" :items="items" />
</template>`,
  },
  {
    name: 'TwoColumns',
    description: 'FAQs displayed in two-column card layout.',
    preview: (
      <FAQTwoColumns
        title="Common Questions"
        items={sampleFAQs}
      />
    ),
    reactCode: `import { FAQSection } from '@/components/blocks/marketing'

<FAQSection.TwoColumns
  title="Common Questions"
  items={faqItems}
/>`,
    vueCode: `<template>
  <FAQSection variant="twoColumns" title="Common Questions" :items="items" />
</template>`,
  },
  {
    name: 'WithCategories',
    description: 'FAQs organized by category tabs.',
    preview: (
      <FAQWithCategories
        title="Help Center"
        categories={categories}
      />
    ),
    reactCode: `import { FAQSection } from '@/components/blocks/marketing'

<FAQSection.WithCategories
  title="Help Center"
  categories={[
    { name: 'General', items: [...] },
    { name: 'Pricing', items: [...] },
  ]}
/>`,
    vueCode: `<template>
  <FAQSection variant="withCategories" title="Help Center" :categories="categories" />
</template>`,
  },
  {
    name: 'WithContact',
    description: 'FAQ section with contact CTA at the bottom.',
    preview: (
      <FAQWithContact
        title="Questions & Answers"
        items={sampleFAQs.slice(0, 3)}
        contactTitle="Still have questions?"
        contactDescription="Can't find the answer? Reach out to our team."
        contactAction={{ label: 'Contact Support', onClick: () => {} }}
      />
    ),
    reactCode: `import { FAQSection } from '@/components/blocks/marketing'

<FAQSection.WithContact
  title="Questions & Answers"
  items={faqItems}
  contactTitle="Still have questions?"
  contactDescription="Reach out to our team."
  contactAction={{ label: 'Contact Support', onClick: handleContact }}
/>`,
    vueCode: `<template>
  <FAQSection
    variant="withContact"
    title="Q&A"
    :items="items"
    contact-title="Still have questions?"
    :contact-action="{ label: 'Contact Support' }"
    @contact-click="handleContact"
  />
</template>`,
  },
  {
    name: 'SimpleList',
    description: 'Simple non-collapsible FAQ list.',
    preview: (
      <FAQSimpleList
        title="Quick Answers"
        items={sampleFAQs.slice(0, 3)}
      />
    ),
    reactCode: `import { FAQSection } from '@/components/blocks/marketing'

<FAQSection.SimpleList
  title="Quick Answers"
  items={faqItems}
/>`,
    vueCode: `<template>
  <FAQSection variant="simpleList" title="Quick Answers" :items="items" />
</template>`,
  },
]

export function FAQSectionDoc() {
  return (
    <BlockDoc
      name="FAQ Section"
      description="Display frequently asked questions with various layouts including accordions, two-column grids, categorized tabs, with contact CTA, and simple lists."
      category="marketing"
      variants={variants}
    />
  )
}

export default FAQSectionDoc
