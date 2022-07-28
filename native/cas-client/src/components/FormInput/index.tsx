import { View } from 'react-native'
import React from 'react'
import { Input, InputProps } from '@ui-kitten/components'
import styled from 'styled-components/native'
import ErrorTip from '../ErrorTip'
import { Fn } from '../../common/types'
import { remToPx } from '../../common/utils/style'
export interface FormInputProps
  extends Omit<InputProps, 'caption' | 'onChangeText' | 'onChange' | 'onBlur'> {
  error?: any | null | false
  onChange: Fn
  onBlur: Fn
}

const CaptionContainer = styled(View)`
  height: ${remToPx(1.5)};
`

export default function FormInput({
  error,
  status,
  style,
  onChange,
  ...inputProps
}: FormInputProps) {
  const formInputProps: InputProps = {
    status: error ? 'danger' : status,
    onChangeText: onChange,
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
