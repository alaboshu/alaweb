<template>
  <view>
    <zk-swiper></zk-swiper>
    <view class="zk-book-index" v-show="cur==0">
      <view class="all_box" :style="'height:'+unHeight+'px;'">
        <view class="merchant_content" v-if="widgetModel">
          <view class="merchant_left">
            <img :src="merchantInfo.logo" alt="">
          </view>
          <view class="merchant_right">
            <view class="merchantInfo_name">{{merchantInfo.name}}</view>
          </view>
        </view>
        <view class=" class-container">
          <view class="container-left" :style="'height:'+unHeight+'px;'">
            <view class="container-left-item" :key="index" v-for="(item,index) in leftList" :id="item.id" @click="getInde(item.id)" :class="Cindex==item.id?'active':''">
              <span class="left-item-tag"></span>
              {{item.name}}
            </view>
          </view>
          <view class=" container-right" :style="'height:'+unHeight+'px;'">
            <view class="nav-right-item" v-for="(t,i) in rightContentList" :key="i">
              <view style="display:flex">
                <img :src="t.thumbnailUrl" mode="widthFix" class="imgItem" :style="'width:'+unWidth+'px;'+'height:'+unWidth+'px;'">
                <view style="width:90%">
                  <view class="item_name">{{t.name}}</view>
                  <view class="item_info" v-html="t.description"></view>
                  <view style="display:flex;justify-content: space-between;" class="submit_btn">
                    <view class="item_price">
                      <span v-if="t.skus">￥{{t.skus[0].price}}</span>
                      <span @click="gorouler(t.merchantStoreId)" v-if="t.skus.length>1">选规格</span>
                    </view>
                    <view class="add_car_btn" v-if="t.skus.length<=1" @click="addCart(t.id,t.merchantStoreId,t.skus[0].skuId)">+</view>
                  </view>
                </view>
                <view class="roler_mask" v-show="maskShow">
                  <p @click="maskShow = false" class="closeMask">
                    <span>{{t.name}}</span>
                    <span>
                      <x-icon name="zk-cuowu" size="20"></x-icon>
                    </span>
                  </p>
                  <p style="padding: 0 10px;font-size:13px;">规格:</p>
                  <view v-if="t.skus" class="mask_item">
                    <view v-for="(item,index) in t.skus" :key="index" style="margin-right:10px;margin-top:15px;">
                      <span class="itemList" @click="getCurrentIndex(index,item.skuId,item.displayPrice)" :class="currentIndex==index?'currentRouler':''">{{item.name}}</span>
                    </view>
                  </view>
                  <view class="roler_mask_bottom">
                    <span>￥{{roulerPrice}}</span>
                    <view class="mask_btn_addCart">
                      <span @click="addCarts(t.id,t.merchantStoreId)">加入购物车</span>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="mask" v-show="maskShow"></view>
      <view class="cart_shops" v-show="showsCartList">
        <view style="position:relative">
          <view class="cart_top">
            <span>购物车</span>
          </view>
        </view>
        <view style="width:100%;height:60vh;overflow:auto;margin-bottom:30px;">
          <ul class="cart_list">
            <li class="list_item" v-for="(item,index) in cartShopsList" :key="index">
              <view class="item_left">{{item.productName}}</view>
              <view class="item_right">
                <view>￥{{item.price}}</view>
                <view class="addBtn">
                  <span @click="reduceCoumt(item)">-</span>
                  <span>{{item.count}}</span>
                  <span @click="addCoumt(item)">+</span>
                </view>
              </view>
            </li>
          </ul>
          <view class="books_all_total">合计支付：￥{{totalAmount}}</view>
        </view>
        <view class="instance_btn" v-show="showsCartList" @click="countAll()">立即支付</view>
      </view>
      <view class="cart_mask" v-show="showsCartList" @click="closeMask()"></view>
      <x-pay ref="show_pay"></x-pay>
    </view>
    <view v-show="cur==1">
      <zk-book-my></zk-book-my>
    </view>
    <view class="container-bottom" v-show="!showsCartList">
      <view class="bottom_left">
        <view class="left_cart" @click="cur=0" :class="{active:cur==0}">
          <view @click="showcartListMask()" style="display:flex">
            <x-icon name="zk-cart"></x-icon>
            <span>购物车</span>
          </view>
        </view>
        <view class="bottom_line"></view>
        <view class="left_cart" @click="cur=1" :class="{active:cur==1}">
          <x-icon name="zk-me"></x-icon>
          <span>我的</span>
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
        height: '',
        Cindex: 10620,
        itemId: 0,
        leftList: [],
        contentList: [],
        rightContentList: [], // 右侧内容区
        shops_num: 0, // 购物车数量
        maskShow: false,
        roulerList: [], // 规格
        currentIndex: -3,
        skuId: '',
        shopsCount: 1,
        roulerPrice: '',
        showsCartList: false,
        count: 1,
        cartShopsList: [], // 购物车数据
        totalAmount: 0, // 购物车总价
        MerchantStoreId: '', // 店铺ID
        showMessage: false,
        message: '',
        orderList: [], // 订单信息
        merchantInfo: [], // 商家信息
        unHeight: '',
        unWidth: '',
        outerWidth: '',
        backgrundShow: '',
        dataList: [],
        cur: 0
      }
    },
    props: {
      widget: ''
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.cur = this.widget
        if (!this.$user.isLogin()) {
          uni.showToast({
            icon: 'none',
            title: '请先登录'
          })
          this.$user.toLogin()
        } else {
          this.widgetModel = await this.$api.httpGet('/Api/MerchantProduct/GetMerchantProducts?merchantStoreId=5cc2aa7adab9ed63383bc582')
          if (this.widgetModel.status === 1) {
            this.leftList = this.widgetModel.result.relations
            this.contentList = this.widgetModel.result.products
            this.merchantStoreId = this.widgetModel.result.merchantStore.id
            this.Cindex = this.widgetModel.result.products[0].classId
            this.merchantInfo = this.widgetModel.result.merchantStore
          }
          if (this.$api.client() === 'WeChatLite') {
            this.unHeight = this.$api.getSystemInfoSync().screenHeight - 220
          } else {
            this.unHeight = this.$api.getSystemInfoSync().screenHeight - 220
          }
        }
        this.outerWidth = (this.$api.getSystemInfoSync().windowWidth - 70) / 3
        this.unWidth = (this.$api.getSystemInfoSync().windowWidth - 130) / 3
        for (var i = 0; i < this.contentList.length; i++) {
          if (this.contentList[i].classId === this.Cindex) {
            var arr = this.contentList[i]
            this.rightContentList.push(arr)
          }
        }
        this.showCartList()
      },
      categoryClickMain (categroy, index) {
        this.categoryActive = index
        this.subCategoryList = categroy.subCategoryList
        this.itemId = categroy.id
        for (var i = 0; i < this.leftList.length; i++) {
          if (this.itemId === this.leftList[i].id) {
            this.contentList = this.leftList[i].childClass
          }
        }
      },
      getInde (id) {
        this.Cindex = id
        this.rightContentList = []
        for (var i = 0; i < this.contentList.length; i++) {
          if (this.contentList[i].classId === this.Cindex) {
            this.rightContentList.push(this.contentList[i])
          }
        }
      },
      async addCart (id, merchantStoreId, skuId) {
        this.skuId = skuId
        this.MerchantStoreId = merchantStoreId
        let para = {
          MerchantStoreId: merchantStoreId,
          UserId: this.$user.id(),
          MerchantProductId: id,
          skuId: this.skuId,
          Count: this.shopsCount
        }
        var res = await this.$api.httpPost('/Api/MerchantCart/AddCart', para)
        if (res.status === 1) {
          this.shops_num++
          this.$api.toastSuccess('加入购物车成功')
          this.showCartList()
        } else {
          this.$api.toastWarn(res.message)
        }
      },
      async addCarts (id, merchantStoreId) {
        this.MerchantStoreId = merchantStoreId
        let para = {
          MerchantStoreId: this.merchantStoreId,
          UserId: this.$user.id(),
          MerchantProductId: id,
          skuId: this.skuId,
          Count: this.shopsCount
        }
        var res = await this.$api.httpPost('/Api/MerchantCart/AddCart', para)
        if (res.status === 1) {
          this.shops_num++
          this.$api.toastSuccess('加入购物车成功')
          this.showCartList()
          this.maskShow = false
        }
      },
      gorouler (merchantStoreId) {
        this.merchantStoreId = merchantStoreId
        this.maskShow = true
      },
      closeMask () {
        this.showsCartList = false
      },
      getCurrentIndex (index, skuId, roulerPrice) {
        this.currentIndex = index
        this.skuId = skuId
        this.roulerPrice = roulerPrice
      },
      async showCartList () {
        var UserId = this.$user.id()
        var merchantStoreId = this.merchantStoreId
        var res = await this.$api.httpGet(`/Api/MerchantCart/GetCart?userid=${UserId}&merchantStoreId=${merchantStoreId}`)
        if (res.status === 1) {
          this.showMessage = false
          this.cartShopsList = res.result.products
          this.totalAmount = res.result.totalAmount
          this.shops_num = res.result.totalCount
        } else if (res.status === 3) {
          this.cartShopsList = []
          this.showMessage = true
          this.message = res.message
        }
        if (this.totalAmount === 0) {
          this.backgrundShow = false
        } else {
          this.backgrundShow = true
        }
      },
      async reduceCoumt (item) {
        if (item.count === 1) {
          var _this = this
          uni.showModal({
            title: '提示',
            content: '确定删除?',
            success: async function (res) {
              if (res.confirm) {
                let para = {
                  id: item.id,
                  skuId: item.skuId,
                  MerchantStoreId: _this.MerchantStoreId,
                  UserId: _this.$user.id()
                }
                var res = await _this.$api.httpGet('/Api/MerchantCart/RemoveCart', para)
                if (res.status === 1) {
                  _this.$api.toastSuccess('删除成功')
                  _this.showCartList()
                  _this.init()
                } else {
                  _this.$api.toastWarn(res.message)
                }
              }
            }
          })
        } else {
          item.count--
          var para = {
            id: item.id,
            MerchantStoreId: this.MerchantStoreId,
            UserId: this.$user.id(),
            MerchantProductId: item.merchantProductId,
            skuId: item.skuId,
            count: item.count
          }
          var upres = await this.$api.httpPut('/Api/MerchantCart/UpdateCart', para)
          if (upres.status === 1) {
            this.showCartList()
          }
        }
      },
      async addCoumt (item) {
        item.count++
        var para = {
          id: item.id,
          MerchantStoreId: this.MerchantStoreId,
          UserId: this.$user.id(),
          MerchantProductId: item.merchantProductId,
          skuId: item.skuId,
          count: item.count
        }
        var upres = await this.$api.httpPut('/Api/MerchantCart/UpdateCart', para)
        if (upres.status === 1) {
          this.showCartList()
        }
      },
      async countAll () {
        this.cur = 0
        if (this.totalAmount === 0) {
          this.$api.toastSuccess('请先将商品添加到购物车')
        } else {
          var para = {
            MerchantStoreId: '5cc2aa7adab9ed63383bc582',
            UserId: this.$user.id(),
            ProductItems: this.cartShopsList
          }
          var all = await this.$api.httpPost('/Api/MerchantOrder/BuyInfo', para)
          if (all.status === 1) {
            this.orderList = all
            this.submit(all.result)
          }
          this.$api.localSet('order', para)
        }
      },
      async submit (all) {
        if (!await this.$user.isLogin()) {
          uni.showToast({
            icon: 'none',
            title: '请'
          })
          this.$user.toLogin()
        } else {
          var para = {
            userId: this.$user.id(),
            MerchantStoreId: '5cc2aa7adab9ed63383bc582',
            totalCount: all.totalCount,
            totalAmount: all.totalAmount,
            PaymentAmount: all.totalAmount,
            PayType: 1,
            feeAmount: all.feeAmount,
            products: all.products
          }
          var res = await this.$api.httpPost('/Api/MerchantOrder/Buy', para)
          if (res.status === 1) {
            this.$refs.show_pay.$emit('payMethod', res.result.payId, res.result.payAmount, res.result.orderIds, '/pages/index?path=merchant_order_view&id=' + res.result.orderIds)
          }
        }
      },
      showcartListMask () {
        this.showsCartList = true
        this.showCartList()
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
  @import "./style.scss";
</style>

