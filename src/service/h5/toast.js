import {
  Toast
} from 'mint-ui'

export default {
  succee (message) {
    Toast({
      message: message,
      duration: 500000,
      iconClass: 'icon icon-success'
    })
  }
}
