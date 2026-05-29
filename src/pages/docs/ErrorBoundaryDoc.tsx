import { useState } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ErrorBoundary.tsx?raw'
import vueSourceCode from '@vue-ui/ErrorBoundary.vue?raw'

// Live demo helper — a child that throws on demand so the fallback UI
// is reachable from the docs page without a hard refresh.
function Bomb({ trigger }: { trigger: boolean }) {
  if (trigger) {
    throw new Error('Demo error from <Bomb /> — caught by ErrorBoundary')
  }
  return (
    <p className="text-sm text-muted-foreground">
      Click the button to throw an error inside this boundary.
    </p>
  )
}

function Demo() {
  const [boom, setBoom] = useState(false)
  return (
    <div className="space-y-4">
      <Bomb trigger={boom} />
      <Button onClick={() => setBoom(true)}>Trigger error</Button>
    </div>
  )
}

const usageCode = `import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue'
</script>

<template>
  <ErrorBoundary>
    <YourApp />
  </ErrorBoundary>
</template>`

const reactNestedCode = `// Boundaries can be nested. An inner boundary catches errors
// from its subtree without unmounting the rest of the app.
<ErrorBoundary>
  <Header />
  <ErrorBoundary>
    <RiskyWidget />
  </ErrorBoundary>
  <Footer />
</ErrorBoundary>`

const vueNestedCode = `<template>
  <ErrorBoundary>
    <Header />
    <ErrorBoundary>
      <RiskyWidget />
    </ErrorBoundary>
    <Footer />
  </ErrorBoundary>
</template>`

export function ErrorBoundaryDoc() {
  return (
    <>
      <ComponentDoc
        name="Error Boundary"
        description="Catches errors in child components and renders a neubrutalism fallback with reload and home actions. React uses componentDidCatch under the hood; Vue uses onErrorCaptured."
        dependencies={[]}
        vueDependencies={['lucide-vue-next']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <ErrorBoundary>
          <Demo />
        </ErrorBoundary>
      </ComponentDoc>

      <ExampleSection
        title="Nested Boundaries"
        description="Wrap risky subtrees in their own boundary so one widget's crash doesn't take down the page."
        code={reactNestedCode}
        vueCode={vueNestedCode}
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            See the source code — a smaller boundary around a single component lets
            the rest of the app keep rendering normally when that component throws.
          </p>
        </div>
      </ExampleSection>
    </>
  )
}

export default ErrorBoundaryDoc
