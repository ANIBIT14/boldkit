import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Avatar, AvatarImage, AvatarFallback, Badge, useTheme } from '@boldkit/react-native'

export function AvatarBadgeScreen() {
  const { colors } = useTheme()

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>

      <SectionLabel title="Avatar Sizes" />
      <View style={styles.row}>
        {(['sm', 'default', 'lg', 'xl'] as const).map(s => (
          <View key={s} style={styles.avatarItem}>
            <Avatar size={s}>
              <AvatarFallback>{s[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>{s}</Text>
          </View>
        ))}
      </View>

      <SectionLabel title="Avatar with Image" />
      <View style={styles.row}>
        <Avatar size="lg">
          <AvatarImage uri="https://i.pravatar.cc/150?img=1" alt="User avatar" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage uri="https://invalid-url-causes-fallback.xyz/img" />
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>
      </View>

      <SectionLabel title="Badge Variants" />
      <View style={styles.badgeRow}>
        {(['default', 'secondary', 'accent', 'destructive', 'success', 'warning', 'info', 'outline'] as const).map(v => (
          <Badge key={v} variant={v}>{v}</Badge>
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
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 16 },
  avatarItem: { alignItems: 'center', gap: 4 },
  label: { fontSize: 10 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
})
