import React, { useState } from 'react'
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native'
import {
  TriangleShape, DiamondBadge, HexagonShape, Star5Shape, BurstShape,
  BlobShape, LightningShape, SpeechBubble, SealShape, GearShape,
  useTheme,
} from '@boldkit/react-native'
import type { ShapeAnimation, ShapeSpeed } from '@boldkit/react-native'

const SHAPES = [
  { name: 'Triangle',  Component: TriangleShape },
  { name: 'Diamond',   Component: DiamondBadge },
  { name: 'Hexagon',   Component: HexagonShape },
  { name: 'Star5',     Component: Star5Shape },
  { name: 'Burst',     Component: BurstShape },
  { name: 'Blob',      Component: BlobShape },
  { name: 'Lightning', Component: LightningShape },
  { name: 'Speech',    Component: SpeechBubble },
  { name: 'Seal',      Component: SealShape },
  { name: 'Gear',      Component: GearShape },
]

const ANIMATIONS: ShapeAnimation[] = ['none', 'spin', 'pulse', 'float', 'wiggle', 'bounce', 'glitch']
const SPEEDS: ShapeSpeed[] = ['slow', 'normal', 'fast']

export function ShapesScreen() {
  const { colors } = useTheme()
  const [animation, setAnimation] = useState<ShapeAnimation>('none')
  const [speed, setSpeed] = useState<ShapeSpeed>('normal')
  const [filled, setFilled] = useState(true)

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>

      {/* Controls */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: colors.mutedForeground }]}>ANIMATION</Text>
        <View style={styles.pills}>
          {ANIMATIONS.map(a => (
            <Pill key={a} label={a} active={animation === a} onPress={() => setAnimation(a)} />
          ))}
        </View>
      </View>

      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: colors.mutedForeground }]}>SPEED</Text>
        <View style={styles.pills}>
          {SPEEDS.map(s => (
            <Pill key={s} label={s} active={speed === s} onPress={() => setSpeed(s)} />
          ))}
        </View>
      </View>

      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: colors.mutedForeground }]}>FILL</Text>
        <View style={styles.pills}>
          <Pill label="Filled" active={filled} onPress={() => setFilled(true)} />
          <Pill label="Outline" active={!filled} onPress={() => setFilled(false)} />
        </View>
      </View>

      {/* Shapes grid */}
      <View style={styles.grid}>
        {SHAPES.map(({ name, Component }) => (
          <View key={name} style={[styles.shapeCard, { borderColor: colors.foreground, backgroundColor: colors.card }]}>
            <Component size={64} animation={animation} speed={speed} filled={filled} />
            <Text style={[styles.shapeName, { color: colors.mutedForeground }]}>{name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

function Pill({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { colors } = useTheme()
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pill,
        {
          borderColor: colors.foreground,
          backgroundColor: active ? colors.foreground : 'transparent',
        },
      ]}
    >
      <Text style={{ color: active ? colors.background : colors.foreground, fontSize: 11, fontFamily: 'Outfit-Bold' }}>
        {label.toUpperCase()}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  controlGroup: { gap: 6 },
  controlLabel: { fontSize: 10, letterSpacing: 1.5, fontFamily: 'Outfit-Bold' },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  pill: { borderWidth: 2, paddingHorizontal: 10, paddingVertical: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  shapeCard: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  shapeName: { fontSize: 9, letterSpacing: 0.5 },
})
