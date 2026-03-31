import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@boldkit/react-native'
import { HomeScreen } from '../screens/HomeScreen'
import { ButtonScreen } from '../screens/ButtonScreen'
import { CardScreen } from '../screens/CardScreen'
import { FormsScreen } from '../screens/FormsScreen'
import { FeedbackScreen } from '../screens/FeedbackScreen'
import { AvatarBadgeScreen } from '../screens/AvatarBadgeScreen'
import { ShapesScreen } from '../screens/ShapesScreen'

export type RootStackParamList = {
  Home: undefined
  Buttons: undefined
  Cards: undefined
  Forms: undefined
  Feedback: undefined
  AvatarBadge: undefined
  Shapes: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  const { colors, isDark, toggleTheme } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        headerTitleStyle: {
          fontFamily: 'Outfit-Bold',
          fontSize: 16,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
        },
        headerShadowVisible: false,
        headerRight: () => (
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'BoldKit RN' }} />
      <Stack.Screen name="Buttons" component={ButtonScreen} />
      <Stack.Screen name="Cards" component={CardScreen} />
      <Stack.Screen name="Forms" component={FormsScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="AvatarBadge" component={AvatarBadgeScreen} options={{ title: 'Avatar & Badge' }} />
      <Stack.Screen name="Shapes" component={ShapesScreen} />
    </Stack.Navigator>
  )
}

// Simple dark mode toggle button in the header
import { Pressable, Text } from 'react-native'

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  const { colors } = useTheme()
  return (
    <Pressable onPress={onToggle} style={{ padding: 8 }}>
      <Text style={{ color: colors.foreground, fontSize: 18 }}>
        {isDark ? '☀️' : '🌙'}
      </Text>
    </Pressable>
  )
}
