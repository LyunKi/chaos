import { Button, Divider, Text, TopNavigation } from '@ui-kitten/components'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/native'
import React from 'react'
import { RootStackParamList } from '../types'
import {
  BackAction,
  Container,
  MobileInput,
  PasswordInput,
  SafeArea,
  VerificationCodeInput,
} from '../components'
import { Api, FormHelper, Schema } from '../common/utils'
import I18n from '../i18n'
import MobileHelper from '../common/utils/MobileHelper'
import { REGISTER } from '../common/constants'
import { remToPx } from '../common/utils/style'

interface SignUpProps
  extends NativeStackScreenProps<RootStackParamList, 'SignUp'> {}

const INITIAL_VALUES = {
  password: '',
  mobile: {
    countryCode: I18n.country.countryCode,
    number: '',
  },
  verificationCode: '',
}

const Welcome = styled(Text)`
  font-size: ${remToPx(1.5)};
  font-weight: 600;
`

const Tip = styled(Text)`
  font-size: ${remToPx(1)};
  margin-vertical: ${remToPx(1.5)};
`

export default function SignUp(props: SignUpProps) {
  const { route } = props
  const service = route.params?.service
  const signUpSchema = Yup.object().shape(
    Schema.load(['mobile', 'password', 'verificationCode'])
  )
  const register = React.useCallback(
    async (values) => {
      await Api.post(
        REGISTER,
        {
          ...values,
          service,
          mobile: MobileHelper.formatMobile(values.mobile),
        },
        { showErrorToast: true }
      )
    },
    [service]
  )
  return (
    <SafeArea>
      <TopNavigation
        alignment="center"
        title={I18n.t('companyName')}
        accessoryLeft={BackAction}
      />
      <Divider />
      <Container>
        <Welcome>{I18n.t('registration.welcome')}</Welcome>
        <Tip>{I18n.t('registration.tip')}</Tip>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={signUpSchema}
          onSubmit={register}
        >
          {(formikProps) => {
            const {
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              handleSubmit,
            } = formikProps
            return (
              <>
                <MobileInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={I18n.t('schema.mobile.placeholder')}
                  value={values.mobile}
                  error={touched.mobile?.number && errors.mobile}
                />
                <VerificationCodeInput
                  mobile={values.mobile}
                  {...FormHelper.generateFormInputProps({
                    formikProps,
                    fieldName: 'verificationCode',
                  })}
                />
                <PasswordInput
                  {...FormHelper.generateFormInputProps({
                    formikProps,
                    fieldName: 'password',
                  })}
                />
                <Button onPress={handleSubmit}>
                  {I18n.t('actions.register')}
                </Button>
              </>
            )
          }}
        </Formik>
      </Container>
    </SafeArea>
  )
}
