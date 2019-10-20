<template >
  <div class="zk-charge">
    <div class="charge-box">
      <x-input v-model="userName" label="充值账户"></x-input>
    </div>
    <div class="charge-box">
      <x-input v-model="form.Amount" label="充值金额"></x-input>
    </div>
    <div class="charge-box">
      <x-input v-model="form.Remark" label="备注"></x-input>
    </div>
    <div class="btn-box">
      <div class="btn-sumbit" @click="sumbit">
        提交
      </div>
    </div>
    <view class="uni-mask" v-if="showPupop" @click="showPupop=false"></view>
    <view class="uni-popup uni-popup_buy uni-popup-bottom_popup" v-if="showPupop">
      <div class="pay-box">
        <div class="pay_title">确认付款</div>
        <div class="pay_content">
          <div class="content_price">
            ￥{{form.Amount}}
          </div>
          <div class="content_item" v-for="(item,index) in payMsg.payTypeList" :key="index" @click="change(item.payType)">
            <div class="item-icon">
              <x-icon class="itemcolro " :name="'icon-'+item.icon" :size="30"></x-icon>
            </div>
            <div class="item-name">
              <span class="price_name">{{item.name}}</span>
              <p class="item_p">{{item.intro}}</p>
            </div>
            <div class="item-check">
              <!-- <i class="van-icon check_style" :class="{'van-icon-checked':item.key===selectPayType,'van-icon-check':item.key!==selectPayType}"></i> -->
              <x-icon name="icon-zk-success" xClass="i-color" v-if="selectPayType===item.payType"></x-icon>
              <div class="check-border" v-if="selectPayType!==item.payType"></div>
            </div>
          </div>
          <div class="content-btn" @click="pay()">确认支付{{form.Amount}}元</div>
        </div>
        <div class="pay-close" @click="showPupop=false">
          <x-icon name="icon-zk-close" :size="30" color="#fff" style="margin-top:-4px;"></x-icon>
        </div>
      </div>
    </view>
  </div>
</template>
<script>
  import { PAY_GETLIST_GET, PAY_PAY_POST } from '@/service/all/apiUrl.js'
  import weixin from '@/service/core/weixin'
  export default {
    data () {
      return {
        userName: '储值账户',
        showPupop: false,
        selectPayType: null,
        payId: null,
        payMsg: null,
        form: {
          Amount: '',
          Remark: ''
        }

      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async   init () {

      },
      change (key) {
        this.selectPayType = key
      },
      async   sumbit () {
        if (this.$api.isEmpty(this.form.Amount)) {
          this.$api.toastWarn('金额不能为空')
        } else {
          let par = {
            ...this.form,
            userId: this.$user.id()
          }
          var response = await this.$api.httpPost('Api/Recharge/AddOnline', par)
          if (response.status === 1) {
            this.showPupop = !this.showPupop
            this.payId = response.result.id
            let paras = {
              browserType: 'recharge', // this.$api.payType(), // this.ClientType // 在gloal中获取支付方式列表
              amount: this.form.Amount,
              payId: this.payId,
              userId: this.$user.id()
            }
            var response = await this.$api.httpGet(PAY_GETLIST_GET, paras) // 获取支付方式列表
            if (response.status === 1) {
              this.payMsg = response.result
              this.selectPayType = this.payMsg.payTypeList[0].payType
            } else {
              this.$api.toastWarn(response.message)
            }
          } else {
            this.$api.toastWarn(response.message)
          }
        }
      },
      async pay () {
        let paras = {
          amount: this.form.Amount,
          payType: this.selectPayType,
          payId: this.payId,
          openId: this.$api.localGet('wechat_openId'),
          clientType: this.$api.client(),
          userId: this.$user.id()
        }
        var response = await this.$api.httpPost(PAY_PAY_POST, paras)
        if (this.selectPayType === 7) {
          // 微信支付
          await weixin.onBridgeReady(response.result, paras)
        } else if (this.selectPayType === 12) {
          weixin.Pay(response.result)
        } else {
          // 支付宝支付
          if (this.selectPayType === 3) {
            window.location.href = response.result.url
            // this.$api.to(response.result.url)
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
      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/style/variable.scss";
  .zk-charge {
    .charge-box {
      padding: 5px 10px;
      font-size: 14px !important;
      position: relative;
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
      /* height: 100upx;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  line-height: 100upx; */
    }
    .uni-popup-bottom_popup {
      left: 0;
      bottom: 0;
      width: 100%;
      /* height: 100upx;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          line-height: 100upx; */
    }
    .btn-box {
      padding: 15px;
      .btn-sumbit {
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: $gl-brand;
        color: #fff;
        font-size: 18px;
        border-radius: 5px;
      }
    }
    .charge-box::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: 97%;
      height: 1px;
      -webkit-transform: scaleY(0.3);
      -ms-transform: scaleY(0.3);
      transform: scaleY(0.3);
      background: #e5e5e5;
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
          height: 40px;
          line-height: 40px;
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
      }
    }
  }
</style>
