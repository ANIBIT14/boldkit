/**
 * Detects whether @shopify/react-native-skia is available in the consumer's project.
 * Used to enable/disable Skia-specific component variants with graceful fallback.
 */

let _skiaAvailable = false

try {
  require('@shopify/react-native-skia')
  _skiaAvailable = true
} catch {
  // Skia not installed — premium rendering features unavailable
}

export const SkiaAvailable = _skiaAvailable
