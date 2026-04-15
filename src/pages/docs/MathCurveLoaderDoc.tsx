import { MathCurveLoader } from '@/components/ui/math-curve-loader'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  buildPath,
  getPoint,
  getAngle,
  getDetailScale,
  getCurvePulseDuration,
  type LoaderCurveKey,
} from '@/lib/math-curves'

const mathCurveLoaderVariants = cva('', {
  variants: {
    size: {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    },
  },
  defaultVariants: { size: 'md' },
})

const SPEED_DURATION: Record<string, number> = {
  slow: 9000,
  normal: 5500,
  fast: 3000,
}

export interface MathCurveLoaderProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof mathCurveLoaderVariants> {
  curve?: LoaderCurveKey
  speed?: 'slow' | 'normal' | 'fast'
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  headSize?: number
}

const MathCurveLoader = React.forwardRef<SVGSVGElement, MathCurveLoaderProps>(
  (
    {
      className,
      size,
      curve = 'rose',
      speed = 'normal',
      trackColor,
      headColor,
      strokeWidth = 4,
      headSize = 8,
      'aria-label': ariaLabel = 'Loading',
      ...props
    },
    ref
  ) => {
    const pathRef = React.useRef<SVGPathElement>(null)
    const rectRef = React.useRef<SVGRectElement>(null)
    const rafRef = React.useRef<number>(0)
    const startTimeRef = React.useRef<number>(performance.now())

    const durationMs = SPEED_DURATION[speed] ?? SPEED_DURATION.normal
    const trackPath = React.useMemo(() => buildPath(curve, 1.0), [curve])

    React.useEffect(() => {
      startTimeRef.current = performance.now()

      const tick = () => {
        const now = performance.now()
        const elapsed = (now - startTimeRef.current) % durationMs
        const progress = elapsed / durationMs
        const detailScale = getDetailScale(now, getCurvePulseDuration(curve))

        const { x, y } = getPoint(curve, progress, detailScale)
        const angle = getAngle(curve, progress, detailScale)

        if (pathRef.current) {
          pathRef.current.setAttribute('d', buildPath(curve, detailScale))
        }
        if (rectRef.current) {
          rectRef.current.setAttribute('x', String(x - headSize / 2))
          rectRef.current.setAttribute('y', String(y - headSize / 2))
          rectRef.current.setAttribute('transform', \`rotate(\${angle} \${x} \${y})\`)
        }

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(rafRef.current)
    }, [curve, speed, durationMs, headSize])

    const resolvedTrackStroke = trackColor ?? 'currentColor'
    const resolvedHeadFill = headColor ?? 'hsl(var(--primary))'

    return (
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        role="status"
        aria-label={ariaLabel}
        className={cn(mathCurveLoaderVariants({ size }), className)}
        {...props}
      >
        <path
          ref={pathRef}
          d={trackPath}
          fill="none"
          stroke={resolvedTrackStroke}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <rect
          ref={rectRef}
          width={headSize}
          height={headSize}
          x={50 - headSize / 2}
          y={50 - headSize / 2}
          fill={resolvedHeadFill}
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </svg>
    )
  }
)
MathCurveLoader.displayName = 'MathCurveLoader'

export { MathCurveLoader, mathCurveLoaderVariants }`

const vueSourceCode = `<script setup lang="ts">
import { shallowRef, computed, onMounted, onUnmounted, watch } from 'vue'
import { getPoint, getAngle, buildPath, getDetailScale, getCurvePulseDuration } from '@/lib/math-curves'
import type { LoaderCurveKey } from '@/lib/math-curves'

interface MathCurveLoaderProps {
  curve?: LoaderCurveKey
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  speed?: 'slow' | 'normal' | 'fast'
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  headSize?: number
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<MathCurveLoaderProps>(), {
  curve: 'rose',
  size: 'md',
  speed: 'normal',
  strokeWidth: 4,
  headSize: 8,
  ariaLabel: 'Loading',
})

const sizeMap = { xs: 24, sm: 32, md: 48, lg: 64, xl: 96 }
const speedMap = { slow: 9000, normal: 5500, fast: 3000 }
const pixelSize = computed(() => sizeMap[props.size ?? 'md'])

const svgPathRef = shallowRef<SVGPathElement | null>(null)
const svgHeadRef = shallowRef<SVGRectElement | null>(null)
let rafId = 0
let startTime = 0

function startLoop() {
  cancelAnimationFrame(rafId)
  startTime = performance.now()

  function frame(now: number) {
    const elapsed = now - startTime
    const loopDuration = speedMap[props.speed ?? 'normal']
    const progress = (elapsed % loopDuration) / loopDuration
    const detailScale = getDetailScale(elapsed, getCurvePulseDuration(props.curve ?? 'rose'))

    if (svgPathRef.value) {
      svgPathRef.value.setAttribute('d', buildPath(props.curve ?? 'rose', detailScale))
    }
    if (svgHeadRef.value) {
      const { x, y } = getPoint(props.curve ?? 'rose', progress, detailScale)
      const angle = getAngle(props.curve ?? 'rose', progress, detailScale)
      const half = (props.headSize ?? 8) / 2
      svgHeadRef.value.setAttribute('x', String(x - half))
      svgHeadRef.value.setAttribute('y', String(y - half))
      svgHeadRef.value.setAttribute('transform', \`rotate(\${angle} \${x} \${y})\`)
    }
    rafId = requestAnimationFrame(frame)
  }

  rafId = requestAnimationFrame(frame)
}

onMounted(() => startLoop())
onUnmounted(() => cancelAnimationFrame(rafId))
watch(() => [props.curve, props.speed], () => startLoop())
<\/script>

<template>
  <svg
    :width="pixelSize"
    :height="pixelSize"
    viewBox="0 0 100 100"
    role="status"
    :aria-label="props.ariaLabel"
    :class="props.class"
    style="overflow: visible; display: block"
  >
    <path
      ref="svgPathRef"
      :stroke="trackColor ?? 'currentColor'"
      :stroke-width="strokeWidth"
      stroke-opacity="0.2"
      stroke-linecap="square"
      stroke-linejoin="miter"
      fill="none"
    />
    <rect
      ref="svgHeadRef"
      :width="headSize"
      :height="headSize"
      :fill="headColor ?? 'hsl(var(--primary))'"
      stroke="currentColor"
      stroke-width="1.5"
      x="0"
      y="0"
    />
  </svg>
</template>`

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
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Curve Variants"
        description="15 parametric curves — each tracing a unique mathematical path."
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
<MathCurveLoader curve="involute" />`}
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
