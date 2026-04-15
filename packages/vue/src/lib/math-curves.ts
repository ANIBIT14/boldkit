/**
 * math-curves.ts
 * Framework-agnostic math engine for parametric curve animations.
 * All coordinates are in [0, 100] SVG space, center at (50, 50).
 * progress: 0–1 (fraction of full curve loop)
 * detailScale: 0.52–1.0 (breathing oscillator, see getDetailScale)
 */

export type LoaderCurveKey =
  | 'rose' | 'lissajous' | 'butterfly' | 'hypotrochoid'
  | 'cardioid' | 'lemniscate' | 'fourier' | 'rose3'
  | 'astroid' | 'deltoid' | 'nephroid' | 'epicycloid'
  | 'superellipse' | 'triskelion' | 'involute'

export type ProgressCurveKey =
  | 'spiral' | 'heart' | 'lissajous' | 'cardioid' | 'rose'
  | 'astroid' | 'superellipse' | 'deltoid'

export type BackgroundCurveKey =
  | 'rose' | 'lissajous' | 'fourier' | 'spiral'
  | 'triskelion' | 'involute' | 'epicycloid'

export type CurveKey = LoaderCurveKey | ProgressCurveKey | BackgroundCurveKey

type Point = { x: number; y: number }

interface CurveDefinition {
  /** t parameter range — progress 0→1 maps to tMin→tMax */
  tMin: number
  tMax: number
  /** Default breathing cycle duration in ms */
  pulseDurationMs: number
  /** Default segment count for buildPath */
  defaultSegments: number
  /** Core parametric function — returns {x, y} in [0,100] space */
  compute: (t: number, detailScale: number) => Point
}

