import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/native'
import { remToPx } from 'polished'
import React from 'react'
import { RootStackParamList } from '../types'
import {
  BackAction,
  MobileInput,
  PasswordInput,
  SafeArea,
  VerificationCodeInput,
} from '../components'
import { Api, FormHelper, Schema } from '../utils'
import * as Constants from '../constants'
import I18n from '../i18n'

interface SignUpProps
  extends NativeStackScreenProps<RootStackParamList, 'SignUp'> {}

const Container = styled(Layout)`
  padding: ${remToPx(1)};
  flex: 1;
`

const InitialValues = {
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
  const signUpSchema = Yup.object().shape(
    Schema.load(['mobile', 'password', 'verificationCode'])
  )
  const register = React.useCallback(() => {
    Api.post(Constants.REGISTER, {})
  }, [])
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
          initialValues={InitialValues}
          validationSchema={signUpSchema}
          onSubmit={register}
        >
          {(formikProps) => {
            const { handleChange, handleBlur, values, touched, errors } =
              formikProps
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
                <Button>{I18n.t('actions.register')}</Button>
              </>
            )
          }}
        </Formik>
      </Container>
    </SafeArea>
  )
}
