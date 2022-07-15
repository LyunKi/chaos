import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components'
import { SafeArea } from '../components'
import Navigator from '../navigation/Navigator'
interface LoginProps {}

export default function Login(props: LoginProps) {
  return (
    <SafeArea>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Button onPress={() => Navigator.navigate('SignUp', { service: '' })}>
          OPEN SignUp
        </Button>
      </Layout>
    </SafeArea>
  )
}
