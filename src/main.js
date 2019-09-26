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

// import zkAccountSecurity from '@/components/account/zk-account-security'
// import zkGroupbuy from '@/components/activitys/zk-groupbuy'
import zkAbout from '@/components/articles/zk-about'
import zkArticle from '@/components/articles/zk-article'
// import zkFeedback from '@/components/articles/zk-feedback'
// import zkHelp from '@/components/articles/zk-help'
// import zkMarquee from '@/components/articles/zk-marquee'
import zkBookIndex from '@/components/book/zk-book-index'
// import zkBookMy from '@/components/book/zk-book-my'
import zkCardBank from '@/components/card/zk-card-bank'
import zkCardCenterList from '@/components/card/zk-card-center-list'
import zkCardEarnings from '@/components/card/zk-card-earnings'
import zkCardMarkingCenter from '@/components/card/zk-card-marking-center'
import zkCardMerchantCount from '@/components/card/zk-card-merchant-count'
// import zkClear from '@/components/common/zk-clear'
// import zkCollapse from '@/components/common/zk-collapse'
import zkDrawer from '@/components/common/zk-drawer'
// import zkLogo from '@/components/common/zk-logo'
// import zkNoticeBar from '@/components/common/zk-notice-bar'
import zkPay from '@/components/common/zk-pay'
import zkPaypassword from '@/components/common/zk-paypassword'
// import zkTopNav from '@/components/common/zk-top-nav'
// import zkError from '@/components/core/zk-error'
import zkLoading from '@/components/core/zk-loading'
import zkDataBrandList from '@/components/data/zk-data-brand-list'
import zkDataColumnList from '@/components/data/zk-data-column-list'
import zkDataMerchantGrid from '@/components/data/zk-data-merchant-grid'
import zkDataMerchantList from '@/components/data/zk-data-merchant-list'
import zkAmount from '@/components/finance/zk-amount'
import zkEarnings from '@/components/finance/zk-earnings'
import zkHudongLotteryCode from '@/components/hudong/zk-hudong-lottery-code'
import zkHudongLuckyWheel from '@/components/hudong/zk-hudong-lucky-wheel'
import zkHudongRedRain from '@/components/hudong/zk-hudong-red-rain'
// import zkHudongShake from '@/components/hudong/zk-hudong-shake'
import zkHudongSquared from '@/components/hudong/zk-hudong-squared'
import zkBookingsignup from '@/components/markets/zk-bookingsignup'
// import zkCases from '@/components/markets/zk-cases'
// import zkMaterial from '@/components/markets/zk-material'
import zkTeam from '@/components/markets/zk-team'
import zkUserrights from '@/components/markets/zk-userrights'
import merchantInfoShow from '@/components/merchant/merchant-info-show'
import merchantList from '@/components/merchant/merchant-list'
import merchantOrderInfo from '@/components/merchant/merchant-order-info'
import merchantOrderList from '@/components/merchant/merchant-order-list'
import merchantProductClass from '@/components/merchant/merchant-product-class'
import zkBuy from '@/components/order/zk-buy'
import zkCart from '@/components/order/zk-cart'
import zkOrderList from '@/components/order/zk-order-list'
import zkOrderRate from '@/components/order/zk-order-rate'
import zkOrderRefund from '@/components/order/zk-order-refund'
import zkOrderShow from '@/components/order/zk-order-show'
import zkPopupBanner from '@/components/plug/zk-popup-banner'
// import zkScrolling from '@/components/plug/zk-scrolling'
// import zkTimeline from '@/components/plug/zk-timeline'
// import zkWaterfullList from '@/components/plug/zk-waterfull-list'
// import zkCommentsList from '@/components/product/zk-comments-list'
import zkPartingLine from '@/components/product/zk-parting-line'
import zkProductClass from '@/components/product/zk-product-class'
import zkProductData from '@/components/product/zk-product-data'
import zkProductFavorite from '@/components/product/zk-product-favorite'
import zkProductItem from '@/components/product/zk-product-item'
import zkProductListpage from '@/components/product/zk-product-listpage'
import zkProductSecondBuy from '@/components/product/zk-product-second-buy'
import zkProductShowpage from '@/components/product/zk-product-showpage'
import zkProductUser from '@/components/product/zk-product-user'
import zkMerchantInfo from '@/components/qiniuniu/zk-merchant-info'
import zkQiniuniuBtn from '@/components/qiniuniu/zk-qiniuniu-btn'
import zkQnnLogin from '@/components/qiniuniu/zk-qnn-login'
import zkQnnOpen from '@/components/qiniuniu/zk-qnn-open'
import zkUserCenter from '@/components/qiniuniu/zk-user-center'
import zkSceondBuy from '@/components/sceond/zk-sceond-buy'
// import zkCourceBook from '@/components/schools/zk-cource-book'
// import zkCourceHome from '@/components/schools/zk-cource-home'
// import zkCourceIntro from '@/components/schools/zk-cource-intro'
// import zkCourceLive from '@/components/schools/zk-cource-live'
// import zkCourceOrderList from '@/components/schools/zk-cource-order-list'
import zkCourceOrderShow from '@/components/schools/zk-cource-order-show'
import zkCourceOrder from '@/components/schools/zk-cource-order'
import zkSchool from '@/components/schools/zk-school'
import zkAboutUs from '@/components/themes/zk-about-us'
import zkAddAdresss from '@/components/themes/zk-add-adresss'
// import zkAddress from '@/components/themes/zk-address'
// import zkAudio from '@/components/themes/zk-audio'
import zkAutoForm from '@/components/themes/zk-auto-form'
// import zkAvatar from '@/components/themes/zk-avatar'
import zkBagsShopList from '@/components/themes/zk-bags-shop-list'
import zkBeautyGifImg from '@/components/themes/zk-beauty-gif-img'
import zkBeautyGrid from '@/components/themes/zk-beauty-grid'
import zkBootUp from '@/components/themes/zk-boot-up'
import zkBrandShow from '@/components/themes/zk-brand-show'
import zkBurstList from '@/components/themes/zk-burst-list'
import zkBusinessCard from '@/components/themes/zk-business-card'
import zkBuyAddress from '@/components/themes/zk-buy-address'
import zkCardSwiper from '@/components/themes/zk-card-swiper'
import zkCard from '@/components/themes/zk-card'
import zkCell from '@/components/themes/zk-cell'
import zkCenterService from '@/components/themes/zk-center-service'
import zkCharges from '@/components/themes/zk-charges'
// import zkClassDetail from '@/components/themes/zk-class-detail'
import zkClassItemList from '@/components/themes/zk-class-item-list'
import zkClassList from '@/components/themes/zk-class-list'
import zkComing from '@/components/themes/zk-coming'
import zkCountdown from '@/components/themes/zk-countdown'
import zkCourceCenter from '@/components/themes/zk-cource-center'
import zkDailyShopList from '@/components/themes/zk-daily-shop-list'
import zkDailyUse from '@/components/themes/zk-daily-use'
import zkDetailList from '@/components/themes/zk-detail-list'
// import zkDialog from '@/components/themes/zk-dialog'
import zkDiscountShopList from '@/components/themes/zk-discount-shop-list'
import zkEggMachine from '@/components/themes/zk-egg-machine'
// import zkEject from '@/components/themes/zk-eject'
import zkEnlargeSwiper from '@/components/themes/zk-enlarge-swiper'
import zkExchange from '@/components/themes/zk-exchange'
import zkFloatSwiper from '@/components/themes/zk-float-swiper'
// import zkFoot from '@/components/themes/zk-foot'
import zkGridList from '@/components/themes/zk-grid-list'
import zkGridSlide from '@/components/themes/zk-grid-slide'
import zkGridSwiper from '@/components/themes/zk-grid-swiper'
import zkGrid from '@/components/themes/zk-grid'
import zkHeadLogo from '@/components/themes/zk-head-logo'
import zkHead from '@/components/themes/zk-head'
import zkHotClassify from '@/components/themes/zk-hot-classify'
import zkHotShopGrid from '@/components/themes/zk-hot-shop-grid'
// import zkHtml from '@/components/themes/zk-html'
import zkIconList from '@/components/themes/zk-icon-list'
import zkImageList from '@/components/themes/zk-image-list'
import zkImageScroll from '@/components/themes/zk-image-scroll'
import zkImage from '@/components/themes/zk-image'
import zkImgSwiper from '@/components/themes/zk-img-swiper'
import zkIndexDayUpdate from '@/components/themes/zk-index-day-update'
import zkIndexHotShop from '@/components/themes/zk-index-hot-shop'
import zkIndexNewTop from '@/components/themes/zk-index-new-top'
import zkIndexSwiper from '@/components/themes/zk-index-swiper'
import zkIndexTypeList from '@/components/themes/zk-index-type-list'
import zkInfoNav from '@/components/themes/zk-info-nav'
import zkKeyword from '@/components/themes/zk-keyword'
import zkLimitedTimeBuy from '@/components/themes/zk-limited-time-buy'
import zkListSelect from '@/components/themes/zk-list-select'
import zkList from '@/components/themes/zk-list'
import zkLogisticsDetails from '@/components/themes/zk-logistics-details'
import zkLogisticsList from '@/components/themes/zk-logistics-list'
import zkLogout from '@/components/themes/zk-logout'
import zkLuckyWheel from '@/components/themes/zk-lucky-wheel'
import zkManualCell from '@/components/themes/zk-manual-cell'
import zkMask from '@/components/themes/zk-mask'
import zkMerchantImage from '@/components/themes/zk-merchant-image'
import zkMerchantIntro from '@/components/themes/zk-merchant-intro'
import zkMerchantList from '@/components/themes/zk-merchant-list'
import zkMerchantPay from '@/components/themes/zk-merchant-pay'
import zkMustFightToday from '@/components/themes/zk-must-fight-today'
import zkMyFavorite from '@/components/themes/zk-my-favorite'
import zkNavSwiper from '@/components/themes/zk-nav-swiper'
import zkNewHeadIndex from '@/components/themes/zk-new-head-index'
import zkNewLogin from '@/components/themes/zk-new-login'
import zkNewScrollList from '@/components/themes/zk-new-scroll-list'
import zkNewShopList from '@/components/themes/zk-new-shop-list'
import zkNewShopsList from '@/components/themes/zk-new-shops-list'
import zkNewsDetails from '@/components/themes/zk-news-details'
import zkNewsHeadline from '@/components/themes/zk-news-headline'
import zkNodata from '@/components/themes/zk-nodata'
// import zkNotice from '@/components/themes/zk-notice'
import zkPayFinished from '@/components/themes/zk-pay-finished'
import zkPopup from '@/components/themes/zk-popup'
import zkPreferential from '@/components/themes/zk-preferential'
import zkPreview from '@/components/themes/zk-preview'
import zkProductLoad from '@/components/themes/zk-product-load'
import zkPurchaseShopsList from '@/components/themes/zk-purchase-shops-list'
import zkRegistrationSuccess from '@/components/themes/zk-registration-success'
// import zkResult from '@/components/themes/zk-result'
import zkRightbar from '@/components/themes/zk-rightbar'
import zkSchoolGrid from '@/components/themes/zk-school-grid'
import zkSchoolHeadlines from '@/components/themes/zk-school-headlines'
import zkSchoolSwiper from '@/components/themes/zk-school-swiper'
import zkSchoolTeamCard from '@/components/themes/zk-school-team-card'
import zkSchoolTimeline from '@/components/themes/zk-school-timeline'
import zkSchoolVideoList from '@/components/themes/zk-school-video-list'
import zkSchoolClassVideo from '@/components/themes/zk-school-class-video'
import zkSchoolClassGrid from '@/components/themes/zk-school-class-grid'
import zkSchoolCaseCard from '@/components/themes/zk-school-case-card'
import zkSchoolCaseDouble from '@/components/themes/zk-school-case-double'
import zkSchoolCaseSimple from '@/components/themes/zk-school-case-simple'
import zkSchoolCaseFour from '@/components/themes/zk-school-case-four'
// import zkSchoolHead from '@/components/themes/zk-school-head'
import zkSchoolClassTrain from '@/components/themes/zk-school-class-train'
import zkStoreIndexSwiper from '@/components/themes/zk-store-index-swiper'
import zkStoreIndexGrid from '@/components/themes/zk-store-index-grid'
import zkStoreScrollCard from '@/components/themes/zk-store-scroll-card'
import zkStoreShopShow from '@/components/themes/zk-store-shop-show'
import zkStoreBrandShow from '@/components/themes/zk-store-brand-show'
import zkStoreUserCenter from '@/components/themes/zk-store-user-center'
import zkStoreUserCard from '@/components/themes/zk-store-user-card'
import zkShepherdKings from '@/components/themes/zk-shepherd-kings'

