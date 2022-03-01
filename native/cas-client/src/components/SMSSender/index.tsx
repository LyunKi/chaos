import React, { useCallback, useState } from 'react'
import { Button, Spinner } from '@ui-kitten/components'
import I18n from '../../i18n'

const SMS_DURATION = 60

export default function SMSSender() {
  const initialText = I18n.t('pages.SignIn.sendSMSCode')
  const [text, setText] = useState(initialText)
  const onSend = useCallback(async () => {
    if (text !== initialText || loading) {
      return
    }
    try {
      const SMSTask = new Task(
        SMS_DURATION,
        () => {
          setText(initialText)
        },
        (_, current) => {
          setText(`${current}s`)
        }
      )
      Scheduler.spawnTasks(SMSTask)
    } catch (e) {
      console.log(e)
    }
  }, [text, initialText, loading, sendSMSCode])
  const Loading = useCallback(
    () => <>{loading && <Spinner size="tiny" />}</>,
    [loading]
  )
  return (
    <Button accessoryLeft={Loading} onPress={onSend} appearance="ghost">
      {text}
    </Button>
  )
}
