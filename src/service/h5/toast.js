import {
  Toast
} from 'mint-ui'

export default {
  succee (message) {
    Toast({
      message: message,
      duration: 5000,
      iconClass: 'icon icon-success'
    })
  },
  warn (message) {
    Toast({
      message: message,
      duration: 5000,
      iconClass: 'icon icon-warn'
    })
  },
  botton (message) {
    Toast({
      message: message,
      duration: 5000,
      position: 'bottom'
    })
  },
  center (message) {
    Toast({
      message: message,
      duration: 5000,
      position: 'center'
    })
  }
}
