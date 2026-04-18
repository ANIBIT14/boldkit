import * as React from 'react'
import { cn } from '@/lib/utils'

// ============================================================================
// Types
// ============================================================================

export type AsciiSize = 'sm' | 'md' | 'lg' | 'hero'
export type AsciiCharset = 'blocks' | 'braille' | 'classic' | 'line' | 'dots'
export type AsciiSpeed = 'slow' | 'normal' | 'fast'

export interface AsciiShapeProps extends React.HTMLAttributes<HTMLPreElement> {
  size?: AsciiSize
  charset?: AsciiCharset
  color?: string
  speed?: AsciiSpeed
  animated?: boolean
  multicolor?: boolean
}

// ============================================================================
// Constants
// ============================================================================

const SIZE_MAP: Record<AsciiSize, { cols: number; rows: number }> = {
  sm:   { cols: 24,  rows: 12 },
  md:   { cols: 48,  rows: 24 },
  lg:   { cols: 72,  rows: 36 },
  hero: { cols: 120, rows: 60 },
}

const CHARSETS: Record<AsciiCharset, string[]> = {
  blocks:  [' ', '░', '▒', '▓', '█'],
  braille: [' ', '⠁', '⠃', '⠇', '⠿', '⠷'],
  classic: [' ', '.', ':', 'o', '*', '#', '@'],
  line:    [' ', '-', '/', '|', '\\', '+', 'X'],
  dots:    [' ', '.', '·', '•', '●'],
}

const SPEED_MAP: Record<AsciiSpeed, number> = {
  slow:   0.4,
  normal: 1.0,
  fast:   2.2,
}

const MULTICOLOR_PALETTE = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--warning))',
  'hsl(var(--info))',
  'hsl(var(--success))',
]

// ============================================================================
// Grid engine
// ============================================================================

function makeGrid(cols: number, rows: number): string[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(' '))
}

function gridToLines(grid: string[][]): string[] {
  return grid.map((row) => row.join(''))
}

// ============================================================================
// Draw functions
// ============================================================================

function drawSpiral(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  const cx = cols / 2, cy = rows / 2
  const aspect = 2.0
  const spacing = Math.min(cx * aspect, cy) * 0.35

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) * aspect
      const dy = r - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 0.5) { grid[r][c] = chars[chars.length - 1]; continue }
      const angle = ((Math.atan2(dy, dx) + t * 0.002) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)
      const armPhase = angle / (2 * Math.PI)
      const winding = Math.round(dist / spacing - armPhase)
      const nearestR = spacing * (armPhase + winding)
      const distToArm = Math.abs(dist - nearestR)
      const threshold = spacing * 0.38
      if (nearestR >= 0 && distToArm < threshold) {
        const intensity = 1 - distToArm / threshold
        grid[r][c] = chars[Math.floor(intensity * (chars.length - 1))]
      } else {
        grid[r][c] = ' '
      }
    }
  }
}

function drawRose(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  const cx = cols / 2, cy = rows / 2
  const aspect = 2.0
  const k = 5
  const radius = Math.min(cx * aspect, cy) * 0.85

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) * aspect
      const dy = r - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) + t * 0.001
      const roseR = radius * Math.abs(Math.cos(k * angle))
      const distToRose = Math.abs(dist - roseR)
      const threshold = radius * 0.12
      if (distToRose < threshold) {
        const intensity = 1 - distToRose / threshold
        grid[r][c] = chars[Math.floor(intensity * (chars.length - 1))]
      } else {
        grid[r][c] = ' '
      }
    }
  }
}

function drawWave(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c / cols
      const y = r / rows
      const wave =
        0.5 * Math.sin(2 * Math.PI * (x * 2 - t * 0.001)) +
        0.3 * Math.sin(2 * Math.PI * (x * 3 - t * 0.0015)) +
        0.2 * Math.sin(2 * Math.PI * (x * 5 - t * 0.002))
      const waveY = 0.5 + wave * 0.3
      const distToWave = Math.abs(y - waveY)
      const threshold = 0.08
      if (distToWave < threshold) {
        const intensity = 1 - distToWave / threshold
        grid[r][c] = chars[Math.floor(intensity * (chars.length - 1))]
      } else {
        grid[r][c] = ' '
      }
    }
  }
}

