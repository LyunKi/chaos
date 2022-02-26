import FormInput, { FormInputProps } from '../FormInput'
import React from 'react'
import EvaIcon from '../EvaIcon'

type PasswordInputProps = Omit<
  FormInputProps,
  'accessoryLeft' | 'accessoryRight' | 'secureTextEntry'
>

export default function PasswordInput(props: PasswordInputProps) {
  const [showPwd, setShowPwd] = React.useState(false)
  const showPwdIconName = showPwd ? 'eye-off-outline' : 'eye-outline'
  const handlePwdIconPressed = () => {
    console.log('showPwd', showPwd)
    setShowPwd(!showPwd)
  }
  return (
    <FormInput
      accessoryLeft={(props) => <EvaIcon {...props} name="lock-outline" />}
      accessoryRight={(props) => (
        <EvaIcon
          {...props}
          name={showPwdIconName}
          onPress={handlePwdIconPressed}
        />
      )}
      secureTextEntry={!showPwd}
      {...props}
    />
  )
}