const CURVE_DEFS: Record<string, CurveDefinition> = {
  // 5-petal rose: r = a·cos(5θ), odd k → full flower in [0, π]
  rose: {
    tMin: 0,
    tMax: Math.PI,
    pulseDurationMs: 5000,
    defaultSegments: 300,
    compute: (t, ds) => {
      const a = 30 + ds * 8
      const r = a * Math.cos(5 * t)
      return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) }
    },
  },

  // 3-petal rose: r = a·cos(3θ), odd k → full flower in [0, π]
  rose3: {
    tMin: 0,
    tMax: Math.PI,
    pulseDurationMs: 5500,
    defaultSegments: 240,
    compute: (t, ds) => {
      const a = 34 + ds * 6
      const r = a * Math.cos(3 * t)
      return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) }
    },
  },

  // Lissajous figure (3:4 ratio): x = A·sin(3t + π/2), y = B·sin(4t)
  lissajous: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 4800,
    defaultSegments: 240,
    compute: (t, ds) => {
      const A = 34 + ds * 6
      const B = A * 0.86
      return { x: 50 + A * Math.sin(3 * t + Math.PI / 2), y: 50 + B * Math.sin(4 * t) }
    },
  },

  // Butterfly curve: r = e^cos(t) - 2·cos(4t) - sin^5(t/12)
  // Full closure at t = 12π (6 full rotations)
  butterfly: {
    tMin: 0,
    tMax: 12 * Math.PI,
    pulseDurationMs: 6000,
    defaultSegments: 480,
    compute: (t, ds) => {
      const r =
        Math.exp(Math.cos(t)) -
        2 * Math.cos(4 * t) -
        Math.pow(Math.sin(t / 12), 5)
      const scale = 7 + ds * 2.5
      return { x: 50 + scale * r * Math.cos(t), y: 50 + scale * r * Math.sin(t) }
    },
  },

  // Hypotrochoid (spirograph): R=5, r=3, d varies with detailScale
  // (R-r)/r = 2/3 → closes at t = 6π (3 outer rotations)
  hypotrochoid: {
    tMin: 0,
    tMax: 6 * Math.PI,
    pulseDurationMs: 5500,
    defaultSegments: 300,
    compute: (t, ds) => {
      const R = 5,
        r = 3
      const d = 3.5 + ds * 1.5 // 3.5–5.0
      const scale = 5
      const x = scale * ((R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t))
      const y = scale * ((R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t))
      return { x: 50 + x, y: 50 + y }
    },
  },

  // Cardioid: r = a(1 - cos t), shifted to center
  cardioid: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 5000,
    defaultSegments: 300,
    compute: (t, ds) => {
      const a = 18 + ds * 4
      const r = a * (1 - Math.cos(t))
      // Shift right by a so the cusp is at (50 - a, 50) and tip at (50 + a, 50)
      return { x: 50 - a + r * Math.cos(t), y: 50 + r * Math.sin(t) }
    },
  },

  // Bernoulli lemniscate: x = a·cos(t)/(1+sin²t), y = a·sin(t)·cos(t)/(1+sin²t)
  lemniscate: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 4500,
    defaultSegments: 300,
    compute: (t, ds) => {
      const a = 36 + ds * 6
      const sinT = Math.sin(t)
      const denom = 1 + sinT * sinT
      return {
        x: 50 + (a * Math.cos(t)) / denom,
        y: 50 + (a * Math.sin(t) * Math.cos(t)) / denom,
      }
    },
  },

  // Fourier sum: multiple interfering harmonics
  fourier: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 6500,
    defaultSegments: 480,
    compute: (t, ds) => {
      const a1 = 20
      const a2 = 10 + ds * 6
      const a3 = 7
      const a4 = 4 + ds * 3
      const x =
        a1 * Math.cos(t) +
        a2 * Math.cos(2 * t) +
        a3 * Math.cos(3 * t) +
        a4 * Math.cos(5 * t)
      const y =
        a1 * Math.sin(t) +
        a2 * Math.sin(2 * t) -
        a3 * Math.sin(3 * t) +
        a4 * Math.sin(5 * t)
      return { x: 50 + x, y: 50 + y }
    },
  },

  // Archimedean spiral: r = b·t, progress 0→1 maps to 0 full revolutions outward
  spiral: {
    tMin: 0,
    tMax: 4 * Math.PI,
    pulseDurationMs: 5000,
    defaultSegments: 200,
    compute: (t, ds) => {
      const b = 2.5 + ds * 0.5
      const r = b * t
      return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) }
    },
  },

  // Parametric heart: x = 16sin³t, y = -(13cost - 5cos2t - 2cos3t - cos4t)
  heart: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 5200,
    defaultSegments: 200,
    compute: (t, ds) => {
      const scale = 1.8 + ds * 0.4
      const x = scale * 16 * Math.pow(Math.sin(t), 3)
      const y =
        -scale *
        (13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t))
      return { x: 50 + x, y: 50 + y }
    },
  },

  // Astroid (4-cusped hypocycloid): x = a·cos³t, y = a·sin³t
  astroid: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 4000,
    defaultSegments: 300,
    compute: (t, ds) => {
      const a = 38 + ds * 4
      return {
        x: 50 + a * Math.pow(Math.cos(t), 3),
        y: 50 + a * Math.pow(Math.sin(t), 3),
      }
    },
  },

  // Deltoid (3-cusped hypocycloid, R=3 r=1): x=(2cos+cos2t), y=(2sin-sin2t)
  deltoid: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 4800,
    defaultSegments: 240,
    compute: (t, ds) => {
      const scale = 11 + ds * 2
      return {
        x: 50 + scale * (2 * Math.cos(t) + Math.cos(2 * t)),
        y: 50 + scale * (2 * Math.sin(t) - Math.sin(2 * t)),
      }
    },
  },

  // Nephroid (2-cusped epicycloid, R=2 r=1): x=3cos(t)-cos(3t), y=3sin(t)-sin(3t)
  nephroid: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 5200,
    defaultSegments: 300,
    compute: (t, ds) => {
      const scale = 9 + ds * 2
      return {
        x: 50 + scale * (3 * Math.cos(t) - Math.cos(3 * t)),
        y: 50 + scale * (3 * Math.sin(t) - Math.sin(3 * t)),
      }
    },
  },

  // Epicycloid (5-cusped, R=5 r=1): x=6cos-cos6t, y=6sin-sin6t
  epicycloid: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 5000,
    defaultSegments: 300,
    compute: (t, ds) => {
      const scale = 5 + ds * 0.5
      return {
        x: 50 + scale * (6 * Math.cos(t) - Math.cos(6 * t)),
        y: 50 + scale * (6 * Math.sin(t) - Math.sin(6 * t)),
      }
    },
  },

  // Superellipse (Lamé curve): |x/a|^n + |y/a|^n = 1, n oscillates 2→4
  superellipse: {
    tMin: 0,
    tMax: 2 * Math.PI,
    pulseDurationMs: 6000,
    defaultSegments: 360,
    compute: (t, ds) => {
      const a = 36
      const n = 2 + ds * 2
      const exp = 2 / n
      const cosT = Math.cos(t)
      const sinT = Math.sin(t)
      return {
        x: 50 + a * Math.sign(cosT) * Math.pow(Math.abs(cosT), exp),
        y: 50 + a * Math.sign(sinT) * Math.pow(Math.abs(sinT), exp),
      }
    },
  },

  // Triskelion: 3 Archimedean spiral arms, 120° apart
  triskelion: {
    tMin: 0,
    tMax: 6 * Math.PI,
    pulseDurationMs: 5500,
    defaultSegments: 360,
    compute: (t, ds) => {
      const b = 32 + ds * 8
      const arm = Math.floor(t / (2 * Math.PI))
      const theta = t - arm * 2 * Math.PI
      const offset = (arm * 2 * Math.PI) / 3
      const r = b * (theta / (2 * Math.PI))
      return {
        x: 50 + r * Math.cos(theta + offset),
        y: 50 + r * Math.sin(theta + offset),
      }
    },
  },

  // Involute of circle: x = a(cos t + t·sin t), y = a(sin t - t·cos t)
  involute: {
    tMin: 0,
    tMax: 4 * Math.PI,
    pulseDurationMs: 5800,
    defaultSegments: 300,
    compute: (t, ds) => {
      const a = 2.5 + ds * 0.5
      return {
        x: 50 + a * (Math.cos(t) + t * Math.sin(t)),
        y: 50 + a * (Math.sin(t) - t * Math.cos(t)),
      }
    },
  },
}

