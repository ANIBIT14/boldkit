import { Skeleton } from '@/components/ui/skeleton'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/skeleton.tsx?raw'
import vueSourceCode from '@vue-ui/Skeleton.vue?raw'


const usageCode = `import { Skeleton } from '@/components/ui/skeleton'

export default function Example() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import Skeleton from '@/components/ui/Skeleton.vue'
</script>

<template>
  <div class="flex items-center space-x-4">
    <Skeleton class="h-12 w-12 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>`

export function SkeletonDoc() {
  return (
    <>
      <ComponentDoc
        name="Skeleton"
        description="A placeholder loading animation with neubrutalism styling to indicate content is being loaded."
        dependencies={[]}
        vueDependencies={[]}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </ComponentDoc>

      {/* Motion variants (v3.5) */}
      <ExampleSection
        title="Motion variants"
        description="Four loading rhythms. `pulse` is the default soft breathe; `stamp`, `blocks` and `scan` are stepped and hard-edged. All respect prefers-reduced-motion. Requires styles/motion.css."
        code={`<Skeleton variant="pulse"  className="h-12 w-full" />
<Skeleton variant="stamp"  className="h-12 w-full" />
<Skeleton variant="blocks" className="h-12 w-full" />
<Skeleton variant="scan"   className="h-12 w-full" />
<Skeleton variant="none"   className="h-12 w-full" />`}
        vueCode={`<script setup>
import Skeleton from '@/components/ui/Skeleton.vue'
</script>

<template>
  <Skeleton variant="pulse"  class="h-12 w-full" />
  <Skeleton variant="stamp"  class="h-12 w-full" />
  <Skeleton variant="blocks" class="h-12 w-full" />
  <Skeleton variant="scan"   class="h-12 w-full" />
  <Skeleton variant="none"   class="h-12 w-full" />
</template>`}
      >
        <div className="w-full max-w-md space-y-4">
          {(['pulse', 'stamp', 'blocks', 'scan', 'none'] as const).map((v) => (
            <div key={v} className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {v}
              </span>
              <Skeleton variant={v} className="h-12 w-full" />
            </div>
          ))}
        </div>
      </ExampleSection>

      {/* Card Skeleton */}
      <ExampleSection
        title="Card"
        description="A skeleton that resembles a card layout."
        code={`<div className="flex flex-col space-y-3">
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`}
        vueCode={`<script setup>
import Skeleton from '@/components/ui/Skeleton.vue'
</script>

<template>
  <div class="flex flex-col space-y-3">
    <Skeleton class="h-[125px] w-[250px] rounded-xl" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>`}
      >
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </ExampleSection>

      {/* Profile Skeleton */}
      <ExampleSection
        title="Profile"
        description="A skeleton that resembles a user profile."
        code={`<div className="flex items-center space-x-4">
  <Skeleton className="h-16 w-16 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-5 w-[150px]" />
    <Skeleton className="h-4 w-[100px]" />
  </div>
</div>`}
        vueCode={`<script setup>
import Skeleton from '@/components/ui/Skeleton.vue'
</script>

<template>
  <div class="flex items-center space-x-4">
    <Skeleton class="h-16 w-16 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-5 w-[150px]" />
      <Skeleton class="h-4 w-[100px]" />
    </div>
  </div>
</template>`}
      >
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </ExampleSection>

      {/* List Skeleton */}
      <ExampleSection
        title="List"
        description="A skeleton that resembles a list of items."
        code={`<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  ))}
</div>`}
        vueCode={`<script setup>
import Skeleton from '@/components/ui/Skeleton.vue'
</script>

<template>
  <div class="space-y-4">
    <div v-for="i in 3" :key="i" class="flex items-center space-x-4">
      <Skeleton class="h-10 w-10" />
      <div class="space-y-2 flex-1">
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-3 w-3/4" />
      </div>
    </div>
  </div>
</template>`}
      >
        <div className="space-y-4 max-w-md">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </ExampleSection>
    </>
  )
}
