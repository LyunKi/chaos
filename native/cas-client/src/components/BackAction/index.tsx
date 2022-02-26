import { TopNavigationAction } from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'

import { Navigator } from '../../navigation'
import EvaIcon from '../EvaIcon'

const BackAction = () =>
  Navigator.canGoBack?.() ? (
    <TopNavigationAction
      icon={(props) => <EvaIcon {...props} name="chevron-left-outline" />}
      onPress={Navigator.goBack}
    />
  ) : null

export default BackAction as RenderProp