import zkScrollList from '@/components/themes/zk-scroll-list'
import zkSearch from '@/components/themes/zk-search'
import zkSelectedShopList from '@/components/themes/zk-selected-shop-list'
import zkSelfMention from '@/components/themes/zk-self-mention'
import zkShopBank from '@/components/themes/zk-shop-bank'
import zkShopBurstList from '@/components/themes/zk-shop-burst-list'
import zkShopListShow from '@/components/themes/zk-shop-list-show'
import zkShopMallSwiper from '@/components/themes/zk-shop-mall-swiper'
import zkShopSwiper from '@/components/themes/zk-shop-swiper'
// import zkShowSwiper from '@/components/themes/zk-show-swiper'
import zkSignDesk from '@/components/themes/zk-sign-desk'
import zkSingleGrid from '@/components/themes/zk-single-grid'
import zkStoreDynamic from '@/components/themes/zk-store-dynamic'
import zkStoredAccount from '@/components/themes/zk-stored-account'
import zkSuccessfulOpening from '@/components/themes/zk-successful-opening'
import zkSwiperAction from '@/components/themes/zk-swiper-action'
// import zkSwiperList from '@/components/themes/zk-swiper-list'
import zkSwiper from '@/components/themes/zk-swiper'
// import zkTab from '@/components/themes/zk-tab'
// import zkTabbar from '@/components/themes/zk-tabbar'
import zkTableListShow from '@/components/themes/zk-table-list-show'
import zkTableNews from '@/components/themes/zk-table-news'
import zkTable from '@/components/themes/zk-table'
import zkTag from '@/components/themes/zk-tag'
// import zkText from '@/components/themes/zk-text'
import zkTimingBooking from '@/components/themes/zk-timing-booking'
import zkTimingGrid from '@/components/themes/zk-timing-grid'
import zkTitle from '@/components/themes/zk-title'
import zkTypeClass from '@/components/themes/zk-type-class'
// import zkVideoImage from '@/components/themes/zk-video-image'
import zkVideoList from '@/components/themes/zk-video-list'
import zkVideo from '@/components/themes/zk-video'
import zkAddressEdit from '@/components/user/zk-address-edit'
// import zkBindMobile from '@/components/user/zk-bind-mobile'
import zkForgetPassword from '@/components/user/zk-forget-password'
// import zkGradeCard from '@/components/user/zk-grade-card'
import zkIndexImg from '@/components/user/zk-index-img'
import zkLoginMobile from '@/components/user/zk-login-mobile'
import zkLogin from '@/components/user/zk-login'
// import zkLogin1 from '@/components/user/zk-login1'
// import zkMerchants from '@/components/user/zk-merchants'
import zkMyCenter from '@/components/user/zk-my-center'
import zkQrcode from '@/components/user/zk-qrcode'
// import zkReg1 from '@/components/user/zk-reg1'
import zkUserAddress from '@/components/user/zk-user-address'
import zkUserBase from '@/components/user/zk-user-base'
import zkUserGive from '@/components/user/zk-user-give'
import zkUserGrade from '@/components/user/zk-user-grade'
import zkUserIndex from '@/components/user/zk-user-index'
import zkUserView from '@/components/user/zk-user-view'
// import xA from '@/elements/all/x-a'
// import xButton from '@/elements/all/x-button'
import xCell from '@/elements/all/x-cell'
import xCityPicker from '@/elements/all/x-city-picker'
import xCountDown from '@/elements/all/x-countDown'
import xDrawer from '@/elements/all/x-drawer'
import xIcon from '@/elements/all/x-icon'
// import xImage from '@/elements/all/x-image'
import xInput from '@/elements/all/x-input'
import xMsg from '@/elements/all/x-msg'
import xNumber from '@/elements/all/x-number'
import xPay from '@/elements/all/x-pay'
import xPicker from '@/elements/all/x-picker'
import xPopup from '@/elements/all/x-popup'
import xRadio from '@/elements/all/x-radio'
// import xScroll from '@/elements/all/x-scroll'
import xTimePicker from '@/elements/all/x-time-picker'
import xWidget from '@/elements/all/x-widget'
import auto from '@/elements/auto'
// import xAuthorization from '@/elements/mp/x-authorization'
// Vue.component('zk-account-security', zkAccountSecurity)
// Vue.component('zk-groupbuy', zkGroupbuy)
Vue.component('zk-about', zkAbout)
Vue.component('zk-article', zkArticle)
// Vue.component('zk-feedback', zkFeedback)
// Vue.component('zk-help', zkHelp)
// Vue.component('zk-marquee', zkMarquee)
Vue.component('zk-book-index', zkBookIndex)
// Vue.component('zk-book-my', zkBookMy)
Vue.component('zk-card-bank', zkCardBank)
Vue.component('zk-card-center-list', zkCardCenterList)
Vue.component('zk-card-earnings', zkCardEarnings)
Vue.component('zk-card-marking-center', zkCardMarkingCenter)
Vue.component('zk-card-merchant-count', zkCardMerchantCount)
// Vue.component('zk-clear', zkClear)
// Vue.component('zk-collapse', zkCollapse)
Vue.component('zk-drawer', zkDrawer)
// Vue.component('zk-logo', zkLogo)
// Vue.component('zk-notice-bar', zkNoticeBar)
Vue.component('zk-pay', zkPay)
Vue.component('zk-paypassword', zkPaypassword)
// Vue.component('zk-top-nav', zkTopNav)
// Vue.component('zk-error', zkError)
Vue.component('zk-loading', zkLoading)
Vue.component('zk-data-brand-list', zkDataBrandList)
Vue.component('zk-data-column-list', zkDataColumnList)
Vue.component('zk-data-merchant-grid', zkDataMerchantGrid)
Vue.component('zk-data-merchant-list', zkDataMerchantList)
Vue.component('zk-amount', zkAmount)
Vue.component('zk-earnings', zkEarnings)
Vue.component('zk-hudong-lottery-code', zkHudongLotteryCode)
Vue.component('zk-hudong-lucky-wheel', zkHudongLuckyWheel)
Vue.component('zk-hudong-red-rain', zkHudongRedRain)
// Vue.component('zk-hudong-shake', zkHudongShake)
Vue.component('zk-hudong-squared', zkHudongSquared)
Vue.component('zk-bookingsignup', zkBookingsignup)
// Vue.component('zk-cases', zkCases)
// Vue.component('zk-material', zkMaterial)
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
Vue.component('zk-popup-banner', zkPopupBanner)
// Vue.component('zk-scrolling', zkScrolling)
// Vue.component('zk-timeline', zkTimeline)
// Vue.component('zk-waterfull-list', zkWaterfullList)
// Vue.component('zk-comments-list', zkCommentsList)
Vue.component('zk-parting-line', zkPartingLine)
Vue.component('zk-product-class', zkProductClass)
Vue.component('zk-product-data', zkProductData)
Vue.component('zk-product-favorite', zkProductFavorite)
Vue.component('zk-product-item', zkProductItem)
Vue.component('zk-product-listpage', zkProductListpage)
Vue.component('zk-product-second-buy', zkProductSecondBuy)
Vue.component('zk-product-showpage', zkProductShowpage)
Vue.component('zk-product-user', zkProductUser)
Vue.component('zk-merchant-info', zkMerchantInfo)
Vue.component('zk-qiniuniu-btn', zkQiniuniuBtn)
Vue.component('zk-qnn-login', zkQnnLogin)
Vue.component('zk-qnn-open', zkQnnOpen)
Vue.component('zk-user-center', zkUserCenter)
Vue.component('zk-sceond-buy', zkSceondBuy)
// Vue.component('zk-cource-book', zkCourceBook)
// Vue.component('zk-cource-home', zkCourceHome)
// Vue.component('zk-cource-intro', zkCourceIntro)
// Vue.component('zk-cource-live', zkCourceLive)
// Vue.component('zk-cource-order-list', zkCourceOrderList)
Vue.component('zk-cource-order-show', zkCourceOrderShow)
Vue.component('zk-cource-order', zkCourceOrder)
Vue.component('zk-school', zkSchool)
Vue.component('zk-about-us', zkAboutUs)
Vue.component('zk-add-adresss', zkAddAdresss)
// Vue.component('zk-address', zkAddress)
// Vue.component('zk-audio', zkAudio)
Vue.component('zk-auto-form', zkAutoForm)
// Vue.component('zk-avatar', zkAvatar)
Vue.component('zk-bags-shop-list', zkBagsShopList)
Vue.component('zk-beauty-gif-img', zkBeautyGifImg)
Vue.component('zk-beauty-grid', zkBeautyGrid)
Vue.component('zk-boot-up', zkBootUp)
Vue.component('zk-brand-show', zkBrandShow)
Vue.component('zk-burst-list', zkBurstList)
Vue.component('zk-business-card', zkBusinessCard)
Vue.component('zk-buy-address', zkBuyAddress)
Vue.component('zk-card-swiper', zkCardSwiper)
Vue.component('zk-card', zkCard)
Vue.component('zk-cell', zkCell)
Vue.component('zk-center-service', zkCenterService)
Vue.component('zk-charges', zkCharges)
// Vue.component('zk-class-detail', zkClassDetail)
Vue.component('zk-class-item-list', zkClassItemList)
Vue.component('zk-class-list', zkClassList)
Vue.component('zk-coming', zkComing)
Vue.component('zk-countdown', zkCountdown)
Vue.component('zk-cource-center', zkCourceCenter)
Vue.component('zk-daily-shop-list', zkDailyShopList)
Vue.component('zk-daily-use', zkDailyUse)
Vue.component('zk-detail-list', zkDetailList)
// Vue.component('zk-dialog', zkDialog)
Vue.component('zk-discount-shop-list', zkDiscountShopList)
Vue.component('zk-egg-machine', zkEggMachine)
// Vue.component('zk-eject', zkEject)
Vue.component('zk-enlarge-swiper', zkEnlargeSwiper)
Vue.component('zk-exchange', zkExchange)
Vue.component('zk-float-swiper', zkFloatSwiper)
// Vue.component('zk-foot', zkFoot)
Vue.component('zk-grid-list', zkGridList)
Vue.component('zk-grid-slide', zkGridSlide)
Vue.component('zk-grid-swiper', zkGridSwiper)
Vue.component('zk-grid', zkGrid)
Vue.component('zk-head-logo', zkHeadLogo)
Vue.component('zk-head', zkHead)
Vue.component('zk-hot-classify', zkHotClassify)
Vue.component('zk-hot-shop-grid', zkHotShopGrid)
// Vue.component('zk-html', zkHtml)
Vue.component('zk-icon-list', zkIconList)
Vue.component('zk-image-list', zkImageList)
Vue.component('zk-image-scroll', zkImageScroll)
Vue.component('zk-image', zkImage)
Vue.component('zk-img-swiper', zkImgSwiper)
Vue.component('zk-index-day-update', zkIndexDayUpdate)
Vue.component('zk-index-hot-shop', zkIndexHotShop)
Vue.component('zk-index-new-top', zkIndexNewTop)
Vue.component('zk-index-swiper', zkIndexSwiper)
Vue.component('zk-index-type-list', zkIndexTypeList)
Vue.component('zk-info-nav', zkInfoNav)
Vue.component('zk-keyword', zkKeyword)
Vue.component('zk-limited-time-buy', zkLimitedTimeBuy)
Vue.component('zk-list-select', zkListSelect)
Vue.component('zk-list', zkList)
Vue.component('zk-logistics-details', zkLogisticsDetails)
Vue.component('zk-logistics-list', zkLogisticsList)
Vue.component('zk-logout', zkLogout)
Vue.component('zk-lucky-wheel', zkLuckyWheel)
Vue.component('zk-manual-cell', zkManualCell)
Vue.component('zk-mask', zkMask)
Vue.component('zk-merchant-image', zkMerchantImage)
Vue.component('zk-merchant-intro', zkMerchantIntro)
Vue.component('zk-merchant-list', zkMerchantList)
Vue.component('zk-merchant-pay', zkMerchantPay)
Vue.component('zk-must-fight-today', zkMustFightToday)
Vue.component('zk-my-favorite', zkMyFavorite)
Vue.component('zk-nav-swiper', zkNavSwiper)
Vue.component('zk-new-head-index', zkNewHeadIndex)
Vue.component('zk-new-login', zkNewLogin)
Vue.component('zk-new-scroll-list', zkNewScrollList)
Vue.component('zk-new-shop-list', zkNewShopList)
Vue.component('zk-new-shops-list', zkNewShopsList)
Vue.component('zk-news-details', zkNewsDetails)
Vue.component('zk-news-headline', zkNewsHeadline)
Vue.component('zk-nodata', zkNodata)
// Vue.component('zk-notice', zkNotice)
Vue.component('zk-pay-finished', zkPayFinished)
Vue.component('zk-popup', zkPopup)
Vue.component('zk-preferential', zkPreferential)
Vue.component('zk-preview', zkPreview)
Vue.component('zk-product-load', zkProductLoad)
Vue.component('zk-purchase-shops-list', zkPurchaseShopsList)
Vue.component('zk-registration-success', zkRegistrationSuccess)
// Vue.component('zk-result', zkResult)
Vue.component('zk-rightbar', zkRightbar)
Vue.component('zk-school-grid', zkSchoolGrid)
Vue.component('zk-school-headlines', zkSchoolHeadlines)
Vue.component('zk-school-swiper', zkSchoolSwiper)
Vue.component('zk-school-team-card', zkSchoolTeamCard)
Vue.component('zk-school-timeline', zkSchoolTimeline)
Vue.component('zk-school-video-list', zkSchoolVideoList)
Vue.component('zk-school-class-video', zkSchoolClassVideo)
Vue.component('zk-school-class-grid', zkSchoolClassGrid)
Vue.component('zk-school-case-card', zkSchoolCaseCard)
Vue.component('zk-school-case-double', zkSchoolCaseDouble)
Vue.component('zk-school-case-simple', zkSchoolCaseSimple)
Vue.component('zk-school-case-four', zkSchoolCaseFour) 
// Vue.component('zk-school-head', zkSchoolHead)
Vue.component('zk-school-class-train', zkSchoolClassTrain)
Vue.component('zk-store-index-swiper', zkStoreIndexSwiper)
Vue.component('zk-store-index-grid', zkStoreIndexGrid)
Vue.component('zk-store-scroll-card', zkStoreScrollCard)
Vue.component('zk-store-shop-show', zkStoreShopShow)
Vue.component('zk-store-brand-show', zkStoreBrandShow)
Vue.component('zk-store-user-center', zkStoreUserCenter)
Vue.component('zk-store-user-card', zkStoreUserCard)
Vue.component('zk-shepherd-kings', zkShepherdKings)

