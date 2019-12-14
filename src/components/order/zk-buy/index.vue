<template>
  <view>
    <order-address v-model="addressId"></order-address>
    <view v-if="ready">
      <view v-for="(item,index) in viewModel.storeItems" :key="index">
        <x-cell :title="item.storeName"></x-cell>
        <div class="order-buy-content">
          <view class="content-item_box" v-for="(t,i) in item.productSkuItems" :key="i">
            <view class="content-item flex">
              <div class="content-item_left">
                <img class="content_img" :src="t.thumbnailUrl" alt="">
              </div>
              <div class="content-item_right flex_one">
                <p class="item_title">
                  {{t.name}}
                </p>
                <p class="item_specification">
                  {{t.propertyValueDesc}}
                </p>
                <div class="item-price-box">
                  <p class="item-price_now">
                    ￥{{t.displayPrice}}
                  </p>
                  <!-- <p class="item-price_old">
                      ￥{{t.marketPrice }}
                    </p> -->
                </div>
                <div class="item_quantity">
                  ×{{t.buyCount}}
                </div>
              </div>
            </view>
          </view>
        </div>
        <x-cell v-if="false" title="请选择快递方式" @click="popupVisible1=!popupVisible1" isLink :value="showDeliveryName[index]"></x-cell>
        <view class="leave-word_box">
          <div>备注：</div>
          <input placeholder="请填写备注信息" v-model="userMessages[index]" class="word_input" />
        </view>
        <div class="order-buy-account " v-if="ready">
          <!-- <div class="grade">自提
          <div> -->
          <!-- <checkbox-group> -->
          <!-- <label @click="checkboxChange(index)">
              <checkbox value="true" />
            </label> -->
          <!-- </checkbox-group> -->
          <!--  </div>
        </div> -->
          <div class="grade" v-if="showAdmin&&checkedFC">会员优惠({{$user.loginUser().gradeName}})
            <span style="color:#c81432;">-￥{{storePrices[index].memberDiscountAmount}}</span>
          </div>
          <div class="grade">
            <span>商品总价</span>
            <span style="color:#c81432;">￥{{totalPrice[index]}}</span>
          </div>

          <div class="account-content" v-if="ready">

            <!-- <span>{{item.totalCount}}</span>件商品&nbsp;&nbsp;&nbsp;&nbsp; 运费: -->
            <div class="brand" style=";display:flex;justify-content: space-between">
              <span style="color:#000;font-size:13px">运费</span>
              <span>￥{{storePrices[index].expressAmount }}</span>
            </div>
            <!-- <view class="uni-list" v-if="ready&&viewModel.allowMoneys.length!==0">
              <view class="uni-list-cell uni-list-cell-pd discount" style="display:felx;justify-content: space-between">
                <span style="color:#000;font-size:13px">{{viewModel.allowMoneys[0].title}}</span>
                <switch @change="changeReduceMoney" :checked="checkedFC" style="transform:scale(0.6)" />
              </view>
            </view> -->
            <div class="brand" style="display:flex;justify-content: space-between">
              <span style="color:#000;font-size:13px">实付款</span>
              <span v-if="showAdmin&&checkedFC">￥{{storePrices[index].totalAmount}}</span>
              <span v-else>￥{{priceView.totalAmount}}</span>
            </div>
          </div>
        </div>
        <view class="uni-list" v-if="item.coupons!==undefined&&item.coupons.length!==0">
          <view class="uni-list-cell uni-list-cell-pd" @click="couponsClick(item.coupons)">
            <view class="uni-list-cell-db">商品优惠卷</view>
            <view style="display:flex">{{couponsMsg}} <x-icon name="icon-zk-right" color="#dddddd"></x-icon>
            </view>
            <!-- <switch @change="changeReduceMoney" :checked="true" disabled /> -->
          </view>
        </view>
      </view>
    </view>

    <div class="order-buy-bottom_placeholder"></div>
    <div class="order-buy-bottom" v-if="ready">
      <div class="buy-bottom_left">
        合计：
        <span class="brand" v-if="priceView">
          <span class="brand_span">￥</span>{{priceView.totalAmount}}
        </span>
        <span class="brand" v-else>
          <span class="brand_span">￥</span>
        </span>
        <span style="font-size:13px;margin-left:5px;color:#666">共{{viewModel.totalCount}}件商品</span>
      </div>
      <div class="buy-bottom_right">
        <!-- <button class="buy_button" :disabled="disBtn" @click="buy()"></button> -->
        <div class="buy_button" @click="buy()" v-if="showBtn">提交订单</div>
        <div class="buy_button disabled" v-if="!showBtn">提交订单</div>
      </div>
    </div>
    <!-- <div class="order-buy_modal" @click="popupVisible1=false" v-if="popupVisible1===true">
    </div> -->
    <view class="uni-mask" v-show="couponsBox" @click="couponsBox=false"></view>
    <view class="show-popup uni-popup-bottom_popup" v-show="couponsBox">
      <view class="discounts-title">优惠详情</view>
      <view class="discounts-pla"></view>
      <view class="uni-list discounts-box">
        <radio-group>
          <label class="uni-list-cell uni-list-cell-pd" @click="radioChange(-1)">
            <view>不使用</view>
            <view>
              <radio :value="'-1'" :checked="-1 === currentss" />
            </view>
          </label>
          <label class="uni-list-cell " v-for="(item, index) in couponsList" :key="index" @click="radioChange(index,item)">
            <view class="discounts-item">
              <div class="discounts-item-top">
                {{item.name}}(<span style="color:#e4393c">优惠￥{{item.value}})</span>
              </div>
              <div class="discounts-item-bottom">
                有效期至{{item.endValidityTime}}
              </div>
            </view>
            <view>
              <radio :value="String(item.storeId)" :checked="index === currentss" />
            </view>

          </label>
        </radio-group>
      </view>
    </view>
    <x-pay ref="show_pay" :top="0"></x-pay>
  </view>

