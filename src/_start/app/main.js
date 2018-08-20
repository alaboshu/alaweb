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
import XImageList from '@/elements/app/x-image-list'
import XLogo from '@/elements/app/x-logo'
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
Vue.component('x-image-list', XImageList)
Vue.component('x-logo', XLogo)
Vue.component('x-foot', XFoot)
Vue.component('x-page', XPage)
Vue.component('x-product-item', XProductItem)
Vue.component('x-top-nav', XTopNav)
Vue.component('x-verifiy-phone', XVerifiyPhone)
Vue.component('x-widget', XWidget)


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

