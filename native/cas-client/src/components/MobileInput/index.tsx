import FormInput, { FormInputProps } from '../FormInput'
import CountryPickerIcon from '../CountryPickerIcon'
import React from 'react'
import { CountryCode } from '../../i18n/countries'

interface Mobile {
  countryCode: CountryCode
  number?: string
}

export interface MobileInputProps
  extends Omit<FormInputProps, 'accessoryLeft' | 'value'> {
  value: Mobile
}

export default function MobileInput(props: MobileInputProps) {
  const { value, onChange, onBlur, ...rest } = props
  const { countryCode, number } = value
  return (
    <FormInput
      {...rest}
      accessoryLeft={(props) => (
        <CountryPickerIcon
          countryCode={countryCode}
          onChange={onChange('mobile.countryCode')}
          {...props}
        />
      )}
      value={number}
      onChange={onChange('mobile.number')}
      onBlur={onBlur('mobile.number')}
    />
  )
}
