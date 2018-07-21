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

import XAddress from '@/elements/app/x-address'
import XAudio from '@/elements/app/x-audio'
import XAutoForm from '@/elements/app/x-auto-form'
import XAvatar from '@/elements/app/x-avatar'
import XBuyAddress from '@/elements/app/x-buy-address'
import XCard from '@/elements/app/x-card'
import XCell from '@/elements/app/x-cell'
import XCountdown from '@/elements/app/x-countdown'
import XFoot from '@/elements/app/x-foot'
import XGrid from '@/elements/app/x-grid'
import XGroupbuy from '@/elements/app/x-groupbuy'
import XHead from '@/elements/app/x-head'
import XHtml from '@/elements/app/x-html'
import XImage from '@/elements/app/x-image'
import XKeyword from '@/elements/app/x-keyword'
import XList from '@/elements/app/x-list'
import XMarquee from '@/elements/app/x-marquee'
import XMask from '@/elements/app/x-mask'
import XNotice from '@/elements/app/x-notice'
import XPay from '@/elements/app/x-pay'
import XProductClass from '@/elements/app/x-product-class'
import XProductItem from '@/elements/app/x-product-item'
import XRater from '@/elements/app/x-rater'
import XResult from '@/elements/app/x-result'
import XSlider from '@/elements/app/x-slider'
import XSwiper from '@/elements/app/x-swiper'
import XText from '@/elements/app/x-text'
import XTitle from '@/elements/app/x-title'
import XVideo from '@/elements/app/x-video'

Vue.component('zk-address', ZkAddress)
Vue.component('zk-audio', ZkAudio)
Vue.component('zk-auto-form', ZkAutoForm)
Vue.component('zk-avatar', ZkAvatar)
Vue.component('zk-buy-address', ZkBuyAddress)
Vue.component('zk-card', ZkCard)
Vue.component('zk-cell', ZkCell)
Vue.component('zk-countdown', ZkCountdown)
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

Vue.component('x-address', XAddress)
Vue.component('x-audio', XAudio)
Vue.component('x-auto-form', XAutoForm)
Vue.component('x-avatar', XAvatar)
Vue.component('x-buy-address', XBuyAddress)
Vue.component('x-card', XCard)
Vue.component('x-cell', XCell)
Vue.component('x-countdown', XCountdown)
Vue.component('x-foot', XFoot)
Vue.component('x-grid', XGrid)
Vue.component('x-groupbuy', XGroupbuy)
Vue.component('x-head', XHead)
Vue.component('x-html', XHtml)
Vue.component('x-image', XImage)
Vue.component('x-keyword', XKeyword)
Vue.component('x-list', XList)
Vue.component('x-marquee', XMarquee)
Vue.component('x-mask', XMask)
Vue.component('x-notice', XNotice)
Vue.component('x-pay', XPay)
Vue.component('x-product-class', XProductClass)
Vue.component('x-product-item', XProductItem)
Vue.component('x-rater', XRater)
Vue.component('x-result', XResult)
Vue.component('x-slider', XSlider)
Vue.component('x-swiper', XSwiper)
Vue.component('x-text', XText)
Vue.component('x-title', XTitle)
Vue.component('x-video', XVideo)


Vue.use(global)
Vue.use(MintUI)
Vue.use(Toast)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$client = 'WapH5'
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

