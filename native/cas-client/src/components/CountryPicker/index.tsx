import { IconProps } from '@ui-kitten/components'
import EvaIcon from '../EvaIcon'

interface CountryPickerProps extends IconProps {
  countryCode?: string | null
}

export default function CountryPicker(props: CountryPickerProps) {
  const { countryCode, ...rest } = props
  return <EvaIcon pack="countries" name={countryCode} {...rest} />
}
