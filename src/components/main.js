import Vue from 'vue'

import zkUserView from '@/components/user/zk-user-view'
import zkUserIndex from '@/components/user/zk-user-index'
import zkUserGrade from '@/components/user/zk-user-grade'
import zkUserGive from '@/components/user/zk-user-give'
import zkUserBase from '@/components/user/zk-user-base'
import zkUserAddress from '@/components/user/zk-user-address'
import zkReg1 from '@/components/user/zk-reg1'
import zkQrcode from '@/components/user/zk-qrcode'
import zkMyCenter from '@/components/user/zk-my-center'
import zkMerchants from '@/components/user/zk-merchants'
import zkLogin1 from '@/components/user/zk-login1'
import zkLogin from '@/components/user/zk-login'
import zkLoginMobile from '@/components/user/zk-login-mobile'
import zkIndexImg from '@/components/user/zk-index-img'
import zkGradeCard from '@/components/user/zk-grade-card'
import zkForgetPassword from '@/components/user/zk-forget-password'
import zkBindMobile from '@/components/user/zk-bind-mobile'
import zkAddressEdit from '@/components/user/zk-address-edit'
import zkVideo from '@/components/themes/zk-video'
import zkVideoList from '@/components/themes/zk-video-list'
import zkVideoImage from '@/components/themes/zk-video-image'
import zkTypeClass from '@/components/themes/zk-type-class'
import zkTitle from '@/components/themes/zk-title'
import zkTimingGrid from '@/components/themes/zk-timing-grid'
import zkTimingBooking from '@/components/themes/zk-timing-booking'
import zkText from '@/components/themes/zk-text'
import zkTag from '@/components/themes/zk-tag'
import zkTable from '@/components/themes/zk-table'
import zkTableNews from '@/components/themes/zk-table-news'
import zkTabbar from '@/components/themes/zk-tabbar'
import zkTab from '@/components/themes/zk-tab'
import zkSwiper from '@/components/themes/zk-swiper'
import zkSwiperAction from '@/components/themes/zk-swiper-action'
import zkShowSwiper from '@/components/themes/zk-show-swiper'
import zkShopBurstList from '@/components/themes/zk-shop-burst-list'
import zkSearch from '@/components/themes/zk-search'
import zkScrollList from '@/components/themes/zk-scroll-list'
import zkRightbar from '@/components/themes/zk-rightbar'
import zkResult from '@/components/themes/zk-result'
import zkPurchaseShopsList from '@/components/themes/zk-purchase-shops-list'
import zkProductLoad from '@/components/themes/zk-product-load'
import zkPreview from '@/components/themes/zk-preview'
import zkPopup from '@/components/themes/x-popup'
import zkNotice from '@/components/themes/zk-notice'
import zkNodata from '@/components/themes/zk-nodata'
import zkNewsHeadline from '@/components/themes/zk-news-headline'
import zkNewShopsList from '@/components/themes/zk-new-shops-list'
import zkNavSwiper from '@/components/themes/zk-nav-swiper'
import zkMyFavorite from '@/components/themes/zk-my-favorite'
import zkMerchantList from '@/components/themes/zk-merchant-list'
import zkMask from '@/components/themes/zk-mask'
import zkLogout from '@/components/themes/zk-logout'
import zkLogisticsDetails from '@/components/themes/zk-logistics-details'
import zkList from '@/components/themes/zk-list'
import zkListSelect from '@/components/themes/zk-list-select'
import zkLimitedTimeBuy from '@/components/themes/zk-limited-time-buy'
import zkKeyword from '@/components/themes/zk-keyword'
import zkInfoNav from '@/components/themes/zk-info-nav'
import zkImgSwiper from '@/components/themes/zk-img-swiper'
import zkImage from '@/components/themes/zk-image'
import zkImageScroll from '@/components/themes/zk-image-scroll'
import zkImageList from '@/components/themes/zk-image-list'
import zkIconList from '@/components/themes/zk-icon-list'
import zkHtml from '@/components/themes/zk-html'
import zkHotClassify from '@/components/themes/zk-hot-classify'
import zkHead from '@/components/themes/zk-head'
import zkHeadLogo from '@/components/themes/zk-head-logo'
import zkGrid from '@/components/themes/zk-grid'
import zkGridSwiper from '@/components/themes/zk-grid-swiper'
import zkGridList from '@/components/themes/zk-grid-list'
import zkFoot from '@/components/themes/zk-foot'
import zkFloatSwiper from '@/components/themes/zk-float-swiper'
import zkEject from '@/components/themes/zk-eject'
import zkDialog from '@/components/themes/zk-dialog'
import zkDetailList from '@/components/themes/zk-detail-list'
import zkCourceCenter from '@/components/themes/zk-cource-center'
import zkCountdown from '@/components/themes/zk-countdown'
import zkComing from '@/components/themes/zk-coming'
import zkClassList from '@/components/themes/zk-class-list'
import zkClassItemList from '@/components/themes/zk-class-item-list'
import zkClassDetail from '@/components/themes/zk-class-detail'
import zkCharges from '@/components/themes/zk-charges'
import zkCell from '@/components/themes/zk-cell'
import zkCard from '@/components/themes/zk-card'
import zkCalendar from '@/components/themes/zk-calendar'
import zkBuyAddress from '@/components/themes/zk-buy-address'
import zkBurstList from '@/components/themes/zk-burst-list'
import zkBrandShow from '@/components/themes/zk-brand-show'
import zkAvatar from '@/components/themes/zk-avatar'
import zkAutoForm from '@/components/themes/zk-auto-form'
import verification from '@/components/themes/zk-auto-form/form-item/verification'
import upload from '@/components/themes/zk-auto-form/form-item/upload'
import picker from '@/components/themes/zk-auto-form/form-item/picker'
import check from '@/components/themes/zk-auto-form/form-item/check'
import zkAudio from '@/components/themes/zk-audio'
import zkAddress from '@/components/themes/zk-address'
import zkSchool from '@/components/schools/zk-school'
import zkCourceOrder from '@/components/schools/zk-cource-order'
import zkCourceOrderShow from '@/components/schools/zk-cource-order-show'
import zkCourceOrderList from '@/components/schools/zk-cource-order-list'
import zkCourceLive from '@/components/schools/zk-cource-live'
import zkCourceIntro from '@/components/schools/zk-cource-intro'
import zkCourceHome from '@/components/schools/zk-cource-home'
import zkCourceBook from '@/components/schools/zk-cource-book'
import zkUserCenter from '@/components/qiniuniu/zk-user-center'
import zkQnnOpen from '@/components/qiniuniu/zk-qnn-open'
import zkQnnLogin from '@/components/qiniuniu/zk-qnn-login'
import zkQiniuniuBtn from '@/components/qiniuniu/zk-qiniuniu-btn'
import zkMerchantInfo from '@/components/qiniuniu/zk-merchant-info'
import zkProductShowpage from '@/components/product/zk-product-showpage'
import zkProductListpage from '@/components/product/zk-product-listpage'
import zkProductItem from '@/components/product/zk-product-item'
import zkProductFavorite from '@/components/product/zk-product-favorite'
import zkProductData from '@/components/product/zk-product-data'
import zkProductClass from '@/components/product/zk-product-class'
import zkCommentsList from '@/components/product/zk-comments-list'
import zkWaterfullList from '@/components/plug/zk-waterfull-list'
import zkTimeline from '@/components/plug/zk-timeline'
import zkScrolling from '@/components/plug/zk-scrolling'
import zkPopupBanner from '@/components/plug/x-popup-banner'
import zkOrderShow from '@/components/order/zk-order-show'
import zkOrderRefund from '@/components/order/zk-order-refund'
import zkOrderRate from '@/components/order/zk-order-rate'
import zkOrderList from '@/components/order/zk-order-list'
import zkCart from '@/components/order/zk-cart'
import zkBuy from '@/components/order/zk-buy'
import merchantProductClass from '@/components/merchant/merchant-product-class'
import merchantOrderList from '@/components/merchant/merchant-order-list'
import merchantOrderInfo from '@/components/merchant/merchant-order-info'
import merchantList from '@/components/merchant/merchant-list'
import merchantInfoShow from '@/components/merchant/merchant-info-show'
import zkUserrights from '@/components/markets/zk-userrights'
import zkTeam from '@/components/markets/zk-team'
import zkMaterial from '@/components/markets/zk-material'
import zkCases from '@/components/markets/zk-cases'
import zkEarnings from '@/components/finance/zk-earnings'
import zkAmount from '@/components/finance/zk-amount'
import zkDataMerchantList from '@/components/data/zk-data-merchant-list'
import zkDataMerchantGrid from '@/components/data/zk-data-merchant-grid'
import zkDataColumnList from '@/components/data/zk-data-column-list'
import zkDataBrandList from '@/components/data/zk-data-brand-list'
import zkLoading from '@/components/core/zk-loading'
import zkError from '@/components/core/zk-error'
import zkTopNav from '@/components/common/zk-top-nav'
import zkPaypassword from '@/components/common/zk-paypassword'
import zkPay from '@/components/common/zk-pay'
import zkNoticeBar from '@/components/common/zk-notice-bar'
import zkLogo from '@/components/common/zk-logo'
import zkDrawer from '@/components/common/zk-drawer'
import zkCollapse from '@/components/common/zk-collapse'
import zkClear from '@/components/common/zk-clear'
import zkCardMerchantCount from '@/components/card/zk-card-merchant-count'
import zkCardMarkingCenter from '@/components/card/zk-card-marking-center'
import zkCardEarnings from '@/components/card/zk-card-earnings'
import zkCardCenterList from '@/components/card/zk-card-center-list'
import zkCardBank from '@/components/card/zk-card-bank'
import zkMarquee from '@/components/articles/zk-marquee'
import zkHelp from '@/components/articles/zk-help'
import zkFeedback from '@/components/articles/zk-feedback'
import zkArticle from '@/components/articles/zk-article'
import zkAbout from '@/components/articles/zk-about'
import zkGroupbuy from '@/components/activitys/zk-groupbuy'
import zkAccountSecurity from '@/components/account/zk-account-security'

