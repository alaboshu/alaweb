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

import zkAccountSecurity from '@/components/account/zk-account-security/index.vue'
import zkGroupbuy from '@/components/activitys/zk-groupbuy/index.vue'
import zkAbout from '@/components/articles/zk-about/index.vue'
import zkArticle from '@/components/articles/zk-article/index.vue'
import zkFeedback from '@/components/articles/zk-feedback/index.vue'
import zkHelp from '@/components/articles/zk-help/index.vue'
import zkMarquee from '@/components/articles/zk-marquee/index.vue'
import zkBookIndex from '@/components/book/zk-book-index/index.vue'
import zkBookMy from '@/components/book/zk-book-my/index.vue'
import zkBorderHeader from '@/components/book/zk-border-header/index.vue'
import zkCardBank from '@/components/card/zk-card-bank/index.vue'
import zkCardCenterList from '@/components/card/zk-card-center-list/index.vue'
import zkCardEarnings from '@/components/card/zk-card-earnings/index.vue'
import zkCardMarkingCenter from '@/components/card/zk-card-marking-center/index.vue'
import zkCardMerchantCount from '@/components/card/zk-card-merchant-count/index.vue'
import zkClear from '@/components/common/zk-clear/index.vue'
import zkCollapse from '@/components/common/zk-collapse/index.vue'
import zkDrawer from '@/components/common/zk-drawer/index.vue'
import zkLogo from '@/components/common/zk-logo/index.vue'
import zkNoticeBar from '@/components/common/zk-notice-bar/index.vue'
import zkPay from '@/components/common/zk-pay/index.vue'
import zkPaypassword from '@/components/common/zk-paypassword/index.vue'
import zkTopNav from '@/components/common/zk-top-nav/index.vue'
import zkError from '@/components/core/zk-error/index.vue'
import zkLoading from '@/components/core/zk-loading/index.vue'
import zkDataBrandList from '@/components/data/zk-data-brand-list/index.vue'
import zkDataColumnList from '@/components/data/zk-data-column-list/index.vue'
import zkDataMerchantGrid from '@/components/data/zk-data-merchant-grid/index.vue'
import zkDataMerchantList from '@/components/data/zk-data-merchant-list/index.vue'
import zkAmount from '@/components/finance/zk-amount/index.vue'
import zkEarnings from '@/components/finance/zk-earnings/index.vue'
import zkHudongLotteryCode from '@/components/hudong/zk-hudong-lottery-code/index.vue'
import zkHudongLuckyWheel from '@/components/hudong/zk-hudong-lucky-wheel/index.vue'
import zkHudongRedRain from '@/components/hudong/zk-hudong-red-rain/index.vue'
import zkHudongShake from '@/components/hudong/zk-hudong-shake/index.vue'
import zkHudongSquared from '@/components/hudong/zk-hudong-squared/index.vue'
import zkBookingsignup from '@/components/markets/zk-bookingsignup/index.vue'
import zkCases from '@/components/markets/zk-cases/index.vue'
import zkMaterial from '@/components/markets/zk-material/index.vue'
import zkTeam from '@/components/markets/zk-team/index.vue'
import zkUserrights from '@/components/markets/zk-userrights/index.vue'
import merchantInfoShow from '@/components/merchant/merchant-info-show/index.vue'
import merchantList from '@/components/merchant/merchant-list/index.vue'
import merchantOrderInfo from '@/components/merchant/merchant-order-info/index.vue'
import merchantOrderList from '@/components/merchant/merchant-order-list/index.vue'
import merchantProductClass from '@/components/merchant/merchant-product-class/index.vue'
import zkBuy from '@/components/order/zk-buy/index.vue'
import zkCart from '@/components/order/zk-cart/index.vue'
import zkOrderList from '@/components/order/zk-order-list/index.vue'
import zkOrderRate from '@/components/order/zk-order-rate/index.vue'
import zkOrderRefund from '@/components/order/zk-order-refund/index.vue'
import zkOrderShow from '@/components/order/zk-order-show/index.vue'
import zkPopupBanner from '@/components/plug/zk-popup-banner/index.vue'
import zkScrolling from '@/components/plug/zk-scrolling/index.vue'
import zkTimeline from '@/components/plug/zk-timeline/index.vue'
import zkWaterfullList from '@/components/plug/zk-waterfull-list/index.vue'
import zkCommentsList from '@/components/product/zk-comments-list/index.vue'
import zkPartingLine from '@/components/product/zk-parting-line/index.vue'
import zkProductClass from '@/components/product/zk-product-class/index.vue'
import zkProductData from '@/components/product/zk-product-data/index.vue'
import zkProductFavorite from '@/components/product/zk-product-favorite/index.vue'
import zkProductItem from '@/components/product/zk-product-item/index.vue'
import zkProductListpage from '@/components/product/zk-product-listpage/index.vue'
import zkProductSecondBuy from '@/components/product/zk-product-second-buy/index.vue'
import zkProductShowpage from '@/components/product/zk-product-showpage/index.vue'
import zkProductUser from '@/components/product/zk-product-user/index.vue'
import zkMerchantInfo from '@/components/qiniuniu/zk-merchant-info/index.vue'
import zkQiniuniuBtn from '@/components/qiniuniu/zk-qiniuniu-btn/index.vue'
import zkQnnLogin from '@/components/qiniuniu/zk-qnn-login/index.vue'
import zkQnnOpen from '@/components/qiniuniu/zk-qnn-open/index.vue'
import zkUserCenter from '@/components/qiniuniu/zk-user-center/index.vue'
import zkSceondBuy from '@/components/sceond/zk-sceond-buy/index.vue'
import zkCourceBook from '@/components/schools/zk-cource-book/index.vue'
import zkCourceHome from '@/components/schools/zk-cource-home/index.vue'
import zkCourceIntro from '@/components/schools/zk-cource-intro/index.vue'
import zkCourceLive from '@/components/schools/zk-cource-live/index.vue'
import zkCourceOrderList from '@/components/schools/zk-cource-order-list/index.vue'
import zkCourceOrderShow from '@/components/schools/zk-cource-order-show/index.vue'
import zkCourceOrder from '@/components/schools/zk-cource-order/index.vue'
import zkSchool from '@/components/schools/zk-school/index.vue'
import zkAboutUs from '@/components/themes/zk-about-us/index.vue'
import zkAddAdresss from '@/components/themes/zk-add-adresss/index.vue'
import zkAddress from '@/components/themes/zk-address/index.vue'
import zkAudio from '@/components/themes/zk-audio/index.vue'
import zkAutoForm from '@/components/themes/zk-auto-form/index.vue'
import zkAvatar from '@/components/themes/zk-avatar/index.vue'
import zkBagsShopList from '@/components/themes/zk-bags-shop-list/index.vue'
import zkBeautyGifImg from '@/components/themes/zk-beauty-gif-img/index.vue'
import zkBeautyGrid from '@/components/themes/zk-beauty-grid/index.vue'
import zkBootUp from '@/components/themes/zk-boot-up/index.vue'
import zkBrandShow from '@/components/themes/zk-brand-show/index.vue'
import zkBurstList from '@/components/themes/zk-burst-list/index.vue'
import zkBusinessCard from '@/components/themes/zk-business-card/index.vue'
import zkBuyAddress from '@/components/themes/zk-buy-address/index.vue'
import zkCardSwiper from '@/components/themes/zk-card-swiper/index.vue'
import zkCard from '@/components/themes/zk-card/index.vue'
import zkCell from '@/components/themes/zk-cell/index.vue'
import zkCenterService from '@/components/themes/zk-center-service/index.vue'
import zkCharges from '@/components/themes/zk-charges/index.vue'
import zkClassDetail from '@/components/themes/zk-class-detail/index.vue'
import zkClassItemList from '@/components/themes/zk-class-item-list/index.vue'
import zkClassList from '@/components/themes/zk-class-list/index.vue'
import zkComing from '@/components/themes/zk-coming/index.vue'
import zkCountdown from '@/components/themes/zk-countdown/index.vue'
import zkCourceCenter from '@/components/themes/zk-cource-center/index.vue'
import zkDailyShopList from '@/components/themes/zk-daily-shop-list/index.vue'
import zkDailyUse from '@/components/themes/zk-daily-use/index.vue'
import zkDetailList from '@/components/themes/zk-detail-list/index.vue'
import zkDialog from '@/components/themes/zk-dialog/index.vue'
import zkDiscountShopList from '@/components/themes/zk-discount-shop-list/index.vue'
import zkEggMachine from '@/components/themes/zk-egg-machine/index.vue'
import zkEject from '@/components/themes/zk-eject/index.vue'
import zkEnlargeSwiper from '@/components/themes/zk-enlarge-swiper/index.vue'
import zkFloatSwiper from '@/components/themes/zk-float-swiper/index.vue'
import zkFoot from '@/components/themes/zk-foot/index.vue'
import zkGridList from '@/components/themes/zk-grid-list/index.vue'
import zkGridSlide from '@/components/themes/zk-grid-slide/index.vue'
import zkGridSwiper from '@/components/themes/zk-grid-swiper/index.vue'
import zkGrid from '@/components/themes/zk-grid/index.vue'
import zkHeadLogo from '@/components/themes/zk-head-logo/index.vue'
import zkHead from '@/components/themes/zk-head/index.vue'
import zkHotClassify from '@/components/themes/zk-hot-classify/index.vue'
import zkHotShopGrid from '@/components/themes/zk-hot-shop-grid/index.vue'
import zkHtml from '@/components/themes/zk-html/index.vue'
import zkIconList from '@/components/themes/zk-icon-list/index.vue'
import zkImageList from '@/components/themes/zk-image-list/index.vue'
import zkImageScroll from '@/components/themes/zk-image-scroll/index.vue'
import zkImage from '@/components/themes/zk-image/index.vue'
import zkImgSwiper from '@/components/themes/zk-img-swiper/index.vue'
import zkIndexDayUpdate from '@/components/themes/zk-index-day-update/index.vue'
import zkIndexHotShop from '@/components/themes/zk-index-hot-shop/index.vue'
import zkIndexNewTop from '@/components/themes/zk-index-new-top/index.vue'
import zkIndexSwiper from '@/components/themes/zk-index-swiper/index.vue'
import zkInfoNav from '@/components/themes/zk-info-nav/index.vue'
import zkKeyword from '@/components/themes/zk-keyword/index.vue'
import zkLimitedTimeBuy from '@/components/themes/zk-limited-time-buy/index.vue'
import zkListSelect from '@/components/themes/zk-list-select/index.vue'
import zkList from '@/components/themes/zk-list/index.vue'
import zkLogisticsDetails from '@/components/themes/zk-logistics-details/index.vue'
import zkLogisticsList from '@/components/themes/zk-logistics-list/index.vue'
import zkLogout from '@/components/themes/zk-logout/index.vue'
import zkLuckyWheel from '@/components/themes/zk-lucky-wheel/index.vue'
import zkManualCell from '@/components/themes/zk-manual-cell/index.vue'
import zkMask from '@/components/themes/zk-mask/index.vue'
import zkMerchantImage from '@/components/themes/zk-merchant-image/index.vue'
import zkMerchantIntro from '@/components/themes/zk-merchant-intro/index.vue'
import zkMerchantList from '@/components/themes/zk-merchant-list/index.vue'
import zkMerchantPay from '@/components/themes/zk-merchant-pay/index.vue'
import zkMustFightToday from '@/components/themes/zk-must-fight-today/index.vue'
import zkMyFavorite from '@/components/themes/zk-my-favorite/index.vue'
import zkNavSwiper from '@/components/themes/zk-nav-swiper/index.vue'
import zkNewHeadIndex from '@/components/themes/zk-new-head-index/index.vue'
import zkNewLogin from '@/components/themes/zk-new-login/index.vue'
import zkNewScrollList from '@/components/themes/zk-new-scroll-list/index.vue'
import zkNewShopList from '@/components/themes/zk-new-shop-list/index.vue'
import zkNewShopsList from '@/components/themes/zk-new-shops-list/index.vue'
import zkNewsDetails from '@/components/themes/zk-news-details/index.vue'
import zkNewsHeadline from '@/components/themes/zk-news-headline/index.vue'
import zkNodata from '@/components/themes/zk-nodata/index.vue'
import zkNotice from '@/components/themes/zk-notice/index.vue'
import zkPayFinished from '@/components/themes/zk-pay-finished/index.vue'
import zkPopup from '@/components/themes/zk-popup/index.vue'
import zkPreferential from '@/components/themes/zk-preferential/index.vue'
import zkPreview from '@/components/themes/zk-preview/index.vue'
import zkProductLoad from '@/components/themes/zk-product-load/index.vue'
import zkPurchaseShopsList from '@/components/themes/zk-purchase-shops-list/index.vue'
import zkRegistrationSuccess from '@/components/themes/zk-registration-success/index.vue'
import zkResult from '@/components/themes/zk-result/index.vue'
import zkRightbar from '@/components/themes/zk-rightbar/index.vue'
import zkSchoolCaseCard from '@/components/themes/zk-school-case-card/index.vue'
import zkSchoolCaseDouble from '@/components/themes/zk-school-case-double/index.vue'
import zkSchoolCaseFour from '@/components/themes/zk-school-case-four/index.vue'
import zkSchoolCaseSimple from '@/components/themes/zk-school-case-simple/index.vue'
import zkSchoolClassGrid from '@/components/themes/zk-school-class-grid/index.vue'
import zkSchoolClassTrain from '@/components/themes/zk-school-class-train/index.vue'
import zkSchoolClassVideo from '@/components/themes/zk-school-class-video/index.vue'
import zkSchoolGrid from '@/components/themes/zk-school-grid/index.vue'
import zkSchoolHead from '@/components/themes/zk-school-head/index.vue'
import zkSchoolHeadlines from '@/components/themes/zk-school-headlines/index.vue'
import zkSchoolSwiper from '@/components/themes/zk-school-swiper/index.vue'
import zkSchoolTeamCard from '@/components/themes/zk-school-team-card/index.vue'
import zkSchoolTimeline from '@/components/themes/zk-school-timeline/index.vue'
import zkSchoolVideoList from '@/components/themes/zk-school-video-list/index.vue'
import zkScrollList from '@/components/themes/zk-scroll-list/index.vue'
import zkSearch from '@/components/themes/zk-search/index.vue'
import zkSelectedShopList from '@/components/themes/zk-selected-shop-list/index.vue'
import zkSelfMention from '@/components/themes/zk-self-mention/index.vue'
import zkShepherdKings from '@/components/themes/zk-shepherd-kings/index.vue'
import zkShopBank from '@/components/themes/zk-shop-bank/index.vue'
import zkShopBurstList from '@/components/themes/zk-shop-burst-list/index.vue'
import zkShopListShow from '@/components/themes/zk-shop-list-show/index.vue'
import zkShopMallSwiper from '@/components/themes/zk-shop-mall-swiper/index.vue'
import zkShopSwiper from '@/components/themes/zk-shop-swiper/index.vue'
import zkShowSwiper from '@/components/themes/zk-show-swiper/index.vue'
import zkSignDesk from '@/components/themes/zk-sign-desk/index.vue'
import zkSingleGrid from '@/components/themes/zk-single-grid/index.vue'
import zkStoreBrandShow from '@/components/themes/zk-store-brand-show/index.vue'
import zkStoreDynamic from '@/components/themes/zk-store-dynamic/index.vue'
import zkStoreIndexGrid from '@/components/themes/zk-store-index-grid/index.vue'
import zkStoreIndexSwiper from '@/components/themes/zk-store-index-swiper/index.vue'
import zkStoreScrollCard from '@/components/themes/zk-store-scroll-card/index.vue'
import zkStoreShopShow from '@/components/themes/zk-store-shop-show/index.vue'
import zkStoreUserCard from '@/components/themes/zk-store-user-card/index.vue'
import zkStoreUserCenter from '@/components/themes/zk-store-user-center/index.vue'
import zkStoredAccount from '@/components/themes/zk-stored-account/index.vue'
import zkSuccessfulOpening from '@/components/themes/zk-successful-opening/index.vue'
import zkSwiperAction from '@/components/themes/zk-swiper-action/index.vue'
import zkSwiperList from '@/components/themes/zk-swiper-list/index.vue'
import zkSwiper from '@/components/themes/zk-swiper/index.vue'
import zkTab from '@/components/themes/zk-tab/index.vue'
import zkTabbar from '@/components/themes/zk-tabbar/index.vue'
import zkTableListShow from '@/components/themes/zk-table-list-show/index.vue'
import zkTableNews from '@/components/themes/zk-table-news/index.vue'
import zkTable from '@/components/themes/zk-table/index.vue'
import zkTag from '@/components/themes/zk-tag/index.vue'
import zkText from '@/components/themes/zk-text/index.vue'
import zkTimingBooking from '@/components/themes/zk-timing-booking/index.vue'
import zkTimingGrid from '@/components/themes/zk-timing-grid/index.vue'
import zkTitle from '@/components/themes/zk-title/index.vue'
import zkTypeClass from '@/components/themes/zk-type-class/index.vue'
import zkVideoImage from '@/components/themes/zk-video-image/index.vue'
import zkVideoList from '@/components/themes/zk-video-list/index.vue'
import zkVideo from '@/components/themes/zk-video/index.vue'
import zkAddressEdit from '@/components/user/zk-address-edit/index.vue'
import zkBindMobile from '@/components/user/zk-bind-mobile/index.vue'
import zkForgetPassword from '@/components/user/zk-forget-password/index.vue'
import zkGradeCard from '@/components/user/zk-grade-card/index.vue'
import zkIndexImg from '@/components/user/zk-index-img/index.vue'
import zkLoginMobile from '@/components/user/zk-login-mobile/index.vue'
import zkLogin from '@/components/user/zk-login/index.vue'
import zkMerchants from '@/components/user/zk-merchants/index.vue'
import zkMyCenter from '@/components/user/zk-my-center/index.vue'
import zkQrcode from '@/components/user/zk-qrcode/index.vue'
import zkReg from '@/components/user/zk-reg/index.vue'
import zkUserAddress from '@/components/user/zk-user-address/index.vue'
import zkUserBase from '@/components/user/zk-user-base/index.vue'
import zkUserGive from '@/components/user/zk-user-give/index.vue'
import zkUserGrade from '@/components/user/zk-user-grade/index.vue'
import zkUserIndex from '@/components/user/zk-user-index/index.vue'
import zkUserView from '@/components/user/zk-user-view/index.vue'
import xA from '@/elements/all/x-a/index.vue'
import xButton from '@/elements/all/x-button/index.vue'
import xCell from '@/elements/all/x-cell/index.vue'
import xCityPicker from '@/elements/all/x-city-picker/index.vue'
import xCountDown from '@/elements/all/x-countDown/index.vue'
import xDrawer from '@/elements/all/x-drawer/index.vue'
import xFormLabel from '@/elements/all/x-form-label/index.vue'
import xIcon from '@/elements/all/x-icon/index.vue'
import xImage from '@/elements/all/x-image/index.vue'
import xInput from '@/elements/all/x-input/index.vue'
import xMsg from '@/elements/all/x-msg/index.vue'
import xNumber from '@/elements/all/x-number/index.vue'
import xPassword from '@/elements/all/x-password/index.vue'
import xPay from '@/elements/all/x-pay/index.vue'
import xPhoneVerifiy from '@/elements/all/x-phone-verifiy/index.vue'
import xPicker from '@/elements/all/x-picker/index.vue'
import xPopup from '@/elements/all/x-popup/index.vue'
import xRadio from '@/elements/all/x-radio/index.vue'
import xScroll from '@/elements/all/x-scroll/index.vue'
import xSelect from '@/elements/all/x-select/index.vue'
import xTimePicker from '@/elements/all/x-time-picker/index.vue'
import xWidget from '@/elements/all/x-widget/index.vue'
import auto from '@/elements/auto/index.vue'
import xAuthorization from '@/elements/mp/x-authorization/index.vue'
Vue.component('zk-account-security', zkAccountSecurity)
Vue.component('zk-groupbuy', zkGroupbuy)
Vue.component('zk-about', zkAbout)
Vue.component('zk-article', zkArticle)
Vue.component('zk-feedback', zkFeedback)
Vue.component('zk-help', zkHelp)
Vue.component('zk-marquee', zkMarquee)
Vue.component('zk-book-index', zkBookIndex)
Vue.component('zk-book-my', zkBookMy)
Vue.component('zk-border-header', zkBorderHeader)
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
Vue.component('zk-hudong-lottery-code', zkHudongLotteryCode)
Vue.component('zk-hudong-lucky-wheel', zkHudongLuckyWheel)
Vue.component('zk-hudong-red-rain', zkHudongRedRain)
Vue.component('zk-hudong-shake', zkHudongShake)
Vue.component('zk-hudong-squared', zkHudongSquared)
Vue.component('zk-bookingsignup', zkBookingsignup)
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
Vue.component('zk-popup-banner', zkPopupBanner)
Vue.component('zk-scrolling', zkScrolling)
Vue.component('zk-timeline', zkTimeline)
Vue.component('zk-waterfull-list', zkWaterfullList)
Vue.component('zk-comments-list', zkCommentsList)
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
Vue.component('zk-cource-book', zkCourceBook)
Vue.component('zk-cource-home', zkCourceHome)
Vue.component('zk-cource-intro', zkCourceIntro)
Vue.component('zk-cource-live', zkCourceLive)
Vue.component('zk-cource-order-list', zkCourceOrderList)
Vue.component('zk-cource-order-show', zkCourceOrderShow)
Vue.component('zk-cource-order', zkCourceOrder)
Vue.component('zk-school', zkSchool)
Vue.component('zk-about-us', zkAboutUs)
Vue.component('zk-add-adresss', zkAddAdresss)
Vue.component('zk-address', zkAddress)
Vue.component('zk-audio', zkAudio)
Vue.component('zk-auto-form', zkAutoForm)
Vue.component('zk-avatar', zkAvatar)
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
Vue.component('zk-class-detail', zkClassDetail)
Vue.component('zk-class-item-list', zkClassItemList)
Vue.component('zk-class-list', zkClassList)
Vue.component('zk-coming', zkComing)
Vue.component('zk-countdown', zkCountdown)
Vue.component('zk-cource-center', zkCourceCenter)
Vue.component('zk-daily-shop-list', zkDailyShopList)
Vue.component('zk-daily-use', zkDailyUse)
Vue.component('zk-detail-list', zkDetailList)
Vue.component('zk-dialog', zkDialog)
Vue.component('zk-discount-shop-list', zkDiscountShopList)
Vue.component('zk-egg-machine', zkEggMachine)
Vue.component('zk-eject', zkEject)
Vue.component('zk-enlarge-swiper', zkEnlargeSwiper)
Vue.component('zk-float-swiper', zkFloatSwiper)
Vue.component('zk-foot', zkFoot)
Vue.component('zk-grid-list', zkGridList)
Vue.component('zk-grid-slide', zkGridSlide)
Vue.component('zk-grid-swiper', zkGridSwiper)
Vue.component('zk-grid', zkGrid)
Vue.component('zk-head-logo', zkHeadLogo)
Vue.component('zk-head', zkHead)
Vue.component('zk-hot-classify', zkHotClassify)
Vue.component('zk-hot-shop-grid', zkHotShopGrid)
Vue.component('zk-html', zkHtml)
Vue.component('zk-icon-list', zkIconList)
Vue.component('zk-image-list', zkImageList)
Vue.component('zk-image-scroll', zkImageScroll)
Vue.component('zk-image', zkImage)
Vue.component('zk-img-swiper', zkImgSwiper)
Vue.component('zk-index-day-update', zkIndexDayUpdate)
Vue.component('zk-index-hot-shop', zkIndexHotShop)
Vue.component('zk-index-new-top', zkIndexNewTop)
Vue.component('zk-index-swiper', zkIndexSwiper)
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
Vue.component('zk-notice', zkNotice)
Vue.component('zk-pay-finished', zkPayFinished)
Vue.component('zk-popup', zkPopup)
Vue.component('zk-preferential', zkPreferential)
Vue.component('zk-preview', zkPreview)
Vue.component('zk-product-load', zkProductLoad)
Vue.component('zk-purchase-shops-list', zkPurchaseShopsList)
Vue.component('zk-registration-success', zkRegistrationSuccess)
Vue.component('zk-result', zkResult)
Vue.component('zk-rightbar', zkRightbar)
Vue.component('zk-school-case-card', zkSchoolCaseCard)
Vue.component('zk-school-case-double', zkSchoolCaseDouble)
Vue.component('zk-school-case-four', zkSchoolCaseFour)
Vue.component('zk-school-case-simple', zkSchoolCaseSimple)
Vue.component('zk-school-class-grid', zkSchoolClassGrid)
Vue.component('zk-school-class-train', zkSchoolClassTrain)
Vue.component('zk-school-class-video', zkSchoolClassVideo)
Vue.component('zk-school-grid', zkSchoolGrid)
Vue.component('zk-school-head', zkSchoolHead)
Vue.component('zk-school-headlines', zkSchoolHeadlines)
Vue.component('zk-school-swiper', zkSchoolSwiper)
Vue.component('zk-school-team-card', zkSchoolTeamCard)
Vue.component('zk-school-timeline', zkSchoolTimeline)
Vue.component('zk-school-video-list', zkSchoolVideoList)
Vue.component('zk-scroll-list', zkScrollList)
Vue.component('zk-search', zkSearch)
Vue.component('zk-selected-shop-list', zkSelectedShopList)
Vue.component('zk-self-mention', zkSelfMention)
Vue.component('zk-shepherd-kings', zkShepherdKings)
Vue.component('zk-shop-bank', zkShopBank)
Vue.component('zk-shop-burst-list', zkShopBurstList)
Vue.component('zk-shop-list-show', zkShopListShow)
Vue.component('zk-shop-mall-swiper', zkShopMallSwiper)
Vue.component('zk-shop-swiper', zkShopSwiper)
Vue.component('zk-show-swiper', zkShowSwiper)
Vue.component('zk-sign-desk', zkSignDesk)
Vue.component('zk-single-grid', zkSingleGrid)
Vue.component('zk-store-brand-show', zkStoreBrandShow)
Vue.component('zk-store-dynamic', zkStoreDynamic)
Vue.component('zk-store-index-grid', zkStoreIndexGrid)
Vue.component('zk-store-index-swiper', zkStoreIndexSwiper)
Vue.component('zk-store-scroll-card', zkStoreScrollCard)
Vue.component('zk-store-shop-show', zkStoreShopShow)
Vue.component('zk-store-user-card', zkStoreUserCard)
Vue.component('zk-store-user-center', zkStoreUserCenter)
Vue.component('zk-stored-account', zkStoredAccount)
Vue.component('zk-successful-opening', zkSuccessfulOpening)
Vue.component('zk-swiper-action', zkSwiperAction)
Vue.component('zk-swiper-list', zkSwiperList)
Vue.component('zk-swiper', zkSwiper)
Vue.component('zk-tab', zkTab)
Vue.component('zk-tabbar', zkTabbar)
Vue.component('zk-table-list-show', zkTableListShow)
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
Vue.component('zk-merchants', zkMerchants)
Vue.component('zk-my-center', zkMyCenter)
Vue.component('zk-qrcode', zkQrcode)
Vue.component('zk-reg', zkReg)
Vue.component('zk-user-address', zkUserAddress)
Vue.component('zk-user-base', zkUserBase)
Vue.component('zk-user-give', zkUserGive)
Vue.component('zk-user-grade', zkUserGrade)
Vue.component('zk-user-index', zkUserIndex)
Vue.component('zk-user-view', zkUserView)
Vue.component('x-a', xA)
Vue.component('x-button', xButton)
Vue.component('x-cell', xCell)
Vue.component('x-city-picker', xCityPicker)
Vue.component('x-countDown', xCountDown)
Vue.component('x-drawer', xDrawer)
Vue.component('x-form-label', xFormLabel)
Vue.component('x-icon', xIcon)
Vue.component('x-image', xImage)
Vue.component('x-input', xInput)
Vue.component('x-msg', xMsg)
Vue.component('x-number', xNumber)
Vue.component('x-password', xPassword)
Vue.component('x-pay', xPay)
Vue.component('x-phone-verifiy', xPhoneVerifiy)
Vue.component('x-picker', xPicker)
Vue.component('x-popup', xPopup)
Vue.component('x-radio', xRadio)
Vue.component('x-scroll', xScroll)
Vue.component('x-select', xSelect)
Vue.component('x-time-picker', xTimePicker)
Vue.component('x-widget', xWidget)
Vue.component('auto', auto)
Vue.component('x-authorization', xAuthorization)

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
