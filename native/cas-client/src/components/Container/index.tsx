import { Layout } from '@ui-kitten/components'
import { remToPx } from 'polished'
import styled from 'styled-components/native'

export const Container = styled(Layout)`
  padding: ${remToPx(1)};
  flex: 1;
`
