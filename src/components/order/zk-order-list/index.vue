<template>
  <!-- <view class="zk-order-list">{{widgetModel}}</view> -->
  <view class="zk-order-list" :style="'height:'+ksheight+'px;'">
    <view class="uni-tab-bar">
      <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
        <view v-for="(tab,index) in type.title" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'navActive' : '']" :id="index" :data-current="index" @tap="tapTab">{{tab.name}}</view>
      </scroll-view>
      <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" :style="'height:'+scrollViewHeight+'px'">
        <swiper-item v-for="(tabs,index1) in type.title" :key="index1">
          <scroll-view class="list" scroll-y :style="'height:'+scrollViewHeight+'px'" @scrolltolower="scrolltolower">
            <view class="order-index_content" v-for="(conter,index2) in viewModel" :key="index2">
              <ul class="content-item_box">
                <li class="content-item" v-for="(t,i) in conter.outOrderProducts" :key="i">
                  <view class="content-item_title">
                    <view class="item_title-hd">
                      {{conter.storeName}}
                      <i class="icon iconfont zk-jiantou"></i>
                    </view>
                    <view class="item_title-ft">{{conter.orderStatuName}}</view>
                  </view>
                  <view class="item-style_box flex" @click="isShow(conter.outOrderProducts,conter.id)">
                    <view class="content-item_left">
                      <image :src="t.thumbnailUrl" alt class="item_left_img" />
                    </view>
                    <view class=" content-item_right flex_one">
                      <view class="item_right_message">
                        <view class="item_title">{{t.name}}</view>
                        <p class="item_specification">{{t.propertyValueDesc}}</p>
                      </view>
                      <view class="item_right_price">
                        <p class="right_dsipalyprice">{{t.displayPrice}}</p>
                        <span class="right_buycount">×{{t.buyCount}}</span>
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
                <view v-if="conter.orderStatus===1" class="bten main" @click="buy(conter.id)">付款</view>
                <view v-if="conter.orderStatus===1" class="bten delete" @click="deleteCX(conter.id,index1,index2)">取消</view>
              </view>
            </view>
            <view class="ck_img" v-if="viewModel.length===0" :style="'height:'+scrollViewHeight+'px;'">
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
  export default {

    data () {
      return {
        widgetModel: '',
        ksheight: '',
        type: {
          num: [99, 1, 2, 3, 4, 200],
          // title: ['待付款', '待发货', '待收货', '待评价', '已关闭']
          title: [
            { name: '全部', value: [] },
            { name: '待付款', value: [] },
            { name: '待发货', value: [] },
            { name: '待收货', value: [] },
            { name: '待评价', value: [] }
            // { name: '已关闭', value: [] }
          ]
        },
        scrollLeft: 0,
        tabIndex: 0,
        isClickChange: false,
        viewModel: [],
        scrollViewHeight: 0,
        orderStatus: 0,
        parmenter: {
          userId: this.$user.id(),
          OrderStatus: 0,
          PageIndex: 1
        },
        notScrolltolower: true
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    onLoad () {
      if (!this.$api.isEmpty(this.widget.route.orderStatus)) {
        var orderStatus = Number(this.widget.route.orderStatus)
        this.parmenter.OrderStatus = orderStatus
        if (orderStatus === 1) {
          this.tabIndex = 1
        } else if (orderStatus === 2) {
          this.tabIndex = 2
        } else if (orderStatus === 3) {
          this.tabIndex = 3
        } else if (orderStatus === 4) {
          this.tabIndex = 4
        } else if (orderStatus === 200) {
          this.tabIndex = 5
        }
      }
    },
    methods: {
      async init () {
        var orderList = await this.$api.httpGet('/Api/Order/BuyOrderList', this.parmenter)
        if (orderList.status === 1) {
          if (this.viewModel.length === 0) {
            this.viewModel = orderList.result
          } else {
            this.viewModel = [...orderList.result, ...this.viewModel]
          }
          if (orderList.result.length < 20) {
            this.notScrolltolower = false
          } else {
            this.notScrolltolower = true
          }
        }
        var getSystemInfoSync = this.$api.getSystemInfoSync()
        this.ksheight = getSystemInfoSync.windowHeight - 46
        this.scrollViewHeight = this.ksheight - 50
      },
      scrolltolower () {
        if (this.notScrolltolower) {
          this.parmenter.PageIndex += 1
          this.init()
        }
      },
      async tapTab (e) { // 点击tab-bar
        if (this.tabIndex === e.target.dataset.current) {
          return false
        } else {
          let tabBarScrollLeft = e.target.offsetLeft// 点击的时候记录并设置scrollLeft
          this.scrollLeft = tabBarScrollLeft
          this.isClickChange = true
          this.tabIndex = e.target.dataset.current
          this.parmenter.OrderStatus = e.target.dataset.current
          this.parmenter.PageIndex = 1
          this.viewModel = []
          this.init()
        }
      },
      async changeTab (e) {
        let index = e.target.current
        this.parmenter.OrderStatus = e.target.current
        this.parmenter.PageIndex = 1
        this.viewModel = []
        this.init()
        if (this.isClickChange) {
          this.tabIndex = index
          this.isClickChange = false
          return
        }
        //  let tabBar = await this.getElSize('tab-bar')
        this.isClickChange = false
        this.tabIndex = index // 一旦访问data就会出问题
      },
      getElSize (id) { // 得到元素的size
        // return new Promise((res, rej) => {
        //   uni.createSelectorQuery().select('#' + id).fields({
        //     size: true,
        //     scrollOffset: true
        //   }, (data) => {
        //     res(data)
        //   }).exec()
        // })
      },
      //  支付订单
      async buy (id) {
        var para = {
          userId: this.$user.loginUser().id,
          id: id
        }
        var buyInputResponse = await this.$api.httpGet('api/order/pay', para)
        if (buyInputResponse.status !== 1) {
          this.$api.toastWarn(buyInputResponse.message)
          return
        }
        this.$refs.show_pay.$emit('payMethod', buyInputResponse.result.payId, buyInputResponse.result.payAmount, id) // 唤起支付窗口
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
        var deleteResponse = await this.$api.httpGet(/api/order / cancel', parmenter)
        if (deleteResponse !== undefined) {
          if (deleteResponse.status === 1) {
            // this.type.title[tIndex].value.splice(sIndex, 1)
            // this.init()
            // this.$api.toastSuccess(deleteResponse.message)
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
      isShow (item, id) {
        let buyProductInfo = [{
          userId: this.$user.id(),
          ProductSkuId: item[0].productSkuId,
          Count: item[0].buyCount,
          ProductId: item[0].productId,
          storeId: item[0].storeId
        }]
        this.$api.localSet('buyProductInfo_order', buyProductInfo)
        this.$api.to('/pages/index?path=order_show&id=' + id)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-order-list {
    font-size: $gl-size-base;
    background-color: $gl-light-grey;
    .item-total-price {
      background: #fff;
      display: flex;
      align-items: center;
      font-size: 13px;
      padding: 0 5px;
      .total-price_box {
        flex: 1;
        text-align: right;
        font-size: 13px;
        margin-top: 10px;
      }
    }
    .item-btn-box {
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 3px;
      padding: 5px;
      .bten,
      button {
        background: #fff;
        display: flex;
        align-items: center;
        height: 22px;
        color: #555;
        border: 1px solid #555;
        text-align: center;
        border-radius: 30px;
        padding: 0px 18px;
        font-size: 13px;
        margin-top: 15px;
      }
      .main {
        color: $gl-brand;
        border: 1px solid $gl-brand;
        margin-right: 15px;
      }
      .delete {
        color: $gl-brand;
        border: 1px solid $gl-brand;
      }
    }
    // ._ul {
    //   display: block !important;
    // }
    .ck_img {
      position: relative;
    }
    .order-nodata {
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      p {
        color: #ddd;
        font-size: 16px;
      }
      .cirlce_nodata {
        height: 70px;
        line-height: 70px;
        i {
          font-size: 70px;
          color: #ddd;
        }
      }
    }
  }
  .min-x-order-list {
    font-size: $gl-size-base;
    background-color: #f8f8f8;
  }
  .pages-order-index {
    width: 100%;
    display: flex;
    height: 100vh;
    flex-direction: column;
  }
  .flex_one {
    flex: 1;
  }
  .flex {
    display: flex;
  }

  .order-index_content {
    flex: 1;
    margin: 10px 10px 0px 10px;
    ul {
      display: block;
    }
    .content-item_box {
      height: 100%;
      overflow: auto;
      // border-radius: 10px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      margin-left: 0;
      .content-item {
        background: #fff;
        overflow: hidden;
        padding: 15px 19px;
        .content-item_title {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .item_title-hd {
            flex: 1;
            height: 100%;
            color: $gl-black;
            font-size: 13px;
            display: flex;
            .iconfont {
              font-size: 14px;
              color: #666;
              display: block;
              line-height: 22px;
              margin-left: 5px;
              margin-top: 2px;
            }
          }
          .item_title-ft {
            text-align: right;
            color: $gl-text3;
            font-size: 13px;
          }
        }
        .item-style_box {
          .content-item_left {
            display: block;
            width: 90px;
            height: 90px;
            .item_left_img {
              width: 100%;
              height: 90%;
              border-radius: 10px;
            }
          }
          .content-item_right {
            height: 90px;
            position: relative;
            display: flex;
            .item_right_message {
              flex: 1;
              padding-right: 10px;
              padding-left: 10px;
              .item_title {
                display: block;
                color: #000;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                font-size: 15px;
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
              }
            }
            .item_right_price {
              text-align: right;
              .right_dsipalyprice {
                font-size: 13px;
                text-align: right;
                margin: 0px;
              }
              .right_buycount {
                color: #adb5bd;
                font-size: 13px;
                display: block;
                margin-top: 8px;
              }
            }
          }
        }
      }
    }
  }
  .demo-wrapper {
    display: block;
    overflow: hidden;
    margin: 100px 0 50px;

    .demo-label {
      display: block;
      font-size: 13px;
      color: #555;
      margin-bottom: 0.5em;
      text-align: center;
    }
  }
  .wv-navbar {
    height: 40px;
    background-color: #f8f8f8 !important;
  }
  .order-index_navbar {
    height: 40px;
  }
  .wv-navbar__item {
    line-height: 32px;
    font-size: 14px;
  }
  .selected_transform {
    color: $gl-brand !important;
  }
  .orderlist {
    overflow: auto;
  }
  .temporarily_box {
    position: relative;
    width: 100vw;
    background-color: $gl-light;
  }
  .temporarily {
    width: 100%;
    position: absolute;
    top: 35vh;
    transform: translateY(-50%);
  }
  .temporarily_img {
    width: 100%;
  }
  .conter-tempor {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #5a5a5a;
    position: absolute;
    bottom: 0px;
  }
  .uni-swiper-tab {
    background-color: $gl-light;
    border-bottom: 1px solid $gl-border1;
    .navActive {
      color: $gl-themeColor;
    }
  }
  .ck_img {
    position: relative;
    background-color: $gl-light;
  }
  .piao {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
