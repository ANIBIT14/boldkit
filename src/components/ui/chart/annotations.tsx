/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { ReferenceLine, ReferenceDot } from 'recharts'
import type {
  ChartAnnotation,
  ChartReferenceLineSpec,
  ChartCalloutSpec,
  ChartArrowSpec,
} from './types'

/**
 * Unified chart annotations for Recharts. Recharts only renders its own
 * component types when they are DIRECT children of a chart, so a wrapper
 * component around <ReferenceLine> would be silently dropped. Instead these are
 * element factories that return real Recharts elements; drop the result into a
 * Cartesian chart's children via {renderChartAnnotations([...])}.
 *
 * Reference lines require a Cartesian chart (Area/Bar/Line/Composed). Callouts
 * and arrows are data-anchored via ReferenceDot and also work only where those
 * coordinates exist.
 */

const FOREGROUND = 'hsl(var(--foreground))'
const DASH = '6 4'

// Brutalist bordered label box rendered inside a ReferenceDot label slot.
// Recharts passes the resolved pixel viewBox as `viewBox`.
function CalloutLabel({
  viewBox,
  text,
  placement = 'top',
}: {
  viewBox?: { x?: number; y?: number }
  text: string
  placement?: ChartCalloutSpec['placement']
}) {
  const cx = viewBox?.x ?? 0
  const cy = viewBox?.y ?? 0
  const padX = 8
  const width = text.length * 7 + padX * 2
  const height = 22
  const offset = 14
  const dx = placement === 'left' ? -width - offset : placement === 'right' ? offset : -width / 2
  const dy = placement === 'bottom' ? offset : -height - offset
  return (
    <g>
      <line x1={cx} y1={cy} x2={cx + dx + width / 2} y2={cy + dy + height} stroke={FOREGROUND} strokeWidth={2} />
      <rect
        x={cx + dx}
        y={cy + dy}
        width={width}
        height={height}
        fill="hsl(var(--background))"
        stroke={FOREGROUND}
        strokeWidth={2}
      />
      <text
        x={cx + dx + width / 2}
        y={cy + dy + height / 2 + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill={FOREGROUND}
        style={{ textTransform: 'uppercase' }}
      >
        {text}
      </text>
    </g>
  )
}

export function referenceLineElement(
  spec: ChartReferenceLineSpec,
  key?: React.Key
): React.ReactElement<React.ComponentProps<typeof ReferenceLine>> {
  const axisProp = spec.axis === 'x' ? { x: spec.value } : { y: spec.value }
  return (
    <ReferenceLine
      key={key}
      {...axisProp}
      stroke={spec.color ?? FOREGROUND}
      strokeWidth={3}
      strokeDasharray={spec.dash ? DASH : undefined}
      label={
        spec.label
          ? { value: spec.label, position: 'insideTopRight', fontWeight: 700, fontSize: 11 }
          : undefined
      }
      ifOverflow="extendDomain"
    />
  )
}

export function calloutElement(
  spec: ChartCalloutSpec,
  key?: React.Key
): React.ReactElement<React.ComponentProps<typeof ReferenceDot>> {
  return (
    <ReferenceDot
      key={key}
      x={spec.x}
      y={spec.y}
      r={0}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      label={(props: any) => (
        <CalloutLabel viewBox={props?.viewBox} text={spec.text} placement={spec.placement} />
      )}
    />
  )
}

export function arrowElements(spec: ChartArrowSpec, key?: React.Key): React.ReactElement[] {
  const k = key ?? 'arrow'
  return [
    <ReferenceLine
      key={`${k}-line`}
      segment={[
        { x: spec.from.x, y: spec.from.y },
        { x: spec.to.x, y: spec.to.y },
      ]}
      stroke={FOREGROUND}
      strokeWidth={3}
      label={
        spec.label
          ? { value: spec.label, position: 'center', fontWeight: 700, fontSize: 11 }
          : undefined
      }
      ifOverflow="extendDomain"
    />,
    // Endpoint marker approximating an arrowhead.
    <ReferenceDot
      key={`${k}-head`}
      x={spec.to.x}
      y={spec.to.y}
      r={5}
      fill={FOREGROUND}
      stroke={FOREGROUND}
    />,
  ]
}

export function renderChartAnnotations(annotations: ChartAnnotation[]): React.ReactElement[] {
  const out: React.ReactElement[] = []
  annotations.forEach((a, i) => {
    if (a.kind === 'referenceLine') out.push(referenceLineElement(a, `ann-${i}`))
    else if (a.kind === 'callout') out.push(calloutElement(a, `ann-${i}`))
    else out.push(...arrowElements(a, `ann-${i}`))
  })
  return out
}
