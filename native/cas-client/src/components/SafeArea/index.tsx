import { PropsWithChildren } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`

export default function SafeArea(props: PropsWithChildren<{}>) {
  const insets = useSafeAreaInsets()
  console.log('insets', insets)
  return <SafeAreaContainer>{props.children}</SafeAreaContainer>
}
