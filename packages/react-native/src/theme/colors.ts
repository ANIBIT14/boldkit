// All color tokens translated from globals.css HSL values to hex.
// Light mode mirrors the :root CSS variables, dark mode mirrors the .dark CSS variables.

export const lightColors = {
  background:           '#fafaf5', // hsl(60 9% 98%)
  foreground:           '#16161f', // hsl(240 10% 10%)
  card:                 '#ffffff',
  cardForeground:       '#16161f',
  popover:              '#ffffff',
  popoverForeground:    '#16161f',
  primary:              '#f27878', // hsl(0 84% 71%) — coral red
  primaryForeground:    '#16161f',
  secondary:            '#3dcfbb', // hsl(174 62% 56%) — teal
  secondaryForeground:  '#16161f',
  accent:               '#ffd966', // hsl(49 100% 71%) — yellow
  accentForeground:     '#16161f',
  muted:                '#e8e8e3',
  mutedForeground:      '#6b6b78',
  destructive:          '#f24242', // hsl(0 84% 60%)
  destructiveForeground:'#ffffff',
  success:              '#6ddc9e', // hsl(152 69% 69%)
  successForeground:    '#16161f',
  warning:              '#ffcc00', // hsl(49 100% 60%)
  warningForeground:    '#16161f',
  info:                 '#66b3ff', // hsl(212 100% 73%)
  infoForeground:       '#16161f',
  border:               '#16161f',
  input:                '#16161f',
  ring:                 '#16161f',
  shadowColor:          '#16161f',
} as const

export const darkColors = {
  background:           '#16161f',
  foreground:           '#fafaf5',
  card:                 '#1f1f2e',
  cardForeground:       '#fafaf5',
  popover:              '#1f1f2e',
  popoverForeground:    '#fafaf5',
  primary:              '#f27878',
  primaryForeground:    '#16161f',
  secondary:            '#3dcfbb',
  secondaryForeground:  '#16161f',
  accent:               '#ffd966',
  accentForeground:     '#16161f',
  muted:                '#2a2a3a',
  mutedForeground:      '#a0a0aa',
  destructive:          '#f24242',
  destructiveForeground:'#ffffff',
  success:              '#6ddc9e',
  successForeground:    '#16161f',
  warning:              '#ffcc00',
  warningForeground:    '#16161f',
  info:                 '#66b3ff',
  infoForeground:       '#16161f',
  border:               '#fafaf5',
  input:                '#fafaf5',
  ring:                 '#fafaf5',
  shadowColor:          '#000000',
} as const

export type ColorTokens = typeof lightColors
