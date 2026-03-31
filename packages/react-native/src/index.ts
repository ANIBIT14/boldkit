// ─── Theme ────────────────────────────────────────────────────────────────────
export { BoldKitProvider, useTheme } from './theme/ThemeProvider'
export { lightColors, darkColors } from './theme/colors'
export { getBKShadow, BKShadowWrapper } from './theme/shadows'
export { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './theme/typography'
export { spacing, borderWidth, shadowOffset, borderRadius } from './theme/spacing'
export type { ColorTokens } from './theme/colors'

// ─── Components ───────────────────────────────────────────────────────────────
export { Button } from './components/Button'
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonAnimation } from './components/Button'

export { Badge } from './components/Badge'
export type { BadgeProps, BadgeVariant } from './components/Badge'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/Card'
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './components/Card'

export { Input } from './components/Input'
export type { InputProps } from './components/Input'

export { Checkbox } from './components/Checkbox'
export type { CheckboxProps } from './components/Checkbox'

export { Switch } from './components/Switch'
export type { SwitchProps } from './components/Switch'

export { Progress } from './components/Progress'
export type { ProgressProps, ProgressVariant } from './components/Progress'

export { Avatar, AvatarImage, AvatarFallback } from './components/Avatar'
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps, AvatarSize } from './components/Avatar'

export { Alert, AlertTitle, AlertDescription } from './components/Alert'
export type { AlertProps, AlertTitleProps, AlertDescriptionProps, AlertVariant } from './components/Alert'

export { Spinner } from './components/Spinner'
export type { SpinnerProps, SpinnerVariant, SpinnerSize } from './components/Spinner'

export { Select } from './components/Select'
export type { SelectProps, SelectItem } from './components/Select'

// ─── Shapes ───────────────────────────────────────────────────────────────────
export {
  TriangleShape,
  DiamondBadge,
  HexagonShape,
  Star5Shape,
  BurstShape,
  BlobShape,
  LightningShape,
  SpeechBubble,
  SealShape,
  GearShape,
} from './shapes'
export type { ShapeProps, ShapeAnimation, ShapeSpeed } from './shapes'
