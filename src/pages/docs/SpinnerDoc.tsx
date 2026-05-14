import { Spinner } from '@/components/ui/spinner'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/spinner.tsx?raw'
import vueSourceCode from '@vue-ui/Spinner.vue?raw'



const usageCode = `import { Spinner } from '@/components/ui/spinner'

export default function Example() {
  return <Spinner />
}`

const vueUsageCode = `<script setup lang="ts">
import { Spinner } from '@/components/ui'
</script>

<template>
  <Spinner />
</template>`

export function SpinnerDoc() {
  return (
    <>
      <ComponentDoc
        name="Spinner"
        description="Loading indicators with multiple animation styles for neubrutalism design."
        dependencies={['class-variance-authority']}
        vueDependencies={['reka-ui', 'class-variance-authority']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex flex-wrap items-center gap-6">
          <Spinner variant="brutal" size="lg" />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Variants"
        description="Different animation styles for various contexts."
        code={`<Spinner variant="default" />
<Spinner variant="dots" />
<Spinner variant="bars" />
<Spinner variant="blocks" />
<Spinner variant="brutal" />`}
        vueCode={`<template>
  <Spinner variant="default" />
  <Spinner variant="dots" />
  <Spinner variant="bars" />
  <Spinner variant="blocks" />
  <Spinner variant="brutal" />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Spinner variant="default" />
            <span className="text-xs font-bold uppercase">Default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner variant="dots" />
            <span className="text-xs font-bold uppercase">Dots</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner variant="bars" />
            <span className="text-xs font-bold uppercase">Bars</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner variant="blocks" />
            <span className="text-xs font-bold uppercase">Blocks</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner variant="brutal" />
            <span className="text-xs font-bold uppercase">Brutal</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Available spinner sizes from extra small to extra large."
        code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        vueCode={`<template>
  <Spinner size="xs" />
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</template>`}
      >
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xs" />
            <span className="text-xs font-bold uppercase">XS</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs font-bold uppercase">SM</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <span className="text-xs font-bold uppercase">MD</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span className="text-xs font-bold uppercase">LG</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xl" />
            <span className="text-xs font-bold uppercase">XL</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="With Button"
        description="Use spinners to indicate loading state in buttons."
        code={`<Button disabled>
  <Spinner size="sm" className="mr-2" />
  Loading...
</Button>`}
        vueCode={`<template>
  <Button disabled>
    <Spinner size="sm" class="mr-2" />
    Loading...
  </Button>
</template>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <button
            disabled
            className="inline-flex items-center px-4 py-2 border-3 border-foreground bg-primary text-primary-foreground font-bold uppercase text-sm opacity-50"
          >
            <Spinner size="sm" className="mr-2" />
            Loading...
          </button>
          <button
            disabled
            className="inline-flex items-center px-4 py-2 border-3 border-foreground bg-secondary text-secondary-foreground font-bold uppercase text-sm opacity-50"
          >
            <Spinner size="sm" variant="dots" className="mr-2" />
            Processing...
          </button>
        </div>
      </ExampleSection>
    </>
  )
}