function drawVortex(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  const cx = cols / 2, cy = rows / 2
  const aspect = 2.0
  const maxR = Math.sqrt((cx * aspect) ** 2 + cy ** 2)

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) * aspect
      const dy = r - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)
      const vortexAngle = angle + dist * 0.3 - t * 0.002
      const intensity = ((Math.sin(vortexAngle * 3) + 1) / 2) * Math.exp(-dist / (maxR * 0.8))
      if (intensity > 0.08) {
        grid[r][c] = chars[Math.min(Math.floor(intensity * (chars.length - 1)), chars.length - 1)]
      } else {
        grid[r][c] = ' '
      }
    }
  }
}

function drawPulse(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  const cx = cols / 2, cy = rows / 2
  const aspect = 2.0
  const speed = t * 0.05
  const ringSpacing = Math.min(cx * aspect, cy) * 0.35
  const maxR = Math.sqrt((cx * aspect) ** 2 + cy ** 2)

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) * aspect
      const dy = r - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const phase = ((dist - speed) % ringSpacing + ringSpacing) % ringSpacing
      const ringIntensity = Math.pow(Math.sin(Math.PI * phase / ringSpacing), 2)
      const fade = Math.max(0, 1 - dist / maxR)
      const intensity = ringIntensity * fade
      if (intensity > 0.05) {
        grid[r][c] = chars[Math.floor(intensity * (chars.length - 1))]
      } else {
        grid[r][c] = ' '
      }
    }
  }
}

interface ColState { offset: number; speed: number }

function makeMatrixState(cols: number): ColState[] {
  return Array.from({ length: cols }, (_, i) => ({
    offset: (i * 37 % 100),
    speed: 0.5 + (i * 13 % 10) * 0.15,
  }))
}

function drawMatrix(grid: string[][], cols: number, rows: number, t: number, chars: string[], state: ColState[]): void {
  for (let c = 0; c < cols; c++) {
    const colT = (t * 0.001 * state[c].speed + state[c].offset) % (rows * 1.8)
    for (let r = 0; r < rows; r++) {
      const distFromHead = colT - r
      if (distFromHead >= 0 && distFromHead < 1) {
        grid[r][c] = chars[chars.length - 1]
      } else if (distFromHead >= 1 && distFromHead < rows * 0.45) {
        const fade = 1 - distFromHead / (rows * 0.45)
        grid[r][c] = chars[Math.floor(fade * (chars.length - 1))]
      } else {
        grid[r][c] = ' '
      }
    }
  }
}

function drawGrid(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  const cellW = 6, cellH = 3
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isH = r % cellH === 0
      const isV = c % cellW === 0
      if (isH && isV) {
        const wave = (Math.sin(c / cols * Math.PI * 4 + r / rows * Math.PI * 2 - t * 0.002) + 1) / 2
        grid[r][c] = chars[Math.floor(wave * (chars.length - 1))]
      } else if (isH || isV) {
        const wave = Math.sin(c / cols * Math.PI * 8 + r / rows * Math.PI * 4 - t * 0.001) * 0.3 + 0.3
        grid[r][c] = chars[Math.floor(wave * (chars.length - 1))]
      } else {
        grid[r][c] = ' '
      }
    }
  }
}

function drawTorus(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  const A = t * 0.0012, B = t * 0.0007
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const R1 = 1.0, R2 = 2.2, K2 = 5.0
  const cx = cols / 2, cy = rows / 2
  const aspect = 0.5
  const screenScale = Math.min(cols * aspect, rows) * 0.85
  const K1 = screenScale * K2 / (K2 + R1 + R2)
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  for (let theta = 0; theta < 2 * Math.PI; theta += 0.05) {
    const cosT = Math.cos(theta), sinT = Math.sin(theta)
    for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
      const cosP = Math.cos(phi), sinP = Math.sin(phi)
      const ox = (R2 + R1 * cosT) * cosP
      const oy = (R2 + R1 * cosT) * sinP
      const oz = R1 * sinT
      const oy1 =  oy * cosA - oz * sinA
      const oz1 =  oy * sinA + oz * cosA
      const ox2 =  ox * cosB - oy1 * sinB
      const oy2 =  ox * sinB + oy1 * cosB
      const oz2 = -ox * sinB + oz1 * cosB
      const zDist = K2 - oz2
      if (zDist <= 0) continue
      const ooz = 1.0 / zDist
      const xp = Math.round(cx + K1 * ox2 * ooz)
      const yp = Math.round(cy - K1 * oy2 * ooz * aspect)
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue
      const nx = cosT * cosP, ny = cosT * sinP, nz = sinT
      const ny1 =  ny * cosA - nz * sinA
      const nz1 =  ny * sinA + nz * cosA
      const nx2 =  nx * cosB - ny1 * sinB
      const ny2 =  nx * sinB + ny1 * cosB
      const nz2 =  nz1
      const L = nx2 * 0.57 + ny2 * 0.57 + nz2 * (-0.57)
      if (L > 0 && ooz > zbuf[yp][xp]) {
        zbuf[yp][xp] = ooz
        grid[yp][xp] = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
      }
    }
  }
}

