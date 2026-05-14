import { MathCurveProgress } from '@/components/ui/math-curve-progress'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/math-curve-progress.tsx?raw'
import vueSourceCode from '@vue-ui/MathCurveProgress.vue?raw'



const usageCode = `import { MathCurveProgress } from '@/components/ui/math-curve-progress'

export default function Example() {
  return <MathCurveProgress value={65} curve="spiral" />
}`

const vueUsageCode = `<script setup lang="ts">
import { MathCurveProgress } from '@/components/ui'
</script>

<template>
  <MathCurveProgress :value="65" curve="spiral" />
</template>`

export function MathCurveProgressDoc() {
  return (
    <>
      <ComponentDoc
        name="Math Curve Progress"
        description="A progress indicator that traces a mathematical curve — the head moves along the curve path proportionally from 0 to 100%."
        dependencies={['class-variance-authority']}
        vueDependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
        registryName="math-curve-progress"
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={0} curve="spiral" size="lg" />
            <span className="text-xs font-bold uppercase">0%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={33} curve="spiral" size="lg" />
            <span className="text-xs font-bold uppercase">33%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={66} curve="spiral" size="lg" />
            <span className="text-xs font-bold uppercase">66%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={100} curve="spiral" size="lg" />
            <span className="text-xs font-bold uppercase">100%</span>
          </div>
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Curve Variants"
        description="Nine mathematical curve shapes for unique progress visualizations."
        code={`<MathCurveProgress value={65} curve="spiral" size="md" />
<MathCurveProgress value={65} curve="heart" size="md" />
<MathCurveProgress value={65} curve="lissajous" size="md" />
<MathCurveProgress value={65} curve="cardioid" size="md" />
<MathCurveProgress value={65} curve="rose" size="md" />
<MathCurveProgress value={65} curve="astroid" size="md" />
<MathCurveProgress value={65} curve="superellipse" size="md" />
<MathCurveProgress value={65} curve="deltoid" size="md" />
<MathCurveProgress value={65} curve="nephroid" size="md" />`}
        vueCode={`<template>
  <MathCurveProgress :value="65" curve="spiral" size="md" />
  <MathCurveProgress :value="65" curve="heart" size="md" />
  <MathCurveProgress :value="65" curve="lissajous" size="md" />
  <MathCurveProgress :value="65" curve="cardioid" size="md" />
  <MathCurveProgress :value="65" curve="rose" size="md" />
  <MathCurveProgress :value="65" curve="astroid" size="md" />
  <MathCurveProgress :value="65" curve="superellipse" size="md" />
  <MathCurveProgress :value="65" curve="deltoid" size="md" />
  <MathCurveProgress :value="65" curve="nephroid" size="md" />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={65} curve="spiral" size="md" />
            <span className="text-xs font-bold uppercase">Spiral</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={65} curve="heart" size="md" />
            <span className="text-xs font-bold uppercase">Heart</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={65} curve="lissajous" size="md" />
            <span className="text-xs font-bold uppercase">Lissajous</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={65} curve="cardioid" size="md" />
            <span className="text-xs font-bold uppercase">Cardioid</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={65} curve="rose" size="md" />
            <span className="text-xs font-bold uppercase">Rose</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={65} curve="astroid" size="lg" />
            <span className="text-xs font-bold uppercase">Astroid</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={65} curve="superellipse" size="lg" />
            <span className="text-xs font-bold uppercase">Superellipse</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={65} curve="deltoid" size="lg" />
            <span className="text-xs font-bold uppercase">Deltoid</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={65} curve="nephroid" size="lg" />
            <span className="text-xs font-bold uppercase">Nephroid</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Progress Values"
        description="The curve head moves proportionally along the path as value increases from 0 to 100."
        code={`<MathCurveProgress value={10} curve="spiral" size="md" />
<MathCurveProgress value={25} curve="spiral" size="md" />
<MathCurveProgress value={50} curve="spiral" size="md" />
<MathCurveProgress value={75} curve="spiral" size="md" />
<MathCurveProgress value={100} curve="spiral" size="md" />`}
        vueCode={`<template>
  <MathCurveProgress :value="10" curve="spiral" size="md" />
  <MathCurveProgress :value="25" curve="spiral" size="md" />
  <MathCurveProgress :value="50" curve="spiral" size="md" />
  <MathCurveProgress :value="75" curve="spiral" size="md" />
  <MathCurveProgress :value="100" curve="spiral" size="md" />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={10} curve="spiral" size="md" />
            <span className="text-xs font-bold uppercase">10%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={25} curve="spiral" size="md" />
            <span className="text-xs font-bold uppercase">25%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={50} curve="spiral" size="md" />
            <span className="text-xs font-bold uppercase">50%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={75} curve="spiral" size="md" />
            <span className="text-xs font-bold uppercase">75%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={100} curve="spiral" size="md" />
            <span className="text-xs font-bold uppercase">100%</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="With Value Label"
        description="Display the numeric percentage value alongside the curve progress indicator."
        code={`<MathCurveProgress value={60} curve="spiral" size="lg" showValue />
<MathCurveProgress value={60} curve="heart" size="lg" showValue />
<MathCurveProgress value={60} curve="rose" size="lg" showValue />`}
        vueCode={`<template>
  <MathCurveProgress :value="60" curve="spiral" size="lg" :showValue="true" />
  <MathCurveProgress :value="60" curve="heart" size="lg" :showValue="true" />
  <MathCurveProgress :value="60" curve="rose" size="lg" :showValue="true" />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={60} curve="spiral" size="lg" showValue />
            <span className="text-xs font-bold uppercase">Spiral</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={60} curve="heart" size="lg" showValue />
            <span className="text-xs font-bold uppercase">Heart</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={60} curve="rose" size="lg" showValue />
            <span className="text-xs font-bold uppercase">Rose</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Three sizes to fit different contexts — from compact inline indicators to large hero displays."
        code={`<MathCurveProgress value={50} curve="spiral" size="sm" />
<MathCurveProgress value={50} curve="spiral" size="md" />
<MathCurveProgress value={50} curve="spiral" size="lg" />`}
        vueCode={`<template>
  <MathCurveProgress :value="50" curve="spiral" size="sm" />
  <MathCurveProgress :value="50" curve="spiral" size="md" />
  <MathCurveProgress :value="50" curve="spiral" size="lg" />
</template>`}
      >
        <div className="flex flex-wrap items-end gap-8">
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={50} curve="spiral" size="sm" />
            <span className="text-xs font-bold uppercase">SM</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={50} curve="spiral" size="md" />
            <span className="text-xs font-bold uppercase">MD</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveProgress value={50} curve="spiral" size="lg" />
            <span className="text-xs font-bold uppercase">LG</span>
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
