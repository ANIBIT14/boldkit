import React from 'react'
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '@boldkit/react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../navigation/RootNavigator'

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>

const SCREENS: { label: string; screen: keyof RootStackParamList; emoji: string }[] = [
  { label: 'Buttons',      screen: 'Buttons',     emoji: '🔲' },
  { label: 'Cards',        screen: 'Cards',       emoji: '🃏' },
  { label: 'Forms',        screen: 'Forms',       emoji: '📝' },
  { label: 'Feedback',     screen: 'Feedback',    emoji: '⏳' },
  { label: 'Avatar & Badge', screen: 'AvatarBadge', emoji: '👤' },
  { label: 'Shapes',       screen: 'Shapes',      emoji: '⬡' },
]

export function HomeScreen({ navigation }: { navigation: Nav }) {
  const { colors } = useTheme()

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { color: colors.foreground, fontFamily: 'Outfit-Black' }]}>
        BOLDKIT{'\n'}REACT NATIVE
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        v0.0.1 · Neubrutalism UI
      </Text>

      <View style={styles.grid}>
        {SCREENS.map(({ label, screen, emoji }) => (
          <Pressable
            key={screen}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.foreground,
                transform: pressed
                  ? [{ translateX: 4 }, { translateY: 4 }]
                  : [],
              },
            ]}
            onPress={() => navigation.navigate(screen)}
          >
            {/* Shadow layer */}
            <View style={[styles.cardShadow, { backgroundColor: colors.shadowColor }]} />
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={[styles.cardLabel, { color: colors.foreground, fontFamily: 'Outfit-Bold' }]}>
              {label.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  heading: {
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: 2,
    marginTop: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
    marginBottom: 32,
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderWidth: 3,
    borderRadius: 0,
    padding: 16,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  cardShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    zIndex: -1,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 12,
    letterSpacing: 1.2,
  },
})
