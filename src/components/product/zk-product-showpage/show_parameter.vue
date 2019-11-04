<template>
  <view v-if="productView">
    <view class="x-divider"></view>
    <view class="show-parameter">
      <view class="uni-list">
        <view class="uni-list-cell newShow_par" hover-class="uni-list-cell-hover">
          <view class="uni-list-cell-navigate uni-navigate-right" @click="showSkuBox()"><span class="show_title">已选：</span>
            <span style="padding-right:10px;color:#000;font-size:14px">{{selectSku.propertyValueDesc}}</span></view>
        </view>
        <view class="uni-list-cell newShow_par" hover-class="uni-list-cell-hover" v-if="productView.productExtensions.productCategory.displayPropertys.length!==0">
          <view class="uni-list-cell-navigate uni-navigate-right" @click="popupParameter=true"> <span class="show_title">商品参数</span></view>
        </view>
      </view>
      <view class="uni-mask" v-show="popupSale" @click="showpopupSale()" v-if="isClient"></view>
      <view class="show-popup uni-popup-bottom_popup" v-show="popupSale" v-if="isClient">
        <div class="showSale">
          <div class="sale-info">
            <div class="info-img">
              <img class="saleimg" :src="productView.thumbnailUrl" alt="">
            </div>
            <div class="info-box">
              <div class="info-name">
                {{productView.name}}
              </div>
              <div class="info-price">
                ￥{{productView.productExtensions.productSkus[0].displayPrice}}
                <span class="old_price">￥{{selectSku.marketPrice}}</span>
              </div>
              <div class="info-stock">
                <div>库存：{{selectSku.stock}}</div>
                <div class="info-stock_div">货号：{{selectSku.bn}}</div>
              </div>
            </div>
          </div>
          <div class="sale-info_box">
            <div class="sale-info-property">
              <div class="info-property_item" v-for="(item, index) in productView.productExtensions.productCategory.salePropertys" :key="index ">
                <div class="item_title ">
                  {{item.name}}
                </div>
                <div class="item_content">
                  <div class="content-checker " :class="{'active':checker[index]===sIndex}" v-for="(sale,sIndex) in item.propertyValues " :key="sIndex" @click="selectPropertys(sale,index,sIndex)" v-show="sale.isCheck">
                    {{sale.valueAlias}}
                  </div>
                </div>
              </div>
            </div>
            <div class="sale-info-number">
              <div class="number-left">购买数量</div>
              <div class="number-right" v-if="async">
                <x-number :value="buyCount" :multiplication='buCountMin' v-on:change="onNumberChange2" :min="buCountMin" :max="buCountMax"></x-number>
              </div>
            </div>
            <div class="sale-info-number_helpblock">
              <span v-show="productView.productActivityExtension.userPermissions.singleBuyCountMin!==0">商品最少需购买{{productView.productActivityExtension.userPermissions.singleBuyCountMin}}件</span>
              <span v-show="productView.productActivityExtension.userPermissions.singleBuyCountMax!==0">,单次最多购买{{productView.productActivityExtension.userPermissions.singleBuyCountMax}}件</span>
            </div>
          </div>
          <div class="selt_box">
            <div class="sale-button_box">
              <div path="javascript:" class="button-tab tab_cart" @click="addCart()" v-if="isShowCart">
                加入购物车
              </div>
              <div path="javascript:" class="button-tab tab_buy" @click="buyProduct()" :class="{'button_box_s':!isShowCart}">
                立即购买
              </div>
            </div>
          </div>
        </div>
      </view>
      <view class="uni-mask" v-show="popupParameter" @click="popupParameter=false" v-if="isClient"></view>
      <view class="show-popup uni-popup-bottom_popup" v-show="popupParameter" v-if="isClient">
        <view class="showParameter">
          <view class="p-title">
            商品参数
          </view>
          <view class="p-content">
            <x-cell v-for="(item, index) in productView.productExtensions.productCategory.displayPropertys " :key="index " :title="item.name " :value="item.displayValue "></x-cell>
          </view>
          <view class="p-button" @click="popupParameter=false">
            确定
          </view>
        </view>
      </view>
      <zk-popup :show="popupSale" v-on:hidePopup="popupSale=false" v-if="!isClient">
        <view class="showSale">
          <view class="sale-info">
            <view class="info-img">
              <image class="saleimg" :src="productView.thumbnailUrl" alt="" />
            </view>
            <view class="info-box">
              <view class="info-name">
                {{productView.name}}
              </view>
              <view class="info-price">
                ￥{{productView.productExtensions.productSkus[0].displayPrice}}
                <span class="old_price">￥{{selectSku.marketPrice}}</span>
              </view>
              <view class="info-stock">
                <view>库存：{{selectSku.stock}}</view>
                <view class="info-stock_div">货号：{{selectSku.bn}}</view>
              </view>
              <view class="info-grade">
                <div class="grade_item" v-for="(grade,gradeIndex) in selectSku.gradePriceList" :key="gradeIndex">
                  <div class="i_title">
                    <span>
                      {{grade.name}}
                    </span>

                  </div>
                  <div class="i_price">
                    ￥{{grade.price}}
                  </div>
                </div>
              </view>
            </view>
          </view>
          <view class="sale-info_box">
            <view class="sale-info-property">
              <view class="info-property_item" v-for="(item, index) in productView.productExtensions.productCategory.salePropertys" :key="index ">
                <view class="item_title ">
                  {{item.name}}
                </view>
                <view class="item_content">
                  <view class="content-checker " :class="{'active':checker[index]===sIndex}" v-for="(sale,sIndex) in item.propertyValues " :key="sIndex" @click="selectPropertys(sale,index,sIndex)" v-show="sale.isCheck">
                    {{sale.valueAlias}}
                  </view>
                </view>
              </view>
            </view>
            <view class="sale-info-number">
              <view class="number-left">购买数量</view>
              <view class="number-right" v-if="async">
                <x-number :value="buyCount" :multiplication='buCountMin' v-on:change="onNumberChange2" :min="buCountMin" :max="buCountMax"></x-number>
              </view>
            </view>
            <div class="sale-info-number_helpblock">
              <span v-show="productView.productActivityExtension.userPermissions.singleBuyCountMin!==0">商品最少需购买{{productView.productActivityExtension.userPermissions.singleBuyCountMin}}件</span>
              <span v-show="productView.productActivityExtension.userPermissions.singleBuyCountMax!==0">,单次最多购买{{productView.productActivityExtension.userPermissions.singleBuyCountMax}}件</span>
            </div>
          </view>
          <view class="selt_box">
            <view class="sale-button_box">
              <div path="javascript:" class="button-tab tab_cart" @click="addCart()" v-if="isShowCart">
                加入购物车
              </div>
              <div path="javascript:" class="button-tab tab_buy" @click="buyProduct()" :class="{'button_box_s':!isShowCart}">
                立即购买
              </div>
            </view>
          </view>
        </view>
      </zk-popup>
      <zk-popup :show="popupParameter" v-on:hidePopup="popupParameter=false" v-if="!isClient">
        <view class="showParameter">
          <view class="p-title">
            商品参数
          </view>
          <view class="p-content">
            <x-cell v-for="(item, index) in productView.productExtensions.productCategory.displayPropertys " :key="index " :title="item.name " :value="item.displayValue "></x-cell>
          </view>
          <view class="p-button" @click="popupParameter=false">
            确定
          </view>
        </view>
      </zk-popup>
    </view>
  </view>
