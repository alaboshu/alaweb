<template>
  <view class="merchant-order-list" :style="'height:'+ksheight+'px;'">
    <view class="uni-tab-bar">
      <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
        <view v-for="(tab,index) in type.title" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'navActive' : '']" :id="index" :data-current="index" @tap="tapTab">{{tab.name}}</view>
      </scroll-view>
      <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
        <swiper-item v-for="(tabs,index1) in type.title" :key="index1">
          <scroll-view class="list" scroll-y>
            <view class="order-index_content" v-for="(conter,index2) in tabs.value" :key="index2">
              <ul class="content-item_box">
                <li class="content-item" v-for="(t,i) in conter.products" :key="i">
                  <view class="content-item_title">
                    <view class="item_title-hd">
                      {{conter.merchantStoreName}}
                      <i class="icon iconfont zk-jiantou"></i>
                    </view>
                    <view class="item_title-ft">{{conter.productName}}</view>
                  </view>
                  <view class="item-style_box flex" @click="isShow(conter.products,conter.id)">
                    <view class="content-item_left">
                      <image :src="t.thumbnailUrl" alt class="item_left_img" />
                    </view>
                    <view class=" content-item_right flex_one">
                      <view class="item_right_message">
                        <view class="item_title">{{t.productName}}</view>
                        <p class="item_specification">{{t.skuName}}</p>
                      </view>
                      <view class="item_right_price">
                        <p class="right_dsipalyprice">{{t.price}}</p>
                        <span class="right_buycount">×{{t.count}}</span>
                      </view>
                    </view>
                  </view>

                </li>
              </ul>
              <view class="item-total-price">
                <view class="total-price_box">
                  共
                  <span class="num">{{conter.totalCount}}</span>件商品&nbsp;&nbsp;&nbsp;&nbsp;合计:
                  <span class="num">￥{{conter.paymentAmount}}</span>(含运费
                  <span class="num">￥{{conter.expressAmount}}</span>)
                </view>
              </view>
              <view class="item-btn-box">
                <view v-if="conter.merchantOrderStatus===1" class="bten main" @click="buy(conter)">付款</view>
              </view>
            </view>
            <view v-if="tabs.value.length==0" class="ck_img" :style="'height:'+noHeight+'px;'">
              <div class="order-nodata">
                <div class="cirlce_nodata">
                  <i class="icon iconfont zk-temporarily" size="72"></i>
                </div>
                <p>暂无数据</p>
              </div>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
      <x-pay ref="show_pay"></x-pay>
    </view>
  </view>
</template>

<script>

  import { ORDER_CANCEL_GET } from '@/service/all/apiUrl'
  export default {

    data () {
      return {
        widgetModel: '',
        ksheight: '',
        type: {
          num: [99, 1, 2, 3, 4, 200],
          title: [
            { name: '全部', value: [] },
            { name: '待付款', value: [] },
            { name: '已完成', value: [] },
            { name: '已关闭', value: [] }
          ]
        },
        scrollLeft: 0,
        tabIndex: 0,
        newsitems: [{ name: '1' }, { name: '2' }, { name: '3' }],
        isClickChange: false,
        orderType: {
          stayPayment: [],
          stayDeliver: [],
          stayTake: [],
          stayEvaluate: [],
          stayShare: [],
          stayClose: []
        },
        viewModel: '',
        hzheight: '',
        noHeight: '',
        testHeight: ''
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
        var para = {
          UserId: this.$user.id()
        }
        var res = await this.$api.httpGet(`/Api/MerchantOrder/BuyOrderList`, para)
        if (res.status === 1) {
          this.widgetModel = res.result
          this.type.title[0].value = this.widgetModel
        }
        var than_ = this
        uni.createSelectorQuery().select('#tab-bar').boundingClientRect(function (e) {
          than_.hzheight = e.height
        }).exec()
        uni.createSelectorQuery().select('.uni-swiper-tab').boundingClientRect(function (e) {
          than_.testHeight = e.height
        }).exec()
        this.ksheight = this.$api.getSystemInfoSync().windowHeight - 96
        this.noHeight = this.ksheight - this.testHeight
        var orderList = await this.$api.httpGet(`/Api/MerchantOrder/BuyOrderList`, para)
        this.viewModel = orderList.result
        this.type.title.forEach((list) => {
          list.value = []
        })
        for (var i = 0; i < this.viewModel.length; i++) {
          this.type.title[0].value.push(this.viewModel[i])
          if (this.viewModel[i].merchantOrderStatus === 1) {
            this.type.title[1].value.push(this.viewModel[i])
          }
          if (this.viewModel[i].merchantOrderStatus === 2) {
            this.type.title[2].value.push(this.viewModel[i])
          }
          if (this.viewModel[i].merchantOrderStatus === 3) {
            this.type.title[3].value.push(this.viewModel[i])
          }
          if (this.viewModel[i].merchantOrderStatus === 4) {
            this.type.title[4].value.push(this.viewModel[i])
          }
        }
      },
      async tapTab (e) {
        if (this.tabIndex === e.target.dataset.current) {
          return false
        } else {
          let tabBarScrollLeft = e.target.offsetLeft
          this.scrollLeft = tabBarScrollLeft
          this.isClickChange = true
          this.tabIndex = e.target.dataset.current
        }
      },
      async changeTab (e) {
        let index = e.target.current
        if (this.isClickChange) {
          this.tabIndex = index
          this.isClickChange = false
          return
        }
        this.isClickChange = false
        this.tabIndex = index
      },
      getElSize (id) {
      },
      async buy (count) {
        this.$refs.show_pay.$emit('payMethod', count.payId, count.totalAmount, count.id, '/pages/index?path=merchant_order_view&id=' + count.id) // 唤起支付窗口
      },
      // 取消订单
      async deleteCX (id, tIndex, sIndex) {
        var that = this
        uni.showModal({
          content: '确定取消',
          success: function (res) {
            if (res.confirm) {
              that.getUrl(id, tIndex, sIndex)
            } else if (res.cancel) {
            }
          }
        })
      },
      async getUrl (id, tIndex, sIndex) {
        let parmenter = {
          userId: this.$user.id(),
          id: id
        }
        var deleteResponse = await this.$api.httpGet(ORDER_CANCEL_GET, parmenter)
        if (deleteResponse !== undefined) {
          if (deleteResponse.status === 1) {
            var this_ = this
            uni.showModal({
              showCancel: false,
              confirmText: '完成',
              content: deleteResponse.message,
              success: function (res) {
                if (res.confirm) {
                  this_.init()
                } else if (res.cancel) {
                }
              }
            })
          } else {
            this.$api.toastWarn(deleteResponse.message)
          }
        }
      },
      async isShow (item, id) {
        let buyProductInfo = [{
          userId: this.$user.id(),
          ProductSkuId: item[0].productSkuId,
          Count: item[0].buyCount,
          ProductId: item[0].productId,
          storeId: item[0].storeId
        }]
        this.$api.localSet('buyProductInfo_order', buyProductInfo)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "./var.scss";
</style>
