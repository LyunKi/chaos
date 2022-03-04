import { View } from 'react-native'
import React from 'react'
import { Input, InputProps } from '@ui-kitten/components'
import styled from 'styled-components/native'
import { remToPx } from 'polished'

import ErrorTip from '../ErrorTip'
export interface FormInputProps extends Omit<InputProps, 'caption'> {
  error?: string | null | false
}

const CaptionContainer = styled(View)`
  height: ${remToPx(1.5)};
`

export default function FormInput({
  error,
  status,
  style,
  ...inputProps
}: FormInputProps) {
  const formInputProps: InputProps = {
    status: error ? 'danger' : status,
    caption: (props) => {
      return (
        <CaptionContainer>
          {error && <ErrorTip textProps={props} error={error} />}
        </CaptionContainer>
      )
    },
    ...inputProps,
  }
  return <Input {...formInputProps} />
}
