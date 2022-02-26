import { SafeAreaView } from 'react-native'
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'

interface LoginProps
  extends NativeStackScreenProps<RootStackParamList, 'Login'> {}

export default function Login(props: LoginProps) {
  const { navigation } = props
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Button onPress={() => navigation.navigate('SignUp')}>
          OPEN SignUp
        </Button>
      </Layout>
    </SafeAreaView>
  )
}