Vue.component('zk-account-security', zkAccountSecurity)
Vue.component('zk-groupbuy', zkGroupbuy)
Vue.component('zk-about', zkAbout)
Vue.component('zk-article', zkArticle)
Vue.component('zk-feedback', zkFeedback)
Vue.component('zk-help', zkHelp)
Vue.component('zk-marquee', zkMarquee)
Vue.component('zk-card-bank', zkCardBank)
Vue.component('zk-card-center-list', zkCardCenterList)
Vue.component('zk-card-earnings', zkCardEarnings)
Vue.component('zk-card-marking-center', zkCardMarkingCenter)
Vue.component('zk-card-merchant-count', zkCardMerchantCount)
Vue.component('zk-clear', zkClear)
Vue.component('zk-collapse', zkCollapse)
Vue.component('zk-drawer', zkDrawer)
Vue.component('zk-logo', zkLogo)
Vue.component('zk-notice-bar', zkNoticeBar)
Vue.component('zk-pay', zkPay)
Vue.component('zk-paypassword', zkPaypassword)
Vue.component('zk-top-nav', zkTopNav)
Vue.component('zk-error', zkError)
Vue.component('zk-loading', zkLoading)
Vue.component('zk-data-brand-list', zkDataBrandList)
Vue.component('zk-data-column-list', zkDataColumnList)
Vue.component('zk-data-merchant-grid', zkDataMerchantGrid)
Vue.component('zk-data-merchant-list', zkDataMerchantList)
Vue.component('zk-amount', zkAmount)
Vue.component('zk-earnings', zkEarnings)
Vue.component('zk-cases', zkCases)
Vue.component('zk-material', zkMaterial)
Vue.component('zk-team', zkTeam)
Vue.component('zk-userrights', zkUserrights)
Vue.component('merchant-info-show', merchantInfoShow)
Vue.component('merchant-list', merchantList)
Vue.component('merchant-order-info', merchantOrderInfo)
Vue.component('merchant-order-list', merchantOrderList)
Vue.component('merchant-product-class', merchantProductClass)
Vue.component('zk-buy', zkBuy)
Vue.component('zk-cart', zkCart)
Vue.component('zk-order-list', zkOrderList)
Vue.component('zk-order-rate', zkOrderRate)
Vue.component('zk-order-refund', zkOrderRefund)
Vue.component('zk-order-show', zkOrderShow)
Vue.component('x-popup-banner', zkPopupBanner)
Vue.component('zk-scrolling', zkScrolling)
Vue.component('zk-timeline', zkTimeline)
Vue.component('zk-waterfull-list', zkWaterfullList)
Vue.component('zk-comments-list', zkCommentsList)
Vue.component('zk-product-class', zkProductClass)
Vue.component('zk-product-data', zkProductData)
Vue.component('zk-product-favorite', zkProductFavorite)
Vue.component('zk-product-item', zkProductItem)
Vue.component('zk-product-listpage', zkProductListpage)
Vue.component('zk-product-showpage', zkProductShowpage)
Vue.component('zk-merchant-info', zkMerchantInfo)
Vue.component('zk-qiniuniu-btn', zkQiniuniuBtn)
Vue.component('zk-qnn-login', zkQnnLogin)
Vue.component('zk-qnn-open', zkQnnOpen)
Vue.component('zk-user-center', zkUserCenter)
Vue.component('zk-cource-book', zkCourceBook)
Vue.component('zk-cource-home', zkCourceHome)
Vue.component('zk-cource-intro', zkCourceIntro)
Vue.component('zk-cource-live', zkCourceLive)
Vue.component('zk-cource-order-list', zkCourceOrderList)
Vue.component('zk-cource-order-show', zkCourceOrderShow)
Vue.component('zk-cource-order', zkCourceOrder)
Vue.component('zk-school', zkSchool)
Vue.component('zk-address', zkAddress)
Vue.component('zk-audio', zkAudio)
Vue.component('check', check)
Vue.component('picker', picker)
Vue.component('upload', upload)
Vue.component('verification', verification)
Vue.component('zk-auto-form', zkAutoForm)
Vue.component('zk-avatar', zkAvatar)
Vue.component('zk-brand-show', zkBrandShow)
Vue.component('zk-burst-list', zkBurstList)
Vue.component('zk-buy-address', zkBuyAddress)
Vue.component('zk-calendar', zkCalendar)
Vue.component('zk-card', zkCard)
Vue.component('zk-cell', zkCell)
Vue.component('zk-charges', zkCharges)
Vue.component('zk-class-detail', zkClassDetail)
Vue.component('zk-class-item-list', zkClassItemList)
Vue.component('zk-class-list', zkClassList)
Vue.component('zk-coming', zkComing)
Vue.component('zk-countdown', zkCountdown)
Vue.component('zk-cource-center', zkCourceCenter)
Vue.component('zk-detail-list', zkDetailList)
Vue.component('zk-dialog', zkDialog)
Vue.component('zk-eject', zkEject)
Vue.component('zk-float-swiper', zkFloatSwiper)
Vue.component('zk-foot', zkFoot)
Vue.component('zk-grid-list', zkGridList)
Vue.component('zk-grid-swiper', zkGridSwiper)
Vue.component('zk-grid', zkGrid)
Vue.component('zk-head-logo', zkHeadLogo)
Vue.component('zk-head', zkHead)
Vue.component('zk-hot-classify', zkHotClassify)
Vue.component('zk-html', zkHtml)
Vue.component('zk-icon-list', zkIconList)
Vue.component('zk-image-list', zkImageList)
Vue.component('zk-image-scroll', zkImageScroll)
Vue.component('zk-image', zkImage)
Vue.component('zk-img-swiper', zkImgSwiper)
Vue.component('zk-info-nav', zkInfoNav)
Vue.component('zk-keyword', zkKeyword)
Vue.component('zk-limited-time-buy', zkLimitedTimeBuy)
Vue.component('zk-list-select', zkListSelect)
Vue.component('zk-list', zkList)
Vue.component('zk-logistics-details', zkLogisticsDetails)
Vue.component('zk-logout', zkLogout)
Vue.component('zk-mask', zkMask)
Vue.component('zk-merchant-list', zkMerchantList)
Vue.component('zk-my-favorite', zkMyFavorite)
Vue.component('zk-nav-swiper', zkNavSwiper)
Vue.component('zk-new-shops-list', zkNewShopsList)
Vue.component('zk-news-headline', zkNewsHeadline)
Vue.component('zk-nodata', zkNodata)
Vue.component('zk-notice', zkNotice)
Vue.component('x-popup', zkPopup)
Vue.component('zk-preview', zkPreview)
Vue.component('zk-product-load', zkProductLoad)
Vue.component('zk-purchase-shops-list', zkPurchaseShopsList)
Vue.component('zk-result', zkResult)
Vue.component('zk-rightbar', zkRightbar)
Vue.component('zk-scroll-list', zkScrollList)
Vue.component('zk-search', zkSearch)
Vue.component('zk-shop-burst-list', zkShopBurstList)
Vue.component('zk-show-swiper', zkShowSwiper)
Vue.component('zk-swiper-action', zkSwiperAction)
Vue.component('zk-swiper', zkSwiper)
Vue.component('zk-tab', zkTab)
Vue.component('zk-tabbar', zkTabbar)
Vue.component('zk-table-news', zkTableNews)
Vue.component('zk-table', zkTable)
Vue.component('zk-tag', zkTag)
Vue.component('zk-text', zkText)
Vue.component('zk-timing-booking', zkTimingBooking)
Vue.component('zk-timing-grid', zkTimingGrid)
Vue.component('zk-title', zkTitle)
Vue.component('zk-type-class', zkTypeClass)
Vue.component('zk-video-image', zkVideoImage)
Vue.component('zk-video-list', zkVideoList)
Vue.component('zk-video', zkVideo)
Vue.component('zk-address-edit', zkAddressEdit)
Vue.component('zk-bind-mobile', zkBindMobile)
Vue.component('zk-forget-password', zkForgetPassword)
Vue.component('zk-grade-card', zkGradeCard)
Vue.component('zk-index-img', zkIndexImg)
Vue.component('zk-login-mobile', zkLoginMobile)
Vue.component('zk-login', zkLogin)
Vue.component('zk-login1', zkLogin1)
Vue.component('zk-merchants', zkMerchants)
Vue.component('zk-my-center', zkMyCenter)
Vue.component('zk-qrcode', zkQrcode)
Vue.component('zk-reg1', zkReg1)
Vue.component('zk-user-address', zkUserAddress)
Vue.component('zk-user-base', zkUserBase)
Vue.component('zk-user-give', zkUserGive)
Vue.component('zk-user-grade', zkUserGrade)
Vue.component('zk-user-index', zkUserIndex)
Vue.component('zk-user-view', zkUserView)
