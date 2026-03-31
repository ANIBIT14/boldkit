// Typography tokens mirroring the Outfit font setup from globals.css.
// The Outfit font must be loaded in the consuming app (via expo-font or react-native-asset-links).

export const fontFamily = {
  display: 'Outfit-Black',   // 900 weight — display headings
  bold:    'Outfit-Bold',    // 700 weight — labels, titles, button text
  medium:  'Outfit-Medium',  // 500 weight — subheadings
  regular: 'Outfit-Regular', // 400 weight — body text
  // Fallbacks for when Outfit is not loaded
  displayFallback: 'System',
  bodyFallback:    'System',
} as const

export const fontSize = {
  xs:   10,
  sm:   12,
  base: 14,
  md:   16,
  lg:   18,
  xl:   20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const

export const fontWeight = {
  regular: '400' as const,
  medium:  '500' as const,
  bold:    '700' as const,
  black:   '900' as const,
}

export const lineHeight = {
  tight:  1.2,
  normal: 1.5,
  loose:  1.8,
} as const

// Letter spacing for uppercase neubrutalism labels (tracking-wide equivalent)
export const letterSpacing = {
  normal: 0,
  wide:   1.2,
  wider:  1.6,
  widest: 2.4,
} as const
