<template>
  <view class="zk-discount-shop-list">
    <view class="discount-shop-list-container">
      <view class="discount-shop-list_content">
        <view class="discount-shop_banner" @click="$api.to('/pages/index?path=product_show&id=610')">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-19/5d3126f6f1d2ca1de8a49f7c.jpg" alt="">
        </view>
        <div class="fight-shop-content-scroll">
          <div class="zk-image-scroll">
            <scroll-view class="scroll-view_H" scroll-x="true">
              <div class="scroll-view_box" v-for="(item,index) in dataList" :key="index" @click="goLinks(item.id)">
                <image :src="item.thumbnailUrl" />
                <div class="scroll_name">{{item.name}}</div>
                <!-- <div class="scroll_price" v-if="showAdmin">
                  <span v-if="$api.showPrice()||isPrice()">￥{{item.price}}</span>
                  <span v-else>升级后显示价格</span>
                </div>
                <div class="scroll_price" v-else>
                  <span v-if="$api.showPrice()||isPrice()">￥{{item.displayPrice}}</span>
                  <span v-else>升级后显示价格</span>
                </div> -->

                <div class="scroll_price">
                  <span>￥{{item.price}}</span>
                </div>
              </div>
            </scroll-view>
          </div>
        </div>
      </view>
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'
  import apiUrl from '@/service/config.js'

  export default {

    data () {
      return {
        widgetModel: {},
        dataList: [],
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
        for (var i = 0; i < this.widgetModel.productItems.length; i++) {
          this.dataList.push(this.widgetModel.productItems[i])
        }
        if (apiUrl.themeId === '5d26e11a064c25053c9b3def') {
          this.showAdmin = false
        }
      },
      goIndex (event) {
        this.currentIndex = event.target.current
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      },
      isPrice () {
        if (!this.$user.isLogin() && apiUrl.themeId === '5d26e11a064c25053c9b3def') {
          return true
        }
      }
    }
  }
</script>
