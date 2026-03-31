// Mock for react-native-gesture-handler
export const GestureHandlerRootView = ({ children }: { children: React.ReactNode }) => children
export const Gesture = {
  Tap: () => ({ onStart: () => ({}) }),
  Pan: () => ({ onUpdate: () => ({}) }),
}
export const GestureDetector = ({ children }: { children: React.ReactNode }) => children
export const PanGestureHandler = ({ children }: { children: React.ReactNode }) => children
export const TapGestureHandler = ({ children }: { children: React.ReactNode }) => children
export const State = {}
export const ScrollView = require('react-native').ScrollView
export const FlatList = require('react-native').FlatList
