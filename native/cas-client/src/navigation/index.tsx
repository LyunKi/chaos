import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import { RootStackParamList } from '../types'
import CountryPicker from '../modals/CountryPicker'
import LinkingConfiguration from './LinkingConfiguration'
import Navigator from './Navigator'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      onReady={SplashScreen.hideAsync}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={Navigator}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}
      >
        <Stack.Screen name="CountryPicker" component={CountryPicker} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
