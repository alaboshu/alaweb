<template>
  <view class="zk-hot-shop-grid">
    <view class="hot-shop-grid-container">
      <div class="hot-shop-content-S">
        <div class="hot-shop-content-S-item" v-for="(item,index) in imgList" :key="index" @click="goLinks(item.id)">
          <img :src="item.thumbnailUrl" alt="">
          <span>{{item.name}}</span>
          <view v-if="showAdmin">
            <span v-if="$api.showPrice()||isPrice()" class="showAdmin">￥{{item.price}}</span>
            <span v-else style="color:#ED3927;font-weight:600">升级后显示价格</span>
          </view>
          <view v-else>
            <span v-if="$api.showPrice()||isPrice()" class="showAdmin">￥{{item.displayPrice}}</span>
            <span v-else style="color:#ED3927;font-weight:600">升级后显示价格</span>
          </view>
        </div>
      </div>
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
        imgList: [],
        isLogin: false,
        showAdmin: true
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
        if (this.$user.isLogin() && this.$user.loginUser().gradeName !== '免费会员') {
          this.isLogin = true
        }
        this.widgetModel = await this.$api.themeWidget(this.widget)
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
        for (let i = 0; i < 3; i++) {
          var roundMath = Math.round(Math.random() * this.widgetModel.productItems.length)
          this.imgList.push(this.widgetModel.productItems[roundMath])
        }
        if (api.themeId === '5d26e11a064c25053c9b3def') {
          this.showAdmin = false
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
