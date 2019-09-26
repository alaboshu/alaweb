 <template>
  <view class="zk-userrights" v-if="async">
    <view :style="'height:'+uniHeight+'px;'" class="userrights-box">
      <view class="card-header" :style="'background:'+popupInfo.themeColor">
        <view class="card_back" @click="onClick()">
        </view>
        <view class="card-content">
          <view class="cotent_item" :class="{active_head:index===current}" :style="'border:2px solid '+popupInfo.themeColor" v-for="(item,index) in widgetModel" :key="index" @click="swiperIndex(index)">
            <img :src="$api.baseUrl()+item.icon" alt="">
          </view>
        </view>
      </view>
      <scroll-view scroll-y="true">
        <swiper :current="current" @change="swiperImg" duration="100" :style="'height:'+testHeight+'px;'" circular="true">
          <swiper-item v-for="(cItem,cIndex) in widgetModel" :key="cIndex" class="userrights-swiper">
            <view class="card-img">
              <img :src="'https://s-open.qiniuniu99.com'+cItem.backGroundImage" alt="" style="width:100%;" class="test">
              <view class="been-used">已使用{{cItem.totalUseCount}}/{{cItem.totalCount}}</view>
            </view>
          </swiper-item>
        </swiper>
        <view v-for="(cItem,cIndex) in widgetModel" :key="cIndex" class="userrights-conter">
          <view class="scroll-boxs" v-if="cIndex === current">
            <view class="card-use_title">
              {{cItem.name}}
            </view>
            <view class="card-use_check">
              <view class="user_check_title"> {{cItem.intro}}</view>
              <view class="user_check_value">
              </view>
            </view>
            <view class="card-use-rush-box">
              <view class="use_rush_item" v-for="(pItem,pIndex) in cItem.privileges" :key="pIndex">
                <view class="rush_item_img">
                  <img :src="'https://s-open.qiniuniu99.com'+pItem.icon" alt="">
                </view>
                <view class="rush_item_info">
                  <view class="item_info_title">
                    {{pItem.name}}
                  </view>
                  <view class="item_info_msg">
                    {{pItem.intro}}
                  </view>
                </view>
              </view>
            </view>
          </view>
          <div class="userrights-dummy" v-if="cIndex === current"></div>
          <view class="card-bottom" v-if="cIndex === current">
            <view class="card-bottom-dredge" :style="'background:'+ popupInfo.themeColor" @click="sumbit(cIndex)">{{cItem.buttonText}}</view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="uni-mask" v-show="zKuserrights" @click="loniteLayer"></view>
    <view class="uni-popup uni-popup_buy uni-popup-bottom_popup" v-show="zKuserrights">
      <view class="mimicry-box-center">
        <view class="mimicry-head">
          <view class="box-center_list">
            <view class="center_list-title">公司名称：</view>
            <view class="center_list-input"><input v-model="buyUser.name" placeholder="请输入公司名称" /></view>
          </view>
          <view class="box-center_list">
            <view class="center_list-title">电话号码：</view>
            <view class="center_list-input"><input v-model="buyUser.mobile" placeholder="请输入电话号码" /></view>
          </view>
        </view>
        <view class="confirmpayment" :style="'background-color:'+popupInfo.themeColor+';'" @click="confirmPayment">确认支付</view>
      </view>
    </view>
    <x-pay ref="show_pay"></x-pay>
  </view>
</template>

