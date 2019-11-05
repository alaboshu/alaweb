<template>
  <div class="h5-x-pay" element-path="h5/x-pay">
    <view class="uni-mask" v-show="showPupop"></view>
    <view class="uni-popup uni-popup_buy uni-popup-bottom_popup" v-show="showPupop">
      <div class="pay-box">
        <div class="pay_title">确认付款</div>
        <div class="pay_content">
          <div class="content_price">
            ￥{{amount}}
            <p>{{note}}</p>
          </div>
          <div class="content_item" v-for="(item,index) in payTypes" :key="index" @click="change(item.key)">
            <div class="item-icon">
              <x-icon class="itemcolro " :class="{aliplaycolro:item.icon==='zk-alipay'}" :name="'icon-'+item.icon" :size="30"></x-icon>
            </div>
            <div class="item-name">
              <span class="price_name">{{item.value}}</span>
              <p class="item_p">{{item.desc}}</p>
            </div>
            <div class="item-check">
              <!-- <i class="van-icon check_style" :class="{'van-icon-checked':item.key===selectPayType,'van-icon-check':item.key!==selectPayType}"></i> -->
              <x-icon name="icon-zk-success" xClass="i-color" v-if="item.key===selectPayType"></x-icon>
              <div class="check-border" v-if="item.key!==selectPayType"></div>
            </div>
          </div>
          <div class="content-btn" @click="payClick()">确认支付{{amount}}元</div>
        </div>
        <div class="pay-close" @click="showPupop=false,payClose()">
          <x-icon name="icon-zk-close" :size="30" color="#fff" style="margin-top:-4px;"></x-icon>
        </div>
      </div>
    </view>
    <!-- <zk-popup :show="showPupop" v-on:hidePopup="showPupop=false">

    </zk-popup>-->
    <view class="uni-mask" v-show="showPayPassword"></view>
    <view class="uni-popup uni-popup_buy uni-popup-bottom_popup" v-show="showPayPassword">
      <div class="pay-tool">
        <div class="zlcl_color" @click="closePay()">
          <x-icon name="icon-zk-cuowu" :size="25" :color="'#909399'" style="margin-top:-4px;"></x-icon>
        </div>
        <div class="pay-tool-title border-bottom">
          <span class="icon icon-back" @click="backHandle"></span>
          <strong class="trade-password">请输入支付密码</strong>
        </div>
        <div class="pay-tool-content">
          <div class="pay-tool-inputs">
            <div class="item" v-for="i in items" :key="i">
              <span class="icon_dot" v-if="password[i]===1||password[i]===2||password[i]===3||password[i]===4||password[i]===5||password[i]===6||password[i]===7||password[i]===8||password[i]===9||password[i]===0">{{password[i]}}</span>
            </div>
          </div>
          <div class="pay-tool-link">
            <!-- <router-link class="link" to="/getP">忘记密码？</router-link> -->
          </div>
          <div class="pay-tool-tips" v-if="false">
            <div v-if="$user.loginUser().isNeedSetPayPassword">当前支付密码为空,第一次输入的支付密码为支付密码
              <button>设置支付密码</button>
            </div>
            <div v-else>
              <a href="/pages/index?path=user_password_safe">修改支付密码</a>
              <a href="/pages/index?path=user_paypassword_find">找回支付密码</a>
            </div>
          </div>
        </div>
        <!-- <div class="pay-tool_forget" @click="goFindPayPassword()">忘记密码？</div> -->
        <div class="pay-tool-keyboard">
          <ul class="keyboard_ul">
            <li @click="keyUpHandle($event ,val)" v-for="val in keys" :key="val" class="keyboard_li">{{ val }}</li>
            <li class="del keyboard_li" @click="delHandle">
              <p class="icon-del" style="dispaly:block">
                <x-icon name="icon-zk-cuowu" :size="26"></x-icon>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </view>
    <!-- <zk-popup :show="showPayPassword" v-on:hidePopup="showPayPassword=false">

    </zk-popup>-->
  </div>
