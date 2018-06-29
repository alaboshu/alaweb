import Vue from 'vue'
import App from './App'
// import element from 'src/element/min/index'
import XButton from '@/element/min/x-button'
import XPicker from '@/element/min/x-picker'

Vue.component('x-button', XButton)
Vue.component('x-picker', XPicker)

Vue.config.productionTip = false
App.mpType = 'app'

new Vue(App).$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/chat/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
