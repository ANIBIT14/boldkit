import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Alert, AlertTitle, AlertDescription, Progress, Spinner, Button, useTheme } from '@boldkit/react-native'

export function FeedbackScreen() {
  const { colors } = useTheme()
  const [progress, setProgress] = useState(60)

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>

      <SectionLabel title="Alert Variants" />
      {(['default', 'destructive', 'success', 'warning', 'info'] as const).map(v => (
        <Alert key={v} variant={v}>
          <AlertTitle>{v.toUpperCase()}</AlertTitle>
          <AlertDescription>This is a {v} alert message.</AlertDescription>
        </Alert>
      ))}

      <SectionLabel title="Progress" />
      <Progress value={progress} showLabel />
      <Progress value={progress} variant="success" showLabel />
      <Progress value={progress} variant="warning" />
      <View style={styles.row}>
        <Button size="sm" variant="outline" onPress={() => setProgress(p => Math.max(0, p - 10))}>-10%</Button>
        <Button size="sm" onPress={() => setProgress(p => Math.min(100, p + 10))}>+10%</Button>
      </View>

      <SectionLabel title="Spinner Variants" />
      <View style={styles.spinnerRow}>
        {(['default', 'dots', 'bars', 'blocks', 'brutal'] as const).map(v => (
          <View key={v} style={styles.spinnerItem}>
            <Spinner variant={v} />
            <Text style={[styles.spinnerLabel, { color: colors.mutedForeground }]}>{v}</Text>
          </View>
        ))}
      </View>

      <SectionLabel title="Spinner Sizes" />
      <View style={styles.spinnerRow}>
        {(['sm', 'default', 'lg'] as const).map(s => (
          <View key={s} style={styles.spinnerItem}>
            <Spinner size={s} />
            <Text style={[styles.spinnerLabel, { color: colors.mutedForeground }]}>{s}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

function SectionLabel({ title }: { title: string }) {
  const { colors } = useTheme()
  return (
    <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
      {title.toUpperCase()}
    </Text>
  )
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 12 },
  sectionLabel: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Outfit-Bold', marginTop: 8 },
  row: { flexDirection: 'row', gap: 10, marginTop: 4 },
  spinnerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignItems: 'center' },
  spinnerItem: { alignItems: 'center', gap: 6 },
  spinnerLabel: { fontSize: 10, letterSpacing: 0.8 },
})
