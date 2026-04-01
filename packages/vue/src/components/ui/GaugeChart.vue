<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gaugeChartVariants = cva(
  'relative flex items-center justify-center',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface GaugeChartZone {
  from: number
  to: number
  color: string
  label?: string
}

type GaugeVariants = VariantProps<typeof gaugeChartVariants>

interface GaugeChartProps {
  value: number
  min?: number
  max?: number
  variant?: 'semicircle' | 'full' | 'meter'
  zones?: GaugeChartZone[]
  label?: string
  valueFormatter?: (value: number) => string
  showTicks?: boolean
  animated?: boolean
  size?: GaugeVariants['size']
  class?: string
}

const DEFAULT_ZONES: GaugeChartZone[] = [
  { from: 0, to: 33, color: 'hsl(var(--destructive))', label: 'Low' },
  { from: 33, to: 66, color: 'hsl(var(--warning))', label: 'Medium' },
  { from: 66, to: 100, color: 'hsl(var(--success))', label: 'High' },
]

const props = withDefaults(defineProps<GaugeChartProps>(), {
  min: 0,
  max: 100,
  variant: 'semicircle',
  zones: () => DEFAULT_ZONES,
  showTicks: true,
  animated: true,
  size: 'md',
  valueFormatter: (v: number) => `${v}`,
})

const normalizedValue = computed(() => Math.max(props.min, Math.min(props.max, props.value)))
const percentage = computed(() => ((normalizedValue.value - props.min) / (props.max - props.min)) * 100)

// Whether this variant uses a 360° full circle or a 180° semicircle sweep
const isFull = computed(() => props.variant === 'full')
// Whether this variant uses a filled progress bar instead of a needle
const isMeter = computed(() => props.variant === 'meter')

const sizeConfigSemi = {
  sm: { width: 140, height: 90,  radius: 45, strokeWidth: 10, fontSize: 14, labelSize: 9  },
  md: { width: 180, height: 115, radius: 58, strokeWidth: 12, fontSize: 18, labelSize: 11 },
  lg: { width: 240, height: 150, radius: 76, strokeWidth: 14, fontSize: 22, labelSize: 13 },
}

// Full-circle variant needs equal width/height
const sizeConfigFull = {
  sm: { width: 140, height: 140, radius: 45, strokeWidth: 10, fontSize: 14, labelSize: 9  },
  md: { width: 180, height: 180, radius: 58, strokeWidth: 12, fontSize: 18, labelSize: 11 },
  lg: { width: 240, height: 240, radius: 76, strokeWidth: 14, fontSize: 22, labelSize: 13 },
}

const currentSize = computed(() => props.size || 'md')
const config = computed(() => isFull.value ? sizeConfigFull[currentSize.value] : sizeConfigSemi[currentSize.value])

const centerX = computed(() => config.value.width / 2)
// For full circle, center is the middle of the SVG. For semi/meter, keep existing offset.
const centerY = computed(() =>
  isFull.value
    ? config.value.height / 2
    : config.value.radius + config.value.strokeWidth + 5
)

const needleLength = computed(() => config.value.radius - 8)

// Needle rotation angle: -90° is top; semicircle sweeps 180°, full sweeps 360°
const needleAngle = computed(() =>
  isFull.value
    ? -90 + (percentage.value * 360) / 100
    : -90 + (percentage.value * 180) / 100
)

/**
 * Build an SVG arc path.
 * @param startPercent  0–100 position along the gauge sweep
 * @param endPercent    0–100 position along the gauge sweep
 * @param radius        arc radius
 *
 * For semicircle/meter the sweep spans -90° → +90° (180° total).
 * For full the sweep spans -90° → 270° (360° total).
 */
function createArcPath(startPercent: number, endPercent: number, radius: number): string {
  const sweepDeg = isFull.value ? 360 : 180
  const startAngle = (-90 + (startPercent * sweepDeg) / 100) * (Math.PI / 180)
  const endAngle   = (-90 + (endPercent   * sweepDeg) / 100) * (Math.PI / 180)

  const startX = centerX.value + radius * Math.cos(startAngle)
  const startY = centerY.value + radius * Math.sin(startAngle)
  const endX   = centerX.value + radius * Math.cos(endAngle)
  const endY   = centerY.value + radius * Math.sin(endAngle)

  // For a full 360° arc SVG requires two half-arcs to avoid degenerate path
  if (isFull.value && Math.abs(endPercent - startPercent) >= 100) {
    const midAngle = startAngle + Math.PI
    const midX = centerX.value + radius * Math.cos(midAngle)
    const midY = centerY.value + radius * Math.sin(midAngle)
    return `M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${midX} ${midY} A ${radius} ${radius} 0 1 1 ${startX} ${startY}`
  }

  const spanPercent = endPercent - startPercent
  const largeArcFlag = isFull.value
    ? (spanPercent > 50 ? 1 : 0)
    : (spanPercent > 50 ? 1 : 0)

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`
}

/**
 * Build the filled progress arc for the meter variant.
 * Covers 0 → percentage along the 180° semicircle sweep.
 */
const meterProgressPath = computed(() => {
  if (percentage.value <= 0) return ''
  return createArcPath(0, percentage.value, config.value.radius)
})

/**
 * Find the zone color for the current percentage (used by meter variant).
 */
const currentZoneColor = computed(() => {
  const z = props.zones.find(zone => percentage.value >= zone.from && percentage.value <= zone.to)
  return z ? z.color : 'hsl(var(--primary))'
})

const tickPositions = [0, 25, 50, 75, 100]

function getTickCoords(tick: number) {
  const sweepDeg = isFull.value ? 360 : 180
  const angle = (-90 + (tick * sweepDeg) / 100) * (Math.PI / 180)
  const innerR = config.value.radius - config.value.strokeWidth / 2 - 6
  const outerR = config.value.radius + config.value.strokeWidth / 2 + 6
  return {
    x1: centerX.value + innerR * Math.cos(angle),
    y1: centerY.value + innerR * Math.sin(angle),
    x2: centerX.value + outerR * Math.cos(angle),
    y2: centerY.value + outerR * Math.sin(angle),
  }
}
</script>

<template>
  <div :class="cn(gaugeChartVariants({ size }), props.class)">
    <svg
      :width="config.width"
      :height="config.height"
      :viewBox="`0 0 ${config.width} ${config.height}`"
    >
      <!-- Background track -->
      <path
        :d="createArcPath(0, 100, config.radius)"
        fill="none"
        stroke="hsl(var(--muted))"
        :stroke-width="config.strokeWidth"
        stroke-linecap="round"
      />

      <!-- Zone arcs -->
      <path
        v-for="(zone, index) in zones"
        :key="index"
        :d="createArcPath(zone.from, zone.to, config.radius)"
        fill="none"
        :stroke="zone.color"
        :stroke-width="config.strokeWidth"
        stroke-linecap="butt"
        class="transition-all duration-300"
      />

      <!-- Outer border -->
      <path
        :d="createArcPath(0, 100, config.radius + config.strokeWidth / 2 + 2)"
        fill="none"
        stroke="hsl(var(--foreground))"
        stroke-width="2"
        stroke-linecap="round"
      />

      <!-- Inner border -->
      <path
        :d="createArcPath(0, 100, config.radius - config.strokeWidth / 2 - 2)"
        fill="none"
        stroke="hsl(var(--foreground))"
        stroke-width="2"
        stroke-linecap="round"
      />

      <!-- Tick marks -->
      <template v-if="showTicks">
        <line
          v-for="tick in tickPositions"
          :key="tick"
          :x1="getTickCoords(tick).x1"
          :y1="getTickCoords(tick).y1"
          :x2="getTickCoords(tick).x2"
          :y2="getTickCoords(tick).y2"
          stroke="hsl(var(--foreground))"
          stroke-width="2"
        />
      </template>

      <!-- Meter variant: filled progress arc instead of needle -->
      <path
        v-if="isMeter && meterProgressPath"
        :d="meterProgressPath"
        fill="none"
        :stroke="currentZoneColor"
        :stroke-width="config.strokeWidth + 4"
        stroke-linecap="round"
        :style="{ transition: animated ? 'stroke-dasharray 0.5s ease-out' : 'none' }"
      />

      <!-- Needle (hidden for meter variant) -->
      <g
        v-if="!isMeter"
        :style="{
          transform: `rotate(${needleAngle}deg)`,
          transformOrigin: `${centerX}px ${centerY}px`,
          transition: animated ? 'transform 0.5s ease-out' : 'none',
        }"
      >
        <!-- Needle shadow -->
        <line
          :x1="centerX + 2"
          :y1="centerY + 2"
          :x2="centerX + needleLength + 2"
          :y2="centerY + 2"
          stroke="hsl(var(--shadow-color))"
          stroke-width="3"
          stroke-linecap="round"
        />
        <!-- Needle body -->
        <line
          :x1="centerX"
          :y1="centerY"
          :x2="centerX + needleLength"
          :y2="centerY"
          stroke="hsl(var(--foreground))"
          stroke-width="3"
          stroke-linecap="round"
        />
        <!-- Needle tip -->
        <circle
          :cx="centerX + needleLength"
          :cy="centerY"
          r="3"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--foreground))"
          stroke-width="1.5"
        />
      </g>

      <!-- Center pivot (hidden for meter variant) -->
      <template v-if="!isMeter">
        <circle
          :cx="centerX"
          :cy="centerY"
          r="6"
          fill="hsl(var(--foreground))"
        />
        <circle
          :cx="centerX"
          :cy="centerY"
          r="3"
          fill="hsl(var(--background))"
        />
      </template>

      <!-- Value display -->
      <text
        :x="centerX"
        :y="centerY + 20"
        text-anchor="middle"
        fill="hsl(var(--foreground))"
        font-weight="900"
        :font-size="config.fontSize"
        font-family="ui-monospace, monospace"
      >
        {{ valueFormatter(normalizedValue) }}
      </text>

      <!-- Label -->
      <text
        v-if="label"
        :x="centerX"
        :y="centerY + 20 + config.fontSize"
        text-anchor="middle"
        fill="hsl(var(--muted-foreground))"
        font-weight="700"
        :font-size="config.labelSize"
        style="text-transform: uppercase; letter-spacing: 0.05em"
      >
        {{ label }}
      </text>

      <!-- Min/Max labels (not shown for full-circle variant) -->
      <template v-if="!isFull">
        <text
          :x="centerX - config.radius - 8"
          :y="centerY + 4"
          text-anchor="end"
          fill="hsl(var(--muted-foreground))"
          font-weight="600"
          :font-size="config.labelSize"
        >
          {{ min }}
        </text>
        <text
          :x="centerX + config.radius + 8"
          :y="centerY + 4"
          text-anchor="start"
          fill="hsl(var(--muted-foreground))"
          font-weight="600"
          :font-size="config.labelSize"
        >
          {{ max }}
        </text>
      </template>
    </svg>
  </div>
</template>
