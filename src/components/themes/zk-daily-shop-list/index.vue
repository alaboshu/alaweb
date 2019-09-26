<template>
  <view class="zk-daily-shop-list">
    <view class="zk_daily_list_container">
      <view class="daily_list_content">
        <view class="list_content_box" v-for="(item,index) in shopsList" :key="index" :style="'width:'+tylistHeight+'px;'" @click="goLinks(item.id)" v-show="index<4">
          <view class="daily_list_content_item">
            <view class="list_content_item_L">
              <view class="item_L_name">{{item.name}}</view>
              <view v-if="showMember">
                <view class="item_L_price" v-if="$api.showPrice()||isPrice()">到手价{{item.price}}</view>
                <view class="item_L_price" v-else>升级后显示价格</view>
              </view>
              <view v-else>
                <view class="item_L_price" v-if="$api.showPrice()||isPrice()">{{item.displayPrice}}</view>
                <view class="item_L_price" v-else>升级后显示价格</view>
              </view>
              <view class="item_L_btn" :style="'background:'+BgColor">立即抢购 > </view>
            </view>
            <view class="list_content_item_R">
              <img :src="item.thumbnailUrl" alt="">
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
        tylistHeight: '',
        isLogin: false,
        showMember: false
      }
    },
    props: {
      widget: {},
      singleName: {
        default: '好货上新'
      },
      SecondName: {
        default: '生活好货'
      },
      tagShow: {
        default: true
      },
      BgColor: {
        default: '#f09179'
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
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
        this.tylistHeight = (this.$api.getSystemInfoSync().windowWidth - 24) / 2
        // for (let i = 0; i < 4; i++) {
        // var roundMath = Math.round(Math.random() * this.widgetModel.productItems.length)
        this.shopsList = this.widgetModel.productItems
        // }
        if (api.themeId === '5d26e11a064c25053c9b3def') {
          this.showMember = false
        }
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      },
      isPrice () {
        if (!this.$user.isLogin() && api.themeId === '5d26e11a064c25053c9b3def') {
          return true
        }
      },
      watchRoute () {
        this.init()
      }
    },
    watch: {
      widget: 'watchRoute'
    }
  }
</script>