</template>

<script>
  import orderAddress from './address.vue'
  export default {
    components: {
      orderAddress
    },
    data () {
      return {
        currentss: -1,
        current: '-1',
        widgetModel: '',
        pageInfo: '',
        viewModel: null,
        popupVisible1: false,
        userMessages: [], // 卖家留言
        priceView: '', // 价格显示模型
        storePrices: [], // 店铺价格显示
        ready: false,
        showDeliveryTyoe: [], // 显示物流快递
        showDelivery: [], // 选择的物流快递方式
        showDeliveryName: [],
        reduceMoneys: [], // 非人民币资产信息
        addressId: '00000000-0000-0000-0000-000000000000', // 地址选择，默认为空,
        isFromCart: false, // 是否来自购物车
        isFromOrder: false, // 是否来自订货页面
        activityRecordId: 0,
        isGroupBuy: false,
        textarbool: true,
        xbuy: true,
        disBtn: false,
        showBtn: true,
        totalPrice: [],
        expressType: [],
        reduceMoneysItem: [],
        couponsBox: false,
        couponsList: [],
        couponsMsg: '无',
        CouponList: [],
        radioChanges: true,
        showAdmin: true,
        checkedFC: true
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      changeReduceMoney: function (e) {
        this.checkedFC = e.detail.value
        if (e.target.value === false) {
          this.reduceMoneysItem = []
          this.getPrice()
        } else {
          this.reduceMoneysItem = [{ key: this.viewModel.allowMoneys[0].moneyId, value: this.viewModel.allowMoneys[0].maxPayPrice }]
          this.getPrice()
        }
      },

      async init () {
        var buyProductInfo = await this.$api.localGet('buyProductInfo')
        if (buyProductInfo === undefined) {
          this.$api.toastWarn('暂无商品，清先购买商品')
        }
        if (this.widget.route.isFromCart) {
          this.isFromCart = this.widget.route.isFromCart
        }
        if (buyProductInfo.isFromOrder !== undefined) {
          this.isFromOrder = buyProductInfo.isFromOrder
        }
        var buyInfoInput = {
          userId: this.$user.loginUser().id,
          productJson: JSON.stringify(buyProductInfo)
        }
        var initResponse = await this.$api.httpPost('api/order/buyinfo', buyInfoInput)
        console.info('initResponse', initResponse)
        if (initResponse.status !== 1) {
          this.$api.toastWarn(initResponse.message)
          return false
        } else {
          this.viewModel = initResponse.result
          if (this.viewModel.allowMoneys.length !== 0) {
            this.reduceMoneysItem = [{ key: this.viewModel.allowMoneys[0].moneyId, value: this.viewModel.allowMoneys[0].maxPayPrice }]
          }
          for (var i = 0; i < this.viewModel.storeItems.length; i++) {
            this.showDeliveryTyoe[i] = {}
            this.showDelivery[i] = {}
            this.showDeliveryName[i] = []
            this.userMessages[i] = '' // 初始化留言信息
            this.expressType.push(0)
            for (var io = 0; io < this.viewModel.storeItems[i].expressTemplates.length; io++) {
              var a = {
                value: this.viewModel.storeItems[i].expressTemplates[io].value,
                name: this.viewModel.storeItems[i].expressTemplates[io].key
              }
              this.showDeliveryTyoe[i][io] = a
              if (io === 0) {
                this.showDelivery[i] = this.viewModel.storeItems[i].expressTemplates[io].key
                this.showDeliveryName[i] = this.viewModel.storeItems[i].expressTemplates[io].value
              }
            }
          }
          for (var k = 0; k < this.viewModel.allowMoneys.length; k++) {
            this.reduceMoneys[k] = true
          }
          this.getPrice()
        }
      },
      couponsClick (coupons) {
        if (this.radioChanges) {
          this.couponsList = coupons
          this.couponsBox = !this.couponsBox
        }
      },
      radioChange (index, e) {
        this.CouponList = []
        if (index !== -1) {
          this.couponsMsg = e.name
          this.CouponList.push(e.id)
        } else {
          this.couponsMsg = '无'
        }
        this.getPrice()
      },
      checkboxChange (index) {
        if (this.expressType[index] === 0) {
          this.$set(this.expressType, [index], 1)
        } else {
          this.$set(this.expressType, [index], 0)
        }
        this.getPrice()
      },
      async getPrice () {
        var storeDelivery = []
        for (var i = 0; i < this.viewModel.storeItems.length; i++) {
          var storeItem = this.viewModel.storeItems[i]
          var deliveryItem = {
            key: storeItem.storeId,
            value: this.showDelivery[i],
            ExpressType: this.expressType[i]
          }
          storeDelivery.push(deliveryItem)
        }
        var priceInput = {
          sign: this.viewModel.sign, // 传递签名
          userId: this.$user.loginUser().id, // 用户Id
          addressId: this.addressId,
          reduceMoneysJson: JSON.stringify(this.reduceMoneysItem),
          storeExpressJson: JSON.stringify(storeDelivery),
          CouponJson: JSON.stringify(this.CouponList)
        }
        var priceResponse = await this.$api.httpPost('api/order/getprice', priceInput)
        if (priceResponse.status !== 1) {
          this.$api.toastWarn(priceResponse.message)
          this.showBtn = false
        } else {
          this.priceView = priceResponse.result
          this.storePrices = this.priceView.storePrices
          var that = this
          this.storePrices.forEach((price) => {
            that.totalPrice.push((price.totalAmount - price.expressAmount).toFixed(2))
          })
          this.ready = true
          this.showBtn = true
        }
      },
      async buy () {
        try {
          this.showBtn = false
          uni.showLoading({
            title: '加载中..'
          })
          var storeBuyItems = []
          for (var i = 0; i < this.viewModel.storeItems.length; i++) {
            var storeBuyItem = this.viewModel.storeItems[i]
            var productBuyItems = []
            for (var j = 0; j < storeBuyItem.productSkuItems.length; j++) {
              var productSkuBuyItem = storeBuyItem.productSkuItems[j]
              var buyproductItem = {
                ProductSkuId: productSkuBuyItem.productSkuId,
                Count: productSkuBuyItem.buyCount,
                ProductId: productSkuBuyItem.productId,
                priceStyleId: productSkuBuyItem.priceStyleId,
                Amount: productSkuBuyItem.buyCount * productSkuBuyItem.price,
                storeId: storeBuyItem.storeId
              }
              productBuyItems.push(buyproductItem)
            }
            var buyStoreItem = {
              storeId: storeBuyItem.storeId,
              isGroupBuy: this.isGroupBuy, // 是否为拼图
              // deliveryId: this.showDelivery[i], // 运费
              userMessage: this.userMessages[i],
              totalAmount: this.priceView.storePrices[i].totalAmount, // 店铺订单总价格
              totalCount: this.viewModel.storeItems[i].totalCount, // 店铺商品总数量
              expressAmount: this.priceView.storePrices[i].expressAmount, // 店铺运费
              productAmount: this.priceView.storePrices[i].productAmount, // 店铺总商品费用
              productSkuItems: productBuyItems,
              ExpressType: this.expressType[i]
            }
            storeBuyItems.push(buyStoreItem)
          }
          // // 虚拟资产
          // var reduceMoneys = []
          // for (var r = 0; r < this.viewModel.allowMoneys.length; r++) {
          //   var allowMoneyItem = this.viewModel.allowMoneys[r]
          //   if (this.reduceMoneys[r]) {
          //     var reduceMoneyItem = {
          //       key: allowMoneyItem.moneyId,
          //       value: allowMoneyItem.maxPayPrice
          //     }
          //     reduceMoneys.push(reduceMoneyItem)
          //   }
          // }
          var buyInput = {
            // reduceMoneysJson: JSON.stringify(reduceMoneys),
            reduceMoneysJson: JSON.stringify(this.reduceMoneysItem),
            StoreOrderJson: JSON.stringify(storeBuyItems),
            addressId: this.addressId, // 选择地址Id
            payType: 3, // 支付方式
            totalAmount: this.priceView.totalAmount, // 订单总金额
            TotalCount: this.viewModel.totalCount, // 订单总商品
            paymentAmount: this.priceView.totalAmount, // 订单总金额
            orderType: 1, // 订单类型
            // isGroupBuy: this.isGroupBuy, // 是否为拼团购买/*  */
            sign: this.viewModel.sign, // 签名信息
            isFromCart: this.isFromCart, // 是否从购物车购买
            isFromOrder: this.isFromOrder, // 是否从订货页面来
            userId: this.$user.loginUser().id, // 下单用户ID
            // activityRecordId: this.activityRecordId
            CouponJson: JSON.stringify(this.CouponList)
          }
          var response = await this.$api.httpPost('/api/order/buy', buyInput)
          if (response.status === 1) {
            uni.hideLoading()
            this.$refs.show_pay.$emit('payMethod', response.result.payId, response.result.payAmount, response.result.orderIds) // 唤起支付窗口
            this.radioChanges = false
          } else {
            uni.hideLoading()
            this.$api.toastWarn(response.message)
          }
          this.showBtn = true
        } catch (error) {
          this.init() // 如果出错重新请求一次服务器
        }
      },
      onChange (index, value, key) {
        this.showDeliveryName[index] = value
        this.showDelivery[index] = key
        this.getPrice()
        this.popupVisible1 = false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./style.scss";
</style>
