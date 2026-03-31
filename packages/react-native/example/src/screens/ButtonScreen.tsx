import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Button, useTheme } from '@boldkit/react-native'

export function ButtonScreen() {
  const { colors } = useTheme()

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <Section title="Variants">
        {(['default', 'secondary', 'accent', 'outline', 'ghost', 'destructive'] as const).map(v => (
          <Button key={v} variant={v}>{v}</Button>
        ))}
      </Section>

      <Section title="Sizes">
        {(['sm', 'default', 'lg', 'xl'] as const).map(s => (
          <Button key={s} size={s}>{s}</Button>
        ))}
      </Section>

      <Section title="Animations">
        {(['pulse', 'bounce', 'shake', 'wiggle'] as const).map(a => (
          <Button key={a} animation={a}>{a}</Button>
        ))}
      </Section>

      <Section title="States">
        <Button disabled>Disabled</Button>
        <Button loading>Loading...</Button>
        <Button soundOnPress>With Sound</Button>
      </Section>
    </ScrollView>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme()
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{title.toUpperCase()}</Text>
      <View style={styles.row}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 0 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 11, letterSpacing: 1.5, marginBottom: 12, fontFamily: 'Outfit-Bold' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
})
