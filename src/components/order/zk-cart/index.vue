<template>
  <view class="zk-Cart" v-if="widgetModel">
    <div class="zk-cart-box" v-if="widgetModel.storeItems.length!==0">
      <div class="zk-cart_item" v-for="(store,storeIndex) in widgetModel.storeItems" :key="storeIndex">
        <view class="zk-Cart-head">
          <div class="zk-cart-head_radio">
            <radio :checked="storeRadio[storeIndex]" @click="stortClick(storeIndex)"></radio>
          </div>
          <text>{{store.storeName}}</text>
        </view>
        <ul class="zk-Cart-list">
          <li v-for="(productItem,productItemIndex) in store.productSkuItems" :key="productItemIndex">
            <view class="zk-Cart-list-head">
              <view class="zk-cart-item_radio">
                <radio :checked="productRadio[storeIndex][productItemIndex]" @click="productClick(storeIndex,productItemIndex)"></radio>
              </view>
              <view class="zk-cart_box">
                <view class="zk-cart_right">
                  <div class="zk-cart-item_img" @click="goDetails(productItem.productId)">
                    <img :src="productItem.thumbnailUrl" alt>
                  </div>
                  <view class="zk-cart-item_content">
                    <div class="item_content-title" @click="goDetails(productItem.productId)">{{productItem.name}}</div>
                    <div class="item_content-sku">{{productItem.propertyValueDesc}}</div>
                    <div class="item_content-info">
                      <div class="info-price" @click="goDetails(productItem.productId)">
                        ￥
                        <span>{{productItem.price}}</span>

                      </div>
                      <div class="buycounts">x{{productItem.buyCount}}
                        <!-- <x-number v-model="productItem.buyCount"></x-number> -->
                      </div>
                    </div>
                  </view>
                </view>
                <view class="zk-Cart-list-foot">
                  <div class="foot-delete" @click="deleteCart(store,productItem)">
                    <view>
                      <x-icon name="icon-zk-remove" size="14" :color="'#999999'"></x-icon>
                    </view>
                    <view class="foot_title">删除</view>
                  </div>
                </view>
              </view>
            </view>
          </li>
        </ul>
      </div>
    </div>
    <div class="zk-cart-notdata" v-else :style="'height:'+noDataHeight+'px'">
      <div class="nodata-box">
        <!-- <x-icon class="icon_data" name="zk-temporarily" :size="72" color="#ddd"></x-icon> -->
        <div class="icon_data">
          <i class="icon iconfont zk-temporarily"></i>
        </div>
        <p>暂无数据</p>
      </div>
    </div>
    <view class="zk-Cart-foot" :class="{'changeBottom':changeBottom===true}">
      <view class="zk-Cart-foot-submit">
        <view class="zk-Cart-foot-flex">
          <radio :checked="allSelect" @click="allRadioType()"></radio>
          <view>全选</view>
        </view>
        <view>
          <view>合计:</view>
          <text>￥{{money}}</text>
        </view>
      </view>
      <view class="zk-Cart-foot-commit" @click="sumbit()">提交</view>
    </view>
    <view class="zk-Cart-bg"></view>
  </view>
</template>

