<template>
  <view class="merchant-info-show-a">
    <view class="merchant-info-show">
      <view class="container_box">
        <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500" :circular="true" indicator-active-color="#c70f2c" indicator-color="#fff">
          <swiper-item v-for="(item, index) in list" :key="index">
            <img :src="item.img" class="swiper_img">
          </swiper-item>
        </swiper>
        <view>
          <view class="metchant_info">
            <view class="info_search_left">
              <i class="icon iconfont zk-arrows-left_black"></i>
            </view>
            <view class="search">
              <input type="text" placeholder="热门搜索产品">
            </view>
            <view class="info_search_right">
              <i class="icon iconfont zk-cart"></i>
              <i class="icon iconfont zk-search"></i>
            </view>
          </view>
          <view class="merchant_intro">
            <view class="text">
              <view class="intro_title">{{widget.description}}</view>
            </view>
            <view>
              <img :src="widget.logo" alt="" class="shop_logo">
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


  export default {

    data () {
      return {
        widgetModel: {},
        list: [
          {
            img: 'http://img1.imgtn.bdimg.com/it/u=1715209163,672775352&fm=26&gp=0.jpg'
          },
          {
            img: 'http://img1.imgtn.bdimg.com/it/u=1715209163,672775352&fm=26&gp=0.jpg'
          },
          {
            img: 'http://img1.imgtn.bdimg.com/it/u=1715209163,672775352&fm=26&gp=0.jpg'
          }
        ]
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
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>

