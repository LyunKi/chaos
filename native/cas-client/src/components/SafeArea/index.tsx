import { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`

export default function SafeArea(props: PropsWithChildren<{}>) {
  return <SafeAreaContainer>{props.children}</SafeAreaContainer>
}
