import { TopNavigationAction } from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'

import Navigator from '../../navigation/Navigator'
import EvaIcon from '../EvaIcon'

const BackAction = () =>
  Navigator.canGoBack?.() ? (
    <TopNavigationAction
      onPress={Navigator.goBack}
      icon={(props) => <EvaIcon {...props} name="chevron-left-outline" />}
    />
  ) : null

export default BackAction as RenderProp
