import React from 'react'
import { Button } from '@ui-kitten/components'
import { BASE_PERIOD, Scheduler } from '../../utils'
import styled from 'styled-components/native'

const SMS_DURATION = 60

export interface SenderProps {
  text: string
  onSend: Function
  duration?: number
}

const SenderButton = styled(Button)`
  padding-horizontal: 0;
  padding-vertical: 0;
`

export default function Sender(props: SenderProps) {
  const { text, onSend, duration = SMS_DURATION } = props
  const [loading, setLoading] = React.useState(false)
  const [countdown, setCountdown] = React.useState(duration)
  React.useLayoutEffect(() => {
    setCountdown(duration)
  }, [duration])
  const onPress = React.useCallback(() => {
    if (loading) {
      return
    }
    setLoading(true)
    const sendAction = async () => {
      try {
        await onSend()
        Scheduler.spawnTasks(
          new Scheduler.Task({
            totalPeriod: (duration * 1000) / BASE_PERIOD,
            onComplete() {
              setLoading(false)
              setCountdown(duration)
            },
            intervalPeriod: 1000 / BASE_PERIOD,
            intervalCallback(experiencedPeriod) {
              console.log('experiencedPeriod', experiencedPeriod)
              setCountdown(60 - experiencedPeriod / 1000)
            },
          })
        )
      } catch (e) {
        console.warn('Failed to execute send action,caused by:', e)
      }
    }
    sendAction()
  }, [loading, duration, onSend])
  return (
    <SenderButton size={'tiny'} onPress={onPress} appearance="ghost">
      {loading ? `${countdown}s` : text}
    </SenderButton>
  )
}
