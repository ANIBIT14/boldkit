import { StyleSheet } from 'react-native'
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native'

type Style = ViewStyle | TextStyle | ImageStyle

type VariantMap<S extends Style> = Record<string, Record<string, S>>

interface TVConfig<
  Base extends Style,
  Variants extends VariantMap<Base>,
> {
  base?: Base
  variants?: Variants
  defaultVariants?: {
    [K in keyof Variants]?: keyof Variants[K]
  }
}

/**
 * StyleSheet-based variant factory — the React Native equivalent of CVA.
 *
 * Instead of producing className strings, it produces StyleSheet-compatible
 * style objects by merging the base style with the selected variant styles.
 *
 * Usage:
 *   const buttonVariants = tv({
 *     base: { borderWidth: 3, borderColor: '#16161f', paddingHorizontal: 16 },
 *     variants: {
 *       variant: {
 *         default:  { backgroundColor: '#f27878' },
 *         outline:  { backgroundColor: 'transparent' },
 *       },
 *       size: {
 *         default: { height: 44, paddingHorizontal: 20 },
 *         sm:      { height: 36, paddingHorizontal: 12 },
 *       },
 *     },
 *     defaultVariants: { variant: 'default', size: 'default' },
 *   })
 *
 *   buttonVariants({ variant: 'outline', size: 'sm' }) // → merged StyleSheet style
 */
export function tv<
  Base extends Style,
  Variants extends VariantMap<Base>,
>(config: TVConfig<Base, Variants>) {
  return function(
    selected?: { [K in keyof Variants]?: keyof Variants[K] },
    extra?: Style,
  ): Style {
    const styles: Style[] = []

    if (config.base) {
      styles.push(config.base)
    }

    if (config.variants) {
      const resolved = { ...config.defaultVariants, ...selected }
      for (const [key, val] of Object.entries(resolved)) {
        if (val != null && config.variants[key]) {
          const variantStyle = config.variants[key][val as string]
          if (variantStyle) styles.push(variantStyle)
        }
      }
    }

    if (extra) {
      styles.push(extra)
    }

    return StyleSheet.flatten(styles) as Style
  }
}
