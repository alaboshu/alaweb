import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import global from '@/service/core/global' // 公共函数,全局函数
import '@/service/core/rem'
import App from './App'
import store from '@/store'
// 元件部分
import ETabSwiper from '@/elements/min/e-tab-swiper'
import XButton from '@/elements/min/x-button'
import XPicker from '@/elements/min/x-picker'
import XGrid from '@/elements/min/x-grid'
import XSwiper from '@/elements/min/x-swiper'
import XNavbar from '@/elements/min/x-navbar'
import XSearchbar from '@/elements/min/x-searchbar'
// 组件部分
import XIcon from '@/elements/common/x-icon'
import ZkImage from '@/components/core/zk-image/index.vue'
import ZkProductItem from '@/components/core/zk-product-item/index.vue'
import ZkSwiper from '@/components/core/zk-swiper/index.vue'
import ZkFooter from '@/components/core/zk-footer/index.vue'
import ZkGrid from '@/components/core/zk-grid/index.vue'
import ZkProductClass from '@/components/shop/zk-product-class/index.vue'
import {
  api,
  apiUrl,
  config
} from '@/service/api'

// 元件部分
Vue.component('e-tab-swiper', ETabSwiper)
Vue.component('x-button', XButton)
Vue.component('x-picker', XPicker)
Vue.component('x-grid', XGrid)
Vue.component('x-swiper', XSwiper)
Vue.component('x-navbar', XNavbar)
Vue.component('x-searchbar', XSearchbar)
// 组件部分
Vue.component('x-icon', XIcon)
Vue.component('zk-image', ZkImage)
Vue.component('zk-product-item', ZkProductItem)
Vue.component('zk-footer', ZkFooter)
Vue.component('zk-swiper', ZkSwiper)
Vue.component('zk-grid', ZkGrid)
Vue.component('zk-product-class', ZkProductClass)

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
