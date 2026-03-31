module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for @gorhom/bottom-sheet
      '@gorhom/bottom-sheet/reanimated',
      // Must be last
      'react-native-reanimated/plugin',
    ],
  }
}
