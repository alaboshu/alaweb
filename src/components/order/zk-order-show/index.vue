<template>
  <!-- <view class="zk-order-show">{{widgetModel}}</view> -->
  <view class="pages-order-show" v-if="async">
    <view class="min-x-order-show" element-path="min/x-order-show">
      <view class="buy-addres_box">
        <view class="address-left-icon">
          <x-icon name="icon-zk-address" :size="24"></x-icon>
        </view>
        <view class="buy-address-content">
          <view class="address-content-top">
            <view class="address-name">
              {{address.name}}
              <span class="address-mobile">{{address.mobile}}</span>
            </view>
          </view>
          <view class="address-content-bottom">
            <view class="addresss-detail">
              {{address.addressDescription}}
            </view>
          </view>
        </view>
      </view>
      <view class="x-divider"></view>
      <view class="order-show-message_box">
        <view class="content-item_title">
          <view class="item_title-hd">
            {{viewModel.storeName}}
          </view>
          <view class="item_title-ft">
            {{state}}
          </view>
        </view>
        <view class="item-style_box flex" v-for="(item,index) in viewModel.productSkuItems" :key="index">
          <view class="content-item_left">
            <img class="item_left_img" :src="item.thumbnailUrl" alt="">
          </view>
          <view class="content-item_right flex_one">
            <view class="item_right_message">
              <p class="item_title">
                {{item.name}}
              </p>
              <p class="item_specification">
                {{item.propertyValueDesc}}
              </p>
            </view>
            <view class="item_right_price">
              <p class="price-margin" v-if="showMember">￥{{item.price}}</p>
              <p class="price-margin" style="color:#c81432" v-else>{{item.displayPrice}}</p>
              <span class="price_span">×{{item.buyCount}}</span>
            </view>
          </view>
        </view>
        <view class="item-total-price">
          <view>
            <p class="frelinheng" v-if="showMember">会员优惠({{gradeName}})
              <span class="freightrigth">￥{{discounts}}</span>
            </p>
            <p class="frelinheng">商品总价
              <span class="freightrigth">￥{{parseFloat(viewModel.totalAmount-viewModel.expressAmount).toFixed(1)}}</span>
            </p>
            <p class="frelinheng">运费
              <span class="freightrigth">￥{{viewModel.expressAmount}}</span>
            </p>
            <p class="frelinheng freight_p">
              实付款(含运费)
              <span class="freightrigth realpay" v-if="showMember">￥{{viewModel.totalAmount}}</span>
              <span class="freightrigth realpay" v-else>￥{{viewModel.paymentAmount}}</span>
            </p>
          </view>
        </view>
        <view class="item-btn-box">
          <view v-if="buttomShow" class="news-but">
            <view class="main" v-for="(buts,butsIndex) in viewModel.methods" :key="butsIndex" @click="getButtom(buts)" v-show="tenementFool">{{buts.name}}</view>
          </view>
          <view class="item-but_layer" v-if="layerBool">
            <view class="layer-box">
              <view class="layer-box_head">确认商品已收到</view>
              <view class="layer-box_conter">
                <ul>
                  <li>
                    <view class="layer-lable">支付密码</view>
                    <view class="layer-input"><input v-model="paymentCode" placeholder="请输入支付密码" :password="showPassword" /></view>
                    <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
                  </li>
                </ul>
              </view>
              <view class="layer-foot">
                <view class="foot_but" @click="layerCenrt">取消</view>
                <view class="foot_but foot_but-left" @click="layerAffirm">确认</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="x-divider"></view>
      <view class="order-show-sub_message">
        <view class="order-information">订单信息</view>
        <view class="sub_message-item">
          <span class="sub_span">订单编号:</span>{{viewModel.serial}}
        </view>
        <view class="sub_message-item">
          <span class="sub_span">总金额:</span>￥{{viewModel.totalAmount}}
        </view>
        <view class="sub_message-item" v-if="!showMember&&FCTitle!==''">
          <span class="sub_span" style="width:160px;">{{FCTitle}}</span>
        </view>
        <view class="sub_message-item">
          <span class="sub_span">现金支付:</span>￥{{viewModel.paymentAmount}}
        </view>
        <view class="sub_message-item">
          <span class="sub_span">总数量:</span>{{viewModel.totalCount}}
        </view>
        <view class="sub_message-item">
          <span class="sub_span">创建时间:</span>{{viewModel.createTime}}
        </view>
        <view class="sub_message-item" v-if="viewModel.paymentType !=='0'">
          <span class="sub_span">付款时间:</span>{{viewModel.payTime}}
        </view>
        <view class="sub_message-item" v-if="viewModel.paymentType !=='0'">
          <span class="sub_span">付款方式:</span>{{viewModel.paymentType}}
        </view>
        <view class="sub_message-item" v-if="LeaveMessage">
          <span class="sub_span">买家留言:</span>{{LeaveMessage}}
        </view>
      </view>
    </view>
    <x-pay ref="show_pay"></x-pay>
  </view>
