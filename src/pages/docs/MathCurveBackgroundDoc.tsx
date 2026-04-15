import { MathCurveBackground } from '@/components/ui/math-curve-background'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import {
  buildPath,
  getPoint,
  getAngle,
  getDetailScale,
  getCurvePulseDuration,
  type BackgroundCurveKey,
} from '@/lib/math-curves'

const SPEED_DURATION: Record<string, number> = {
  slow: 9000,
  normal: 5500,
  fast: 3000,
}

export interface MathCurveBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  curve?: BackgroundCurveKey
  speed?: 'slow' | 'normal' | 'fast'
  opacity?: number
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  asChild?: boolean
}

const HEAD_SIZE = 8

const MathCurveBackground = React.forwardRef<HTMLDivElement, MathCurveBackgroundProps>(
  (
    {
      className,
      curve = 'rose',
      speed = 'slow',
      opacity = 0.15,
      trackColor,
      headColor,
      strokeWidth = 2,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const pathRef = React.useRef<SVGPathElement>(null)
    const rectRef = React.useRef<SVGRectElement>(null)
    const rafRef = React.useRef<number>(0)
    const startTimeRef = React.useRef<number>(performance.now())

    const durationMs = SPEED_DURATION[speed] ?? SPEED_DURATION.slow
    const initialTrackPath = React.useMemo(() => buildPath(curve, 1.0), [curve])

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
          rectRef.current.setAttribute('x', String(x - HEAD_SIZE / 2))
          rectRef.current.setAttribute('y', String(y - HEAD_SIZE / 2))
          rectRef.current.setAttribute('transform', \`rotate(\${angle} \${x} \${y})\`)
        }

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(rafRef.current)
    }, [curve, speed, durationMs])

    const Container = asChild ? Slot : 'div'

    return (
      <Container ref={ref} className={cn('relative', className)} {...props}>
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          opacity={opacity}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <path
            ref={pathRef}
            d={initialTrackPath}
            fill="none"
            stroke={trackColor ?? 'currentColor'}
            strokeWidth={strokeWidth}
            strokeOpacity={0.15}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <rect
            ref={rectRef}
            width={HEAD_SIZE}
            height={HEAD_SIZE}
            x={50 - HEAD_SIZE / 2}
            y={50 - HEAD_SIZE / 2}
            fill={headColor ?? 'hsl(var(--primary))'}
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </svg>
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </Container>
    )
  }
)
MathCurveBackground.displayName = 'MathCurveBackground'

export { MathCurveBackground }`

const vueSourceCode = `<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted, watch } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buildPath, getPoint, getAngle, getDetailScale, getCurvePulseDuration } from '@/lib/math-curves'
import type { BackgroundCurveKey } from '@/lib/math-curves'

interface MathCurveBackgroundProps extends PrimitiveProps {
  curve?: BackgroundCurveKey
  speed?: 'slow' | 'normal' | 'fast'
  opacity?: number
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  class?: string
}

const props = withDefaults(defineProps<MathCurveBackgroundProps>(), {
  as: 'div',
  curve: 'rose',
  speed: 'slow',
  opacity: 0.15,
  strokeWidth: 2,
})

const HEAD_SIZE = 8
const speedMap = { slow: 9000, normal: 5500, fast: 3000 }
const svgPathRef = shallowRef<SVGPathElement | null>(null)
const svgHeadRef = shallowRef<SVGRectElement | null>(null)
let rafId = 0
let startTime = 0

function startLoop() {
  cancelAnimationFrame(rafId)
  startTime = performance.now()

  function frame(now: number) {
    const elapsed = now - startTime
    const loopDuration = speedMap[props.speed ?? 'slow']
    const pulseDuration = getCurvePulseDuration(props.curve ?? 'rose')
    const progress = (elapsed % loopDuration) / loopDuration
    const detailScale = getDetailScale(elapsed, pulseDuration)

    if (svgPathRef.value) {
      svgPathRef.value.setAttribute('d', buildPath(props.curve ?? 'rose', detailScale))
    }
    if (svgHeadRef.value) {
      const { x, y } = getPoint(props.curve ?? 'rose', progress, detailScale)
      const angle = getAngle(props.curve ?? 'rose', progress, detailScale)
      svgHeadRef.value.setAttribute('x', String(x - HEAD_SIZE / 2))
      svgHeadRef.value.setAttribute('y', String(y - HEAD_SIZE / 2))
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
  <Primitive :as="as" :class="cn('relative', props.class)">
    <svg
      aria-hidden="true"
      class="absolute inset-0 w-full h-full pointer-events-none"
      style="z-index: 0; overflow: hidden"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      :opacity="opacity"
    >
      <path
        ref="svgPathRef"
        :stroke="trackColor ?? 'currentColor'"
        :stroke-width="strokeWidth"
        stroke-linecap="square"
        stroke-linejoin="miter"
        stroke-opacity="0.15"
        fill="none"
      />
      <rect
        ref="svgHeadRef"
        width="8"
        height="8"
        :fill="headColor ?? 'hsl(var(--primary))'"
        stroke="currentColor"
        stroke-width="1.5"
        x="0"
        y="0"
      />
    </svg>
    <div class="relative" style="z-index: 10">
      <slot />
    </div>
  </Primitive>
</template>`

const usageCode = `import { MathCurveBackground } from '@/components/ui/math-curve-background'

export default function Example() {
  return (
    <MathCurveBackground curve="rose" opacity={0.2} className="p-8">
      <p>Your content here</p>
    </MathCurveBackground>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { MathCurveBackground } from '@/components/ui'
</script>

<template>
  <MathCurveBackground curve="rose" :opacity="0.2" class="p-8">
    <p>Your content here</p>
  </MathCurveBackground>
</template>`

export function MathCurveBackgroundDoc() {
  return (
    <>
      <ComponentDoc
        name="Math Curve Background"
        description="An ambient animated mathematical curve background layer. Wraps content with a slow-moving curve animation that adds depth and visual interest."
        dependencies={['@radix-ui/react-slot']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
        registryName="math-curve-background"
      >
        <MathCurveBackground curve="rose" opacity={0.2} className="border-3 border-foreground p-8 min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-black uppercase mb-2">Hello World</div>
            <div className="text-sm text-muted-foreground">Ambient curve background</div>
          </div>
        </MathCurveBackground>
      </ComponentDoc>

      <ExampleSection
        title="Curve Variants"
        description="Seven mathematical curves, each with a distinct visual character for different aesthetic contexts."
        code={`<MathCurveBackground curve="rose" opacity={0.2}>Rose</MathCurveBackground>
<MathCurveBackground curve="lissajous" opacity={0.2}>Lissajous</MathCurveBackground>
<MathCurveBackground curve="fourier" opacity={0.2}>Fourier</MathCurveBackground>
<MathCurveBackground curve="spiral" opacity={0.2}>Spiral</MathCurveBackground>
<MathCurveBackground curve="triskelion" opacity={0.2}>Triskelion</MathCurveBackground>
<MathCurveBackground curve="involute" opacity={0.2}>Involute</MathCurveBackground>
<MathCurveBackground curve="epicycloid" opacity={0.2}>Epicycloid</MathCurveBackground>`}
        vueCode={`<template>
  <MathCurveBackground curve="rose" :opacity="0.2">Rose</MathCurveBackground>
  <MathCurveBackground curve="lissajous" :opacity="0.2">Lissajous</MathCurveBackground>
  <MathCurveBackground curve="fourier" :opacity="0.2">Fourier</MathCurveBackground>
  <MathCurveBackground curve="spiral" :opacity="0.2">Spiral</MathCurveBackground>
  <MathCurveBackground curve="triskelion" :opacity="0.2">Triskelion</MathCurveBackground>
  <MathCurveBackground curve="involute" :opacity="0.2">Involute</MathCurveBackground>
  <MathCurveBackground curve="epicycloid" :opacity="0.2">Epicycloid</MathCurveBackground>
</template>`}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(['rose', 'lissajous', 'fourier', 'spiral', 'triskelion', 'involute', 'epicycloid'] as const).map((curve) => (
            <MathCurveBackground
              key={curve}
              curve={curve}
              opacity={0.2}
              className="border-3 border-foreground min-h-[120px] flex items-center justify-center"
            >
              <span className="text-xs font-black uppercase">{curve}</span>
            </MathCurveBackground>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Wrapping Cards"
        description="Use MathCurveBackground to add ambient motion to card components without affecting their content layout."
        code={`<MathCurveBackground curve="lissajous" opacity={0.15} className="border-3 border-foreground p-6">
  <h3 className="text-lg font-black uppercase mb-1">Component Title</h3>
  <p className="text-sm text-muted-foreground mb-4">
    A card with an animated curve background that adds depth and motion.
  </p>
  <button className="border-3 border-foreground px-4 py-2 font-bold uppercase text-sm bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
    Get Started
  </button>
</MathCurveBackground>`}
        vueCode={`<template>
  <MathCurveBackground curve="lissajous" :opacity="0.15" class="border-3 border-foreground p-6">
    <h3 class="text-lg font-black uppercase mb-1">Component Title</h3>
    <p class="text-sm text-muted-foreground mb-4">
      A card with an animated curve background that adds depth and motion.
    </p>
    <button class="border-3 border-foreground px-4 py-2 font-bold uppercase text-sm bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
      Get Started
    </button>
  </MathCurveBackground>
</template>`}
      >
        <div className="max-w-sm">
          <MathCurveBackground curve="lissajous" opacity={0.15} className="border-3 border-foreground p-6">
            <h3 className="text-lg font-black uppercase mb-1">Component Title</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A card with an animated curve background that adds depth and motion.
            </p>
            <button className="border-3 border-foreground px-4 py-2 font-bold uppercase text-sm bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              Get Started
            </button>
          </MathCurveBackground>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Opacity Control"
        description="Adjust opacity to balance between a subtle ambient effect and a prominent decorative element."
        code={`<MathCurveBackground curve="rose" opacity={0.05}>0.05</MathCurveBackground>
<MathCurveBackground curve="rose" opacity={0.1}>0.1</MathCurveBackground>
<MathCurveBackground curve="rose" opacity={0.2}>0.2</MathCurveBackground>
<MathCurveBackground curve="rose" opacity={0.4}>0.4</MathCurveBackground>`}
        vueCode={`<template>
  <MathCurveBackground curve="rose" :opacity="0.05">0.05</MathCurveBackground>
  <MathCurveBackground curve="rose" :opacity="0.1">0.1</MathCurveBackground>
  <MathCurveBackground curve="rose" :opacity="0.2">0.2</MathCurveBackground>
  <MathCurveBackground curve="rose" :opacity="0.4">0.4</MathCurveBackground>
</template>`}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {([0.05, 0.1, 0.2, 0.4] as const).map((opacity) => (
            <MathCurveBackground
              key={opacity}
              curve="rose"
              opacity={opacity}
              className="border-3 border-foreground min-h-[120px] flex items-center justify-center"
            >
              <span className="text-xs font-black uppercase">{opacity}</span>
            </MathCurveBackground>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Speed Variants"
        description="Control animation speed from a barely-perceptible ambient drift to an energetic fast-moving trace."
        code={`<MathCurveBackground curve="rose" speed="slow" opacity={0.2}>Slow</MathCurveBackground>
<MathCurveBackground curve="rose" speed="normal" opacity={0.2}>Normal</MathCurveBackground>
<MathCurveBackground curve="rose" speed="fast" opacity={0.2}>Fast</MathCurveBackground>`}
        vueCode={`<template>
  <MathCurveBackground curve="rose" speed="slow" :opacity="0.2">Slow</MathCurveBackground>
  <MathCurveBackground curve="rose" speed="normal" :opacity="0.2">Normal</MathCurveBackground>
  <MathCurveBackground curve="rose" speed="fast" :opacity="0.2">Fast</MathCurveBackground>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          {(['slow', 'normal', 'fast'] as const).map((speed) => (
            <MathCurveBackground
              key={speed}
              curve="rose"
              speed={speed}
              opacity={0.2}
              className="border-3 border-foreground min-h-[120px] w-40 flex items-center justify-center"
            >
              <span className="text-xs font-black uppercase">{speed}</span>
            </MathCurveBackground>
          ))}
        </div>
      </ExampleSection>
    </>
  )
}
