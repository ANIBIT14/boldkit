import { tv } from '../../lib/tv'
import { borderWidth, spacing } from '../../theme/spacing'
import { fontWeight, letterSpacing } from '../../theme/typography'

// Variant styles return ViewStyle (for the container) and TextStyle (for the label).
// Colors are resolved at render time via useTheme() since they depend on dark mode.

export const buttonContainerVariants = tv({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: borderWidth.default,
    borderRadius: 0,
    gap: spacing[2],
  },
  variants: {
    size: {
      sm:      { height: 36, paddingHorizontal: spacing[3], paddingVertical: spacing[1] },
      default: { height: 44, paddingHorizontal: spacing[5], paddingVertical: spacing[2] },
      lg:      { height: 52, paddingHorizontal: spacing[6], paddingVertical: spacing[3] },
      xl:      { height: 60, paddingHorizontal: spacing[8], paddingVertical: spacing[4] },
      icon:    { height: 44, width: 44, paddingHorizontal: 0, paddingVertical: 0 },
    },
  },
  defaultVariants: { size: 'default' },
})

export const buttonTextVariants = tv({
  base: {
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  },
  variants: {
    size: {
      sm:      { fontSize: 11 },
      default: { fontSize: 13 },
      lg:      { fontSize: 15 },
      xl:      { fontSize: 16 },
      icon:    { fontSize: 13 },
    },
  },
  defaultVariants: { size: 'default' },
})

export type ButtonVariant = 'default' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon'
export type ButtonAnimation = 'none' | 'pulse' | 'bounce' | 'shake' | 'wiggle'
