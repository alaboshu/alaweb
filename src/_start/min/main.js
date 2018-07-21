// 自动同步，请勿手动修改
import Vue from 'vue'
import App from './App'
import router from '@/router'
import global from '@/service/core/global'
import local from '@/service/core/local'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/service/core/rem'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import {
  api
} from '@/service/api'

import ZkAddress from '@/components/core/zk-address'
import ZkAudio from '@/components/core/zk-audio'
import ZkAutoForm from '@/components/core/zk-auto-form'
import ZkAvatar from '@/components/core/zk-avatar'
import ZkBuyAddress from '@/components/core/zk-buy-address'
import ZkCard from '@/components/core/zk-card'
import ZkCell from '@/components/core/zk-cell'
import ZkCountdown from '@/components/core/zk-countdown'
import ZkDialog from '@/components/core/zk-dialog'
import ZkFoot from '@/components/core/zk-foot'
import ZkGrid from '@/components/core/zk-grid'
import ZkHead from '@/components/core/zk-head'
import ZkHtml from '@/components/core/zk-html'
import ZkImage from '@/components/core/zk-image'
import ZkKeyword from '@/components/core/zk-keyword'
import ZkList from '@/components/core/zk-list'
import ZkMarquee from '@/components/core/zk-marquee'
import ZkMask from '@/components/core/zk-mask'
import ZkNodata from '@/components/core/zk-nodata'
import ZkNotice from '@/components/core/zk-notice'
import ZkPay from '@/components/core/zk-pay'
import ZkPopup from '@/components/core/zk-popup'
import ZkPreview from '@/components/core/zk-preview'
import ZkResult from '@/components/core/zk-result'
import ZkSearch from '@/components/core/zk-search'
import ZkSwiper from '@/components/core/zk-swiper'
import ZkTab from '@/components/core/zk-tab'
import ZkTable from '@/components/core/zk-table'
import ZkText from '@/components/core/zk-text'
import ZkVideo from '@/components/core/zk-video'
import ZkGroupbuy from '@/components/shop/zk-groupbuy'
import ZkProductClass from '@/components/shop/zk-product-class'
import ZkProductItem from '@/components/shop/zk-product-item'

import XBadge from '@/elements/h5min/x-badge'
import XBox from '@/elements/h5min/x-box'
import XCol from '@/elements/h5min/x-col'
import XColor from '@/elements/h5min/x-color'
import XIcon from '@/elements/h5min/x-icon'
import XNodata from '@/elements/h5min/x-nodata'
import XRow from '@/elements/h5min/x-row'
import XVerifiyPhone from '@/elements/h5min/x-verifiy-phone'
import ETabSwiper from '@/elements/min/e-tab-swiper'
import XAddress from '@/elements/min/x-address'
import XAutoForm from '@/elements/min/x-auto-form'
import XButton from '@/elements/min/x-button'
import XBuyAddress from '@/elements/min/x-buy-address'
import XCell from '@/elements/min/x-cell'
import XFoot from '@/elements/min/x-foot'
import XGrid from '@/elements/min/x-grid'
import XGroupbuy from '@/elements/min/x-groupbuy'
import XHead from '@/elements/min/x-head'
import XImage from '@/elements/min/x-image'
import XList from '@/elements/min/x-list'
import XNavbar from '@/elements/min/x-navbar'
import XPicker from '@/elements/min/x-picker'
import XPreview from '@/elements/min/x-preview'
import XProductClass from '@/elements/min/x-product-class'
import XProductItem from '@/elements/min/x-product-item'
import XSearchbar from '@/elements/min/x-searchbar'
import XSwiper from '@/elements/min/x-swiper'

Vue.component('zk-address', ZkAddress)
Vue.component('zk-audio', ZkAudio)
Vue.component('zk-auto-form', ZkAutoForm)
Vue.component('zk-avatar', ZkAvatar)
Vue.component('zk-buy-address', ZkBuyAddress)
Vue.component('zk-card', ZkCard)
Vue.component('zk-cell', ZkCell)
Vue.component('zk-countdown', ZkCountdown)
Vue.component('zk-dialog', ZkDialog)
Vue.component('zk-foot', ZkFoot)
Vue.component('zk-grid', ZkGrid)
Vue.component('zk-head', ZkHead)
Vue.component('zk-html', ZkHtml)
Vue.component('zk-image', ZkImage)
Vue.component('zk-keyword', ZkKeyword)
Vue.component('zk-list', ZkList)
Vue.component('zk-marquee', ZkMarquee)
Vue.component('zk-mask', ZkMask)
Vue.component('zk-nodata', ZkNodata)
Vue.component('zk-notice', ZkNotice)
Vue.component('zk-pay', ZkPay)
Vue.component('zk-popup', ZkPopup)
Vue.component('zk-preview', ZkPreview)
Vue.component('zk-result', ZkResult)
Vue.component('zk-search', ZkSearch)
Vue.component('zk-swiper', ZkSwiper)
Vue.component('zk-tab', ZkTab)
Vue.component('zk-table', ZkTable)
Vue.component('zk-text', ZkText)
Vue.component('zk-video', ZkVideo)
Vue.component('zk-groupbuy', ZkGroupbuy)
Vue.component('zk-product-class', ZkProductClass)
Vue.component('zk-product-item', ZkProductItem)

Vue.component('x-badge', XBadge)
Vue.component('x-box', XBox)
Vue.component('x-col', XCol)
Vue.component('x-color', XColor)
Vue.component('x-icon', XIcon)
Vue.component('x-nodata', XNodata)
Vue.component('x-row', XRow)
Vue.component('x-verifiy-phone', XVerifiyPhone)
Vue.component('e-tab-swiper', ETabSwiper)
Vue.component('x-address', XAddress)
Vue.component('x-auto-form', XAutoForm)
Vue.component('x-button', XButton)
Vue.component('x-buy-address', XBuyAddress)
Vue.component('x-cell', XCell)
Vue.component('x-foot', XFoot)
Vue.component('x-grid', XGrid)
Vue.component('x-groupbuy', XGroupbuy)
Vue.component('x-head', XHead)
Vue.component('x-image', XImage)
Vue.component('x-list', XList)
Vue.component('x-navbar', XNavbar)
Vue.component('x-picker', XPicker)
Vue.component('x-preview', XPreview)
Vue.component('x-product-class', XProductClass)
Vue.component('x-product-item', XProductItem)
Vue.component('x-searchbar', XSearchbar)
Vue.component('x-swiper', XSwiper)


Vue.use(global)
Vue.use(MintUI)
Vue.use(Toast)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$client = 'App'
Vue.prototype.$local = local
Vue.prototype.$toast = local
Vue.prototype.$message = local
Vue.prototype.$loading = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

