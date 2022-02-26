import React from 'react'
import { TextProps, View } from 'react-native'
import { Text, useTheme } from '@ui-kitten/components'
import styled from 'styled-components/native'
import { remToPx } from 'polished'
import EvaIcon from '../EvaIcon'

const ErrorTipContainer = styled(View)`
  flex-flow: row;
  align-items: center;
  height: ${remToPx(2)};
`

const ErrorIcon = styled(EvaIcon)`
  margin-right: ${remToPx(0.4)};
`

interface ErrorTipProps {
  error: string
  textProps?: TextProps
}

function ErrorTip({ error, textProps }: ErrorTipProps) {
  const theme = useTheme()
  const size = remToPx(1)
  return (
    <ErrorTipContainer>
      <ErrorIcon
        color={theme['color-danger-default']}
        size={size}
        name="alert-circle-outline"
      />
      <Text {...textProps}>{error}</Text>
    </ErrorTipContainer>
  )
}

export default ErrorTip
