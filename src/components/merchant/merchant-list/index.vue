<template>
  <view class="merchant-list">
    <view class="merchant_list_container">
      <h4 class="shops_name">{{shop_name}}</h4>
      <view class="content_list">
        <view class="list_order">
          <view class="orders_s" v-for="(item,index) in ordersList" :key="index">
            <view class="orders_left">
              <img :src="item.thumbnailUrl" alt="" class="orders_img">
            </view>
            <view class="orders_right">
              <view class="orders_name">
                <span>{{item.productName}}</span>
                <span>￥{{item.price}}</span>
              </view>
              <view class="orders_count">x{{item.count}}</view>
            </view>
          </view>
        </view>
        <view class="all_count">
          <span>合计：</span>
          <span>￥{{paymentAmount}}</span>
        </view>
      </view>
      <view class="order_post_news">
        <h2>订单信息</h2>
        <view class="post_service">
          <span>订单号码</span>
          <span>{{serial}}</span>
        </view>
        <view class="post_service">
          <span>下单时间</span>
          <span>{{createTime}}</span>
        </view>
        <view class="post_service">
          <span>付款方式</span>
          <span>{{paymentType}}</span>
        </view>
        <view class="post_service">
          <span>支付时间</span>
          <span>{{payTime}}</span>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        shop_name: '',
        paymentAmount: '', // 订单总价
        payTime: '', // 下单时间
        paymentType: '', // 支付方式
        serial: '', // 订单编号
        ordersList: [],
        createTime: '' // 支付时间
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
        var userId = this.$user.id()
        var id = this.widget.route.id
        var res = await this.$api.httpGet(`/Api/MerchantOrder/GetOrder?id=${id}&UserId=${userId}`)
        if (res.status === 1) {
          this.widgetModel = res
          this.shop_name = this.widgetModel.result.merchantStoreName
          this.paymentAmount = this.widgetModel.result.paymentAmount
          this.payTime = this.widgetModel.result.payTime
          this.paymentType = this.widgetModel.result.paymentType
          this.serial = this.widgetModel.result.serial
          this.ordersList = this.widgetModel.result.products
          this.createTime = this.widgetModel.result.createTime
        }
      },
      goBack () {
        this.$api.to('/pages/index?path=merchant_order_list')
      }
    }
  }
</script>
