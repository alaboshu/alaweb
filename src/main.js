import Vue from 'vue'
import store from '@/service/store/index'
import App from './App'
import api from '@/service/api.js'
import user from '@/service/user.js'
import base from '@/service/base.js'
import crud from '@/service/crud.js'
import weixin from '@/service/core/weixin'
import '@/style/iconfont/css/iconfount.css'
import '@/assets/style/iconfont.css'

// #ifdef H5
import '@/assets/style/h5/index.scss'
// #endif

/* #ifndef H5 */
import '@/assets/style/mp/index.scss'
// #endif

import zkArticle from '@/components/articles/zk-article/index.vue'
import zkHelp from '@/components/articles/zk-help/index.vue'
import zkMarquee from '@/components/articles/zk-marquee/index.vue'
import zkAmount from '@/components/assets/zk-amount/index.vue'
import zkAutoForm from '@/components/common/zk-auto-form/index.vue'
import zkCell from '@/components/common/zk-cell/index.vue'
import zkGrid from '@/components/common/zk-grid/index.vue'
import zkHtml from '@/components/common/zk-html/index.vue'
import zkImageList from '@/components/common/zk-image-list/index.vue'
import zkImage from '@/components/common/zk-image/index.vue'
import zkList from '@/components/common/zk-list/index.vue'
import zkPreview from '@/components/common/zk-preview/index.vue'
import zkSwiper from '@/components/common/zk-swiper/index.vue'
import zkVideo from '@/components/common/zk-video/index.vue'
import zkBuy from '@/components/order/zk-buy/index.vue'
import zkCart from '@/components/order/zk-cart/index.vue'
import zkOrderList from '@/components/order/zk-order-list/index.vue'
import zkOrderRefund from '@/components/order/zk-order-refund/index.vue'
import zkOrderShow from '@/components/order/zk-order-show/index.vue'
import zkProductClass from '@/components/product/zk-product-class/index.vue'
import zkProductList from '@/components/product/zk-product-list/index.vue'
import zkProductListpage from '@/components/product/zk-product-listpage/index.vue'
import zkProductShowpage from '@/components/product/zk-product-showpage/index.vue'
import zkSwiperList from '@/components/swiper/zk-swiper-list/index.vue'
import zkTabber from '@/components/tabber/zk-tabber/index.vue'
import zkHead from '@/components/themes/zk-head/index.vue'
import zkSearch from '@/components/themes/zk-search/index.vue'
import zkTabbar from '@/components/themes/zk-tabbar/index.vue'
import zkLogin from '@/components/user/zk-login/index.vue'
import zkLogout from '@/components/user/zk-logout/index.vue'
import zkQrcode from '@/components/user/zk-qrcode/index.vue'
import zkReg from '@/components/user/zk-reg/index.vue'
import zkUserTop from '@/components/user/zk-user-top/index.vue'
import xA from '@/elements/x-a/index.vue'
import xAuthorization from '@/elements/x-authorization/index.vue'
import xButton from '@/elements/x-button/index.vue'
import xCell from '@/elements/x-cell/index.vue'
import xCityPicker from '@/elements/x-city-picker/index.vue'
import xCountDown from '@/elements/x-count-down/index.vue'
import xDrawer from '@/elements/x-drawer/index.vue'
import xFormLabel from '@/elements/x-form-label/index.vue'
import xIcon from '@/elements/x-icon/index.vue'
import xImage from '@/elements/x-image/index.vue'
import xInput from '@/elements/x-input/index.vue'
import xMessage from '@/elements/x-message/index.vue'
import xNumber from '@/elements/x-number/index.vue'
import xPassword from '@/elements/x-password/index.vue'
import xPay from '@/elements/x-pay/index.vue'
import xPhoneVerifiy from '@/elements/x-phone-verifiy/index.vue'
import xPicker from '@/elements/x-picker/index.vue'
import xRadio from '@/elements/x-radio/index.vue'
import xSelect from '@/elements/x-select/index.vue'
import xTimePicker from '@/elements/x-time-picker/index.vue'
import xWidget from '@/elements/x-widget/index.vue'
Vue.component('zk-article', zkArticle)
Vue.component('zk-help', zkHelp)
Vue.component('zk-marquee', zkMarquee)
Vue.component('zk-amount', zkAmount)
Vue.component('zk-auto-form', zkAutoForm)
Vue.component('zk-cell', zkCell)
Vue.component('zk-grid', zkGrid)
Vue.component('zk-html', zkHtml)
Vue.component('zk-image-list', zkImageList)
Vue.component('zk-image', zkImage)
Vue.component('zk-list', zkList)
Vue.component('zk-preview', zkPreview)
Vue.component('zk-swiper', zkSwiper)
Vue.component('zk-video', zkVideo)
Vue.component('zk-buy', zkBuy)
Vue.component('zk-cart', zkCart)
Vue.component('zk-order-list', zkOrderList)
Vue.component('zk-order-refund', zkOrderRefund)
Vue.component('zk-order-show', zkOrderShow)
Vue.component('zk-product-class', zkProductClass)
Vue.component('zk-product-list', zkProductList)
Vue.component('zk-product-listpage', zkProductListpage)
Vue.component('zk-product-showpage', zkProductShowpage)
Vue.component('zk-swiper-list', zkSwiperList)
Vue.component('zk-tabber', zkTabber)
Vue.component('zk-head', zkHead)
Vue.component('zk-search', zkSearch)
Vue.component('zk-tabbar', zkTabbar)
Vue.component('zk-login', zkLogin)
Vue.component('zk-logout', zkLogout)
Vue.component('zk-qrcode', zkQrcode)
Vue.component('zk-reg', zkReg)
Vue.component('zk-user-top', zkUserTop)
Vue.component('x-a', xA)
Vue.component('x-authorization', xAuthorization)
Vue.component('x-button', xButton)
Vue.component('x-cell', xCell)
Vue.component('x-city-picker', xCityPicker)
Vue.component('x-count-down', xCountDown)
Vue.component('x-drawer', xDrawer)
Vue.component('x-form-label', xFormLabel)
Vue.component('x-icon', xIcon)
Vue.component('x-image', xImage)
Vue.component('x-input', xInput)
Vue.component('x-message', xMessage)
Vue.component('x-number', xNumber)
Vue.component('x-password', xPassword)
Vue.component('x-pay', xPay)
Vue.component('x-phone-verifiy', xPhoneVerifiy)
Vue.component('x-picker', xPicker)
Vue.component('x-radio', xRadio)
Vue.component('x-select', xSelect)
Vue.component('x-time-picker', xTimePicker)
Vue.component('x-widget', xWidget)

Vue.config.productionTip = false

// #ifdef H5
Vue.prototype.$client = 'WapH5'
    // #endif

// #ifndef H5
Vue.prototype.$client = 'WeChatLite'
    // #endif

Vue.prototype.$api = api
Vue.prototype.$user = user
Vue.prototype.$base = base
Vue.prototype.$crud = crud
Vue.prototype.$store = store
Vue.prototype.$bus = new Vue()
weixin.login().then()
const app = new Vue({
    store,
    ...App
})
app.$mount()
