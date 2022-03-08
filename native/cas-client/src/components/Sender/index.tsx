import React from 'react'
import { Button, Spinner } from '@ui-kitten/components'
import { Scheduler, Task } from '../../utils'
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
        const sendTask = new Task({
          current: duration,
          onComplete() {
            setLoading(false)
            setCountdown(duration)
          },
          callback(_, current) {
            setCountdown(current)
          },
        })
        Scheduler.spawnTasks(sendTask)
      } catch (e) {
        console.warn('Faile to execute send action,caused by:', e)
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
