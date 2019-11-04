<template>
  <view class="zk-img-swiper-a">
    <view class="zk-img-swiper">
      <view class="container_box">
        <swiper class="swiper" :indicator-dots="true" :interval="2000" :duration="500" :circular="true" indicator-active-color="#c70f2c" indicator-color="#fff" style="height:180px;">
          <swiper-item v-for="(item, index) in list" :key="index" @click="getUrl(item.url.value)">
            <img :src="item.image" class="swiper_img">
          </swiper-item>
        </swiper>
        <view>
          <view class="metchant_info">
            <view class="info_search_left" @click="goBack">
              <i class="icon iconfont zk-arrows-left_black"></i>
            </view>
            <view class="info_search_right">
              <i class="icon iconfont zk-cart" @click="goCart"></i>
              <i class="icon iconfont zk-search" @click="goSearch"></i>
            </view>
            <p class="burst_title">{{name}}</p>
          </view>
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
        list: [],
        name: ''
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
                  this.widgetModel = await this.$api.themeWidget(this.widget)
        this.list = this.widgetModel.value.links
        this.name = this.widgetModel.value.name
      },
      getUrl (url) {
        this.$api.to(url)
      },
      goCart () {
        this.$api.to('/pages/order/order_cart')
      },
      goSearch () {
        this.$api.to('/pages/index?path=product_list')
      },
      goBack () {
        this.$api.back()
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>

