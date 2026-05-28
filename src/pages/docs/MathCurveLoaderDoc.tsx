import { MathCurveLoader } from '@/components/ui/math-curve-loader'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/math-curve-loader.tsx?raw'
import vueSourceCode from '@vue-ui/MathCurveLoader.vue?raw'



const usageCode = `import { MathCurveLoader } from '@/components/ui/math-curve-loader'

export default function Example() {
  return <MathCurveLoader curve="rose" />
}`

const vueUsageCode = `<script setup lang="ts">
import { MathCurveLoader } from '@/components/ui'
</script>

<template>
  <MathCurveLoader curve="rose" />
</template>`

export function MathCurveLoaderDoc() {
  return (
    <>
      <ComponentDoc
        name="MathCurveLoader"
        description="Mathematical parametric curve loaders with neubrutalism aesthetics. 15 curve variants including rose, lissajous, butterfly, and more."
        dependencies={['class-variance-authority']}
        vueDependencies={['reka-ui', 'class-variance-authority']}
        registryName="math-curve-loader"
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex flex-wrap items-center gap-6">
          <MathCurveLoader curve="rose" size="xl" />
          <MathCurveLoader curve="lissajous" size="xl" />
          <MathCurveLoader curve="butterfly" size="xl" />
          <MathCurveLoader curve="hypotrochoid" size="xl" />
          <MathCurveLoader curve="cardioid" size="xl" />
          <MathCurveLoader curve="lemniscate" size="xl" />
          <MathCurveLoader curve="fourier" size="xl" />
          <MathCurveLoader curve="rose3" size="xl" />
          <MathCurveLoader curve="astroid" size="xl" />
          <MathCurveLoader curve="deltoid" size="xl" />
          <MathCurveLoader curve="nephroid" size="xl" />
          <MathCurveLoader curve="epicycloid" size="xl" />
          <MathCurveLoader curve="superellipse" size="xl" />
          <MathCurveLoader curve="triskelion" size="xl" />
          <MathCurveLoader curve="involute" size="xl" />
          <MathCurveLoader curve="spiral" size="xl" />
          <MathCurveLoader curve="heart" size="xl" />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Curve Variants"
        description="17 parametric curves — each tracing a unique mathematical path. Note: spiral (Archimedean, r = b·t) and involute (r = a·t² visually) both produce outward-spiraling shapes but with different spacing between turns."
        code={`<MathCurveLoader curve="rose" />
<MathCurveLoader curve="lissajous" />
<MathCurveLoader curve="butterfly" />
<MathCurveLoader curve="hypotrochoid" />
<MathCurveLoader curve="cardioid" />
<MathCurveLoader curve="lemniscate" />
<MathCurveLoader curve="fourier" />
<MathCurveLoader curve="rose3" />
<MathCurveLoader curve="astroid" />
<MathCurveLoader curve="deltoid" />
<MathCurveLoader curve="nephroid" />
<MathCurveLoader curve="epicycloid" />
<MathCurveLoader curve="superellipse" />
<MathCurveLoader curve="triskelion" />
<MathCurveLoader curve="involute" />
<MathCurveLoader curve="spiral" />
<MathCurveLoader curve="heart" />`}
        vueCode={`<template>
  <MathCurveLoader curve="rose" />
  <MathCurveLoader curve="lissajous" />
  <MathCurveLoader curve="butterfly" />
  <MathCurveLoader curve="hypotrochoid" />
  <MathCurveLoader curve="cardioid" />
  <MathCurveLoader curve="lemniscate" />
  <MathCurveLoader curve="fourier" />
  <MathCurveLoader curve="rose3" />
  <MathCurveLoader curve="astroid" />
  <MathCurveLoader curve="deltoid" />
  <MathCurveLoader curve="nephroid" />
  <MathCurveLoader curve="epicycloid" />
  <MathCurveLoader curve="superellipse" />
  <MathCurveLoader curve="triskelion" />
  <MathCurveLoader curve="involute" />
  <MathCurveLoader curve="spiral" />
  <MathCurveLoader curve="heart" />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          {(
            [
              'rose',
              'lissajous',
              'butterfly',
              'hypotrochoid',
              'cardioid',
              'lemniscate',
              'fourier',
              'rose3',
              'astroid',
              'deltoid',
              'nephroid',
              'epicycloid',
              'superellipse',
              'triskelion',
              'involute',
              'spiral',
              'heart',
            ] as const
          ).map((curve) => (
            <div key={curve} className="flex flex-col items-center gap-2">
              <MathCurveLoader curve={curve} size="md" />
              <span className="font-mono text-xs font-bold uppercase tracking-wide">
                {curve}
              </span>
            </div>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Available sizes from extra small to extra large."
        code={`<MathCurveLoader curve="rose" size="xs" />
<MathCurveLoader curve="rose" size="sm" />
<MathCurveLoader curve="rose" size="md" />
<MathCurveLoader curve="rose" size="lg" />
<MathCurveLoader curve="rose" size="xl" />`}
        vueCode={`<template>
  <MathCurveLoader curve="rose" size="xs" />
  <MathCurveLoader curve="rose" size="sm" />
  <MathCurveLoader curve="rose" size="md" />
  <MathCurveLoader curve="rose" size="lg" />
  <MathCurveLoader curve="rose" size="xl" />
</template>`}
      >
        <div className="flex flex-wrap items-end gap-8">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <MathCurveLoader curve="rose" size={size} />
              <span className="font-mono text-xs font-bold uppercase tracking-wide">
                {size}
              </span>
            </div>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Speed"
        description="Control animation speed from slow and meditative to fast and urgent."
        code={`<MathCurveLoader curve="rose" speed="slow" />
<MathCurveLoader curve="rose" speed="normal" />
<MathCurveLoader curve="rose" speed="fast" />`}
        vueCode={`<template>
  <MathCurveLoader curve="rose" speed="slow" />
  <MathCurveLoader curve="rose" speed="normal" />
  <MathCurveLoader curve="rose" speed="fast" />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          {(['slow', 'normal', 'fast'] as const).map((speed) => (
            <div key={speed} className="flex flex-col items-center gap-2">
              <MathCurveLoader curve="rose" size="md" speed={speed} />
              <span className="font-mono text-xs font-bold uppercase tracking-wide">
                {speed}
              </span>
            </div>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Custom Colors"
        description="Override track and head colors with any CSS color value."
        code={`<MathCurveLoader
  curve="lissajous"
  trackColor="#f97316"
  headColor="#ea580c"
/>
<MathCurveLoader
  curve="butterfly"
  trackColor="#8b5cf6"
  headColor="#6d28d9"
/>
<MathCurveLoader
  curve="hypotrochoid"
  trackColor="#10b981"
  headColor="#065f46"
/>`}
        vueCode={`<template>
  <MathCurveLoader
    curve="lissajous"
    track-color="#f97316"
    head-color="#ea580c"
  />
  <MathCurveLoader
    curve="butterfly"
    track-color="#8b5cf6"
    head-color="#6d28d9"
  />
  <MathCurveLoader
    curve="hypotrochoid"
    track-color="#10b981"
    head-color="#065f46"
  />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <MathCurveLoader
              curve="lissajous"
              size="md"
              trackColor="#f97316"
              headColor="#ea580c"
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wide">
              Orange
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveLoader
              curve="butterfly"
              size="md"
              trackColor="#8b5cf6"
              headColor="#6d28d9"
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wide">
              Violet
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveLoader
              curve="hypotrochoid"
              size="md"
              trackColor="#10b981"
              headColor="#065f46"
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wide">
              Emerald
            </span>
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