</template>

<script>
  import { PAY_GETLIST_GET, PAY_PAY_POST } from '@/service/all/apiUrl.js'
  import weixin from '@/service/core/weixin'
  import { setTimeout } from 'timers'
  import appPay from './appPay'
  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  export default {
    name: 'x-pay',
    data () {
      return {
        showPupop: false,
        payTypes: [], // 支付方式
        asyncFlag: false, // 异步数据传递判断，如果没有获取完成则不传递数据子组件中
        orderIds: [],
        payId: 0, // 支付账单Id
        amount: 0.0, // 支付金额
        selectPayType: 0, // 选择的支付方式
        note: '', // 显示标题
        redirectUrl: null, // 支付后指定跳转链接，默认使用订单详情页
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
        password: [],
        option: {},
        buyCount: 0,
        showPayPassword: false,
        onlyPassword: false, // 只弹出支付窗口
        isKeyBoard: true,
        Identification: null,
        originShops: null
      }
    },

    onLoad (option) {
      this.option = option
    },
    mounted () {
      this.$nextTick(function () {
        this.$on('payMethod', function (payId, amount, orderIds, redirectUrl, Identification, originShops) {
          this.Identification = Identification
          this.payId = payId
          this.amount = amount
          this.orderIds = orderIds
          this.init() //  点击以后，才请求支付
          this.showPupop = true
          this.redirectUrl = redirectUrl // 不同的地方有不同的跳转
          this.originShops = originShops
        })
        this.$on('autoOrder', (buyCount) => {
          this.buyCount = buyCount
        })
        this.$on('payMethod_second', function (amount, payId, payType) {
          this.onlyPassword = true
          this.showPayPassword = true
          this.payId = payId
          this.amount = amount
          this.selectPayType = payType
        })
      })
    },
    watch: {
      selectPayType (val) {
      }
    },
    methods: {
      closePay () {
        this.showPupop = false
        this.showPayPassword = false
        this.showPupop = true
        this.password = []
      },
      goFindPayPassword () {
        this.$api.localSet('goFindPayPasswordOption', this.option)
        this.$api.to('/pages/index?path=user_password_find')
      },
      payClose () {
        if (this.$api.isEmpty(this.redirectUrl)) {
          this.redirectUrl = '/pages/index?path=order_show&id=' + this.orderIds
          if (this.redirectUrl.indexOf('successful_opening') !== -1) {

          } else {
            this.$api.to(this.redirectUrl)
          }
        }
      },
      async init () {
        this.$api.localRemove('wechat_logincount')
        var loginUser = this.$user.loginUser()
        this.userName = loginUser.userName
        let paras = {
          browserType: this.$api.payType(), // this.ClientType // 在gloal中获取支付方式列表
          // browserType: 4,
          amount: this.amount,
          payId: this.payId,
          userId: this.$user.id()
        }
        var response = await this.$api.httpGet(PAY_GETLIST_GET, paras) // 获取支付方式列表
        if (response.status === 1) {
          this.asyncFlag = true
          var pays = response.result.payTypeList // 所有的支付方式
          if (!this.$api.isEmpty(response.result.note)) {
            this.note = response.result.note
          }
          this.payTypes = []
          pays.forEach(element => {
            var pay = {}
            pay['key'] = element.payType
            pay['value'] = element.name
            pay['icon'] = element.icon
            pay['desc'] = element.intro
            this.payTypes.push(pay)
          })
          this.selectPayType = this.payTypes[0].key
        } else {
          this.$api.toastWarn(response.message)
        }
      },
      async pay () {
        let paras = {
          amount: this.amount,
          payType: this.selectPayType,
          payId: this.payId,
          redirectUrl: this.redirectUrl,
          openId: this.$api.localGet('wechat_openId'),
          clientType: this.$api.client(),
          userId: this.$user.id()

        }
        this.disBtn = false
        if (this.$api.client() === 'AppPlus' && this.selectPayType === 8) {
          // app微信支付
          await appPay.appWxPay(this, paras, this.orderIds, 'wxpay')
        } else if (this.$api.client() === 'AppPlus' && this.selectPayType === 4) {
          // app支付宝支付
          var response = await this.$api.httpPost(PAY_PAY_POST, paras)
          appPay.appAliPay(this, response, this.orderIds)
        } else {
          var response = await this.$api.httpPost(PAY_PAY_POST, paras)
          if (response.status === 1) {
            this.showPupop = false
            this.showPayPassword = false
            if (this.selectPayType === 7) {
              // 微信支付
              await weixin.onBridgeReady(response.result, paras)
            } else if (this.selectPayType === 12) {
              // 小程序支付
              weixin.Pay(response.result)
            } else if (this.selectPayType === 3) {
              // 支付宝
              if (this.Identification === 'isBooking') {
                window.location.href = response.result.message
              } else {
                window.location.href = response.result.url
              }
            } else {
              if (this.redirectUrl !== undefined && this.redirectUrl.indexOf('merchant_order_view') > -1) {
                var that = this
                uni.showModal({
                  title: '支付成功',
                  showCancel: false,
                  content: '恭喜您，订单支付成功',
                  success: function (res) {
                    that.$api.to(that.redirectUrl)
                  }
                })
              } else {
                var that = this
                uni.showModal({
                  title: '支付成功',
                  showCancel: false,
                  content: '恭喜您，订单支付成功',
                  success: function (res) {
                    that.$api.to(response.result.url)
                  }
                })
              }
            }
          } else {
            var _This = this
            uni.showModal({
              content: response.message,
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                if (res.confirm) {
                  _This.password = []
                }
              }
            })
          }
          this.isKeyBoard = true
        }
      },
      async payClick () {
        if (this.selectPayType === 1) {
          this.showPayPassword = true
          this.showPupop = false
        } else {
          this.pay()
        }
      },
      change (key) {
        this.selectPayType = key
      },
      backHandle () {
        this.clearPasswordHandle() // 返回时清除password
        this.$emit('backFnc') // 返回上级
      },
      keyUpHandle (e, val) {
        if (this.isKeyBoard) {
          if (this.password.length >= 6) {
            this.isKeyBoard = false
          } else {
            if (val !== '') {
              this.password.push(val)
            }
            this.ajaxData()
          }
        }
      },
      delHandle () {
        if (this.password.length <= 0) return false
        // this.password.shift()
        this.password.splice(this.password.length - 1, 1)
      },
      async ajaxData () {
        if (this.password.length >= 6) {
          this.showPayPassword = false
          let parament = {
            payPassWord: String(parseInt(this.password.join(' ').replace(/\s/g, ''))),
            userId: this.$user.id()
          }
          var message = await this.$api.httpPost('Api/User/ConfirmPayPassword', parament)
          uni.showLoading({
            title: '加载中..'
          })

          var _This = this
          setTimeout(() => {
            uni.hideLoading()
            if (message === undefined || message.status !== 1) {
              uni.showModal({
                title: '提示',
                content: '支付密码错误',
                showCancel: false,
                confirmText: '确定',
                complete: function (res) {
                  _This.password = []
                  _This.isKeyBoard = true
                  _This.showPayPassword = true
                }
              })
              this.password = []
            } else {
              if (message.status === 1) {
                uni.hideLoading()
                _This.pay()
                _This.showPayPassword = false
              }
            }
            _This.password = []
          }, 500)
        }
        return false
      },
      clearPasswordHandle: function () {
        this.password = []
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/style/variable.scss";

  .h5-x-pay {
    font-size: $gl-size-base;
  }
  .i-color {
    color: $gl-brand;
  }
  .pay-box {
    position: relative;
    .pay_title {
      color: #fff;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background: $gl-brand;
      font-size: 16px;
    }
    .pay_content {
      .content_price {
        text-align: center;
        // height: 40px;
        // line-height: 40px;
        color: $gl-brand;
        font-size: 18px;
        font-weight: bold;
        p {
          text-align: center;
        }
      }
      .content_item {
        border-top: 1px solid #e9e9e9;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        .item-name {
          margin-left: 5px;
          flex: 1;
          .price_name {
            font-size: 14px;
            font-weight: bold;
          }
        }
        .item-check {
          width: 20px;
          height: 32px;
          position: relative;
          .check-border {
            position: absolute;
            border-radius: 50%;
            border: 1px solid $gl-brand;
            width: 19px;
            height: 19px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .check_style {
            color: $gl-brand;
            font-size: 18px;
          }
        }
      }
      .content-btn {
        height: 40px;
        line-height: 40px;
        background: $gl-brand;
        color: #fff;
        text-align: center;
      }
    }
    .pay-close {
      height: 45px;
      line-height: 45px;
      position: absolute;
      top: 0px;
      right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .itemcolro {
    color: $gl-brand;
  }
  .aliplaycolro {
    color: #1296db;
  }
  .item_p {
    margin: 0px;
  }
  .pay-tool {
    position: relative;
    height: 328px;
    background-color: #fff;
    overflow: hidden;
    &-title {
      width: 100%;
      height: 30px;
      padding: 0 0.8rem;
      line-height: 30px;
      text-align: center;
      overflow: hidden;
      .icon {
        float: left;
        margin-top: 10px;
      }
      strong {
        font-size: 0.8rem;
      }
    }
    &-content {
      .pay-tool-inputs {
        height: 40px;
        margin: 15px 15px 2px 15px;
        border: 1px solid $gl-border1;
        border-radius: 3px;
        display: flex;
        .item {
          width: 16.66666666%;
          height: 40px;
          border-right: 1px solid $gl-border1;
          line-height: 40px;
          text-align: center;
          &:last-child {
            border-right: none;
          }
          .icon_dot {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
          }
          .icon_dot::before {
            content: " ";
            display: block;
            position: absolute;
            width: 12px;
            height: 12px;
            background: #000;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
          }
        }
      }
      .pay-tool-tips {
        width: 100%;
        color: #979797;
        text-align: center;
        font-size: 13px;
        a {
          margin: 0 3px;
        }
      }
      .pay-tool-link {
        text-align: center;
        .link {
          font-size: 10px;
          color: #3c8cfb;
        }
      }
    }
    .pay-tool-keyboard {
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
      .keyboard_ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .keyboard_li {
          width: 32%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-right: 1px solid $gl-border1;
          border-bottom: 1px solid $gl-border1;
          font-size: 20px;
          font-weight: bold;
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            border-top: 1px solid $gl-border1;
          }
          &:nth-child(3),
          &:nth-child(6),
          &:nth-child(9),
          &:nth-child(12) {
            border-right: none;
          }
          &:nth-child(10),
          &:nth-child(11),
          &:nth-child(12) {
            border-bottom: none;
          }
          &:nth-child(10),
          &:nth-child(12),
          &:active {
            background-color: $gl-border4;
          }
          &:nth-child(12):active {
            background-color: #fff;
          }
        }
        .keyboard_li:nth-child(3n) {
          width: 34%;
        }
        .icon-del {
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .pay-tool-title {
    height: 40px;
    border-bottom: 1px solid $gl-border1;
    line-height: 40px;
    .trade-password {
      height: 40px;
      line-height: 40px;
    }
  }
  .trade-password {
    font-size: 15px;
  }
  .zlcl_color {
    height: 40px;
    line-height: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
  .pay-tool_forget {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #979797;
    text-align: center;
  }
  .uni-mask {
    position: fixed;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .uni-popup {
    position: fixed;
    z-index: 999;
    background-color: #ffffff;
    box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
  }

  .uni-popup-middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 380upx;
    height: 380upx;
    border-radius: 10upx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    padding: 30upx;
  }

  .uni-popup-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 100upx;
    line-height: 100upx;
  }

  .uni-popup-bottom {
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .uni-popup-bottom_popup {
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
