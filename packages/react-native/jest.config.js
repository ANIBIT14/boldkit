module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterFramework: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^@shopify/react-native-skia$': '<rootDir>/__mocks__/skia.ts',
    '^@software-mansion/react-native-audio-api$': '<rootDir>/__mocks__/audio-api.ts',
    '^react-native-svg$': '<rootDir>/__mocks__/svg.ts',
    '^react-native-reanimated$': 'react-native-reanimated/mock',
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/gesture-handler.ts',
    '^@gorhom/bottom-sheet$': '<rootDir>/__mocks__/bottom-sheet.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-svg|react-native-reanimated|@testing-library)/)',
  ],
  testPathPattern: 'src/.*\\.test\\.(ts|tsx)$',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/example/',
    'src/index.ts',
    'src/theme/index.ts',
    'src/shapes/index.ts',
  ],
}