/**
 * Returns {x, y} in [0, 100] coordinate space for a given curve at a progress position.
 * @param curve  - curve key (e.g. 'rose', 'lissajous')
 * @param progress - 0–1 position along the full curve loop
 * @param detailScale - breathing oscillator value 0.52–1.0, defaults to 1.0
 */
export function getPoint(curve: string, progress: number, detailScale = 1.0): Point {
  const def = CURVE_DEFS[curve]
  if (!def) return { x: 50, y: 50 }
  const t = def.tMin + progress * (def.tMax - def.tMin)
  return def.compute(t, detailScale)
}

/**
 * Returns the curve tangent angle in degrees at the given progress position.
 * Computed via finite difference: angle between (progress - ε) and (progress + ε).
 * Used to rotate the head <rect> to follow the curve direction.
 * @param curve - curve key
 * @param progress - 0–1
 * @param detailScale - defaults to 1.0
 */
export function getAngle(curve: string, progress: number, detailScale = 1.0): number {
  const EPS = 0.001
  const p1 = getPoint(curve, Math.max(0, progress - EPS), detailScale)
  const p2 = getPoint(curve, Math.min(1, progress + EPS), detailScale)
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  // Fallback to larger epsilon when sample points are too close (e.g. spiral at progress=0)
  if (dx * dx + dy * dy < 1e-6) {
    const BIG_EPS = 0.01
    const q1 = getPoint(curve, Math.max(0, progress - BIG_EPS), detailScale)
    const q2 = getPoint(curve, Math.min(1, progress + BIG_EPS), detailScale)
    return Math.atan2(q2.y - q1.y, q2.x - q1.x) * (180 / Math.PI)
  }
  return Math.atan2(dy, dx) * (180 / Math.PI)
}

/**
 * Returns a full SVG path string (M + L commands) for the guide track.
 * Default segment counts per curve type:
 *   rose/cardioid/lemniscate/hypotrochoid = 300
 *   lissajous/butterfly/rose3 = 240 (butterfly: 480)
 *   fourier = 480
 *   spiral/heart = 200
 * @param curve - curve key
 * @param detailScale - defaults to 1.0
 * @param segments - optional override
 */
export function buildPath(curve: string, detailScale = 1.0, segments?: number): string {
  const def = CURVE_DEFS[curve]
  if (!def) return ''
  const n = segments ?? def.defaultSegments
  let d = ''
  for (let i = 0; i <= n; i++) {
    const progress = i / n
    const { x, y } = getPoint(curve, progress, detailScale)
    if (i === 0) {
      d = `M ${x.toFixed(2)} ${y.toFixed(2)}`
    } else {
      d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`
    }
  }
  return d
}

/**
 * Returns a sine-based breathing oscillator value in [0.52, 1.0].
 * Formula: 0.52 + ((sin(2π × (elapsed % pulseDurationMs) / pulseDurationMs) + 1) / 2) × 0.48
 * @param elapsed - current time in ms (e.g. performance.now())
 * @param pulseDurationMs - full breathing cycle duration
 */
export function getDetailScale(elapsed: number, pulseDurationMs: number): number {
  const phase = (elapsed % pulseDurationMs) / pulseDurationMs
  return 0.52 + ((Math.sin(2 * Math.PI * phase) + 1) / 2) * 0.48
}

/**
 * Returns the default pulse duration for a given curve key.
 * Useful for initializing the breathing animation.
 */
export function getCurvePulseDuration(curve: string): number {
  return CURVE_DEFS[curve]?.pulseDurationMs ?? 5000
}
