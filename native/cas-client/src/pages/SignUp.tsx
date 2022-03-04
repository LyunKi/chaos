import {
  Divider,
  Layout,
  TopNavigation,
  Button,
  Text,
} from '@ui-kitten/components'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/native'
import { remToPx } from 'polished'

import { RootStackParamList } from '../types'
import {
  BackAction,
  SafeArea,
  VerificationCodeInput,
  PasswordInput,
} from '../components'
import { Schema } from '../utils'
import I18n from '../i18n'

interface SignUpProps
  extends NativeStackScreenProps<RootStackParamList, 'Login'> {}

const FormFields = {
  mobile: 'mobile',
  password: 'password',
  verificationCode: 'verificationCode',
}

const Container = styled(Layout)`
  padding: ${remToPx(1)};
  flex: 1;
`

const InitialValues = {
  password: '',
  mobile: '',
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
    Schema.load([
      FormFields.mobile,
      FormFields.password,
      FormFields.verificationCode,
    ])
  )
  const register = () => {}
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
          {({ values, errors, handleChange, handleBlur, touched }) => {
            return (
              <>
                <PasswordInput
                  onChangeText={handleChange(FormFields.password)}
                  onBlur={handleBlur(FormFields.password)}
                  placeholder={I18n.t('schema.password.placeholder')}
                  value={values.password}
                  error={touched.password && errors.password}
                />
                <VerificationCodeInput
                  onChangeText={handleChange(FormFields.verificationCode)}
                  onBlur={handleBlur(FormFields.verificationCode)}
                  placeholder={I18n.t('schema.verificationCode.placeholder')}
                  value={values.verificationCode}
                  error={touched.verificationCode && errors.verificationCode}
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
