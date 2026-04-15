export type AsciiSize = 'sm' | 'md' | 'lg' | 'hero'
export type AsciiCharset = 'blocks' | 'braille' | 'classic' | 'line' | 'dots'
export type AsciiSpeed = 'slow' | 'normal' | 'fast'

export const SIZE_MAP: Record<AsciiSize, { cols: number; rows: number }> = {
  sm:   { cols: 24,  rows: 12 },
  md:   { cols: 48,  rows: 24 },
  lg:   { cols: 72,  rows: 36 },
  hero: { cols: 120, rows: 60 },
}

export const CHARSETS: Record<AsciiCharset, string[]> = {
  blocks:  [' ', '░', '▒', '▓', '█'],
  braille: [' ', '⠁', '⠃', '⠇', '⠿', '⠷'],
  classic: [' ', '.', ':', 'o', '*', '#', '@'],
  line:    [' ', '-', '/', '|', '\\', '+', 'X'],
  dots:    [' ', '.', '·', '•', '●'],
}

export const SPEED_MAP: Record<AsciiSpeed, number> = {
  slow: 0.4, normal: 1.0, fast: 2.2,
}

export const MULTICOLOR_PALETTE = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--warning))',
  'hsl(var(--info))',
  'hsl(var(--success))',
]

export function makeGrid(cols: number, rows: number): string[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(' '))
}

export function gridToLines(grid: string[][]): string[] {
  return grid.map((row) => row.join(''))
}

export interface ColState { offset: number; speed: number }

export function makeMatrixState(cols: number): ColState[] {
  return Array.from({ length: cols }, (_, i) => ({
    offset: (i * 37 % 100),
    speed: 0.5 + (i * 13 % 10) * 0.15,
  }))
}