<script>
  import configUrl from '@/service/config.js'

  export default {

    data () {
      return {
        widgetModel: '',
        inshow: false,
        addCart: [],
        addCart2: [],
        money: '',
        configUrl: configUrl.apiBaseUrl,
        storeRadio: [],
        productRadio: [],
        allSelect: false,
        noDataHeight: 0,
        changeBottom: false
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
        var response = await this.$api.httpGet('/api/cart/getcart', { 'loginUserId': this.$user.id() })
        if (response.status === 1) {
          this.widgetModel = response.result
          this.widgetModel.storeItems.forEach((store, storeIndex) => {
            this.storeRadio.push(false)
            this.productRadio.push([])
            store.productSkuItems.forEach((product, index) => {
              this.productRadio[storeIndex][index] = false
            })
          })
          var _this = this
          uni.getSystemInfo({
            success: function (res) {
              if (_this.$api.client() === 'WeChatLite' || _this.$api.client() === 'AppPlus') {
                _this.noDataHeight = res.windowHeight - 50
              } else {
                _this.noDataHeight = res.windowHeight - 46 - 50
              }
            }
          })
          this.totalPirce()
        }
        if (this.$route.type === 'switchTab') {
          this.changeBottom = true
        }
      },
      // 删除购物车
      async   deleteCart (store, product) {
        var vueThis = this
        uni.showModal({
          title: '提示',
          content: '确定删除？',
          success: async function (res) {
            if (res.confirm) {
              let paramenter = {
                ProductSkuId: product.productSkuId,
                productId: product.productId,
                storeId: store.storeId,
                count: product.buyCount,
                userId: vueThis.$user.loginUser().id
              }
              var deleteCart = await vueThis.$api.httpGet(CART_REMOVECART_GET, paramenter)
              if (deleteCart.status === 1) {
                vueThis.$api.toastSuccess('删除成功')
                vueThis.init()
              } else {
                vueThis.$api.toastWarn(deleteCart.message)
              }
            } else if (res.cancel) {
            }
          }
        })
      },
      // 商店点击事件
      stortClick (index) {
        if (this.storeRadio[index]) {
          this.$set(this.storeRadio, [index], false)
          this.productRadioType(index, false)
        } else {
          this.$set(this.storeRadio, [index], true)
          this.productRadioType(index, true)
        }
        this.totalPirce()
        this.allType()
      },
      // 商品点击事件
      productClick (sIndex, index) {
        if (this.productRadio[sIndex][index]) {
          this.$set(this.productRadio[sIndex], [index], false)
        } else {
          this.$set(this.productRadio[sIndex], [index], true)
        }
        this.$set(this.storeRadio, [sIndex], this.productType(sIndex))
        this.allType()
        this.totalPirce()
      },
      // 控制商品状态
      productRadioType (index, type) {
        this.productRadio[index].forEach((productType, productTypeindex) => {
          this.$set(this.productRadio[index], [productTypeindex], type)
        })
      },
      // 判断商品状态
      productType (sIndex) {
        var isAllProductTrue = true
        this.productRadio[sIndex].forEach(productType => {
          if (!productType) {
            isAllProductTrue = productType
          }
        })
        return isAllProductTrue
      },
      // 判断是否触发全选
      allType () {
        var allType = true
        this.storeRadio.forEach(storeRadioType => {
          if (!storeRadioType) {
            allType = storeRadioType
          }
        })
        this.allSelect = allType
      },
      // 全选
      allRadioType () {
        this.allSelect = !this.allSelect
        if (this.allSelect) {
          this.storeRadio.forEach((storeType, storeTypeIndex) => {
            this.$set(this.storeRadio, [storeTypeIndex], true)
            this.productRadioType(storeTypeIndex, true)
          })
        } else {
          this.storeRadio.forEach((storeType, storeTypeIndex) => {
            this.$set(this.storeRadio, [storeTypeIndex], false)
            this.productRadioType(storeTypeIndex, false)
          })
        }
        this.totalPirce()
      },
      // 计算总价
      totalPirce () {
        this.money = 0
        this.productRadio.forEach((productPrice, productPriceIndex) => {
          productPrice.forEach((productItemPrice, productItemPriceIndex) => {
            if (productItemPrice) {
              this.money += (this.widgetModel.storeItems[productPriceIndex].productSkuItems[productItemPriceIndex].price * this.widgetModel.storeItems[productPriceIndex].productSkuItems[productItemPriceIndex].buyCount)
            }
          })
        })
        this.money = parseFloat(this.money).toFixed(2)
      },
      sumbit () {
        var buyProductInfo = []
        this.productRadio.forEach((productRadio, productRadioIndex) => {
          productRadio.forEach((product, productIndex) => {
            if (product) {
              var info = this.widgetModel.storeItems[productRadioIndex].productSkuItems[productIndex]
              let productinfo = {
                ProductSkuId: info.productSkuId,
                Count: info.buyCount,
                ProductId: info.productId,
                storeId: this.widgetModel.storeItems[productRadioIndex].storeId,
                userId: this.$user.loginUser().id
              }
              buyProductInfo.push(productinfo)
            }
          })
        })
        if (this.widgetModel.storeItems.length === 0) {
          this.$api.toastWarn('请先添加商品入购物车')
        } else if (buyProductInfo.length === 0) {
          this.$api.toastWarn('请先选择商品')
        } else {
          uni.showLoading({
            title: 'loading'
          })
          this.$api.localSet('buyProductInfo', buyProductInfo)
          this.$api.to('/pages/index?path=order_buy&isFromCart=true')
          // var vueThis = this
          // setTimeout(function () {
          //   vueThis.$api.to('/pages/index?path=order_buy&isFromCart=true')
          // }, 2000)
        }
      },
      goDetails (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "@/assets/style/theme.scss";
  .zk-Cart {
    .zk-cart-box {
      background: #eee;
      padding-bottom: 55px;
    }
    .zk-cart-notdata {
      background: #fff;
      .nodata-box {
        position: absolute;
        top: 42%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        .icon_data {
          height: 70px;
          line-height: 70px;
          i {
            font-size: 72px;
            color: #ddd;
          }
        }
        p {
          text-align: center;
          font-size: 16px;
          color: #ddd;
        }
      }
    }
    .zk-cart_item {
      padding-top: 10px;
      border-bottom: 2px solid #e7e7e7;
    }
    .img {
      width: 20px;
      height: 20px;
      border: 1px solid #e5e5e5;
      border-radius: 50%;
      margin-left: 15px;
    }
    .zk-Cart-head {
      background: #fff;
      height: 40px;
      display: flex;
      align-items: center;
      .zk-cart-head_radio {
        padding-left: 10px;
      }
      text {
        margin-left: 5px;
      }
      .head-edit {
        flex: 1;
        text-align: right;
        padding-right: 5px;
      }
    }
    .zk-Cart-list {
      background: $gl-border5;
      margin-left: 0;
      .zk-cart-item_radio {
        padding-left: 10px;
      }
      li {
        background-color: #ffffff;
        width: 100%;
        padding-top: 0;
        position: relative;
        margin-top: 5px;
        padding: 2px 0px;
        .zk-Cart-list-head {
          display: flex;
          align-items: center;
          padding-right: 10px;
          .zk-cart_box {
            flex: 1;
          }
          .zk-cart_right {
            display: flex;
          }
          .zk-cart-item_content {
            flex: 1;
            padding: 5px 0px;
            position: relative;
            .item_content-title {
              font-size: 12px;
              color: #000;
              font-family: "黑体";
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box !important;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              line-height: 15px;
              margin-top: 4px;
            }
            .item_content-sku {
              margin-top: 3px;
              margin-bottom: 3px;
              font-size: 12px;
              color: #999;
              padding: 2px 3px;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box !important;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              line-height: 16px;
              font-family: "黑体";
            }
            .item_content-info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .info-price {
                font-size: 12px;
                color: $gl-themeColor;
                span {
                  font-size: 14px;
                }
              }
              .buycounts {
                font-size: 12px;
                color: $gl-text6;
                margin-top: 3px;
              }
            }
          }

          .zk-cart-item_img {
            margin: 10px;
            height: 90px;
            width: 90px;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 80%;
              height: 80%;
              border-radius: 4px;
            }
          }
        }
        .zk-Cart-list-foot {
          width: 100%;
          display: flex;
          position: relative;
          justify-content: flex-end;
          .foot-delete {
            display: flex;
            align-items: center;
            margin-top: 2px;
            .foot_title {
              margin-top: 2px;
              margin-left: 3px;
              color: $gl-text6;
            }
          }
        }
        .zk-Cart-list-foot::before {
          content: "";
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          transform: scaleY(0.4);
          background: #e5e5e5;
        }
      }
      li:last-child {
        .zk-cart-item_content::before {
          content: none;
        }
      }
    }
    .zk-Cart-foot {
      width: 100%;
      height: 50px;
      clear: both;
      // position: fixed;
      background: #f9f9f9;
      bottom: 0;
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      .zk-Cart-foot-submit {
        float: left;
        width: 304px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        view {
          display: flex;
          align-items: center;
          &:nth-child(1) {
            view {
              margin-left: 10px;
            }
          }
          &:nth-child(2) {
            text {
              color: $gl-themeColor;
              font-weight: 700;
              margin-right: 10px;
            }
          }
        }
        .zk-Cart-foot-flex {
          padding-left: 15px;
        }
      }
      .zk-Cart-foot-commit {
        height: 50px;
        width: 110px;
        background: $gl-themeColor;
        text-align: center;
        line-height: 50px;
        color: white;
      }
    }
    .changeBottom {
      bottom: 100upx;
    }
    .zk-Cart-bg {
      position: fixed;
      width: 100%;
      height: 100%;
      background: #eee;
      z-index: -1;
    }
  }
</style>
