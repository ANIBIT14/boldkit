// Mock for @gorhom/bottom-sheet
import React from 'react'
import { View, Modal } from 'react-native'

const BottomSheet = React.forwardRef<
  { close: () => void; expand: () => void },
  React.PropsWithChildren<{ onChange?: (index: number) => void; snapPoints?: (string | number)[] }>
>(({ children }, _ref) => React.createElement(View, {}, children))

BottomSheet.displayName = 'BottomSheet'

export default BottomSheet
export const BottomSheetView = ({ children }: React.PropsWithChildren<object>) =>
  React.createElement(View, {}, children)
export const BottomSheetFlatList = ({ data, renderItem }: { data: unknown[]; renderItem: (info: { item: unknown }) => React.ReactNode }) =>
  React.createElement(View, {}, data.map((item, i) => React.createElement(View, { key: i }, renderItem({ item }) as React.ReactNode)))
export const BottomSheetModal = BottomSheet
export const BottomSheetModalProvider = ({ children }: React.PropsWithChildren<object>) =>
  React.createElement(View, {}, children)
export const useBottomSheetModal = () => ({ present: jest.fn(), dismiss: jest.fn() })
export const useBottomSheet = () => ({ close: jest.fn(), expand: jest.fn() })
