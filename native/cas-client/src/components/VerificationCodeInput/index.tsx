import Sender from '../Sender'
import EvaIcon from '../EvaIcon'
import FormInput, { FormInputProps } from '../FormInput'
import I18n from '../../i18n'
import { Api } from '../../utils'
import * as Constants from '../../constants'

export default function VerificationCodeInput(props: FormInputProps) {
  return (
    <FormInput
      accessoryLeft={(props) => (
        <EvaIcon {...props} name="message-square-outline" />
      )}
      accessoryRight={
        <Sender
          text={I18n.t('schema.verificationCode.sendTip')}
          onSend={() => {
            Api.post(Constants.SMS_CODE, {
              mobile: '+8617764189136',
            })
          }}
        />
      }
      {...props}
    />
  )
}
