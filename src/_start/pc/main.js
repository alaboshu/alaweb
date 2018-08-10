// 自动同步，请勿手动修改
import Vue from 'vue'
import App from './App'
import router from '@/router'
import global from '@/service/core/global'
import local from '@/service/core/local'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
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
import ZkTopNav from '@/components/core/zk-top-nav'
import ZkVideo from '@/components/core/zk-video'
import ZkBacktop from '@/components/pc/zk-backtop'
import ZkHelpRow from '@/components/pc/zk-help-row'
import ZkNav from '@/components/pc/zk-nav'
import ZkGroupbuy from '@/components/shop/zk-groupbuy'
import ZkProductClass from '@/components/shop/zk-product-class'
import ZkProductItem from '@/components/shop/zk-product-item'

import XAgree from '@/elements/all/x-agree'
import XCol from '@/elements/all/x-col'
import XIcon from '@/elements/all/x-icon'
import XImage from '@/elements/all/x-image'
import XRow from '@/elements/all/x-row'
import PBacktop from '@/elements/pc/p-backtop'
import PHelpRow from '@/elements/pc/p-help-row'
import PNav from '@/elements/pc/p-nav'
import XAddress from '@/elements/pc/x-address'
import XAudio from '@/elements/pc/x-audio'
import XAutoForm from '@/elements/pc/x-auto-form'
import XAvatar from '@/elements/pc/x-avatar'
import XButton from '@/elements/pc/x-button'
import XBuyAddress from '@/elements/pc/x-buy-address'
import XCard from '@/elements/pc/x-card'
import XCell from '@/elements/pc/x-cell'
import XCountdown from '@/elements/pc/x-countdown'
import XDialog from '@/elements/pc/x-dialog'
import XFoot from '@/elements/pc/x-foot'
import XGrid from '@/elements/pc/x-grid'
import XGroupbuy from '@/elements/pc/x-groupbuy'
import XHead from '@/elements/pc/x-head'
import XHtml from '@/elements/pc/x-html'
import XInput from '@/elements/pc/x-input'
import XKeyword from '@/elements/pc/x-keyword'
import XList from '@/elements/pc/x-list'
import XMarquee from '@/elements/pc/x-marquee'
import XMask from '@/elements/pc/x-mask'
import XNodata from '@/elements/pc/x-nodata'
import XNotice from '@/elements/pc/x-notice'
import XNumber from '@/elements/pc/x-number'
import XPay from '@/elements/pc/x-pay'
import XPicker from '@/elements/pc/x-picker'
import XPopup from '@/elements/pc/x-popup'
import XPreview from '@/elements/pc/x-preview'
import XProductClass from '@/elements/pc/x-product-class'
import XProductItem from '@/elements/pc/x-product-item'
import XResult from '@/elements/pc/x-result'
import XSearch from '@/elements/pc/x-search'
import XSwiper from '@/elements/pc/x-swiper'
import XTab from '@/elements/pc/x-tab'
import XTable from '@/elements/pc/x-table'
import XText from '@/elements/pc/x-text'
import XTopNav from '@/elements/pc/x-top-nav'
import XUpload from '@/elements/pc/x-upload'
import XVideo from '@/elements/pc/x-video'

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
Vue.component('zk-top-nav', ZkTopNav)
Vue.component('zk-video', ZkVideo)
Vue.component('zk-backtop', ZkBacktop)
Vue.component('zk-help-row', ZkHelpRow)
Vue.component('zk-nav', ZkNav)
Vue.component('zk-groupbuy', ZkGroupbuy)
Vue.component('zk-product-class', ZkProductClass)
Vue.component('zk-product-item', ZkProductItem)

Vue.component('x-agree', XAgree)
Vue.component('x-col', XCol)
Vue.component('x-icon', XIcon)
Vue.component('x-image', XImage)
Vue.component('x-row', XRow)
Vue.component('p-backtop', PBacktop)
Vue.component('p-help-row', PHelpRow)
Vue.component('p-nav', PNav)
Vue.component('x-address', XAddress)
Vue.component('x-audio', XAudio)
Vue.component('x-auto-form', XAutoForm)
Vue.component('x-avatar', XAvatar)
Vue.component('x-button', XButton)
Vue.component('x-buy-address', XBuyAddress)
Vue.component('x-card', XCard)
Vue.component('x-cell', XCell)
Vue.component('x-countdown', XCountdown)
Vue.component('x-dialog', XDialog)
Vue.component('x-foot', XFoot)
Vue.component('x-grid', XGrid)
Vue.component('x-groupbuy', XGroupbuy)
Vue.component('x-head', XHead)
Vue.component('x-html', XHtml)
Vue.component('x-input', XInput)
Vue.component('x-keyword', XKeyword)
Vue.component('x-list', XList)
Vue.component('x-marquee', XMarquee)
Vue.component('x-mask', XMask)
Vue.component('x-nodata', XNodata)
Vue.component('x-notice', XNotice)
Vue.component('x-number', XNumber)
Vue.component('x-pay', XPay)
Vue.component('x-picker', XPicker)
Vue.component('x-popup', XPopup)
Vue.component('x-preview', XPreview)
Vue.component('x-product-class', XProductClass)
Vue.component('x-product-item', XProductItem)
Vue.component('x-result', XResult)
Vue.component('x-search', XSearch)
Vue.component('x-swiper', XSwiper)
Vue.component('x-tab', XTab)
Vue.component('x-table', XTable)
Vue.component('x-text', XText)
Vue.component('x-top-nav', XTopNav)
Vue.component('x-upload', XUpload)
Vue.component('x-video', XVideo)


Vue.use(global)
Vue.use(Toast)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$client = 'PcWeb'
Vue.prototype.$api = api
Vue.prototype.$client = 'WapH5'
Vue.prototype.$local = local
Vue.prototype.$toast = local
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

