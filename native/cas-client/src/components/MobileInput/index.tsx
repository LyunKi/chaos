import FormInput, { FormInputProps } from '../FormInput'
import CountryPickerIcon from '../CountryPickerIcon'
import React from 'react'
import I18n from '../../i18n'
import { CountryCode } from '../../i18n/countries'

interface Mobile {
  countryCode?: CountryCode
  number?: string
}

export interface MobileInputProps
  extends Omit<FormInputProps, 'accessoryLeft' | 'value'> {
  value: Mobile
}

export default function MobileInput(props: MobileInputProps) {
  const { value = {}, onChangeText, ...rest } = props
  const { countryCode = 'CN', number } = value
  return (
    <FormInput
      accessoryLeft={(props) => (
        <CountryPickerIcon countryCode={countryCode} {...props} />
      )}
      {...rest}
      value={''}
    />
  )
}
