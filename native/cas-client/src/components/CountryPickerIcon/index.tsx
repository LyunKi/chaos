import { IconProps } from '@ui-kitten/components'
import EvaIcon from '../EvaIcon'
import Navigator from '../../navigation/Navigator'
import { CountryCode } from '../../i18n/countries'
import { Fn } from '../../common/types'

interface CountryPickerProps extends IconProps {
  countryCode: CountryCode
  onChange: Fn
}

export default function CountryPickerIcon(props: CountryPickerProps) {
  const { countryCode, onChange, ...rest } = props
  return (
    <EvaIcon
      {...rest}
      pack="countries"
      name={countryCode}
      onPress={() =>
        Navigator.navigate('CountryPicker', {
          keyProp: 'callingCode',
          countryCode,
          onChange,
        })
      }
    />
  )
}
