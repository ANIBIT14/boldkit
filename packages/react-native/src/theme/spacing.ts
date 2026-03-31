// Spacing scale (4px base unit, matches Tailwind's default scale).

export const spacing = {
  0:    0,
  0.5:  2,
  1:    4,
  1.5:  6,
  2:    8,
  2.5:  10,
  3:    12,
  3.5:  14,
  4:    16,
  5:    20,
  6:    24,
  7:    28,
  8:    32,
  9:    36,
  10:   40,
  11:   44,
  12:   48,
  14:   56,
  16:   64,
  20:   80,
  24:   96,
} as const

// Neubrutalism-specific tokens — these must match the web design system exactly.
export const borderWidth = {
  default: 3, // --border-width: 3px
  thin:    2,
  thick:   4,
} as const

export const shadowOffset = 4 // --shadow-offset: 4px

export const borderRadius = {
  none: 0, // --radius: 0rem — sharp corners everywhere
} as const
