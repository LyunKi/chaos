import { IconProps } from '@ui-kitten/components'
import EvaIcon from '../EvaIcon'
import Navigator from '../../navigation/Navigator'
import { CountryCode } from '../../i18n/countries'

interface CountryPickerProps extends IconProps {
  countryCode?: CountryCode
}

export default function CountryPickerIcon(props: CountryPickerProps) {
  const { countryCode, ...rest } = props
  return (
    <EvaIcon
      {...rest}
      pack="countries"
      name={countryCode}
      onPress={() =>
        Navigator.navigate('CountryPicker', {
          keyProp: 'callingCode',
          countryCode,
        })
      }
    />
  )
}
