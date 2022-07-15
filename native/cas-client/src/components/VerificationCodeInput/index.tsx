import Sender from '../Sender'
import EvaIcon from '../EvaIcon'
import FormInput, { FormInputProps } from '../FormInput'
import I18n from '../../i18n'
import { Api } from '../../utils'
import * as Constants from '../../common/constants'
import MobileHelper, { Mobile } from '../../utils/MobileHelper'

export interface VerificationCodeInputProps extends FormInputProps {
  mobile: Mobile
}

export default function VerificationCodeInput(
  props: VerificationCodeInputProps
) {
  const { mobile } = props
  return (
    <FormInput
      accessoryLeft={(props) => (
        <EvaIcon {...props} name="message-square-outline" />
      )}
      accessoryRight={
        MobileHelper.isValid(mobile) ? (
          <Sender
            text={I18n.t('schema.verificationCode.sendTip')}
            onSend={() => {
              Api.post(Constants.SMS_CODE, {
                mobile: MobileHelper.formatMobile(mobile),
              })
            }}
          />
        ) : undefined
      }
      {...props}
    />
  )
}