function drawSphere(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  const cx = cols / 2, cy = rows / 2
  const aspect = 2.0
  const R = Math.min(cols / (aspect * 2), rows / 2) * 0.88
  const A = t * 0.0007, B = t * 0.0004
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  // Light from upper-right-front
  const lx = 0.577, ly = -0.577, lz = -0.577

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const sx = (c - cx) / (R * aspect)
      const sy = (r - cy) / R
      const d2 = sx * sx + sy * sy
      if (d2 >= 1.0) continue
      const sz = Math.sqrt(1.0 - d2)  // front-facing z (positive toward viewer)
      // Rotate surface point for texture coordinates
      const ny1 = sy * cosA - sz * sinA
      const nz1 = sy * sinA + sz * cosA
      const nx2 = sx * cosB + nz1 * sinB
      const nz2 = -sx * sinB + nz1 * cosB
      const ny2 = ny1
      // Lat/lon grid lines on rotating surface
      const lat = Math.asin(Math.max(-1, Math.min(1, ny2)))
      const lon = Math.atan2(nx2, nz2)
      const onGrid = Math.abs(Math.cos(lat * 5)) > 0.93 || Math.abs(Math.cos(lon * 8)) > 0.91
      // Lighting uses unrotated normal (sx, sy, sz)
      const L = Math.max(0, sx * lx + sy * ly + sz * lz)
      if (onGrid) {
        const intensity = 0.3 + L * 0.7
        grid[r][c] = chars[Math.min(Math.floor(intensity * (chars.length - 1)), chars.length - 1)]
      } else if (L > 0.02) {
        grid[r][c] = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
      }
      // dark side stays ' '
    }
  }
}

function drawCube(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  const A = t * 0.0009, B = t * 0.0006
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const cx = cols / 2, cy = rows / 2
  const K2 = 5.0, S = 1.4, aspect = 0.5
  const scale = Math.min(cols * aspect, rows) * 0.72
  const K1 = scale * K2 / (K2 + S)
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  const lx = 0.577, ly = -0.577, lz = -0.577

  function rot(px: number, py: number, pz: number): [number, number, number] {
    const y1 = py * cosA - pz * sinA
    const z1 = py * sinA + pz * cosA
    return [px * cosB + z1 * sinB, y1, -px * sinB + z1 * cosB]
  }

  const step = 0.04
  const faces: Array<[[number, number, number], (u: number, v: number) => [number, number, number]]> = [
    [[0,  0,  1], (u, v) => [ u*S,  v*S,  S]],
    [[0,  0, -1], (u, v) => [-u*S,  v*S, -S]],
    [[1,  0,  0], (u, v) => [ S,    v*S, -u*S]],
    [[-1, 0,  0], (u, v) => [-S,    v*S,  u*S]],
    [[0, -1,  0], (u, v) => [ u*S, -S,    v*S]],
    [[0,  1,  0], (u, v) => [ u*S,  S,   -v*S]],
  ]

  for (const [norm, ptFn] of faces) {
    const [rnx, rny, rnz] = rot(norm[0], norm[1], norm[2])
    const L = Math.max(0, rnx * lx + rny * ly + rnz * lz)
    if (L < 0.02) continue
    const ch = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
    for (let u = -1; u <= 1 + step * 0.5; u += step) {
      for (let v = -1; v <= 1 + step * 0.5; v += step) {
        const [rx, ry, rz] = rot(...ptFn(u, v))
        const zDist = K2 - rz
        if (zDist <= 0) continue
        const ooz = 1 / zDist
        const xp = Math.round(cx + K1 * rx * ooz)
        const yp = Math.round(cy - K1 * ry * ooz * aspect)
        if (xp >= 0 && xp < cols && yp >= 0 && yp < rows && ooz > zbuf[yp][xp]) {
          zbuf[yp][xp] = ooz
          grid[yp][xp] = ch
        }
      }
    }
  }
}

