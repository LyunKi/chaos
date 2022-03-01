import SMSSender from '../SMSSender'
import EvaIcon from '../EvaIcon'
import FormInput from '../FormInput'
import I18n from '../../i18n'

export default function VerifyCodeInput(props: any) {
  return (
    <FormInput
      placeholder={I18n.t('placeholders.SMSCode')}
      accessoryLeft={(props) => (
        <EvaIcon {...props} name="message-circle-outline" />
      )}
      accessoryRight={<SMSSender />}
      {...props}
    />
  )
}
