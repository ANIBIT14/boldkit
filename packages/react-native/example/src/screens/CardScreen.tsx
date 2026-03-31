import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge, useTheme } from '@boldkit/react-native'

export function CardScreen() {
  const { colors } = useTheme()

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
          <CardDescription>This is a card description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text style={{ color: colors.foreground }}>Card body content goes here.</Text>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>

      <Card interactive onPress={() => {}} style={styles.card}>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Press me — I animate!</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="success">Press to sink</Badge>
        </CardContent>
      </Card>

      <Card style={[styles.card, { backgroundColor: colors.primary }]}>
        <CardContent>
          <CardTitle style={{ color: colors.primaryForeground }}>Colored Card</CardTitle>
          <Text style={{ color: colors.primaryForeground, marginTop: 4 }}>
            Custom background using the primary color token.
          </Text>
        </CardContent>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 20 },
  card: { width: '100%' },
})
