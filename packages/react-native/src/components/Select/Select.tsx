import React, { useCallback, useRef, useState } from 'react'
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import Svg, { Polyline, Line } from 'react-native-svg'
import { useTheme } from '../../theme/ThemeProvider'
import { BKShadowWrapper, shadowOffset } from '../../theme/shadows'
import { borderWidth, spacing } from '../../theme/spacing'
import { fontWeight, fontSize, letterSpacing } from '../../theme/typography'
import type { ViewStyle, TextStyle } from 'react-native'

export interface SelectItem {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  items: SelectItem[]
  placeholder?: string
  label?: string
  disabled?: boolean
  style?: ViewStyle
  triggerTextStyle?: TextStyle
}

export function Select({
  value,
  onValueChange,
  items,
  placeholder = 'Select an option...',
  label,
  disabled = false,
  style,
  triggerTextStyle,
}: SelectProps) {
  const { colors } = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [isOpen, setIsOpen] = useState(false)

  const selectedItem = items.find(item => item.value === value)

  const openSheet = useCallback(() => {
    if (disabled) return
    setIsOpen(true)
    bottomSheetRef.current?.expand()
  }, [disabled])

  const closeSheet = useCallback(() => {
    setIsOpen(false)
    bottomSheetRef.current?.close()
  }, [])

  const handleSelect = useCallback(
    (item: SelectItem) => {
      if (item.disabled) return
      onValueChange?.(item.value)
      closeSheet()
    },
    [onValueChange, closeSheet],
  )

  const snapPoints = React.useMemo(
    () => [Math.min(items.length * 56 + 80, 400)],
    [items.length],
  )

  return (
    <>
      <View style={style}>
        {label ? (
          <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>
        ) : null}
        <BKShadowWrapper shadowColor={colors.shadowColor} offset={shadowOffset}>
          <Pressable
            onPress={openSheet}
            style={[
              styles.trigger,
              {
                borderColor: colors.foreground,
                backgroundColor: colors.background,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
            disabled={disabled}
            accessibilityRole="combobox"
            accessibilityState={{ expanded: isOpen, disabled }}
          >
            <Text
              style={[
                styles.triggerText,
                {
                  color: selectedItem ? colors.foreground : colors.mutedForeground,
                },
                triggerTextStyle,
              ]}
              numberOfLines={1}
            >
              {selectedItem?.label ?? placeholder}
            </Text>
            {/* Chevron down icon */}
            <Svg width={16} height={16} viewBox="0 0 16 16">
              <Polyline
                points="3,6 8,11 13,6"
                stroke={colors.foreground}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </Pressable>
        </BKShadowWrapper>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={() => setIsOpen(false)}
        backgroundStyle={{ backgroundColor: colors.card, borderRadius: 0 }}
        handleIndicatorStyle={{ backgroundColor: colors.foreground }}
      >
        <BottomSheetView style={styles.sheetContent}>
          <FlatList
            data={items}
            keyExtractor={item => item.value}
            renderItem={({ item }) => (
              <SelectItemRow
                item={item}
                isSelected={item.value === value}
                onSelect={handleSelect}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={[styles.separator, { backgroundColor: colors.border }]} />
            )}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}

// ─── SelectItemRow ────────────────────────────────────────────────────────────

interface SelectItemRowProps {
  item: SelectItem
  isSelected: boolean
  onSelect: (item: SelectItem) => void
}

function SelectItemRow({ item, isSelected, onSelect }: SelectItemRowProps) {
  const { colors } = useTheme()

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        {
          backgroundColor: pressed
            ? colors.muted
            : isSelected
              ? colors.primary + '22'
              : 'transparent',
          opacity: item.disabled ? 0.4 : 1,
        },
      ]}
      onPress={() => onSelect(item)}
      disabled={item.disabled}
      accessibilityRole="menuitem"
      accessibilityState={{ selected: isSelected, disabled: item.disabled }}
    >
      <Text
        style={[
          styles.itemText,
          {
            color: isSelected ? colors.primary : colors.foreground,
            fontWeight: isSelected ? fontWeight.bold : fontWeight.regular,
          },
        ]}
      >
        {item.label}
      </Text>
      {isSelected ? (
        <Svg width={16} height={16} viewBox="0 0 16 16">
          <Polyline
            points="2,8 6,12 14,4"
            stroke={colors.primary}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      ) : null}
    </Pressable>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
    marginBottom: spacing[1],
  },
  trigger: {
    height: 44,
    borderWidth: borderWidth.default,
    borderRadius: 0,
    paddingHorizontal: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerText: {
    fontSize: fontSize.base,
    flex: 1,
    marginRight: spacing[2],
  },
  sheetContent: {
    flex: 1,
  },
  item: {
    height: 52,
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: fontSize.base,
  },
  separator: {
    height: 1,
    marginHorizontal: spacing[4],
  },
})
