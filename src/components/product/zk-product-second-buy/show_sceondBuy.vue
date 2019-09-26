<template>
  <view class="show_sceondBuy" id="showIntro">
    <view class="sceond-buy_head">
      <view class="head-title">填写订单</view>
      <view class="sceond-buy_box">
        <view class="order_tips">为确保您订购商品无误，以下信息请准确填写</view>
        <div class="sale-info_box">
          <div class="sale-info-property">
            <div class="info-property_item" v-for="(item, index) in productView.productExtensions.productCategory.salePropertys" :key="index ">
              <div class="item_title">
                {{item.name}}
              </div>
              <div class="item_content">
                <div class="item_content-ul" v-for="(sale,sIndex) in item.propertyValues " :key="sIndex" @click="selectPropertys(sale,index,sIndex)" v-show="sale.isCheck">
                  <view class="content-checker" :class="{'active':checker[index]===sIndex}">
                    {{sale.valueAlias}}
                  </view>
                </div>
              </div>
            </div>
          </div>
        </div>
        <view class="sceond-from">
          <view class="sceond-from_box border-top">
            <view class="from_box-lable">购买数量</view>
            <view class="from_box-input">
              <x-number :value="buyCount" :multiplication='buCountMin' v-on:change="onNumberChange2" :min="buCountMin" :max="buCountMax"></x-number>
            </view>
          </view>
          <view class="sceond-from_box border-top">
            <view class="from_box-lable"><span class="lable-span">*</span>姓名</view>
            <view class="from_box-input">
              <input class="input-box" placeholder="请输入姓名" v-model="formUser.name" />
            </view>
          </view>
          <view class="sceond-from_box border-top">
            <view class="from_box-lable"><span class="lable-span">*</span>手机</view>
            <view class="from_box-input">
              <input class="input-box" placeholder="请输入手机号码" v-model="formUser.mobile" />
            </view>
          </view>
          <view class="sceond-from_box border-top">
            <view class="from_box-lable"><span class="lable-span">*</span>地区</view>
            <view class="from_box-input site-input" @click="showMulLinkageThreePicker">
              <view class="address-edit_area" :class="{placeholder_area: pickerValue === '请选择地区'}">{{pickerValue}}</view>
              <x-icon name="icon-zk-right" size="12" color="#C8C8CD"></x-icon>
            </view>
          </view>
          <view class="sceond-from_box border-top">
            <view class="from_box-lable"><span class="lable-span">*</span>地址</view>
            <view class="from_box-input">
              <input class="input-box" placeholder="请输入您的详细地址" v-model="formUser.address" />
            </view>
          </view>
          <!-- <view class="sceond-from_box border-top">
            <view class="from_box-lable"><span class="lable-span">*</span>付款</view>
            <view class="from_box-input">
              <view class="radio-button">
                <radio value="r1" checked="radioCheck" class="radio-span" /><span>货到付款</span>
                <span class="examine">验货满意后付款</span>
              </view>
            </view>
          </view> -->
          <view class="sceond-from_box border-top">
            <view class="from_box-lable">留言</view>
            <view class="from_box-input">
              <input class="input-box" placeholder="请输入姓名" v-model="formUser.message" />
            </view>
          </view>
        </view>
      </view>
      <view class="sceond-buttom" @click="buySubmit">提交订单</view>
      <view class="rolling-bulletin">
        <ul class="rolling-bulletin_ul" :style="'top:'+sw+'px;'">
          <li class="rolling-bulletin_li" v-for="(item,index) in ScrollSow" :key="index"><span class="bulletin_li-span">[最新购买]</span>{{item}}</li>
        </ul>
      </view>
      <view class="line-box"></view>
    </view>
    <!-- <view class="sceond-footer">
      <view class="sceond-footer_left">
        <view class="footer_box"><img class="footer_box-img" src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-15/5cdc138989bd0706b0158a4d.png" /></view>
        <view class="footer-title">电话咨询</view>
      </view>
      <view class="sceond-footer_right">立即购买</view>
    </view> -->
    <x-city-picker :model="formUser.regionId" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></x-city-picker>
  </view>
</template>