function drawDonut(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  // Faithful a1k0n donut.c algorithm — ring lies in XZ plane so hole is always visible
  const A = t * 0.00083, B = t * 0.00125
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const R1 = 1.0, R2 = 2.0, K2 = 5.0
  const cx = cols / 2, cy = rows / 2
  const aspect = 0.5
  const K1 = Math.min(cols * aspect, rows) * K2 / (K2 + R1 + R2) * 0.9
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))

  for (let theta = 0; theta < 2 * Math.PI; theta += 0.07) {
    const cosT = Math.cos(theta), sinT = Math.sin(theta)
    const h = R2 + R1 * cosT
    for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
      const cosP = Math.cos(phi), sinP = Math.sin(phi)
      const ycomp = sinP * h * cosA - sinT * sinA
      const zDist = sinP * h * sinA + sinT * cosA + K2
      if (zDist <= 0) continue
      const ooz = 1 / zDist
      const xp = Math.round(cx + K1 * ooz * (cosP * h * cosB - ycomp * sinB))
      const yp = Math.round(cy - K1 * ooz * (cosP * h * sinB + ycomp * cosB) * aspect)
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue
      const L = (sinT * sinA - sinP * cosT * cosA) * cosB
              - sinP * cosT * sinA
              - sinT * cosA
              - cosP * cosT * sinB
      if (L > 0 && ooz > zbuf[yp][xp]) {
        zbuf[yp][xp] = ooz
        grid[yp][xp] = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
      }
    }
  }
}

function drawHelix(grid: string[][], cols: number, rows: number, t: number, chars: string[]): void {
  const cx = cols / 2, cy = rows / 2
  const aspect = 0.5
  const K2 = 6.0
  const scale = Math.min(cols * aspect, rows) * 0.5
  const K1 = scale
  const B = t * 0.0006
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  const lx = 0.707, lz = -0.707
  const helixR = 1.2, helixH = 3.8, turns = 3

  function plot(px: number, py: number, pz: number, intensity: number) {
    const rx = px * cosB + pz * sinB
    const rz = -px * sinB + pz * cosB
    const zDist = K2 - rz
    if (zDist <= 0) return
    const ooz = 1 / zDist
    const xp = Math.round(cx + K1 * rx * ooz)
    const yp = Math.round(cy - K1 * py * ooz * aspect)
    if (xp >= 0 && xp < cols && yp >= 0 && yp < rows && ooz > zbuf[yp][xp]) {
      zbuf[yp][xp] = ooz
      grid[yp][xp] = chars[Math.min(Math.floor(intensity * (chars.length - 1)), chars.length - 1)]
    }
  }

  const pStep = 0.025
  for (let phi = 0; phi < turns * 2 * Math.PI; phi += pStep) {
    const y = (phi / (turns * 2 * Math.PI) - 0.5) * helixH * 2
    // Strand 1
    const x1 = helixR * Math.cos(phi), z1 = helixR * Math.sin(phi)
    plot(x1, y, z1, Math.max(0.15, Math.cos(phi) * lx + Math.sin(phi) * lz * 0.5 + 0.55))
    // Strand 2 (π offset)
    const x2 = helixR * Math.cos(phi + Math.PI), z2 = helixR * Math.sin(phi + Math.PI)
    plot(x2, y, z2, Math.max(0.15, Math.cos(phi + Math.PI) * lx + Math.sin(phi + Math.PI) * lz * 0.5 + 0.55))
    // Rungs every half-turn
    if (phi % (Math.PI * 0.5) < pStep * 1.5) {
      for (let s = 0; s <= 14; s++) {
        const f = s / 14
        plot(x1 + (x2 - x1) * f, y, z1 + (z2 - z1) * f, 0.45)
      }
    }
  }
}

// ============================================================================
// Component factory
// ============================================================================