Vue.component('zk-scroll-list', zkScrollList)
Vue.component('zk-search', zkSearch)
Vue.component('zk-selected-shop-list', zkSelectedShopList)
Vue.component('zk-self-mention', zkSelfMention)
Vue.component('zk-shop-bank', zkShopBank)
Vue.component('zk-shop-burst-list', zkShopBurstList)
Vue.component('zk-shop-list-show', zkShopListShow)
Vue.component('zk-shop-mall-swiper', zkShopMallSwiper)
Vue.component('zk-shop-swiper', zkShopSwiper)
// Vue.component('zk-show-swiper', zkShowSwiper)
Vue.component('zk-sign-desk', zkSignDesk)
Vue.component('zk-single-grid', zkSingleGrid)
Vue.component('zk-store-dynamic', zkStoreDynamic)
Vue.component('zk-stored-account', zkStoredAccount)
Vue.component('zk-successful-opening', zkSuccessfulOpening)
Vue.component('zk-swiper-action', zkSwiperAction)
// Vue.component('zk-swiper-list', zkSwiperList)
Vue.component('zk-swiper', zkSwiper)
// Vue.component('zk-tab', zkTab)
// Vue.component('zk-tabbar', zkTabbar)
Vue.component('zk-table-list-show', zkTableListShow)
Vue.component('zk-table-news', zkTableNews)
Vue.component('zk-table', zkTable)
Vue.component('zk-tag', zkTag)
// Vue.component('zk-text', zkText)
Vue.component('zk-timing-booking', zkTimingBooking)
Vue.component('zk-timing-grid', zkTimingGrid)
Vue.component('zk-title', zkTitle)
Vue.component('zk-type-class', zkTypeClass)
// Vue.component('zk-video-image', zkVideoImage)
Vue.component('zk-video-list', zkVideoList)
Vue.component('zk-video', zkVideo)
Vue.component('zk-address-edit', zkAddressEdit)
// Vue.component('zk-bind-mobile', zkBindMobile)
Vue.component('zk-forget-password', zkForgetPassword)
// Vue.component('zk-grade-card', zkGradeCard)
Vue.component('zk-index-img', zkIndexImg)
Vue.component('zk-login-mobile', zkLoginMobile)
Vue.component('zk-login', zkLogin)
// Vue.component('zk-login1', zkLogin1)
// Vue.component('zk-merchants', zkMerchants)
Vue.component('zk-my-center', zkMyCenter)
Vue.component('zk-qrcode', zkQrcode)
// Vue.component('zk-reg1', zkReg1)
Vue.component('zk-user-address', zkUserAddress)
Vue.component('zk-user-base', zkUserBase)
Vue.component('zk-user-give', zkUserGive)
Vue.component('zk-user-grade', zkUserGrade)
Vue.component('zk-user-index', zkUserIndex)
Vue.component('zk-user-view', zkUserView)
// Vue.component('x-a', xA)
// Vue.component('x-button', xButton)
Vue.component('x-cell', xCell)
Vue.component('x-city-picker', xCityPicker)
Vue.component('x-countDown', xCountDown)
Vue.component('x-drawer', xDrawer)
Vue.component('x-icon', xIcon)
// Vue.component('x-image', xImage)
Vue.component('x-input', xInput)
Vue.component('x-msg', xMsg)
Vue.component('x-number', xNumber)
Vue.component('x-pay', xPay)
Vue.component('x-picker', xPicker)
Vue.component('x-popup', xPopup)
Vue.component('x-radio', xRadio)
// Vue.component('x-scroll', xScroll)
Vue.component('x-time-picker', xTimePicker)
Vue.component('x-widget', xWidget)
Vue.component('auto', auto)
// Vue.component('x-authorization', xAuthorization)

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
