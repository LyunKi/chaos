import FormInput, { FormInputProps } from '../FormInput'
import CountryPicker from '../CountryPicker'

export interface PhoneInputProps
  extends Omit<FormInputProps, 'accessoryLeft'> {}

export default function PhoneInput(props: PhoneInputProps) {
  return (
    <FormInput
      accessoryLeft={<CountryPicker countryCode={'CN'} />}
      {...props}
    />
  )
}