type DrawFn = (grid: string[][], cols: number, rows: number, t: number, chars: string[], extra?: ColState[]) => void

function makeAsciiComponent(drawFn: DrawFn, defaultCharset: AsciiCharset = 'classic') {
  return React.forwardRef<HTMLPreElement, AsciiShapeProps>(
    (
      {
        size = 'md',
        charset = defaultCharset,
        color,
        speed = 'normal',
        animated = true,
        multicolor = false,
        className,
        ...props
      },
      ref
    ) => {
      const { cols, rows } = SIZE_MAP[size]
      const chars = CHARSETS[charset]
      const speedMul = SPEED_MAP[speed]
      const matrixState = React.useRef<ColState[]>(makeMatrixState(cols))

      const [lines, setLines] = React.useState<string[]>(() => {
        const g = makeGrid(cols, rows)
        drawFn(g, cols, rows, 0, chars, matrixState.current)
        return gridToLines(g)
      })

      React.useEffect(() => {
        matrixState.current = makeMatrixState(cols)

        if (!animated) {
          const g = makeGrid(cols, rows)
          drawFn(g, cols, rows, 0, chars, matrixState.current)
          setLines(gridToLines(g))
          return
        }

        const startTime = performance.now()
        let rafId = 0

        function frame(now: number) {
          const t = (now - startTime) * speedMul
          const g = makeGrid(cols, rows)
          drawFn(g, cols, rows, t, chars, matrixState.current)
          setLines(gridToLines(g))
          rafId = requestAnimationFrame(frame)
        }

        rafId = requestAnimationFrame(frame)
        return () => cancelAnimationFrame(rafId)
      // eslint-disable-next-line react-hooks/exhaustive-deps -- drawFn is stable (module-level, never changes per component)
      }, [size, charset, speed, animated])

      return (
        <pre
          ref={ref}
          aria-hidden="true"
          className={cn(
            'inline-block border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-background overflow-hidden',
            'font-mono text-xs leading-none tracking-tight select-none p-1',
            className
          )}
          style={multicolor ? undefined : { color: color || 'currentColor' }}
          {...props}
        >
          {multicolor
            ? lines.map((line, i) => (
                <React.Fragment key={i}>
                  <span style={{ color: MULTICOLOR_PALETTE[i % MULTICOLOR_PALETTE.length] }}>{line}</span>
                  {i < lines.length - 1 && '\n'}
                </React.Fragment>
              ))
            : lines.join('\n')}
        </pre>
      )
    }
  )
}

// ============================================================================
// Named exports — 12 ASCII shape components
// ============================================================================

export const AsciiSpiral = makeAsciiComponent(drawSpiral, 'classic')
AsciiSpiral.displayName = 'AsciiSpiral'

export const AsciiRose = makeAsciiComponent(drawRose, 'braille')
AsciiRose.displayName = 'AsciiRose'

export const AsciiWave = makeAsciiComponent(drawWave, 'classic')
AsciiWave.displayName = 'AsciiWave'

export const AsciiVortex = makeAsciiComponent(drawVortex, 'blocks')
AsciiVortex.displayName = 'AsciiVortex'

export const AsciiPulse = makeAsciiComponent(drawPulse, 'dots')
AsciiPulse.displayName = 'AsciiPulse'

export const AsciiMatrix = makeAsciiComponent(
  (g, cols, rows, t, chars, state) => drawMatrix(g, cols, rows, t, chars, state!), 'classic'
)
AsciiMatrix.displayName = 'AsciiMatrix'

export const AsciiGrid = makeAsciiComponent(drawGrid, 'line')
AsciiGrid.displayName = 'AsciiGrid'

export const AsciiTorus = makeAsciiComponent(drawTorus, 'blocks')
AsciiTorus.displayName = 'AsciiTorus'

export const AsciiSphere = makeAsciiComponent(drawSphere, 'classic')
AsciiSphere.displayName = 'AsciiSphere'

export const AsciiCube = makeAsciiComponent(drawCube, 'blocks')
AsciiCube.displayName = 'AsciiCube'

export const AsciiHelix = makeAsciiComponent(drawHelix, 'braille')
AsciiHelix.displayName = 'AsciiHelix'

export const AsciiDonut = makeAsciiComponent(drawDonut, 'classic')
AsciiDonut.displayName = 'AsciiDonut'
