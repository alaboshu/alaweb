<template>
  <view class="zk-bookingsignup" v-if="async">
    <view class="bookingsignup_image">
      <img class="bookingsignup-box" :src="widgetModel.image" />
      <view class="bookingsignup_icon" @click="$api.back()">
        <x-icon name="icon-zk-black" size="16" :color="'#ffffff'"></x-icon>
      </view>
    </view>
    <view class="bookingsignup_conter">
      <view class="headline-list_box">
        <view>
          <view class="headline-box">
            <view class="headline-box_text">{{widgetModel.name}}</view>
          </view>
          <view class="headline-list">
            <view class="headline-list_p">
              <view class="list_p-left">
                <img class="headline-img" src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-27/5d142b3c4fedd406cc3cffbc.png" />
              </view>
              <view class="list_p-right">时间：{{widgetModel.startTime}} 至 {{widgetModel.endTime}}</view>
            </view>
            <view class="headline-list_p">
              <view class="list_p-left">
                <img class="headline-img" src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-27/5d142b3c4fedd406cc3cffbb.png" />
              </view>
              <view class="list_p-right">地点：{{widgetModel.address}}</view>
            </view>
            <view class="headline-list_p">
              <view class="list_p-left">
                <img class="headline-img" src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-27/5d142b3c4fedd406cc3cffbd.png" />
              </view>
              <view class="list_p-right">报名费：<span>{{widgetModel.price}}</span>元/人</view>
            </view>
          </view>
        </view>
        <view>
          <img class="login-img" src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-27/5d142a044fedd406cc3cfbb0.png" />
        </view>
      </view>
    </view>
    <view class="line-between"></view>
    <view class="particulars-box">
      <view class="particulars-text">
        <view class="text-list text_hover">详情</view>
        <!-- <view class="text-list">其他</view>
        <view class="text-list">其他</view> -->
      </view>
      <view class="scientific-list">
        <rich-text :nodes="showHtml"></rich-text>
      </view>
    </view>
    <view class="administrivia">
      <view class="administrivia_text">新闻</view>
      <view>
        <zk-store-dynamic></zk-store-dynamic>
      </view>
    </view>
    <div class="occupied-box"></div>
    <view class="bookingsignup_footer">
      <view class="footer-buttoms" @click="$api.to('/pages/default',true)">
        <view>
          <view class="footer-buttoms_top">
            <img class="footer-img" src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-27/5d142a044fedd406cc3cfbb1.png" />
          </view>
          <view class="buttoms_top-text">首页</view>
        </view>
      </view>
      <view class="footer-buttoms" @click="customerService">
        <view>
          <view class="footer-buttoms_top">
            <img class="footer-img" src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-27/5d142a044fedd406cc3cfbb2.png" />
            <span class="footer-text">400-680-9088</span>
          </view>
          <view class="buttoms_top-text distinguish-color">客服</view>
        </view>
      </view>
      <view class="purchase" @click="buyPurchaser" :class="{'endStart': widgetModel.state == 3}">
        {{getTime(widgetModel)}}
      </view>
    </view>
    <view class="pop-up">
      <view class="uni-mask" v-show="showPupop"></view>
      <view class="uni-popup uni-popup_buy uni-popup-bottom_popup" v-show="showPupop">
        <view class="popuo-boxs">
          <view class="popuo-boxs_icon">
            <view class="icon-box" @click="onPadlock">
              <x-icon name="icon-zk-cuowu" size="25" :color="'#999999'"></x-icon>
            </view>
          </view>
          <view class="specification">
            <view class="specification_list">{{widgetModel.brief}}</view>
          </view>
          <view class="number-again">
            <view class="number-again_text">选择数量</view>
            <view>
              <x-number :value="buyCount" :multiplication='buCountMin' v-on:change="onNumberChange2" :min="buCountMin" :max="buCountMax"></x-number>
            </view>
          </view>
          <view class="prompt-message">
            <view>
              <x-icon name="icon-zk-warning" :color="'#999999'" size="13"></x-icon>
            </view>
            <view class="message_text">温馨提示：最多可添加10人</view>
          </view>
          <view class="split-box"></view>
        </view>
        <view class="popup-footer">
          <view class="popup-footer_text">合计：<span class="text-span">￥{{totalPrice}}</span></view>
          <view class="popup-footer_btn" @click="nextStep">下一步</view>
        </view>
      </view>
      <view class="uni-mask" v-show="messagePupop"></view>
      <view class="uni-popup uni-popup_buy uni-popup-bottom_popup" v-show="messagePupop">
        <view class="popuo-boxs information-add">
          <view class="popuo-boxs_icon">
            <view @click="stepBack">
              <x-icon name="icon-zk-black" size="16" :color="'#999999'"></x-icon>
            </view>
            <view class="regis-tration">
              填写报名信息
            </view>
            <view class="icon-box" @click="onPadlock">
              <x-icon name="icon-zk-cuowu" size="25" :color="'#999999'"></x-icon>
            </view>
          </view>
          <view class="popuo-boxs_conter">
            <view class="recommend-box">
              <view class="box_input">
                <view class="recommend-lable">推荐人(选填)</view>
                <view class="inputs-box"><input class="recommend-bit" v-model="parentName" placeholder="请输入推荐人" /></view>
              </view>
            </view>
            <view class="boxs_conter-list" v-for="(item,index) in contactsList" :key="index">
              <view class="form-box">
                <view class="form-box_title">第{{index+1}}位</view>
                <view class="form-box_list">
                  <view class="box_list-lable">姓名</view>
                  <view class="input-box"><input class="carry-bit" v-model="item.name" placeholder="请输入姓名" />
                    <!-- <view class="cryptonym-box">
                      <checkbox value="r1" checked="true" />
                      <span>匿名</span>
                    </view> -->
                  </view>
                </view>
                <view class="form-box_list box_list-hover">
                  <view class="box_list-lable">手机</view>
                  <view class="input-box"><input class="carry-bit" v-model="item.mobile" placeholder="请输入手机号" /></view>
                </view>
              </view>
              <view class="split_decollator" v-if="mationLenght!=index"></view>
            </view>
            <view class="split-box"></view>
          </view>
        </view>
        <view class="popup-footer">
          <view class="popup-footer_text">合计：<span class="text-span">￥{{totalPrice}}</span></view>
          <view class="popup-footer_btn" @click="saveStep">下一步</view>
        </view>
      </view>
    </view>
    <x-pay ref="show_pay"></x-pay>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        async: false,
        widgetModel: {},
        showPupop: false,
        buCountMin: 1,
        buCountMax: 10,
        buyCount: 1,
        messagePupop: false,
        totalPrice: 0,
        mationLenght: '',
        contactsList: [
          { name: '', mobile: '' }
        ],
        parentName: '',
        showHtml: ''
      }
    },
    props: {
      widget: {}
    },
    onShow () {
      // this.init().then(() => {
      //   uni.share({
      //     provider: 'weixin',
      //     scene: 'WXSceneSession',
      //     type: 0,
      //     href: window.location.href, // 这地址太长了，就省略了
      //     title: '文房四宝',
      //     summary: '文房四宝商家盈利系统火热报名中，5月23日广东东莞常平',
      //     imageUrl: 'https://s-open.qiniuniu99.com/wwwroot/Uploads/Core/2019/05/5cdea75089bdb517785b6ffb.png',
      //     success: function (res) {
      //     },
      //     fail: function (err) {
      //     }
      //   })
      //   // location.reload()
      // })
    },
    mounted () {
      this.init().then(() => {

        // location.reload()
      })
    },
    methods: {
      async init () {
        this.$api.historys('/pages/index?path=user_bookingsignup_show&id=5cde251e953e41243057786f')

        this.showPupop = false
        this.messagePupop = false
        var para = {
          id: this.widget.route.id
        }
        var reposen = await this.$api.httpGet('/Api/BookingSignup/QueryById', para)
        this.widgetModel = reposen.result
        this.totalPrice = this.widgetModel.price
        this.mationLenght = this.buyCount - 1
        this.showHtml = this.widgetModel.intro
        var detail = `${this.widgetModel.name}${this.widgetModel.startTime}至${this.widgetModel.endTime}${this.widgetModel.address}`
        if (this.$api.client() === 'WapH5' || this.$api.client() === 'WeChat') {
          this.$api.share('文房四宝', 'https://s-open.qiniuniu99.com/wwwroot/Uploads/Core/2019/05/5cdea75089bdb517785b6ffb.png', detail)
        }

        // eslint-disable-next-line
        this.showHtml = this.showHtml.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"')
        // eslint-disable-next-line
        this.async = true
      },
      buyPurchaser () {
        if (this.widgetModel.state === 3) {
          uni.showToast({
            title: '活动已结束',
            icon: 'none'
          })
        } else {
          this.showPupop = true
        }
      },
      onNumberChange2 (value) {
        this.buyCount = value
        this.mationLenght = this.buyCount - 1
        this.totalPrice = this.buyCount * this.widgetModel.price
        this.contactsList = []
        for (var i = 0; i < this.buyCount; i++) {
          this.contactsList.push({ name: '', mobile: '' })
        }
      },
      nextStep () {
        if (this.$user.isLogin() === false) {
          this.$user.toLogin()
          return
        }
        this.showPupop = false
        this.messagePupop = true
      },
      onPadlock () {
        this.showPupop = false
        this.messagePupop = false
      },
      stepBack () {
        this.showPupop = true
        this.messagePupop = false
      },
      async saveStep () {
        var para = {
          price: this.widgetModel.price,
          bookingId: this.widget.route.id,
          userId: this.$user.loginUser().id,
          count: this.buyCount,
          totalPrice: this.totalPrice,
          parentName: this.parentName,
          contacts: JSON.stringify(this.contactsList)
        }
        var saveValue = await this.$api.httpPost('Api/BookingSignup/buy', para)
        if (saveValue.status === 1) {
          uni.hideLoading()
          this.$refs.show_pay.$emit('payMethod', saveValue.result.payId, saveValue.result.payAmount, saveValue.result.orderId, '/pages/index?path=successful_registration&id=' + saveValue.result.orderId, 'isBooking')
        } else {
          this.$api.toastWarn(saveValue.message)
        }
      },
      customerService () {
        uni.makePhoneCall({
          phoneNumber: '400-680-9088'
        })
      },
      getTime (data) {
        if (data.state === 1) {
          return '立即报名'
        }
        if (data.state === 2) {
          return '立即报名'
        }
        if (data.state === 3) {
          return '活动结束'
        }
      }
    }
  }
</script>
