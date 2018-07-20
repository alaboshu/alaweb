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
import ZkRater from '@/components/core/zk-rater'
import ZkResult from '@/components/core/zk-result'
import ZkSearch from '@/components/core/zk-search'
import ZkSlider from '@/components/core/zk-slider'
import ZkSwiper from '@/components/core/zk-swiper'
import ZkTab from '@/components/core/zk-tab'
import ZkTable from '@/components/core/zk-table'
import ZkText from '@/components/core/zk-text'
import ZkTitle from '@/components/core/zk-title'
import ZkVideo from '@/components/core/zk-video'
import ZkGroupbuy from '@/components/shop/zk-groupbuy'
import ZkProductClass from '@/components/shop/zk-product-class'
import ZkProductItem from '@/components/shop/zk-product-item'

import ETabSwiper from '@/elements/h5/e-tab-swiper'
import XButton from '@/elements/h5/x-button'
import XCell from '@/elements/h5/x-cell'
import XChecklist from '@/elements/h5/x-checklist'
import XDivider from '@/elements/h5/x-divider'
import XFrom from '@/elements/h5/x-from'
import XGrid from '@/elements/h5/x-grid'
import XGridItem from '@/elements/h5/x-grid-item'
import XGroup from '@/elements/h5/x-group'
import XHeader from '@/elements/h5/x-header'
import XInput from '@/elements/h5/x-input'
import XLabel from '@/elements/h5/x-label'
import XLightbox from '@/elements/h5/x-lightbox'
import XMore from '@/elements/h5/x-more'
import XNavbar from '@/elements/h5/x-navbar'
import XNavbarItem from '@/elements/h5/x-navbar-item'
import XNumber from '@/elements/h5/x-number'
import XPopup from '@/elements/h5/x-popup'
import XPreview from '@/elements/h5/x-preview'
import XRadio from '@/elements/h5/x-radio'
import XSearch from '@/elements/h5/x-search'
import XSearchbar from '@/elements/h5/x-searchbar'
import XSpinner from '@/elements/h5/x-spinner'
import XSwipe from '@/elements/h5/x-swipe'
import XSwipeItem from '@/elements/h5/x-swipe-item'
import XSwiper from '@/elements/h5/x-swiper'
import XSwitch from '@/elements/h5/x-switch'
import XTab from '@/elements/h5/x-tab'
import XTabbar from '@/elements/h5/x-tabbar'
import XTabbarItem from '@/elements/h5/x-tabbar-item'
import XTable from '@/elements/h5/x-table'
import XTextarea from '@/elements/h5/x-textarea'
import XToast from '@/elements/h5/x-toast'
import XToastIcon from '@/elements/h5/x-toast-icon'
import XUpload from '@/elements/h5/x-upload'
import XVerifiy from '@/elements/h5/x-verifiy'
import XBadge from '@/elements/h5min/x-badge'
import XBox from '@/elements/h5min/x-box'
import XCol from '@/elements/h5min/x-col'
import XColor from '@/elements/h5min/x-color'
import XIcon from '@/elements/h5min/x-icon'
import XNodata from '@/elements/h5min/x-nodata'
import XRow from '@/elements/h5min/x-row'
import XVerifiyPhone from '@/elements/h5min/x-verifiy-phone'

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
Vue.component('zk-rater', ZkRater)
Vue.component('zk-result', ZkResult)
Vue.component('zk-search', ZkSearch)
Vue.component('zk-slider', ZkSlider)
Vue.component('zk-swiper', ZkSwiper)
Vue.component('zk-tab', ZkTab)
Vue.component('zk-table', ZkTable)
Vue.component('zk-text', ZkText)
Vue.component('zk-title', ZkTitle)
Vue.component('zk-video', ZkVideo)
Vue.component('zk-groupbuy', ZkGroupbuy)
Vue.component('zk-product-class', ZkProductClass)
Vue.component('zk-product-item', ZkProductItem)

Vue.component('e-tab-swiper', ETabSwiper)
Vue.component('x-button', XButton)
Vue.component('x-cell', XCell)
Vue.component('x-checklist', XChecklist)
Vue.component('x-divider', XDivider)
Vue.component('x-from', XFrom)
Vue.component('x-grid', XGrid)
Vue.component('x-grid-item', XGridItem)
Vue.component('x-group', XGroup)
Vue.component('x-header', XHeader)
Vue.component('x-input', XInput)
Vue.component('x-label', XLabel)
Vue.component('x-lightbox', XLightbox)
Vue.component('x-more', XMore)
Vue.component('x-navbar', XNavbar)
Vue.component('x-navbar-item', XNavbarItem)
Vue.component('x-number', XNumber)
Vue.component('x-popup', XPopup)
Vue.component('x-preview', XPreview)
Vue.component('x-radio', XRadio)
Vue.component('x-search', XSearch)
Vue.component('x-searchbar', XSearchbar)
Vue.component('x-spinner', XSpinner)
Vue.component('x-swipe', XSwipe)
Vue.component('x-swipe-item', XSwipeItem)
Vue.component('x-swiper', XSwiper)
Vue.component('x-switch', XSwitch)
Vue.component('x-tab', XTab)
Vue.component('x-tabbar', XTabbar)
Vue.component('x-tabbar-item', XTabbarItem)
Vue.component('x-table', XTable)
Vue.component('x-textarea', XTextarea)
Vue.component('x-toast', XToast)
Vue.component('x-toast-icon', XToastIcon)
Vue.component('x-upload', XUpload)
Vue.component('x-verifiy', XVerifiy)
Vue.component('x-badge', XBadge)
Vue.component('x-box', XBox)
Vue.component('x-col', XCol)
Vue.component('x-color', XColor)
Vue.component('x-icon', XIcon)
Vue.component('x-nodata', XNodata)
Vue.component('x-row', XRow)
Vue.component('x-verifiy-phone', XVerifiyPhone)


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

