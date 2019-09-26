<template>
  <view class="merchant-product-class">
    <view class="all_box">
      <view class="merchant_content" v-if="widgetModel">
        <view class="merchant_left">
          <img :src="merchantInfo.logo" alt="">
        </view>
        <view class="merchant_right">
          <view class="merchantInfo_name">{{merchantInfo.name}}</view>
          <view class="merchantInfo_description">{{merchantInfo.description}}</view>
        </view>
      </view>
      <view class=" class-container">
        <view class="container-left" :style="'height:'+unHeight+'px;'">
          <view class="container-left-item" :key="index" v-for="(item,index) in leftList" :id="item.id" @click="getInde(item.id)" :class="Cindex==item.id?'active':''">{{item.name}}</view>
        </view>
        <view class=" container-right">
          <view class="nav-right-item" v-for="(t,i) in rightContentList" :key="i">
            <view style="display:flex">
              <view @click="showdetail(t.id)">
                <img :src="t.thumbnailUrl" mode="widthFix" class="imgItem" style="height: 5rem;">
              </view>
              <view style="width:90%">
                <view class="item_name">{{t.name}}</view>
                <view class="item_info">
                  <span v-html="t.description"></span>
                </view>
                <span class="shops_stock">库存：{{t.stock}}</span>
                <view style="display:flex;justify-content: space-between;" class="submit_btn">
                  <view class="item_price">
                    <span v-if="t.skus">￥{{t.skus[0].price}}</span>
                    <span @click="gorouler(t.merchantStoreId,i)" v-if="t.skus.length>1">选规格</span>
                  </view>
                  <view class="add_car_btn" v-if="t.skus.length<=1 " @click="addCart(t.id,t.merchantStoreId,t.skus[0].skuId,t.skus[0].stock)">+</view>
                </view>
              </view>
              <view class="roler_mask" v-if="maskShow&&MaskIndex===i">
                <p @click="maskShow = false" class="closeMask">
                  <span>{{t.name}}</span>
                  <span>
                    <x-icon name="zk-cuowu" size="20"></x-icon>
                  </span>
                </p>
                <p style="padding: 0 10px;font-size:13px;">规格:</p>
                <view v-if="t.skus" class="mask_item">
                  <view v-for="(item,index) in t.skus" :key="index" style="margin-right:10px;margin-top:15px;">
                    <span class="itemList" @click="getCurrentIndex(index,item.skuId,item.price,item.stock)" :class="currentIndex===index?'currentRouler':''">{{item.name}}</span>
                    <span style="font-size:12px;color:#999" v-if="currentIndex==index">库存：{{item.stock}}</span>
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
      <view class="container-bottom" :class="{'container-bottom-show': model.setting.showFoot}">
        <view class="bottom_left_Btn">
          <view class="left_cart" @click="showcartListMask()"></view>
          <view class="left_paid_money">
            <p>
              <span>￥{{totalAmount}}</span>
            </p>
            <p>
              <span>共计{{shops_num}}件商品</span>
            </p>
          </view>
        </view>
        <view class="bottom_right" @click="countAll()" :class="backgrundShow===true? 'R_color' : 'L_color' ">去结算</view>
        <view class="shops_num">{{shops_num}}</view>
      </view>
    </view>
    <view class="mask" v-show="maskShow"></view>
    <view class="bottomCartList" v-show="showsCartList">
      <view style="position:relative">
        <view class="cart_top">
          <span>购物车</span>
        </view>
      </view>
      <view class="cart_list">
        <ul>
          <li class="list_item" v-for="(item,index) in cartShopsList" :key="index">
            <view class="item_left">{{item.productName}}
              <view v-show="item.skuName" style="font-size:13px;color:#666">({{item.skuName}})</view>
            </view>
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
        <p v-show="showMessage" class="noShops">
          <x-icon name="zk-temporarily" size="40"></x-icon>
          {{message}}
        </p>
      </view>
    </view>
    <transition name="fade" v-if="boxshow">
      <view class="search_mask" v-show="boxshow">
        <view class="search_mask-box">
          <view class="mask_back_icon" @click="closeMak()">
            <i class="icon iconfont zk-unfold"></i>
          </view>
        </view>
        <view class="merchant_shop_detail">
          <swiper class="swiper" :indicator-dots="true" :autoplay="true" indicator-color="rgba(102,102,102,.5)" indicator-active-color="rgba(255,255,255,.5)">
            <swiper-item v-for="(item,index) in detailList.images" :key="index">
              <img :src="item" alt="">
            </swiper-item>
          </swiper>
          <view style="width:100%;height:10px;background:#f1efef"></view>
          <view class="shop_detail_content">
            <view class="detail_content_name">{{detailList.name}}</view>
            <view class="detail_content_skus">库存：{{detailList.skus[0].stock}}</view>
            <view class="detail_conteint_price">
              <view class="content_price"><span>￥
                </span>{{detailList.skus[0].price}}</view>
              <view class="addCartBtn" @click="addCart(detailList.id,detailList.merchantStoreId,detailList.skus[0].skuId,detailList.skus[0].stock)"><span>+</span>加入购物车 </view>
            </view>
          </view>
          <view style="width:100%;height:10px;background:#f1efef"></view>
          <view class="merchant_product_description">
            <view class="description_name">商品详情</view>
            <view class="description_text">{{detailList.description}}</view>
          </view>
        </view>
      </view>
    </transition>
    <view class="cart_mask" v-show="showsCartList" @click="closeMask()"></view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'
  import { setTimeout } from 'timers'

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
        currentIndex: 0,
        skuId: '',
        shopsCount: 1,
        roulerPrice: '',
        showsCartList: false,
        count: 1,
        cartShopsList: [], // 购物车数据
        totalAmount: 0, // 购物车总价
        merchantStoreId: '', // 店铺ID
        showMessage: false,
        message: '',
        orderList: [], // 订单信息
        merchantInfo: [], // 商家信息
        unHeight: '',
        unWidth: '',
        outerWidth: '',
        backgrundShow: '',
        dataList: [],
        ItemStock: '', // 当前商品的库存
        MaskIndex: -1,
        Stock: 0,
        boxshow: false,
        detailList: [] // 详情
      }
    },
    props: {
      widget: {},
      model: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.httpGet('/Api/MerchantProduct/GetMerchantProducts')
        if (this.widgetModel.status === 1) {
          this.leftList = this.widgetModel.result.relations
          this.contentList = this.widgetModel.result.products
          this.merchantStoreId = this.widgetModel.result.merchantStore.id
          if (this.widgetModel.result.products[0] !== undefined) {
            this.Cindex = this.widgetModel.result.products[0].classId
          }
          this.merchantInfo = this.widgetModel.result.merchantStore
        } else {
          this.$api.toastWarn(this.widgetModel.message)
        }
        if (this.$api.client() === 'WeChatLite') {
          this.unHeight = this.$api.getSystemInfoSync().screenHeight - 220
        } else {
          this.unHeight = this.$api.getSystemInfoSync().screenHeight - 220
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
      async addCart (id, merchantStoreId, skuId, stock) {
        if (!this.$user.isLogin()) {
          uni.showToast({
            icon: 'none',
            title: '请先登录'
          })
          this.$user.toLogin()
        } else {
          if (stock <= 0) {
            setTimeout(() => {
              this.$api.toastWarn('该商品库存为0')
            }, 500)
          } else {
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
              setTimeout(() => {
                this.$api.toastSuccess('加入购物车成功')
              }, 500)
              this.showCartList()
            } else {
              this.$api.toastWarn(res.message)
            }
          }
        }
      },
      async addCarts (id, merchantStoreId) {
        if (!this.$user.isLogin()) {
          uni.showToast({
            icon: 'none',
            title: '请先登录'
          })
          this.$user.toLogin()
        } else if (this.ItemStock === 0) {
          this.$api.toastWarn('该商品库存为0')
        } else {
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
            setTimeout(() => {
              this.$api.toastSuccess('加入购物车成功')
            }, 500)
            this.showCartList()
            this.maskShow = false
          } else {
            this.$api.toastWarn(res.message)
          }
        }
      },
      gorouler (merchantStoreId, index) {
        this.merchantStoreId = merchantStoreId
        this.maskShow = true
        this.MaskIndex = index
      },
      closeMask () {
        this.showsCartList = false
      },
      getCurrentIndex (index, skuId, roulerPrice, stock) {
        this.currentIndex = index
        this.skuId = skuId
        this.roulerPrice = roulerPrice
        this.ItemStock = stock
      },
      async showCartList () {
        var para = {
          loginUserId: this.$user.id(),
          merchantStoreId: this.merchantStoreId
        }
        var res = await this.$api.httpGet(`/Api/MerchantCart/GetCart`, para)
        if (res.status === 1) {
          this.showMessage = false
          this.cartShopsList = res.result.products
          this.totalAmount = res.result.totalAmount
          this.shops_num = res.result.totalCount
        } else if (res.status === 3) {
          this.cartShopsList = []
          this.showMessage = true
          this.message = res.message
        } else {
          this.$api.toastWarn(res.message)
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
                  _this.shops_num = 0
                  _this.totalAmount = 0
                  _this.showCartList()
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
          } else {
            this.$api.toastWarn(upres.message)
          }
        }
      },
      async addCoumt (item) {
        for (var i = 0; i < this.rightContentList.length; i++) {
          if (this.rightContentList[i].skus.lenght > 1) {
            for (var j = 0; j < this.rightContentList[i].skus.lenght; j++) {
              if (item.id === this.rightContentList[i].skus[j].skuId) {
                this.Stock = this.rightContentList[i].skus[j].stock
              }
            }
          } else {
            this.Stock = this.rightContentList[i].skus[0].stock
          }
        }
        if (this.Stock > item.count) {
          item.count++
        } else {
          setTimeout(() => {
            this.$api.toastWarn('该商品库存已为0,请选择其他商品')
          }, 500)
        }
        uni.showLoading({
          title: '加载中..'
        })
        setTimeout(function () {
          uni.hideLoading()
        }, 2000)
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
        } else {
          this.$api.toastWarn(upres.message)
        }
      },
      async countAll () {
        if (this.totalAmount === 0) {
          this.$api.toastWarn('商品总价为0')
        } else {
          var para = {
            MerchantStoreId: this.MerchantStoreId,
            UserId: this.$user.id(),
            ProductItems: this.cartShopsList
          }
          var all = await this.$api.httpPost('/Api/MerchantOrder/BuyInfo', para)
          if (all.status === 1) {
            this.orderList = all
          } else {
            this.$api.toastWarn(all.message)
          }
          this.$api.to('/pages/index?path=merchant_order_info')
          this.$api.localSet('order', para)
        }
      },
      showcartListMask () {
        this.showsCartList = true
        this.showCartList()
      },
      closeMak () {
        uni.hideKeyboard()
        this.boxshow = false
      },
      async showdetail (id) {
        var para = {
          merchantStoreProductId: id
        }
        var res = await this.$api.httpGet('Api/MerchantProduct/GetMerchantProduct', para)
        if (res.status === 1) {
          this.detailList = res.result
        }
        this.boxshow = true
      }
    }
  }
</script>
<style lang="scss">
  .zk-nav-bar {
    display: none;
  }
</style>

