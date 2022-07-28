import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from 'styled-components/native'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { RecoilRoot } from 'recoil'

import useCachedResources from './common/utils/hooks/useCachedResources'
import Navigation from './navigation'
import { CountriesIconsPack } from './components'

export default function App() {
  const isLoadingComplete = useCachedResources()
  // const colorScheme = useColorScheme()
  const colorScheme = 'dark'
  // const colorScheme = 'light'
  const theme = eva[colorScheme]

  if (!isLoadingComplete) {
    return <AppLoading />
  } else {
    return (
      <RecoilRoot>
        <ApplicationProvider {...eva} theme={theme}>
          <IconRegistry icons={[EvaIconsPack, CountriesIconsPack]} />
          <SafeAreaProvider>
            <ThemeProvider theme={theme}>
              <Navigation colorScheme={colorScheme} />
            </ThemeProvider>
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </RecoilRoot>
    )
  }
}
