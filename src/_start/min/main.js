import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import global from '@/service/core/global' // 公共函数,全局函数
import '@/service/core/rem'
import App from './App'
import store from '@/store'
import XButton from '@/elements/min/x-button'
import XPicker from '@/elements/min/x-picker'
import XIcon from '@/elements/common/x-icon'
import XSwipe from '@/elements/common/x-swipe'
import XSwipeItem from '@/elements/common/x-swipe-item'
import XTabbar from '@/elements/common/x-tabbar'
import XTabbarItem from '@/elements/common/x-tabbar-item'
import ZkGrid from '@/components/core/zk-grid/index.vue'
import ZkImage from '@/components/core/zk-image/index.vue'
import ZkProductItem from '@/components/core/zk-product-item/index.vue'
import ZkSwiper from '@/components/core/zk-swiper/index.vue'
import ZkFooter from '@/components/core/zk-footer/index.vue'
import {
  api,
  apiUrl,
  config
} from '@/service/api'

Vue.component('x-button', XButton)
Vue.component('x-picker', XPicker)
Vue.component('x-tabbar', XTabbar)
Vue.component('x-tabbar-item', XTabbarItem)
Vue.component('x-icon', XIcon)
Vue.component('zk-grid', ZkGrid)
Vue.component('zk-image', ZkImage)
Vue.component('zk-product-item', ZkProductItem)
Vue.component('zk-footer', ZkFooter)
Vue.component('x-swipe', XSwipe)
Vue.component('x-swipe-item', XSwipeItem)
Vue.component('zk-swiper', ZkSwiper)

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
