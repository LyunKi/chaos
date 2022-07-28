import React from 'react'
import { TextProps, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import styled from 'styled-components/native'
import { remToPx } from '../../common/utils/style'

const ErrorTipContainer = styled(View)`
  flex-flow: row;
  align-items: center;
  height: ${remToPx(1.5)};
  line-height: ${remToPx(1.5)};
`

interface ErrorTipProps {
  error: string
  textProps?: TextProps
}

function ErrorTip({ error, textProps }: ErrorTipProps) {
  return (
    <ErrorTipContainer>
      <Text {...textProps}>{error}</Text>
    </ErrorTipContainer>
  )
}

export default ErrorTip
