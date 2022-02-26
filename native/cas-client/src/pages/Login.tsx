import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { SafeArea } from '../components'
interface LoginProps
  extends NativeStackScreenProps<RootStackParamList, 'Login'> {}

export default function Login(props: LoginProps) {
  const { navigation } = props
  return (
    <SafeArea>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Button onPress={() => navigation.navigate('SignUp')}>
          OPEN SignUp
        </Button>
      </Layout>
    </SafeArea>
  )
}