</template>

<script>

  import { ORDER_PAY_GET } from '@/service/all/apiUrl'
  import local from '@/service/utils/local.js'
  import apiBaseUrl from '@/service/config.js'
  export default {

    data () {
      return {
        async: false,
        widgetModel: '',
        address: '',
        viewModel: '',
        showPay: false,
        state: '',
        paymentButton: '',
        cancelButton: '',
        buttomShow: true,
        showPassword: true,
        layerBool: false,
        affirmApi: '',
        paymentCode: '',
        gradeName: null,
        discounts: 0,
        tenementFool: true,
        showMember: true,
        FCTitle: '',
        LeaveMessage: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        let parameter = {
          id: this.widget.route.id,
          loginUserId: this.$user.id()
        }
        var orderShowResponse = await this.$api.httpGet('/Api/Order/GetOrder', parameter)

        this.gradeName = this.$user.loginUser().gradeName
        if (orderShowResponse.status !== 1) {
          this.$api.toastWarn(orderShowResponse.message)
        }
        if (orderShowResponse !== undefined) {
          this.viewModel = orderShowResponse.result
          if (this.viewModel !== undefined) {
            this.address = this.viewModel.order.orderExtension.userAddress
            if (this.viewModel.orderStatus === 1) {
              this.state = '待付款'
              this.showPay = true
            } else if (this.viewModel.orderStatus === 2) {
              this.state = '待发货'
            } else if (this.viewModel.orderStatus === 3) {
              this.state = '待收货'
            } else if (this.viewModel.orderStatus === 4) {
              this.state = '待评价'
            } else if (this.viewModel.orderStatus === 10) {
              this.state = '待分享'
            } else if (this.viewModel.orderStatus === 50) {
              this.state = '退款/退货中'
            } else if (this.viewModel.orderStatus === 51) {
              this.state = '待退款'
            } else if (this.viewModel.orderStatus === 200) {
              this.state = '订单关闭'
            } else if (this.viewModel.orderStatus === 201) {
              this.state = '订单关闭，已退款'
            }
          }
          var gradePrice = 0
          this.viewModel.productSkuItems.forEach(item => {
            if (item.platformPrice !== 0) {
              gradePrice = gradePrice + (item.platformPrice - item.price)
            }
          })
          this.discounts = gradePrice.toFixed(2)
        }
        if (this.viewModel.methods.length !== 0) {
          this.paymentButton = this.viewModel.methods[0]
          this.cancelButton = this.viewModel.methods[1]
        } else {
          this.buttomShow = false
        }
        this.async = true
        for (var i = 0; i < this.viewModel.methods.length; i++) {
          if (this.viewModel.methods[i].type === 'Refund') {
  
          }
        }
        if (apiBaseUrl.themeId === '5d26e11a064c25053c9b3def') {
          this.showMember = false
        }
        this.FCTitle = orderShowResponse.result.order.orderExtension.allowMoneys[0].title
        this.LeaveMessage = orderShowResponse.result.order.orderExtension.message.buyerMessage
      },
      changePassword: function () {
        this.showPassword = !this.showPassword
      },
      layerCenrt () {
        this.layerBool = false
      },

      getButtom (value) {
        if (value.type === 'Pay') {
          this.buy()
        } else if (value.type === 'Cancel') {
          this.getCancel(value.method)
        } else if (value.type === 'Confirm') {
          this.layerBool = true
          this.confirmReceipt(value.method)
        } else if (value.type === 'ExpressInfo') {
          this.checkLogistics(value.method)
        } else if (value.type === 'AfterSale' || value.type === 'Refund') {
          this.returned(value)
        } else if (value.type === 'UserRefundInfo') {
          this.refundDetail(value)
        }
      },
      //  支付订单
      async buy () {
        var para = {
          id: this.viewModel.id,
          loginUserId: this.$user.id()
        }
        var buyInputResponse = await this.$api.httpGet(ORDER_PAY_GET, para)
        this.$refs.show_pay.$emit('payMethod', buyInputResponse.result.payId, buyInputResponse.result.payAmount, buyInputResponse.result.orderIds) // 唤起支付窗口
      },
      async getCancel (api) {
        var para = {
          loginUserId: this.$user.loginUser().id,
          id: this.viewModel.id
        }
        var repones = await this.$api.httpGet(api, para)
        var this_ = this
        uni.showModal({
          showCancel: true,
          content: '确认取消',
          success: function (res) {
            if (res.confirm) {
              if (repones.status !== 1) {
                this_.$api.toastWarn(repones.message)
              } else {
                this_.$api.toastSuccess(repones.message)
                setTimeout(function () {
                  this_.init()
                }, 1000)
              }
            }
          }
        })
      },
      async confirmReceipt (api) {
        this.affirmApi = api
      },
      async checkLogistics (api) {
        this.$api.to('/pages/index?path=order_logistics_list&id=' + this.viewModel.id)
      },
      async returned (value) {
        local.set('OrderDetails', this.viewModel)
        this.$api.to('/pages/index?path=order_refund_edit&id=' + this.viewModel.id + '&type=' + value.type)
      },
      async layerAffirm () {
        var para = {
          loginUserId: this.$user.loginUser().id,
          entityId: this.viewModel.id,
          payPassword: this.paymentCode
        }
        var repones = await this.$api.httpPost(this.affirmApi, para)
        if (repones.status !== 1) {
          this.$api.toastWarn(repones.message)
        } else {
          this.$api.toastSuccess('确认收货成功')
          this.layerBool = false
          var this_ = this
          setTimeout(function () {
            this_.init()
          }, 1500)
        }
      },
      async refundDetail (value) {
        this.$api.to('/pages/index?path=order_refund_edit&id=' + this.viewModel.id + '&type=' + value.type)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  .zk-order-show {
    font-size: $gl-size-base;
  }
  .min-x-order-show {
    font-size: $gl-size-base;
  }
  .pages-order-show {
    width: 100%;
    .buy-addres_box {
      padding-left: 45px;
      padding-right: 10px;
      position: relative;
      padding-top: 5px;
      padding-bottom: 5px;
      .buy-address-content {
        width: 100%;
        padding: 8px 0px;
        .address-content-top {
          display: flex;
          .address-name {
            flex: 1;
            display: flex;
            justify-content: space-between;
          }
        }
        .address-content-bottom {
          margin-top: 5px;
          .addresss-detail {
            font-size: 13px;
            line-height: 16px;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
      .address-left-icon {
        position: absolute;
        height: 35px;
        width: 45px;
        text-align: center;
        line-height: 30px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      .address-right-icon {
        position: absolute;
        height: 30px;
        width: 30px;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
    .flex_one {
      flex: 1;
    }
    .flex {
      display: flex;
    }
    .order-show-message_box {
      background: #fff;
      .content-item_title {
        height: 30px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        .item_title-hd {
          flex: 1;
          height: 30px;
          line-height: 30px;
        }
        .item_title-ft {
          text-align: right;
          color: $gl-brand;
        }
      }
      .item-style_box {
        padding: 10px;
        background: $gl-border5;
        margin-bottom: 1px;
        .content-item_left {
          width: 80px;
          height: 80px;
          .item_left_img {
            width: 100%;
            height: 100%;
          }
        }
        .content-item_right {
          height: 80px;
          padding-left: 10px;
          position: relative;
          display: flex;
          padding-right: 100px;
          .item_right_message {
            .item_title {
              font-size: 13px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              line-height: 16px;
              margin-top: 0;
              margin-bottom: 0;
            }
            .item_specification {
              margin-top: 5px;
              font-size: 12px;
              color: $gl-text3;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              line-height: 16px;
            }
          }
          .item_right_price {
            position: absolute;
            width: 100px;
            top: -3px;
            right: 0;
            text-align: right;
            .price-margin {
              margin: 0px;
              font-size: 13px;
              text-align: right;
            }
            .price_span {
              color: #adb5bd;
              font-size: 12px;
            }
          }
        }
      }
      .item-total-price {
        padding: 5px 15px;
        // display: flex;
        align-items: center;
        div {
          flex: 1;
          .num {
            color: $gl-brand;
          }
        }
      }
      .item-btn-box {
        width: 100vw;
        border-top: 1px solid $gl-light-grey;
        background-color: $gl-light;
        position: fixed;
        bottom: 0px;
        z-index: 999;
        height: 50px;
        // padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px solid #e5e5e5;
        .news-but {
          display: flex;
          align-items: center;
        }
        .main,
        button {
          // width: 85px;
          margin-right: 15px;
          background: #fff;
          height: 30px;
          line-height: 30px;
          color: #555;
          border: 1px solid #555;
          padding: 0px 15px;
        }
        .main {
          color: $gl-brand;
          border: 1px solid $gl-brand;
          border-radius: 30px;
        }
        .main-cancel {
          color: $gl-text6;
          border: 1px solid $gl-text6;
        }
        .item-but_layer {
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          position: fixed;
          top: 0px;
          left: 0px;
          .layer-box {
            background: #fff;
            width: 85%;
            border-radius: 4px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .layer-box_head {
              font-size: 15px;
              width: 100%;
              height: 60px;
              text-align: center;
              line-height: 60px;
            }
            .layer-box_conter {
              width: 100%;
              ul {
                width: 100%;
                margin-left: 0px;
                border-top: 1px solid $gl-border5;
                li {
                  width: 100%;
                  border-bottom: 1px solid $gl-border5;
                  display: flex;
                  align-items: center;
                  padding: 8px 10px;
                  .layer-lable {
                    width: 80px;
                    margin-right: 5px;
                    font-size: 12px;
                  }
                  .layer-input {
                    flex: 1;
                  }
                  .uni-icon-eye {
                    font-size: 20px;
                    color: #909399;
                  }
                }
              }
            }
            .layer-foot {
              width: 100%;
              display: flex;
              align-items: center;
              .foot_but {
                color: rgb(0, 0, 0);
                font-size: 16px;
                font-weight: 500;
                flex: 1;
                text-align: center;
                padding: 10px 0px;
              }
              .foot_but-left {
                border-left: 1px solid $gl-border5;
              }
            }
          }
        }
      }
    }
    .order-show-sub_message {
      border-bottom: 1px solid $gl-border2;
      padding: 5px 15px;
      margin-bottom: 30upx;
      .sub_message-item {
        color: $gl-text2;
        font-size: 12px;
      }
    }
  }
  .address-mobile {
    color: $gl-text3;
    margin-left: 8px;
  }
  .freight_p {
    font-size: 14px;
    color: $gl-text2;
  }
  .frelinheng {
    height: 24px;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
  }
  .realpay {
    color: $gl-brand;
  }
  .order-information {
    height: 14px;
    line-height: 14px;
    border-left: 2px solid $gl-brand;
    padding: 0px 5px;
    font-size: 14px;
    margin: 10px 0px;
  }
  .sub_span {
    display: inline-block;
    width: 90px;
  }
  .sub_message-item {
    margin-top: 8px;
  }
  .x-divider {
    background: #f7f7f7;
    height: 10px;
    line-height: 10px;
    display: block;
    padding: 0;
    margin: 0;
  }
</style>
