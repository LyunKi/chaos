import {
  Text,
  ModalService,
  useTheme,
  Layout,
  Spinner,
} from '@ui-kitten/components'
import { TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { EvaIcon } from '../../components'
import I18n from '../../i18n'
import { remToPx } from './style'
import { BASE_PERIOD, Scheduler } from './Scheduler'

export type ToastOptions = {
  msg?: string
  status?: string
  duration?: number
  showBackdrop?: boolean
}

const ToastContainer = styled(View)`
  height: 100%;
  flex-flow: column;
  background-color: ${(props) => props.style?.backgroundColor};
`

const ContentContainer = styled(View)`
  width: 300px;
  flex-flow: row;
  align-items: center;
  margin-left: calc(50% - 150px);
  margin-top: ${remToPx(3)};
  transition: transform 0.5s;
  padding: ${remToPx(0.5)};
  height: ${remToPx(3)};
  border-radius: 4px;
  background-color: ${(props) => props.style?.backgroundColor};
`

const IconContainer = styled(Layout)`
  width: ${remToPx(2)};
  height: ${remToPx(2)};
  border-radius: 4px;
  margin-right: ${remToPx(1)};
  justify-content: center;
  align-items: center;
`

const MessageBox = styled(View)`
  flex: 1;
  flex-flow: column;
  justify-content: center;
`

function renderIconByStatus(status: string) {
  switch (status) {
    case 'loading':
      return <Spinner status="info" size="small" />
    case 'warning':
      return <EvaIcon size={24} status={status} name="alert-triangle-outline" />
    case 'info':
      return <EvaIcon size={24} status={status} name="info-outline" />
    case 'success':
      return <EvaIcon size={24} status={status} name="checkmark-outline" />
    default:
      return <EvaIcon size={24} status={status} name="flash-outline" />
  }
}

function getToastContainerBackgroundColor(theme, status: string) {
  if (status === 'loading') {
    return theme['color-info-default']
  }
  return theme[`color-${status}-default`]
}

function ToastModal(props: ToastOptions) {
  const { msg, status, showBackdrop } = props
  const theme = useTheme()
  const backgroundColor = getToastContainerBackgroundColor(theme, status!)
  const backdropColor = theme[`color-basic-transparent-400`]
  const renderContent = () => (
    <ContentContainer style={{ backgroundColor }}>
      <IconContainer>{renderIconByStatus(status!)}</IconContainer>
      <MessageBox>{msg && <Text status="control">{msg}</Text>}</MessageBox>
    </ContentContainer>
  )
  return (
    <TouchableWithoutFeedback onPress={Modal.hide}>
      {showBackdrop ? (
        <ToastContainer style={{ backgroundColor: backdropColor }}>
          {renderContent()}
        </ToastContainer>
      ) : (
        renderContent()
      )}
    </TouchableWithoutFeedback>
  )
}

const SHOW_LOADING_DURANTION = 200

const TOAST_BASE_DURATION = 3000

function renderToastElement(options: ToastOptions) {
  return <ToastModal {...options} />
}

class MyToast {
  _modalID: string | null = null

  _loadingTaskCleaner

  private showToast(options: ToastOptions) {
    const { duration } = options
    if (duration) {
      const hideTask = new Scheduler.Task({
        totalPeriod: duration! / BASE_PERIOD,
        onComplete: this.hide,
      })
      Scheduler.spawnTasks(hideTask)
    }
    const element = renderToastElement({
      ...options,
    })
    if (!this._modalID) {
      this._modalID = ModalService.show(element, {
        onBackdropPress: this.hide,
      })
    } else {
      ModalService.update(this._modalID, element)
    }
  }

  showErrorToast(options: ToastOptions) {
    const duration = options.duration ?? TOAST_BASE_DURATION
    this.showToast({ ...options, status: 'danger', duration })
  }

  showWarningToast(options: ToastOptions) {
    const duration = options.duration ?? TOAST_BASE_DURATION
    this.showToast({ ...options, status: 'warning', duration })
  }

  showLoading(options: ToastOptions = {}) {
    // 优化处理，200ms 内结束的 loading 直接不做展示
    const showLoadingTask = new Scheduler.Task({
      totalPeriod: SHOW_LOADING_DURANTION / BASE_PERIOD,
      onComplete: () => {
        this.showToast({
          ...options,
          status: 'loading',
          msg: I18n.t('loading'),
        })
      },
    })
    const { instance, taskIds } = Scheduler.spawnTasks(showLoadingTask)
    this._loadingTaskCleaner = instance.stopTasks.bind(instance, ...taskIds)
  }

  hide = () => {
    if (this._modalID) {
      ModalService.hide(this._modalID)
    }
    if (this._loadingTaskCleaner) {
      this._loadingTaskCleaner?.()
      this._loadingTaskCleaner = null
    }
    this._modalID = null
  }
}

export const Modal = new MyToast()
