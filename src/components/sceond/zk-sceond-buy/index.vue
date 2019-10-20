<template>
  <view class="zk-sceond-buy" id="showIntro">
    <view class="sceond-buy_head">
      <view class="head-title">填写订单</view>
      <view class="sceond-buy_box">
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
            <div class="number-right">
              <x-number :value="buyCount" :multiplication='buCountMin' v-on:change="onNumberChange2" :min="buCountMin" :max="buCountMax"></x-number>
            </div>
          </div>
          <div class="sale-info-number_helpblock">
            <span v-show="productView.productActivityExtension.userPermissions.singleBuyCountMin!==0">商品最少需购买{{productView.productActivityExtension.userPermissions.singleBuyCountMin}}件</span>
            <span v-show="productView.productActivityExtension.userPermissions.singleBuyCountMax!==0">,单次最多购买{{productView.productActivityExtension.userPermissions.singleBuyCountMax}}件</span>
          </div>
        </div>
        <view class="sceond-radio">
          <radio value="r1" checked="radioCheck" /><span>六字真言貔貅天然冰种黑曜石手链</span>
        </view>
        <view class="order-sale border-top">下单特价，立即发货！还送多一条霸气貔貅手链！</view>
        <view class="sceond-from">
          <view class="sceond-from_box border-top">
            <view class="from_box-lable"><span class="lable-span">*</span>姓名</view>
            <view class="from_box-input">
              <input class="input-box" placeholder="请输入姓名" />
            </view>
          </view>
          <view class="sceond-from_box border-top">
            <view class="from_box-lable"><span class="lable-span">*</span>手机</view>
            <view class="from_box-input">
              <input class="input-box" placeholder="请输入手机号码" />
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
              <input class="input-box" placeholder="请输入您的详细地址" />
            </view>
          </view>

          <view class="sceond-from_box border-top">
            <view class="from_box-lable"><span class="lable-span">*</span>付款</view>
            <view class="from_box-input">
              <view class="radio-button">
                <radio value="r1" checked="radioCheck" class="radio-span" /><span>货到付款</span>
                <span class="examine">验货满意后付款</span>
              </view>
            </view>
          </view>
          <view class="sceond-from_box border-top">
            <view class="from_box-lable"><span class="lable-span">*</span>留言</view>
            <view class="from_box-input">
              <input class="input-box" placeholder="请输入姓名" />
            </view>
          </view>
        </view>
      </view>
      <view class="sceond-buttom">提交订单</view>
      <view class="rolling-bulletin">
        <ul class="rolling-bulletin_ul" :style="'top:'+sw+'px;'">
          <li class="rolling-bulletin_li" v-for="(item,index) in 20" :key="index"><span class="bulletin_li-span">{{index}}[最新购买]</span>微**（137****163） 在2分钟前订购了MUNITI腕表男士尊贵的象征 MT1007G-1黑壳黑面棕带</li>
        </ul>
      </view>
      <view class="line-box"></view>
    </view>
    <view class="sceond-footer">
      <view class="sceond-footer_left">
        <view class="footer_box"><img class="footer_box-img" src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-15/5cdc138989bd0706b0158a4d.png" /></view>
        <view class="footer-title">电话咨询</view>
      </view>
      <view class="sceond-footer_right">立即购买</view>
    </view>
    <x-city-picker :model="addressInput " :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></x-city-picker>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


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
        siteUrl: ''
      }
    },
    props: {
      widget: {},
      productView: {}
    },
    mounted () {
      this.init()
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
        this.addressInput = e.cityCode
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
                  that.$api.to('/pages/user/login')
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
                  that.$api.to('/pages/user/login')
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
            userId: this.$user.loginUser().id
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
          this.$api.localSet('buyProductInfo', buyProductInfo)
          this.$api.to('/pages/index?path=order_buy')
        }
      }
    }
  }
</script>
