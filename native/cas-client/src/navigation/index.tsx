import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationContainerRef,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import LinkingConfiguration from './LinkingConfiguration'
import { RootStackParamList } from '../types'

const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>()

const isReadyRef = {
  current: false,
}

export const navigate = <
  RouteName extends keyof RootStackParamList,
  Params extends RootStackParamList[RouteName]
>(
  ...args: undefined extends Params ? [RouteName] : [RouteName, Params]
) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(...args)
  }
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
