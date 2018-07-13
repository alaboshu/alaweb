// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Toast from 'vue2-toast'
import 'vue2-toast/lib/toast.css'
import App from './App'
import router from '@/router'
import global from '@/service/core/global' // 公共函数,全局函数
import '@/service/core/rem'
import {
  api,
  apiUrl,
  config
} from '@/service/api'
import XHeader from '@/elements/common/x-header'
import XTabbar from '@/elements/common/x-tabbar'
import XTabbarItem from '@/elements/common/x-tabbar-item'
import XCell from '@/elements/common/x-cell'
import XGroup from '@/elements/common/x-group'
import XSearch from '@/elements/common/x-search'
import XSwitch from '@/elements/common/x-switch'
import XPopup from '@/elements/common/x-popup'
import XDivider from '@/elements/common/x-divider'
import XNodata from '@/elements/common/x-nodata'
import XButton from '@/elements/common/x-button'
import XFrom from '@/elements/common/x-from'
import ZkAddress from '@/components/core/zk-address/index.vue'
import XIcon from '@/elements/common/x-icon'
import XSwipe from '@/elements/common/x-swipe'
import XSwipeItem from '@/elements/common/x-swipe-item'
import XSwiper from '@/elements/common/x-swiper'
import XGrid from '@/elements/common/x-grid'
import ZkGrid from '@/components/core/zk-grid/index.vue'
import ZkProductItem from '@/components/shop/zk-product-item/index.vue'
import ZkImage from '@/components/core/zk-image/index.vue'
import ZkFooter from '@/components/core/zk-footer/index.vue'
import ZkSwiper from '@/components/core/zk-swiper/index.vue'
import XInput from '@/elements/common/x-input/index.vue'
import Xlable from '@/elements/common/x-label'
import ETabSwiper from '@/elements/common/e-tab-swiper'
import ZkProductClass from '@/components/shop/zk-product-class/index.vue'
import XNavbar from '@/elements/common/x-navbar'
import XNavbarItem from '@/elements/common/x-navbar-item'
import XSearchbar from '@/elements/common/x-searchbar'
import XPreview from '@/elements/common/x-preview'
import XNumber from '@/elements/common/x-number'
import XVerifiyPhone from '@/elements/common/x-verifiy-phone'
import ZkGroupbuy from '@/components/shop/zk-groupbuy/index.vue'
console.log(config)

Vue.component('x-header', XHeader)
Vue.component('x-tabbar', XTabbar)
Vue.component('x-cell', XCell)
Vue.component('x-group', XGroup)
Vue.component('x-search', XSearch)
Vue.component('x-switch', XSwitch)
Vue.component('x-popup', XPopup)
Vue.component('x-divider', XDivider)
Vue.component('x-nodata', XNodata)
Vue.component('x-button', XButton)
Vue.component('x-from', XFrom)
Vue.component('zk-address', ZkAddress)
Vue.component('x-tabbar-item', XTabbarItem)
Vue.component('x-grid', XGrid)
Vue.component('x-icon', XIcon)
Vue.component('zk-grid', ZkGrid)
Vue.component('zk-image', ZkImage)
Vue.component('zk-product-item', ZkProductItem)
Vue.component('zk-footer', ZkFooter)
Vue.component('x-swipe', XSwipe)
Vue.component('x-swipe-item', XSwipeItem)
Vue.component('x-swiper', XSwiper)
Vue.component('zk-swiper', ZkSwiper)
Vue.component('x-input', XInput)
Vue.component('zk-label', Xlable)
Vue.component('zk-product-class', ZkProductClass)
Vue.component('e-tab-swiper', ETabSwiper)
Vue.component('x-navbar', XNavbar)
Vue.component('x-navbar-item', XNavbarItem)
Vue.component('x-searchbar', XSearchbar)
Vue.component('x-preview', XPreview)
Vue.component('x-number', XNumber)
Vue.component('x-verifiy-phone', XVerifiyPhone)
Vue.component('zk-groupbuy', ZkGroupbuy)

Vue.use(global)
Vue.use(Toast)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$apiUrl = apiUrl
Vue.prototype.$url = config.url

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
