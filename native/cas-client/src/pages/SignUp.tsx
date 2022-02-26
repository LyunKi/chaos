import { Divider, Layout, TopNavigation } from '@ui-kitten/components'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/native'
import { remToPx } from 'polished'

import { RootStackParamList } from '../types'
import { BackAction, SafeArea, PasswordInput } from '../components'
import { Schema } from '../utils'
import I18n from '../i18n'

interface SignUpProps
  extends NativeStackScreenProps<RootStackParamList, 'Login'> {}

const FormFields = {
  mobile: 'mobile',
  password: 'password',
  verifyCode: 'verifyCode',
}

const Container = styled(Layout)`
  padding: ${remToPx(1)};
`

const InitialValues = {
  password: '',
  mobile: '',
  verifyCode: '',
}

export default function SignUp(props: SignUpProps) {
  const signUpSchema = Yup.object().shape(
    Schema.load([FormFields.mobile, FormFields.password, FormFields.verifyCode])
  )
  const register = () => {}
  return (
    <SafeArea>
      <TopNavigation title={I18n.t('back')} accessoryLeft={BackAction} />
      <Divider />
      <Formik
        initialValues={InitialValues}
        validationSchema={signUpSchema}
        onSubmit={register}
      >
        {({ values, errors, handleChange, handleBlur, touched }) => {
          return (
            <Container>
              <PasswordInput
                onChangeText={handleChange(FormFields.password)}
                onBlur={handleBlur(FormFields.password)}
                placeholder={I18n.t('schema.password.placeholder')}
                value={values.password}
                error={touched.password && errors.password}
              />
              <PasswordInput
                onChangeText={handleChange(FormFields.password)}
                onBlur={handleBlur(FormFields.password)}
                placeholder={I18n.t('schema.password.placeholder')}
                value={values.password}
                error={touched.password && errors.password}
              />
            </Container>
          )
        }}
      </Formik>
    </SafeArea>
  )
}