<script>
 


  export default {
    
    data () {
      return {
        widgetModel: {},
        radioCheck: true,
        formItemModel: [],
        cityPickerValueDefault: [0, 0, 0],
        themeColor: '#007AFF',
        addressInput: '',
        pickerValue: '请选择地区',
        heightTop: 1,
        textheight: '',
        buyCount: 1, // 购买数量
        checker: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        boxheight: '',
        sw: 0,
        timer: '',
        altitude: '',
        popupSale: false,
        popupParameter: false,
        saleValue: '',
        selectSku: '', // 选择的商品Sku
        selectSkuDisplayPrice: '', // 选择sku的显示价格
        buCountMin: 1,
        buCountMax: Infinity,
        saleItems: [], // 商品规格属性,
        isClient: false,
        siteUrl: '',
        formUser: {
          name: '',
          mobile: '',
          address: '',
          productId: '',
          productSkuId: '',
          buyCount: '',
          message: '',
          regionId: ''
        },
        ScrollSow: ''
      }
    },
    props: {
      widget: {},
      productView: {},
      timeLimit: {}
    },
    mounted () {
      this.init()
      this.inint()
      this.move()
    },
    methods: {
      async init () {
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
        var query = uni.createSelectorQuery()
        var view = query.select('.rolling-bulletin_ul')
        view.fields({
          size: true,
          scrollOffset: true
        }, data => {
          this.textheight = data.height - 180
        }).exec()
        var box = query.select('.rolling-bulletin')
        box.fields({
          size: true,
          scrollOffset: true
        }, data => {
          this.boxheight = data.height
        }).exec()
        var para = {
          productId: this.productView.id
        }
        var repone = await this.$api.httpGet('/Api/SecondBuyOrder/BuyListRcently', para)
        if (repone.status !== 1) {
          this.$api.toastWarn(repone.message)
          return
        }
        this.ScrollSow = repone.result
      },
      move () {
        var this_ = this
        this.timer = setInterval(() => {
          this_.sw--
          this_.altitude = -this_.textheight
          if (this_.sw <= this_.altitude) {
            this_.sw = 0
          }
        }, 30)
      },
      onCancel (e) {
      },
      selectPropertys (item, index, sindex) {
        this.saleItems[index] = item
        this.$set(this.checker, [index], sindex)
        this.changSku()
      },
      onConfirm (e) {
        this.formUser.regionId = e.cityCode
        this.pickerValue = e.label
      },
      showMulLinkageThreePicker () {
        this.$refs.mpvueCityPicker.show()
      },
      showSkuBox () {
        this.popupSale = true
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
        // this.siteUrl = apiBaseUrl.apiBaseUrl
        this.gradePrice()
        if (this.productView.productActivityExtension.userPermissions.singleBuyCountMin !== 0) {
          this.buCountMin = Number(this.productView.productActivityExtension.userPermissions.singleBuyCountMin)
          this.buyCount = this.buCountMin
        }
        if (this.productView.productActivityExtension.userPermissions.singleBuyCountMax !== 0) {
          this.buCountMax = Number(this.productView.productActivityExtension.userPermissions.singleBuyCountMax)
        }
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
          if (this.$api.client() !== 'WeChatLite') {
            // var perUrl = window.location.pathname + window.location.search
            // this.$api.localSet('previous_page_before_login', perUrl)
            uni.showModal({
              title: '提示',
              content: '请先登录',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                if (res.confirm) {
                  that.$api.to('/pages/index?path=user_login')
                }
              }
            })
          } else {
            uni.showModal({
              title: '提示',
              content: '请先登录',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                if (res.confirm) {
                  that.$api.to('/pages/index?path=user_login')
                }
              }
            })
          }
        } else if (this.selectSku.stock === 0) {
          this.$api.toastWarn('库存不足')
        } else {
          let params = {
            ProductSkuId: this.selectSku.id,
            productId: this.productView.id,
            storeId: this.productView.storeId,
            count: this.buyCount,
            loginUserId: this.$user.loginUser().id
          }
          var message = await this.$api.httpPost('CART_ADDCART_POST', params)
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
            that.$api.to('/pages/index?path=user_login')
          } else {
            // this.$api.localSet('previous_page_before_login', window.location.href)
            uni.showModal({
              title: '提示',
              content: '请先登录',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                if (res.confirm) {
                  that.$api.to('/pages/index?path=user_login')
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
            LoginUserId: this.$user.loginUser().id
          }]
          this.$api.localSet('buyProductInfo', buyProductInfo)
          this.$api.to('/pages/index?path=order_buy')
        }
      },
      async buySubmit () {
        this.formUser.buyCount = this.buyCount
        this.formUser.productId = this.productView.id
        this.formUser.productSkuId = this.selectSku.id
        if (this.selectSku.stock === 0) {
          this.$api.toastWarn('库存不足')
          return
        }
        var reposne = await this.$api.httpPost('Api/SecondBuyOrder/Buy', this.formUser)
        if (reposne.status === 1) {
          var _this = this
          uni.showModal({
            title: '提示',
            showCancel: true,
            content: '购买成功！',
            success: function (res) {
              if (res.confirm) {
                uni.showLoading({
                  title: '加载中..'
                })
                setTimeout(() => {
                  _this.formUser = {}
                }, 1500)
              }
            }
          })
        } else {
          this.$api.toastWarn(reposne.message)
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "@/assets/style/theme.scss";
  @import "@/assets/style/base.scss";
  .show_sceondBuy {
    uni-radio {
      .uni-radio-input {
        width: 15px;
        height: 15px;
        background-color: $gl-themeColor !important;
        border-color: $gl-themeColor !important;
        &::before {
          font-size: 12px;
        }
      }
    }
    .sceond-buy_head {
      .head-title {
        font-size: 14px;
        color: #303133;
        text-align: center;
        height: 35px;
        line-height: 35px;
        font-weight: bold;
      }
      .sceond-buy_box {
        border-bottom: 1px solid $gl-border6;
        .order_tips {
          width: 100%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #333;
          font-size: 12px;
          border-top: 1px solid #d7d7d7;
          border-bottom: 1px solid #d7d7d7;
          background: #f0f0f0;
        }
        .sale-info_box {
          padding: 0px 15px;
          .sale-info-property {
            .info-property_item {
              .item_title {
                font-size: 14px;
                color: #303133;
                font-weight: 500;
              }
              .item_content {
                padding: 8px 0px;
                .item_content-ul {
                  .content-checker {
                    border: 1px solid #d7d7d7;
                    color: #000;
                    border-radius: 4px;
                    margin-bottom: 8px;
                    padding: 2px 8px;
                    font-size: 13px;
                    display: inline-block;
                  }
                  .active {
                    background-color: #cf2a4f;
                    color: #ffffff;
                  }
                  &:last-of-type {
                    .content-checker {
                      margin-bottom: 0px;
                    }
                  }
                }
              }
            }
          }
          .sale-info-number {
            .number-left {
              font-size: 14px;
              color: #303133;
              font-weight: 500;
            }
            .number-right {
              padding-top: 8px;
            }
          }
        }
        .sceond-radio {
          padding: 8px 10px;
          span {
            vertical-align: -2px;
            font-size: 12px;
          }
        }
        .order-sale {
          font-size: 14px;
          padding: 8px 10px;
        }
        .border-top {
          position: relative;
          &::after {
            content: "";
            width: 100%;
            height: 1px;
            background-color: $gl-border6;
            position: absolute;
            top: 0px;
            left: 10px;
            transform: scaleY(0.3);
          }
        }
        .sceond-from {
          .sceond-from_box {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            .from_box-lable {
              font-size: 12px;
              width: 50px;
              .lable-span {
                color: $gl-danger;
                margin-right: 5px;
              }
            }
            .from_box-input {
              flex: 1;
              display: flex;
              align-items: center;
              .input-box {
                width: 100%;
              }
              .examine {
                color: $gl-themeColor;
                font-size: 12px;
                margin-left: 10px;
              }
              .radio-button {
                .radio-span {
                  vertical-align: 1px;
                }
              }
            }
            .site-input {
              justify-content: flex-end;
              .address-edit_area {
                margin-right: 10px;
                text-align: right;
              }
            }
          }
        }
      }
      .sceond-buttom {
        height: 45px;
        line-height: 45px;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        background-color: $gl-themeColor;
        border-radius: 4px;
        margin: 10px 15px;
      }
    }
    .sceond-footer {
      width: 100vw;
      height: 50px;
      border-top: 1px solid $gl-border5;
      background-color: $gl-light;
      position: fixed;
      bottom: 0px;
      left: 0px;
      display: flex;
      .sceond-footer_left {
        width: 80px;
        height: 50px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .footer_box {
          .footer_box-img {
            width: 18px;
            height: 18px;
          }
        }
        .footer-title {
          font-size: 12px;
        }
      }
      .sceond-footer_right {
        flex: 1;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: $gl-light;
        background-color: $gl-themeColor;
        font-size: 16px;
      }
    }
    .rolling-bulletin {
      border-top: 1px solid $gl-border6;
      border-bottom: 1px solid $gl-border6;
      height: 170px;
      overflow: hidden;
      position: relative;
      padding: 10px 0px;
      .rolling-bulletin_ul {
        padding: 0px 10px;
        position: absolute;
        .rolling-bulletin_li {
          font-size: 12px;
          line-height: 16px;
          padding: 3px 0px;
          .bulletin_li-span {
            color: $gl-themeColor;
          }
        }
      }
    }
    .line-box {
      height: 50px;
    }
    .placeholder_area {
      color: grey;
    }
  }
</style>
