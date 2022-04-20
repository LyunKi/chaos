import { IconProps } from '@ui-kitten/components'
import EvaIcon from '../EvaIcon'
import Navigator from '../../navigation/Navigator'

interface CountryPickerProps extends IconProps {
  countryCode?: string | null
}

export default function CountryPickerIcon(props: CountryPickerProps) {
  const { countryCode, ...rest } = props
  return (
    <EvaIcon
      {...rest}
      pack="countries"
      name={countryCode}
      onPress={() => Navigator.navigate('CountryPicker')}
    />
  )
}
