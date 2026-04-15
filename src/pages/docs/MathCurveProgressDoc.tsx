import { MathCurveProgress } from '@/components/ui/math-curve-progress'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  buildPath,
  getPoint,
  getAngle,
  type ProgressCurveKey,
} from '@/lib/math-curves'

const mathCurveProgressVariants = cva('', {
  variants: {
    size: {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-24 h-24',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface MathCurveProgressProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof mathCurveProgressVariants> {
  value: number
  curve?: ProgressCurveKey
  showValue?: boolean
  trackColor?: string
  fillColor?: string
  strokeWidth?: number
}

const MathCurveProgress = React.forwardRef<SVGSVGElement, MathCurveProgressProps>(
  (
    {
      className,
      size,
      value,
      curve = 'spiral',
      showValue = false,
      trackColor,
      fillColor,
      strokeWidth = 4,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    const progress = clampedValue / 100

    const trackPath = React.useMemo(() => buildPath(curve, 1.0), [curve])
    const headPoint = React.useMemo(() => getPoint(curve, progress), [curve, progress])
    const headAngle = React.useMemo(() => getAngle(curve, progress), [curve, progress])
    const HEAD_SIZE = 8

    const resolvedTrackStroke = trackColor ?? 'currentColor'
    const resolvedFillColor = fillColor ?? 'hsl(var(--primary))'

    return (
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={\`\${Math.round(clampedValue)}% progress\`}
        className={cn(mathCurveProgressVariants({ size }), className)}
        {...props}
      >
        <path
          d={trackPath}
          fill="none"
          stroke={resolvedTrackStroke}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <rect
          width={HEAD_SIZE}
          height={HEAD_SIZE}
          x={headPoint.x - HEAD_SIZE / 2}
          y={headPoint.y - HEAD_SIZE / 2}
          fill={resolvedFillColor}
          stroke="currentColor"
          strokeWidth={1.5}
          transform={\`rotate(\${headAngle} \${headPoint.x} \${headPoint.y})\`}
          style={{ transition: 'transform 300ms ease' }}
        />
        {showValue && (
          <text
            x={50}
            y={50}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={700}
            fill="currentColor"
            letterSpacing="0.05em"
            style={{ userSelect: 'none', fontFamily: 'inherit' }}
          >
            {\`\${Math.round(clampedValue)}%\`}
          </text>
        )}
      </svg>
    )
  }
)
MathCurveProgress.displayName = 'MathCurveProgress'

export { MathCurveProgress, mathCurveProgressVariants }`

const vueSourceCode = `<script setup lang="ts">
import { computed } from 'vue'
import { getPoint, getAngle, buildPath } from '@/lib/math-curves'
import type { ProgressCurveKey } from '@/lib/math-curves'

interface MathCurveProgressProps {
  value: number
  curve?: ProgressCurveKey
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  trackColor?: string
  fillColor?: string
  strokeWidth?: number
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<MathCurveProgressProps>(), {
  curve: 'spiral',
  size: 'md',
  showValue: false,
  strokeWidth: 4,
})

const HEAD_SIZE = 8
const sizeMap = { sm: 48, md: 64, lg: 96 }
const pixelSize = computed(() => sizeMap[props.size ?? 'md'])
const clampedValue = computed(() => Math.min(100, Math.max(0, props.value ?? 0)))
const trackPath = computed(() => buildPath(props.curve ?? 'spiral'))
const headPoint = computed(() => getPoint(props.curve ?? 'spiral', clampedValue.value / 100))
const headAngle = computed(() => getAngle(props.curve ?? 'spiral', clampedValue.value / 100))
const headTransform = computed(() => {
  const { x, y } = headPoint.value
  return \`rotate(\${headAngle.value} \${x} \${y})\`
})
<\/script>

<template>
  <svg
    :width="pixelSize"
    :height="pixelSize"
    viewBox="0 0 100 100"
    role="progressbar"
    :aria-valuenow="clampedValue"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="props.ariaLabel ?? \`\${clampedValue}% progress\`"
    :class="props.class"
    style="overflow: visible; display: block"
  >
    <path
      :d="trackPath"
      :stroke="trackColor ?? 'currentColor'"
      :stroke-width="strokeWidth"
      stroke-opacity="0.2"
      stroke-linecap="square"
      stroke-linejoin="miter"
      fill="none"
    />
    <rect
      :width="HEAD_SIZE"
      :height="HEAD_SIZE"
      :x="headPoint.x - HEAD_SIZE / 2"
      :y="headPoint.y - HEAD_SIZE / 2"
      :fill="fillColor ?? 'hsl(var(--primary))'"
      stroke="currentColor"
      stroke-width="1.5"
      :transform="headTransform"
      :style="{ transition: 'transform 300ms ease' }"
    />
    <text
      v-if="showValue"
      x="50"
      y="50"
      text-anchor="middle"
      dominant-baseline="central"
      font-size="12"
      font-weight="700"
      fill="currentColor"
      letter-spacing="0.05em"
      style="user-select: none; font-family: inherit"
    >
      {{ Math.round(clampedValue) }}%
    </text>
  </svg>
</template>`

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
