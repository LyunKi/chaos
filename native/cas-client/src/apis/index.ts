import { SMS_CODE } from '../common/constants'
import { Api } from '../common/utils'
import MobileHelper, { Mobile } from '../common/utils/MobileHelper'

export function sendVerificationCode(mobile: Mobile) {
  return Api.post(
    SMS_CODE,
    {
      mobile: MobileHelper.formatMobile(mobile),
    },
    { showErrorToast: true }
  )
}
