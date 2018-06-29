import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import elements from '@/elements/min/index.js'
import App from './App'
import store from '@/store'

Vue.config.productionTip = false
App.store = store

Vue.use(MpvueRouterPatch)

const app = new Vue({
  App,
  elements
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
