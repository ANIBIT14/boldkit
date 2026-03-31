import React from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

/**
 * Returns platform-native shadow styles for the neubrutalism hard offset shadow.
 *
 * iOS: shadowRadius=0 + shadowOpacity=1 produces a zero-blur hard shadow.
 * Android: elevation produces a Gaussian bloom — NOT what we want.
 * Use BKShadowWrapper instead on Android for pixel-perfect shadows.
 */
export function getBKShadow(shadowColor: string, offset: number = 4): ViewStyle {
  if (Platform.OS === 'ios') {
    return {
      shadowColor,
      shadowOffset: { width: offset, height: offset },
      shadowOpacity: 1,
      shadowRadius: 0,
    }
  }
  return {}
}

/**
 * Cross-platform neubrutalism shadow wrapper.
 *
 * Renders an absolutely-positioned background View (the "shadow") behind the
 * main content. On iOS this supplements the native shadow. On Android this IS
 * the shadow, since elevation produces a Gaussian blur that looks wrong.
 *
 * Usage:
 *   <BKShadowWrapper shadowColor={colors.shadowColor} offset={4}>
 *     <YourComponent />
 *   </BKShadowWrapper>
 */
interface BKShadowWrapperProps {
  children: React.ReactNode
  shadowColor?: string
  offset?: number
  style?: ViewStyle
}

export function BKShadowWrapper({
  children,
  shadowColor = '#16161f',
  offset = 4,
  style,
}: BKShadowWrapperProps): React.ReactElement {
  return React.createElement(
    View,
    { style: [styles.container, style] },
    // Shadow layer (behind)
    React.createElement(View, {
      style: [
        styles.shadow,
        {
          backgroundColor: shadowColor,
          top: offset,
          left: offset,
        },
      ],
    }),
    // Content layer (on top)
    React.createElement(View, { style: styles.content }, children),
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: 'relative',
  },
})
