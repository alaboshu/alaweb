<template>
  <view class="merchant-order-info-a">
    <view class="merchant-order-info">
      <view class="order_container">
        <view class="type_shop_post">
          <view class="shop_post_content">
            <view class="content_title">
              <span>{{Store.name}}({{Store.description}})</span>
            </view>
            <view class="content_list" v-for="(item,index) in orderList" :key="index">
              <view class="list_img">
                <img :src="item.thumbnailUrl">
              </view>
              <view class="list_text">
                <view class="list_text_name">
                  <view>
                    <span>{{item.productName}}</span>
                    <span>({{item.skuName}})</span>

                  </view>
                  <span>￥{{item.price}}</span>
                </view>
                <view class="count">x {{item.count}}</view>
              </view>
            </view>
          </view>
          <view class="allMoney_count">
            <span>小计：</span>
            <span>￥{{totalMoney}}</span>
          </view>

          <view class="order_bottom">
            <view class="order_bottom_left">
              <span class="totalAmount">共计：{{totalAmount}}件商品</span>
              <view style="display:flex"><span>合计：</span><span style="font-size:18px">￥{{totalMoney}}</span></view>
            </view>
            <view class="order_bottom_right" @click="submit()">确认订单</view>
          </view>
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
        widgetModel: {},
        show: false,
        orderList: [],
        totalMoney: '', // 订单总价
        totalAmount: '',
        paraList: {}, // 支付参数
        feeAmount: '',
        memberWidget: null,
        merchantStoreId: '',
        Store: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var merchantStoreId = this.$user.loginUser().merchantStoreId
        this.merchantStoreId = merchantStoreId
        var para = {
          loginUserId: this.$user.id(),
          merchantStoreId: this.merchantStoreId
        }
        var MerRes = await this.$api.httpGet('/Api/MerchantProduct/GetMerchantProducts', para)
        if (MerRes.status === 1) {
          this.Store = MerRes.result.merchantStore
        }
        var para = this.$api.localGet('order')
        this.paraList = para
        this.widgetModel = await this.$api.httpPost('/Api/MerchantOrder/BuyInfo', para)
        if (this.widgetModel.status === 1) {
          this.orderList = this.widgetModel.result.products
          this.totalMoney = this.widgetModel.result.totalAmount
          this.totalAmount = this.widgetModel.result.totalCount
          this.feeAmount = this.widgetModel.result.feeAmount
        }
      },
      change (index) {
        this.num = index
      },
      showAddress () {
        this.show = true
      },
      async submit () {
        if (!this.$user.isLogin()) {
          uni.showToast({
            icon: 'none',
            title: '请'
          })
          this.$user.toLogin()
        } else {
          var para = {
            userId: this.$user.id(),
            MerchantStoreId: this.paraList.MerchantStoreId,
            totalCount: this.totalAmount,
            totalAmount: this.totalMoney,
            PaymentAmount: this.totalMoney,
            PayType: 1,
            feeAmount: this.feeAmount,
            products: this.orderList
          }
          var res = await this.$api.httpPost('/Api/MerchantOrder/Buy', para)
          var _this = this
          if (res.status === 1) {
            this.closeTimer = setTimeout(() => {
              _this.$refs.show_pay.$emit('payMethod', res.result.payId, res.result.payAmount, res.result.orderIds, '/pages/index?path=merchant_order_view&id=' + res.result.orderIds, _this.widget.name)
            }, 2000)
          } else {
            this.$api.to('/pages/index?path=merchant_order_view&id=' + res.result.orderIds)
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>

