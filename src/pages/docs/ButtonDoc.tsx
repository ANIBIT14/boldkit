import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Loader2, Mail, ChevronRight } from 'lucide-react'
import sourceCode from '@/components/ui/button.tsx?raw'
import vueSourceCode from '@vue-ui/Button.vue?raw'



const usageCode = `import { Button } from '@/components/ui/button'

export default function Example() {
  return <Button>Click me</Button>
}`

const vueUsageCode = `<script setup lang="ts">
import { Button } from '@/components/ui'
</script>

<template>
  <Button>Click me</Button>
</template>`

export function ButtonDoc() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <ComponentDoc
        name="Button"
        description="The BoldKit Button is a neubrutalism-styled interactive element with 7 variants (default, secondary, accent, destructive, outline, ghost, link) and 5 sizes. Built on native button semantics with full keyboard accessibility, it features thick 3px borders and hard offset shadows that translate on hover. Available for both React and Vue 3 via the shadcn CLI."
        dependencies={['@radix-ui/react-slot', 'class-variance-authority']}
        vueDependencies={['reka-ui', 'class-variance-authority']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex flex-wrap gap-4">
          <Button>Button</Button>
        </div>
      </ComponentDoc>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="The button comes with several variants to match different use cases."
        code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
        vueCode={`<template>
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="accent">Accent</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection
        title="Sizes"
        description="Buttons are available in different sizes."
        code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Mail className="h-4 w-4" /></Button>`}
        vueCode={`<template>
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">Extra Large</Button>
  <Button size="icon">
    <Mail class="h-4 w-4" />
  </Button>
</template>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
          <Button size="icon"><Mail className="h-4 w-4" /></Button>
        </div>
      </ExampleSection>

      {/* With Icon */}
      <ExampleSection
        title="With Icon"
        description="Add icons to buttons for better visual feedback."
        code={`<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>
<Button variant="secondary">
  Next <ChevronRight className="ml-2 h-4 w-4" />
</Button>`}
        vueCode={`<template>
  <Button>
    <Mail class="mr-2 h-4 w-4" /> Login with Email
  </Button>
  <Button variant="secondary">
    Next <ChevronRight class="ml-2 h-4 w-4" />
  </Button>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
          <Button variant="secondary">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </ExampleSection>

      {/* Loading */}
      <ExampleSection
        title="Loading"
        description="Show a loading state while an action is in progress."
        code={`<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>`}
        vueCode={`<script setup>
import { ref } from 'vue'
const loading = ref(false)
</script>

<template>
  <Button disabled>
    <Loader2 class="mr-2 h-4 w-4 animate-spin" />
    Please wait
  </Button>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
          <Button
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 2000)
            }}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Loading...' : 'Click me'}
          </Button>
        </div>
      </ExampleSection>

      {/* Animations */}
      <ExampleSection
        title="Animations"
        description="Add attention-grabbing animations to your buttons."
        code={`<Button animation="pulse">Pulse</Button>
<Button animation="bounce">Bounce</Button>
<Button animation="shake">Shake (hover)</Button>
<Button animation="wiggle">Wiggle (hover)</Button>
<Button animation="pop">Pop (hover)</Button>`}
        vueCode={`<template>
  <Button animation="pulse">Pulse</Button>
  <Button animation="bounce">Bounce</Button>
  <Button animation="shake">Shake (hover)</Button>
  <Button animation="wiggle">Wiggle (hover)</Button>
  <Button animation="pop">Pop (hover)</Button>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button animation="pulse">Pulse</Button>
          <Button animation="bounce" variant="secondary">Bounce</Button>
          <Button animation="shake" variant="accent">Shake (hover)</Button>
          <Button animation="wiggle" variant="destructive">Wiggle (hover)</Button>
          <Button animation="pop" variant="outline">Pop (hover)</Button>
        </div>
      </ExampleSection>

      {/* As Child */}
      <ExampleSection
        title="As Child"
        description="Use the asChild prop to render the button as a different element like a link."
        code={`<Button asChild>
  <a href="#">Link styled as Button</a>
</Button>`}
        vueCode={`<template>
  <!-- In Vue, use the 'as' prop to change the element -->
  <Button as="a" href="#">Link styled as Button</Button>
</template>`}
      >
        <Button asChild>
          <a href="#">Link styled as Button</a>
        </Button>
      </ExampleSection>
    </>
  )
}
