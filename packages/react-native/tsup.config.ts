import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'theme/index': 'src/theme/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  jsx: 'preserve',
  target: 'es2020',
  treeshake: true,
  splitting: false,
  external: [
    'react',
    'react-native',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'react-native-svg',
    '@shopify/react-native-skia',
    '@software-mansion/react-native-audio-api',
    '@gorhom/bottom-sheet',
    'class-variance-authority',
  ],
})
