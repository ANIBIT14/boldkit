import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BoldKitProvider } from '@boldkit/react-native'
import { RootNavigator } from './src/navigation/RootNavigator'
import { StyleSheet } from 'react-native'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <BoldKitProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </BoldKitProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
