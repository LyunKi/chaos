import { Layout } from '@ui-kitten/components'
import styled from 'styled-components/native'
import { remToPx } from '../../common/utils/style'

export const Container = styled(Layout)`
  padding: ${remToPx(1)};
  flex: 1;
`
