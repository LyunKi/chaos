import RootToast from 'react-native-root-toast'

class MyToast {
  toast: any

  show(message: string) {
    this.toast = RootToast.show(message, {
      position: RootToast.positions.TOP,
    })
  }
  hide() {
    if (this.toast) {
      RootToast.hide(this.toast)
    }
    this.toast = null
  }
}

export const Toast = new MyToast()
