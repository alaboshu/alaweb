import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import global from '@/service/core/global' // 公共函数,全局函数
import App from './App'
import store from '@/store'
import XButton from '@/elements/min/x-button'
import XPicker from '@/elements/min/x-picker'
import XIcon from '@/elements/common/x-icon'
import ZkGrid from '@/components/core/zk-grid/index.vue'
import ZkImage from '@/components/common/zk-image/index.vue'
// import ZkGrid from 'src/components/core/zk-grid/index.vue'
import {
  api,
  apiUrl,
  config
} from '@/service/api'

Vue.component('x-button', XButton)
Vue.component('x-picker', XPicker)
Vue.component('x-icon', XIcon)
Vue.component('zk-grid', ZkGrid)
Vue.component('zk-image', ZkImage)

Vue.use(MpvueRouterPatch)
Vue.use(global)
Vue.config.productionTip = false
App.store = store
Vue.prototype.$api = api
Vue.prototype.$apiUrl = apiUrl
Vue.prototype.$url = config.url
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['^pages/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
