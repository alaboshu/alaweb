import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import global from '@/service/core/global' 
import App from './App'
import store from '@/store'
import {
  api
} from '@/service/api'
import themeApi from '@/service/api/api.theme'
import local from '@/service/core/local'

import ZkGroupbuy from '@/components/activity/zk-groupbuy'
import ZkLogo from '@/components/common/zk-logo'
import ZkTopNav from '@/components/common/zk-top-nav'
import ZkAddress from '@/components/core/zk-address'
import ZkAutoForm from '@/components/core/zk-auto-form'
import ZkAvatar from '@/components/core/zk-avatar'
import ZkBuyAddress from '@/components/core/zk-buy-address'
import ZkCard from '@/components/core/zk-card'
import ZkCell from '@/components/core/zk-cell'
import ZkCountdown from '@/components/core/zk-countdown'
import ZkDialog from '@/components/core/zk-dialog'
import ZkHead from '@/components/core/zk-head'
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
import ZkTab from '@/components/core/zk-tab'
import ZkTable from '@/components/core/zk-table'
import ZkProductClass from '@/components/product/zk-product-class'
import ZkProductItem from '@/components/product/zk-product-item'
import ZkAudio from '@/components/theme/zk-audio'
import ZkFoot from '@/components/theme/zk-foot'
import ZkGrid from '@/components/theme/zk-grid'
import ZkHtml from '@/components/theme/zk-html'
import ZkImage from '@/components/theme/zk-image'
import ZkImageList from '@/components/theme/zk-image-list'
import ZkSearch from '@/components/theme/zk-search'
import ZkSwiper from '@/components/theme/zk-swiper'
import ZkText from '@/components/theme/zk-text'
import ZkTitle from '@/components/theme/zk-title'
import ZkVideo from '@/components/theme/zk-video'

import XAgree from '@/elements/all/x-agree'
import XCol from '@/elements/all/x-col'
import XComponent from '@/elements/all/x-component'
import XIcon from '@/elements/all/x-icon'
import XImage from '@/elements/all/x-image'
import XRow from '@/elements/all/x-row'
import XBadge from '@/elements/h5min/x-badge'
import XBox from '@/elements/h5min/x-box'
import XColor from '@/elements/h5min/x-color'
import XNodata from '@/elements/h5min/x-nodata'
import ETabSwiper from '@/elements/min/e-tab-swiper'
import XAddress from '@/elements/min/x-address'
import XAutoForm from '@/elements/min/x-auto-form'
import XButton from '@/elements/min/x-button'
import XBuyAddress from '@/elements/min/x-buy-address'
import XCell from '@/elements/min/x-cell'
import XGrid from '@/elements/min/x-grid'
import XGroupbuy from '@/elements/min/x-groupbuy'
import XHead from '@/elements/min/x-head'
import XImageList from '@/elements/min/x-image-list'
import XList from '@/elements/min/x-list'
import XLogo from '@/elements/min/x-logo'
import XNavbar from '@/elements/min/x-navbar'
import XPicker from '@/elements/min/x-picker'
import XPreview from '@/elements/min/x-preview'
import XProductClass from '@/elements/min/x-product-class'
import XSearchbar from '@/elements/min/x-searchbar'
import XSwiper from '@/elements/min/x-swiper'
import XFoot from '@/elements/mobile/x-foot'
import XPage from '@/elements/mobile/x-page'
import XProductItem from '@/elements/mobile/x-product-item'
import XTopNav from '@/elements/mobile/x-top-nav'
import XVerifiyPhone from '@/elements/mobile/x-verifiy-phone'
import XWidget from '@/elements/mobile/x-widget'

Vue.component('zk-groupbuy', ZkGroupbuy)
Vue.component('zk-logo', ZkLogo)
Vue.component('zk-top-nav', ZkTopNav)
Vue.component('zk-address', ZkAddress)
Vue.component('zk-auto-form', ZkAutoForm)
Vue.component('zk-avatar', ZkAvatar)
Vue.component('zk-buy-address', ZkBuyAddress)
Vue.component('zk-card', ZkCard)
Vue.component('zk-cell', ZkCell)
Vue.component('zk-countdown', ZkCountdown)
Vue.component('zk-dialog', ZkDialog)
Vue.component('zk-head', ZkHead)
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
Vue.component('zk-tab', ZkTab)
Vue.component('zk-table', ZkTable)
Vue.component('zk-product-class', ZkProductClass)
Vue.component('zk-product-item', ZkProductItem)
Vue.component('zk-audio', ZkAudio)
Vue.component('zk-foot', ZkFoot)
Vue.component('zk-grid', ZkGrid)
Vue.component('zk-html', ZkHtml)
Vue.component('zk-image', ZkImage)
Vue.component('zk-image-list', ZkImageList)
Vue.component('zk-search', ZkSearch)
Vue.component('zk-swiper', ZkSwiper)
Vue.component('zk-text', ZkText)
Vue.component('zk-title', ZkTitle)
Vue.component('zk-video', ZkVideo)

Vue.component('x-agree', XAgree)
Vue.component('x-col', XCol)
Vue.component('x-component', XComponent)
Vue.component('x-icon', XIcon)
Vue.component('x-image', XImage)
Vue.component('x-row', XRow)
Vue.component('x-badge', XBadge)
Vue.component('x-box', XBox)
Vue.component('x-color', XColor)
Vue.component('x-nodata', XNodata)
Vue.component('e-tab-swiper', ETabSwiper)
Vue.component('x-address', XAddress)
Vue.component('x-auto-form', XAutoForm)
Vue.component('x-button', XButton)
Vue.component('x-buy-address', XBuyAddress)
Vue.component('x-cell', XCell)
Vue.component('x-grid', XGrid)
Vue.component('x-groupbuy', XGroupbuy)
Vue.component('x-head', XHead)
Vue.component('x-image-list', XImageList)
Vue.component('x-list', XList)
Vue.component('x-logo', XLogo)
Vue.component('x-navbar', XNavbar)
Vue.component('x-picker', XPicker)
Vue.component('x-preview', XPreview)
Vue.component('x-product-class', XProductClass)
Vue.component('x-searchbar', XSearchbar)
Vue.component('x-swiper', XSwiper)
Vue.component('x-foot', XFoot)
Vue.component('x-page', XPage)
Vue.component('x-product-item', XProductItem)
Vue.component('x-top-nav', XTopNav)
Vue.component('x-verifiy-phone', XVerifiyPhone)
Vue.component('x-widget', XWidget)

Vue.use(MpvueRouterPatch)
Vue.use(global)
Vue.config.productionTip = false
App.store = store
Vue.prototype.$api = api
Vue.prototype.$client = 'WeChatLite'
Vue.prototype.$themeApi = themeApi
Vue.prototype.$local = local
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

