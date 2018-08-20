// 自动同步，请勿手动修改
import Vue from 'vue'
import App from './App'
import router from '@/router'
import global from '@/service/core/global'
import local from '@/service/core/local'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/service/core/rem'
import toast from '@/service/h5/toast'
import {
  api
} from '@/service/api'
import themeApi from '@/service/api/api.theme'

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
import XLogo from '@/elements/all/x-logo'
import XRow from '@/elements/all/x-row'
import ETabSwiper from '@/elements/h5/e-tab-swiper'
import XAddress from '@/elements/h5/x-address'
import XAudio from '@/elements/h5/x-audio'
import XAutoForm from '@/elements/h5/x-auto-form'
import XAvatar from '@/elements/h5/x-avatar'
import XButton from '@/elements/h5/x-button'
import XBuyAddress from '@/elements/h5/x-buy-address'
import XCard from '@/elements/h5/x-card'
import XCell from '@/elements/h5/x-cell'
import XChecklist from '@/elements/h5/x-checklist'
import XCountdown from '@/elements/h5/x-countdown'
import XDialog from '@/elements/h5/x-dialog'
import XDivider from '@/elements/h5/x-divider'
import XFrom from '@/elements/h5/x-from'
import XGrid from '@/elements/h5/x-grid'
import XGridItem from '@/elements/h5/x-grid-item'
import XGroup from '@/elements/h5/x-group'
import XGroupbuy from '@/elements/h5/x-groupbuy'
import XHead from '@/elements/h5/x-head'
import XHtml from '@/elements/h5/x-html'
import XImageList from '@/elements/h5/x-image-list'
import XInput from '@/elements/h5/x-input'
import XKeyword from '@/elements/h5/x-keyword'
import XLabel from '@/elements/h5/x-label'
import XLightbox from '@/elements/h5/x-lightbox'
import XList from '@/elements/h5/x-list'
import XMarquee from '@/elements/h5/x-marquee'
import XMask from '@/elements/h5/x-mask'
import XMore from '@/elements/h5/x-more'
import XNavbar from '@/elements/h5/x-navbar'
import XNavbarItem from '@/elements/h5/x-navbar-item'
import XNotice from '@/elements/h5/x-notice'
import XNumber from '@/elements/h5/x-number'
import XPay from '@/elements/h5/x-pay'
import XPicker from '@/elements/h5/x-picker'
import XPopup from '@/elements/h5/x-popup'
import XPreview from '@/elements/h5/x-preview'
import XProductClass from '@/elements/h5/x-product-class'
import XRadio from '@/elements/h5/x-radio'
import XRater from '@/elements/h5/x-rater'
import XResult from '@/elements/h5/x-result'
import XSearch from '@/elements/h5/x-search'
import XSearchbar from '@/elements/h5/x-searchbar'
import XSlider from '@/elements/h5/x-slider'
import XSpinner from '@/elements/h5/x-spinner'
import XSwipe from '@/elements/h5/x-swipe'
import XSwipeItem from '@/elements/h5/x-swipe-item'
import XSwiper from '@/elements/h5/x-swiper'
import XSwitch from '@/elements/h5/x-switch'
import XTab from '@/elements/h5/x-tab'
import XTabbar from '@/elements/h5/x-tabbar'
import XTabbarItem from '@/elements/h5/x-tabbar-item'
import XTable from '@/elements/h5/x-table'
import XText from '@/elements/h5/x-text'
import XTextarea from '@/elements/h5/x-textarea'
import XTitle from '@/elements/h5/x-title'
import XUpload from '@/elements/h5/x-upload'
import XVerifiy from '@/elements/h5/x-verifiy'
import XVideo from '@/elements/h5/x-video'
import XBadge from '@/elements/h5min/x-badge'
import XBox from '@/elements/h5min/x-box'
import XColor from '@/elements/h5min/x-color'
import XNodata from '@/elements/h5min/x-nodata'
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
Vue.component('x-logo', XLogo)
Vue.component('x-row', XRow)
Vue.component('e-tab-swiper', ETabSwiper)
Vue.component('x-address', XAddress)
Vue.component('x-audio', XAudio)
Vue.component('x-auto-form', XAutoForm)
Vue.component('x-avatar', XAvatar)
Vue.component('x-button', XButton)
Vue.component('x-buy-address', XBuyAddress)
Vue.component('x-card', XCard)
Vue.component('x-cell', XCell)
Vue.component('x-checklist', XChecklist)
Vue.component('x-countdown', XCountdown)
Vue.component('x-dialog', XDialog)
Vue.component('x-divider', XDivider)
Vue.component('x-from', XFrom)
Vue.component('x-grid', XGrid)
Vue.component('x-grid-item', XGridItem)
Vue.component('x-group', XGroup)
Vue.component('x-groupbuy', XGroupbuy)
Vue.component('x-head', XHead)
Vue.component('x-html', XHtml)
Vue.component('x-image-list', XImageList)
Vue.component('x-input', XInput)
Vue.component('x-keyword', XKeyword)
Vue.component('x-label', XLabel)
Vue.component('x-lightbox', XLightbox)
Vue.component('x-list', XList)
Vue.component('x-marquee', XMarquee)
Vue.component('x-mask', XMask)
Vue.component('x-more', XMore)
Vue.component('x-navbar', XNavbar)
Vue.component('x-navbar-item', XNavbarItem)
Vue.component('x-notice', XNotice)
Vue.component('x-number', XNumber)
Vue.component('x-pay', XPay)
Vue.component('x-picker', XPicker)
Vue.component('x-popup', XPopup)
Vue.component('x-preview', XPreview)
Vue.component('x-product-class', XProductClass)
Vue.component('x-radio', XRadio)
Vue.component('x-rater', XRater)
Vue.component('x-result', XResult)
Vue.component('x-search', XSearch)
Vue.component('x-searchbar', XSearchbar)
Vue.component('x-slider', XSlider)
Vue.component('x-spinner', XSpinner)
Vue.component('x-swipe', XSwipe)
Vue.component('x-swipe-item', XSwipeItem)
Vue.component('x-swiper', XSwiper)
Vue.component('x-switch', XSwitch)
Vue.component('x-tab', XTab)
Vue.component('x-tabbar', XTabbar)
Vue.component('x-tabbar-item', XTabbarItem)
Vue.component('x-table', XTable)
Vue.component('x-text', XText)
Vue.component('x-textarea', XTextarea)
Vue.component('x-title', XTitle)
Vue.component('x-upload', XUpload)
Vue.component('x-verifiy', XVerifiy)
Vue.component('x-video', XVideo)
Vue.component('x-badge', XBadge)
Vue.component('x-box', XBox)
Vue.component('x-color', XColor)
Vue.component('x-nodata', XNodata)
Vue.component('x-foot', XFoot)
Vue.component('x-page', XPage)
Vue.component('x-product-item', XProductItem)
Vue.component('x-top-nav', XTopNav)
Vue.component('x-verifiy-phone', XVerifiyPhone)
Vue.component('x-widget', XWidget)


Vue.use(global)
Vue.use(MintUI)
Vue.use(toast)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$client = 'WapH5'
Vue.prototype.$local = local
Vue.prototype.$toast = toast
// Vue.prototype.$message = local
Vue.prototype.$loading = true
Vue.prototype.$themeApi = themeApi

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

