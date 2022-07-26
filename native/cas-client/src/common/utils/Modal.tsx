import { Text, ModalService, Layout } from '@ui-kitten/components'
import { View } from 'react-native'
import React from 'react'
import { EvaIcon } from '../../components'

export type ToastOptions = {
  msg: string
  title?: string
}

function ToastModal(props: ToastOptions) {
  const { msg, title } = props
  return (
    <View>
      <Layout>
        <EvaIcon />
      </Layout>
      <View>
        <Text>{title}</Text>
        <Text>{msg}</Text>
      </View>
    </View>
  )
}

function renderToastElement(options: ToastOptions) {
  return <ToastModal {...options} />
}

class MyToast {
  _modalID: string | null = null

  showErrorToast(options: ToastOptions) {
    const element = renderToastElement(options)
    if (!this._modalID) {
      this._modalID = ModalService.show(element, {
        onBackdropPress: this.hide,
      })
    } else {
      ModalService.update(this._modalID, element)
    }
  }

  hide = () => {
    if (this._modalID) {
      ModalService.hide(this._modalID)
    }
    this._modalID = null
  }
}

export const Modal = new MyToast()
