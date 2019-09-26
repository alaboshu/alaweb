<template>
  <view class="zk-bags-shop-list">
    <view class="zk-bags-shop-list_container">
      <view class="daily-shop-list" v-if="shopsList">
        <view class="daily-shop-list_item" v-for="(item,index) in shopsList" :key="index" @click="goLinks(item.id)">
          <view class="daily-shop-list_item_L">
            <img :src="item.thumbnailUrl" alt="">
            <view class="daily-shop-list_back">
              <span class="daily-shop-list_tag">口碑好货</span>
              <span class="daily-shop-list_Membership">会员价</span>
              <span class="daily-shop-list_Membership_price" v-if="$api.showPrice()||isPrice()">{{item.price}}</span>
            </view>
          </view>
          <view class="daily-shop-list_item_R">
            <view class="daily-shop-list_item_R_name">{{item.name}}</view>
            <view class="tag_list_item">
              <span>口碑好货</span>
              <span>销量优先</span>
              <span>智能断电</span>
            </view>
            <view v-if="showAmin">
              <view class="daily-shop-list_item_R_price" v-if="$api.showPrice()||isPrice()">￥{{item.price}}</view>
              <span class="daily-shop-list_item_R_price" v-else>升级后显示价格</span>
            </view>
            <view v-else>
              <view class="daily-shop-list_item_R_price" v-if="$api.showPrice()||isPrice()">￥{{item.displayPrice}}</view>
              <span class="daily-shop-list_item_R_price" v-else>升级后显示价格</span>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'
  import api from '@/service/config.js'

  export default {

    data () {
      return {
        widgetModel: {},
        shopsList: [],
        isLogin: false,
        showAmin: true
      }
    },
    props: {
      widget: {},
      singleName: {
        default: '好货上新'
      },
      SecondName: {
        default: '生活好货'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.$user.isLogin() && this.$user.loginUser().gradeName !== '免费会员') {
          this.isLogin = true
        }
        this.widgetModel = await this.$api.themeWidget(this.widget)
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
        for (let i = 0; i < 3; i++) {
          var roundMath = Math.round(Math.random() * this.widgetModel.productItems.length)
          this.shopsList.push(this.widgetModel.productItems[roundMath])
        }
        if (api.themeId === '5d26e11a064c25053c9b3def') {
          this.showAmin = false
        }
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      },
      isPrice () {
        if (!this.$user.isLogin() && api.themeId === '5d26e11a064c25053c9b3def') {
          return true
        }
      }
    }
  }
</script>
