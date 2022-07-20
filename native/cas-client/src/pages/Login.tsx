import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components'
import { useEffect } from 'react'
import { SafeArea } from '../components'
import Navigator from '../navigation/Navigator'
import { RootStackParamList } from '../types'
import { Api, Storage } from '../common/utils'
import { TGT_STORAGE_KEY } from '../common/constants/auth'
import { VERIFY_TGT } from '../common/constants'
import { Logger } from '../common/utils/Logger'

interface LoginProps
  extends NativeStackScreenProps<RootStackParamList, 'Login'> {}

async function checkTgt(params) {
  const tgt = await Storage.getItem<string>(TGT_STORAGE_KEY)
  if (!tgt) {
    return
  }
  const { service, redirectUrl } = params
  try {
    const { st } = await Api.post(VERIFY_TGT, { service, tgt })
    Navigator.navigate(redirectUrl, { st })
  } catch (e) {
    Logger.error('Failed to verify tgt', e)
  }
}

function useTgtCheck(params) {
  const { service, redirectUrl } = params
  useEffect(() => {
    checkTgt({ service, redirectUrl })
  }, [service, redirectUrl])
}

export default function Login(props: LoginProps) {
  const { route } = props
  const { service, redirectUrl } = route.params
  useTgtCheck({ service, redirectUrl })
  return (
    <SafeArea>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Button onPress={() => Navigator.navigate('SignUp', { service })}>
          OPEN SignUp
        </Button>
      </Layout>
    </SafeArea>
  )
}