</template>
<script>
  import { CART_ADDCART_POST } from '@/service/all/apiUrl'
  import apiBaseUrl from '@/service/config.js'
  // import { setTimeout } from 'timers'
  export default {
    props: {
      productView: {},
      isActivity: {},
      timeLimit: {},
      widget: {}
    },
    data () {
      return {
        async: false,
        popupSale: false,
        popupParameter: false,
        saleValue: '',
        selectSku: '', // 选择的商品Sku
        selectSkuDisplayPrice: '', // 选择sku的显示价格
        buyCount: 1, // 购买数量
        buCountMin: 1,
        buCountMax: Infinity,
        saleItems: [], // 商品规格属性,
        checker: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        isClient: false,
        siteUrl: '',
        isShowCart: true
      }
    },
    mounted () {
      this.inint()
      this.$nextTick(function () {
        this.$on('childMethod', function (boo) {
          this.popupSale = boo
        })
      })
    },
    onLoad () {
      this.inint()
    },
    methods: {
      showSkuBox () {
        if (this.$user.loginUser().gradeName !== '免费会员') {
          this.popupSale = true
        }
      },
      showpopupSale () {
        this.popupSale = false
      },
      inint () {
        if (this.$api.client() === 'WeChatLite' || this.$api.client() === 'AppPlus') {
          this.isClient = true
        }
        this.selectSku = this.productView.productExtensions.productSkus[0]
        this.selectSkuDisplayPrice = this.productView.productExtensions.productSkus[0].displayPrice
        for (var i = 0; i < this.productView.productExtensions.productCategory.salePropertys.length; i++) {
          this.saleItems[i] = this.productView.productExtensions.productCategory.salePropertys[i].propertyValues[0]
        }
        this.changSku()
        this.siteUrl = apiBaseUrl.apiBaseUrl
        this.gradePrice()
        if (this.productView.productActivityExtension.userPermissions.singleBuyCountMin !== 0) {
          this.buCountMin = Number(this.productView.productActivityExtension.userPermissions.singleBuyCountMin)
          this.buyCount = this.buCountMin
        }
        if (this.productView.productActivityExtension.userPermissions.singleBuyCountMax !== 0) {
          this.buCountMax = Number(this.productView.productActivityExtension.userPermissions.singleBuyCountMax)
        }
        this.async = true
        // if (this.widget.value !== null) {
        //   if (this.widget.value.isShowCart !== undefined || this.widget.value.isShowCart !== '' || this.widget.value.isShowCart !== null) {
        //     this.isShowCart = this.widget.value.isShowCart
        //   }
        // }
      },
      gradePrice () {
        if (this.timeLimit.isTimeLimit) {
          var price
          var that = this
          this.selectSku.gradePriceList.forEach(grade => {
            if (grade.id === that.$user.loginUser().gradeId) {
              price = grade.price
            }
          })
          this.selectSkuDisplayPrice = price
        }
      },
      onNumberChange2 (value) {
        this.buyCount = value
      },
      selectPropertys (item, index, sindex) {
        this.saleItems[index] = item
        this.$set(this.checker, [index], sindex)
        this.changSku()
      },
      changSku () {
        this.selectSku = this.getSku() // 根据specSn获取商品的规格
        this.saleValue = this.selectSku.propertyValueDesc
        this.gradePrice()
      },
      getSku () {
        var specSn = ''
        this.saleItems.forEach(element => {
          specSn += element.id + '|'
        })
        var productViewTemps = this.productView
        var skus = productViewTemps.productExtensions.productSkus
        var sku = ''
        for (var i = 0; i < skus.length; i++) {
          if (skus[i].specSn === specSn) {
            sku = skus[i]
            this.selectSkuDisplayPrice = skus[i].displayPrice
          }
        }
        return sku
      },
      async addCart () {
        var that = this
        if (this.$user.loginUser() === null) {
          uni.showModal({
            title: '提示',
            content: '请先登录',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
              if (res.confirm) {
                that.$api.to('/pages/user/login')
              }
            }
          })
        } else if (this.selectSku.stock === 0) {
          this.$api.toastWarn('库存不足')
        } else {
          let params = {
            ProductSkuId: this.selectSku.id,
            productId: this.productView.id,
            storeId: this.productView.storeId,
            count: this.buyCount,
            userId: this.$user.loginUser().id
          }
          var message = await this.$api.httpPost(CART_ADDCART_POST, params)
          if (message.status === 1) {
            this.$api.toastWarn('成功加入购物车')
            this.popupSale = false
          } else {
            this.$api.toastWarn(message.message)
          }
        }
      },
      async buyProduct () {
        this.saleItems = this.saleItems
        var that = this
        if (this.selectSku.stock === 0) {
          this.$api.toastWarn('库存不足')
          return false
        }
        if (this.$user.loginUser() === null) {
          if (this.isClient) {
            // var page = getCurrentPages()
            // var href = '/' + page[0].route + '?id=' + page[0].options.id
            // this.$api.localSet('previous_page_before_login', href)
            that.$api.to('/pages/user/login')
          } else {
            // this.$api.localSet('previous_page_before_login', window.location.href)
            uni.showModal({
              title: '提示',
              content: '请先登录',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                if (res.confirm) {
                  that.$api.to('/pages/user/login')
                }
              }
            })
          }
        } else {
          let buyProductInfo = [{
            ProductSkuId: this.selectSku.id,
            Count: this.buyCount,
            ProductId: this.productView.id,
            storeId: this.productView.storeId,
            // activityRecordId: this.activitySelectId, // 活动id，参与拼团时用到
            // isGroupBuy: isGroupBuy, // 是否为拼团
            userId: this.$user.loginUser().id
          }]
          this.$api.localRemove('buyProductInfo')
          this.$api.localSet('buyProductInfo', buyProductInfo)
          this.$api.to('/pages/index?path=order_buy')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/style/variable.scss";

  .show-parameter {
    .uni-mask {
      position: fixed;
      z-index: 998;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .newShow_par {
      .show_title {
        color: #666;
        font-size: 12px;
      }
    }
    .show-popup {
      width: 100%;
      position: fixed;
      bottom: 0px;
      background-color: #ffffff;
      z-index: 999;
    }
    .uni-popup-bottom_popup {
      left: 0;
      bottom: 0;
      width: 100%;
    }
    .showSale {
      display: flex;
      flex-direction: column;
    }
    .sale-info {
      padding: 15px;
      display: flex;
      border-bottom: 1px solid #e5e5e5;
      background-color: $gl-light;
    }
    .info-img {
      width: 95px;
      height: 95px;
      margin-right: 15px;
    }
    .info-box {
      flex: 1;
      text-align: left;
    }
    .info-price {
      // color: $gl-brand;
      color: #c91230;
      font-size: 1.15em;
      font-weight: bold;
      padding: 5px 0px;
    }
    .old_price {
      color: $gl-metal;
      text-decoration: line-through;
      font-size: 0.8em;
      font-weight: normal;
    }
    .info-stock {
      color: $gl-metal;
      font-size: 12px;
    }
    .sale-info-property {
      min-height: 60px;
      padding: 5px 10px;
      border-bottom: 1px solid #e5e5e5;
    }
    .info-property_item {
      margin-bottom: 0.5rem;
      .item_title {
        text-align: left;
      }
    }
    .property_title {
      color: #000000;
      font-weight: bold;
    }
    .item_content {
      padding-top: 0.5rem;
    }
    .content-checker {
      float: left;
      padding: 2px 8px;
      background: #e5e5e5;
      color: #000;
      border-radius: 5px;
      font-size: $gl-h6-size;
      margin-top: 8px;
      margin-right: 10px;
      margin-bottom: 8px;
    }
    .active {
      color: #fff;
      background: $gl-brand;
      background: #c91230;
    }
    .item_content:after {
      content: "";
      display: block;
      clear: both;
    }
    .sale-info-number {
      padding: 10px 15px 0 15px;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      .number-left {
        font-size: 12px;
        flex: 1;
      }
      .number-right {
        text-align: right;
      }
    }
    .sale-info-number_helpblock {
      padding: 0 15px;
      font-size: 0.66rem;
      color: #666;
      margin-bottom: 0.25rem;
      text-align: right;
    }
    .sale-button_box {
      width: 100vw;
      overflow: hidden;
      background-color: $gl-light;
      .button-tab {
        float: left;
        width: 50%;
        text-align: center;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #fff;
      }
      .tab_cart {
        // background: $gl-brand;
        background: #ff999a;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      .tab_buy {
        // background: $gl-success;
        background: #c91230;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
      .button_box_s {
        width: 100%;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
    }

    .showParameter {
      height: 70vh;
      position: relative;
      display: flex;
      flex-direction: column;
      .p-title {
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        z-index: 5;
        background-color: white;
        border-bottom: 1px solid #e5e5e5;
        color: #000000;
        font-size: 14px;
      }
      .p-content {
        height: 100%;
        overflow: auto;
      }
      .p-button {
        width: 100%;
        height: 45px;
        background: #c91230;
        text-align: center;
        line-height: 45px;
        color: #fff;
        font-size: $gl-h5-size;
      }
    }
    .weui-cells {
      margin-top: 0px !important;
    }
    .sale-info_box {
      overflow: auto;
    }
    .xuanzecolor {
      color: $gl-text2;
    }
    .borderxuanze::after {
      border-bottom: none !important;
    }
    .info-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .saleimg {
      width: 100%;
      height: 100%;
    }
    .info-stock_div {
      margin-top: 5px;
    }
    .uni-navigate-left {
      display: flex;
      align-items: center;
    }
    .uni-navigate-value {
      padding-right: 12px;
      color: #606266;
    }
    .x-divider {
      background: #f7f7f7;
      height: 10px;
      line-height: 10px;
      display: block;
      padding: 0;
      margin: 0;
    }
    .info-grade {
      margin-top: 5px;
      border-top: 1px solid #e5e5e5;
      padding-top: 5px;
      .grade_item {
        display: flex;
        .i_title {
          span {
            color: #c91230;
            border: 1px solid #c91230;
            border-radius: 20px;
            padding: 0 5px;
            font-size: 12px;
          }
        }
        .i_price {
          color: #c91230;
          margin-left: 10px;
        }
      }
    }
  }
</style>
