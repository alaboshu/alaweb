import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import weui from '@/assets/style/min/weui.less'
import App from './App'
import store from '@/store'
import XButton from '@/elements/min/x-button' // 按钮
import XPicker from '@/elements/min/x-picker' // 选择器

Vue.component('x-button', XButton)
Vue.component('x-picker', XPicker)

Vue.use(MpvueRouterPatch)
Vue.use(weui)
Vue.config.productionTip = false
App.store = store

const app = new Vue(App)
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
