import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Input, Checkbox, Switch, Select, Progress, useTheme } from '@boldkit/react-native'

const SELECT_ITEMS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
  { label: 'Disabled Option', value: 'd', disabled: true },
]

export function FormsScreen() {
  const { colors } = useTheme()
  const [text, setText] = useState('')
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [switched, setSwitched] = useState(false)
  const [selectVal, setSelectVal] = useState<string>()

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <SectionLabel title="Text Input" />
      <Input label="Username" placeholder="Enter username" value={text} onChangeText={setText} />
      <Input label="With Error" placeholder="Email" error="Invalid email address" />
      <Input label="With Hint" placeholder="Password" hint="Min 8 characters" secureTextEntry />

      <SectionLabel title="Checkboxes" />
      <Checkbox label="Accept terms and conditions" checked={checked1} onCheckedChange={setChecked1} />
      <Checkbox label="Pre-checked item" checked={checked2} onCheckedChange={setChecked2} />
      <Checkbox label="Disabled checkbox" checked={false} disabled />

      <SectionLabel title="Switch" />
      <Switch label="Enable notifications" checked={switched} onCheckedChange={setSwitched} />
      <Switch label="Disabled switch" checked={true} disabled />

      <SectionLabel title="Select" />
      <Select
        label="Pick an option"
        placeholder="Select something..."
        items={SELECT_ITEMS}
        value={selectVal}
        onValueChange={setSelectVal}
      />
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
  content: { padding: 20, gap: 16 },
  sectionLabel: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Outfit-Bold', marginTop: 8 },
})
