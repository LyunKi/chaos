import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import AppLoading from 'expo-app-loading'
import { RootSiblingParent } from 'react-native-root-siblings'
import { ThemeProvider } from 'styled-components/native'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const theme = eva[colorScheme]
  console.log('theme', theme)

  if (!isLoadingComplete) {
    return <AppLoading />
  } else {
    return (
      <ApplicationProvider {...eva} theme={theme}>
        <IconRegistry icons={EvaIconsPack} />
        <SafeAreaProvider>
          <RootSiblingParent>
            <ThemeProvider theme={theme}>
              <Navigation colorScheme={colorScheme} />
            </ThemeProvider>
          </RootSiblingParent>
          <StatusBar />
        </SafeAreaProvider>
      </ApplicationProvider>
    )
  }
}