<script>
 
  import { USERRIGHTS_BUY_POST, USERRIGHTS_GETUSERINTRO_GET } from '@/service/all/apiUrl'
  import apiBaseUrl from '@/service/config.js'
  export default {
    
    data () {
      return {
        async: false,
        widgetModel: '',
        apiUrl: '',
        buyUser: {
          mobile: '',
          name: ''
        },
        visible: {
          type: Boolean,
          default: false,
          mode: String,
          mask: {
            type: [Boolean, String],
            default: true
          }
        },
        rightMode: false,
        rightDrawerVisible: false,
        mobileIntro: '',
        current: 0,
        popupSale: false,
        popupInfo: '',
        uniHeight: '',
        zKuserrights: false,
        testHeight: ''
      }
    },
    props: {
      widget: {}
    },
    computed: {

    },
    mounted () {
      this.init()
    },
    onLoad (option) {
      this.option = option
    },
    methods: {
      cardBtn (index) {
        this.popupInfo = this.widgetModel[index]
        this.popupSale = true
      },
      swiperIndex (index) {
        this.popupInfo = this.widgetModel[index]
        this.current = index
      },
      swiperImg (e) {
        this.popupInfo = this.widgetModel[e.detail.current]
        this.current = e.detail.current
      },
      async init () {
        if (this.$user.isLogin()) {
          this.uniHeight = this.$api.getSystemInfoSync().windowHeight - 50
          var para = {
            loginUserId: this.$user.loginUser().id
          }
          var message = await this.$api.httpGet('/api/userrights/getview', para)
          this.widgetModel = message.result
          this.popupInfo = this.widgetModel[this.current]
          var str = apiBaseUrl.apiBaseUrl
          if (str.charAt(str.length - 1) === '/') {
            str = str.substr(0, str.length - 1)
          } else {
            str = apiBaseUrl.apiBaseUrl
          }
          this.apiUrl = str
          this.async = true
        }
      },
      async getMobileIntro () {
        if (this.buyUser.mobile !== '') {
          var para = {
            mobile: this.buyUser.mobile
          }
          var response = await this.$api.httpGet(USERRIGHTS_GETUSERINTRO_GET, para)
          if (response.status !== 1) {
            this.$api.toastWarn(response.message)
          } else {
            this.mobileIntro = '提示： ' + response.result
          }
        }
      },
      loniteLayer () {
        this.zKuserrights = false
        this.buyUser.mobile = ''
        this.buyUser.name = ''
      },
      confirmPayment () {
        if (this.buyUser.mobile === '' || this.buyUser.name === '') {
          this.$api.toastWarn('公司名称或电话号码不能为空')
        } else {
          this.sumbit()
        }
      },
      async sumbit () {
        if (!this.$user.isLogin()) {
          uni.showToast({
            icon: 'none',
            title: '请'
          })
          this.$user.toLogin()
        } else {
          var para = {
            userId: this.$user.loginUser().id,
            mobile: this.buyUser.mobile,
            name: this.buyUser.name,
            price: this.popupInfo.price,
            openType: this.popupInfo.openType,
            gradeId: this.popupInfo.gradeId
          }
          if (this.popupInfo.openType === 2) {
            this.$refs.show_pay.$emit('payMethod_second', para.price, para.gradeId)
            this.process(para)
          } else if (this.popupInfo.openType === 4) {
            if (this.buyUser.name === '' && this.buyUser.mobile === '') {
              this.zKuserrights = true
            } else {
              this.process(para)
            }
          } else {
            this.process(para)
          }
        }
      },
      async process (para) {
        uni.showLoading({
          title: '加载中..'
        })
        setTimeout(function () {
          uni.hideLoading()
        }, 200)
        var response = await this.$api.httpPost(USERRIGHTS_BUY_POST, para)
        if (response.status === 1) {
          uni.hideLoading()
          if (response.result.payId > 0) {
            this.$refs.show_pay.$emit('payMethod', response.result.payId, response.result.payAmount, response.result.orderIds, '/pages/index?path=markets_userrights') // 唤起支付窗口
          } else {
            var that = this
            this.zKuserrights = false
            uni.showModal({
              title: '开通成功',
              showCancel: false,
              content: '恭喜您，您的订单已成功开通',
              success: function (res) {
                // 跳转到指定的url，跳转url从云端返回
                that.$api.to('/pages/index?path=markets_userrights')
              }
            })
          }
        } else {
          this.$api.toastWarn(response.message)
        }
        this.popupSale = false
      },
      onClick () {
        this.rightDrawerVisible = !this.rightDrawerVisible
      },
      closeRightDrawer () {
        this.rightDrawerVisible = false
      },
      showRightDrawer () {
        this.rightDrawerVisible = true
      },
      item1 () {
        this.rightDrawerVisible = false
        uni.showToast({
          title: 'item1'
        })
      },
      item2 () {
        this.rightDrawerVisible = false
        uni.showToast({
          title: 'item2'
        })
      }
    },
    updated () {
      var this_ = this
      wx.createSelectorQuery().select('.test').fields({
        dataset: true,
        size: true,
        scrollOffset: true,
        properties: ['scrollX', 'scrollY'],
        computedStyle: ['margin', 'backgroundColor'],
        context: true
      }, function (res) {
        this_.testHeight = res.height
      }).exec()
      this.async = true
    },
    created () {
      this.rightMode = this.mode === 'right'
      // #ifdef MP-WEIXIN
      this.catchtouchmove = true
      // #endif
    },
    onNavigationBarButtonTap (e) {
      this.rightDrawerVisible = !this.rightDrawerVisible
    },
    onBackPress () {
      if (this.rightDrawerVisible) {
        this.rightDrawerVisible = false
        return true
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-userrights {
    font-size: $gl-size-base;
  }
  .userrights-box {
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .userrights-conter {
    flex: 1;
  }
  .userrights-dummy {
    height: 50px;
  }
  .card-bottom {
    width: 100vw;
    position: fixed;
    bottom: 50px;
  }
  .swiper {
    height: 300upx;
  }
  .swiper-item {
    display: block;
    height: 300upx;
    line-height: 300upx;
    text-align: center;
    position: relative;
  }
  .swiper_title {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    width: 130px;
    height: 19px;
    display: flex;
  }
  .swiper_title_right {
    flex: 1;
    color: #646464;
    font-size: 13px;
    position: relative;
    line-height: 19px;
  }
  .swiper-item img {
    width: 100%;
    height: 100%;
  }
  .swiper-list {
    margin-top: 40upx;
    margin-bottom: 0;
  }

  .uni-common-mt {
    margin-top: 60upx;
    position: relative;
  }

  .info {
    position: absolute;
    right: 20upx;
  }
  .card-header {
    width: 100%;
    height: 44px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .card_back {
    position: absolute;
    width: 27px;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  .card-content {
    height: 34px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    z-index: 999;
  }
  .card-content .cotent_item {
    width: 33px;
    height: 33px;
    border: 2px solid #000;
    margin-right: 15px;
    position: relative;
  }
  .card-content .cotent_item img {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 49%;
    left: 49%;
    transform: translate(-50%, -50%);
  }
  .cotent_item_title {
    position: absolute;
    top: 30px;
    left: -4px;
    width: 35px;
    height: 35px;
    text-align: center;
    color: #fff;
    z-index: 999999;
  }
  .swiper {
    height: 300px;
  }
  .content_item_active {
    background: #4b916d;
  }
  .card-content .cotent_item:last-child {
    margin-right: 0px;
  }
  .card-center {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative;
  }
  .card-use_title {
    color: #000;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    padding: 0 15px;
  }
  .card-use_check {
    color: #999;
    padding: 9px 15px;
    display: flex;
    border-bottom: 1px solid #f7f7f7;
  }
  .user_check_title {
    flex: 1;
  }
  .user_check_value {
    color: #f7f7f7;
    display: flex;
    align-items: center;
  }
  .use_rush_item {
    display: flex;
    padding: 5px 10px;
    border-bottom: 1px solid #f7f7f7;
  }
  .rush_item_img {
    width: 30px;
    height: 30px;
  }
  .rush_item_img img {
    width: 100%;
    height: 100%;
  }
  .rush_item_info {
    flex: 1;
    padding: 0 10px;
  }
  .rush_item_btn {
    flex: 1;
  }
  .item_info_title {
    font-size: 13px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    margin-top: 3px;
  }
  .item_info_msg {
    font-size: 12px;
    color: #9b9b9b;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .card-bottom-placeholder {
    height: 44px;
  }
  .card-bottom-dredge {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  .ceshi {
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
  }
  .uni-mask {
    top: 0;
  }
  .sale-info {
    padding: 15px;
    display: flex;
    border-bottom: 1px solid #f7f7f7;
    background-color: $gl-light;
  }
  .info-img {
    width: 95px;
    height: 95px;
    margin-right: 15px;
  }
  .info-img img {
    width: 100%;
    height: 100%;
  }
  .info-box {
    flex: 1;
    text-align: left;
  }
  .info-name {
    font-size: 1.15em;
  }
  .info-price {
    font-size: 1.15em;
    font-weight: bold;
    padding: 5px 0px;
  }
  .old_price {
    color: $gl-metal;
    text-decoration: line-through;
    font-size: 0.6em;
    font-weight: normal;
  }
  .info-stock {
    color: $gl-metal;
    font-size: 12px;
  }
  .info-stock_div {
    margin-top: 5px;
  }
  .saleimg {
    width: 100%;
    height: 100%;
  }
  .sale_btn_placeholder {
    height: 40px;
  }
  .sale_btn {
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0;
  }
  .card-content .active_head:first-child {
    background: #bc1400;
  }
  .card-content .active_head:nth-child(2) {
    background: #096d3b;
  }
  .card-content .active_head:nth-child(3) {
    background: #2b26f8;
  }
  .card-content .active_head:nth-child(4) {
    background: #312f2f;
  }
  .card-content .active_head:nth-child(5) {
    background: #8806f5;
  }
  .sale_msg {
    padding: 5px 10px;
  }
  .sale_form-item {
    padding: 0 10px;
    display: flex;
    height: 35px;
    align-items: center;
  }
  .form-item_icon {
    margin-right: 5px;
  }
  .form-item_title {
    width: 70px;
  }

  .form-item_input {
    flex: 1;
    .uni-input {
      padding: 0;
      font-size: 12px;
      border-bottom: 1px solid #f7f7f7;
      height: 35px;
    }
    .item_input_last {
      border-bottom: none;
    }
  }
  .sale_intro {
    padding: 0 10px;
    color: #e4393c;
  }
  .name-price {
    display: flex;
    align-items: center;
  }
  .sale_hint {
    color: #9b9b9b;
  }
  .sale_form {
    border-bottom: 1px solid #f7f7f7;
    margin-bottom: 10px;
  }
  .sale_disabled {
    color: #000;
    background: #e5e5e5 !important;
  }
  .sale_quota {
    padding: 5px 10px;
  }
  .sale_quota .form-item_title,
  .sale_quota .form-item_input {
    font-weight: bold;
  }
  .icon {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
  }
  .input-view {
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #f0ecec;
    height: 30px;
    border-radius: 15px;
    padding: 0 10px;
    flex: 1;
  }

  .input {
    flex: 1;
    padding: 0 5px;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
  }

  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    display: block;
  }

  .line {
    font-size: 18px;
    color: #fff;
  }
  .uni-drawer-mask {
    background: rgba(0, 0, 0, 0.2);
  }
  .uni-drawer > .uni-drawer-mask {
    background: rgba(0, 0, 0, 0.2);
  }
  .userrights-swiper {
    display: flex;
    flex-direction: column;
    .scroll-boxs {
      flex: 1;
      overflow-y: auto;
    }
    .card-img {
      position: relative;
      .been-used {
        position: absolute;
        bottom: 12px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #686868;
      }
    }
  }
  .mimicry-box-center {
    width: 100vw;
    height: 150px;
    background-color: #ffffff;
    position: fixed;
    bottom: 0px;
    z-index: 999;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    .box-center_list {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      .center_list-title {
        font-size: 13px;
        text-align: right;
        margin-right: 10px;
        margin-left: 20px;
      }
      .center_list-input {
        flex: 1;
        border-bottom: 1px solid #e5e5e5;
        padding: 0px 10px;
        margin-right: 20px;
      }
    }
    .mimicry-head {
      flex: 1;
    }
    .confirmpayment {
      height: 40px;
      line-height: 40px;
      width: 100vw;
      text-align: center;
      font-size: 13px;
      color: #ffffff;
    }
  }
</style>
