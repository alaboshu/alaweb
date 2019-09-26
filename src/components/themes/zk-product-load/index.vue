<template>
  <view class="zk-product-load-a" :style="'height:'+windowHeight+'px'">
    <div class="product-load-nav">
      <div class="nav-item" :class="{'nav-item-active':navIndex===swiperIndex}" v-for="(nav,navIndex) in loadNav" :key="navIndex" @click="navClick(navIndex)">
        <span> {{nav}}</span>
      </div>
    </div>
    <view class="uni-padding-wrap">
      <view class="page-section swiper">
        <view class="page-section-spacing">
          <swiper class="swiper" :current="swiperIndex" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
            <swiper-item>
              <view class="swiper-item">
                <view class="zk-product-load">
                  <view class="container_box" v-for="(item,index) in list" :key="index">
                    <img src="http://img1.imgtn.bdimg.com/it/u=2149872741,714407608&fm=26&gp=0.jpg">
                    <view class="name_load">
                      <span>产品模板</span>
                      <span>立即下载</span>
                    </view>
                  </view>
                </view>
              </view>
            </swiper-item>
            <swiper-item>
              <view class="swiper-item ">
                <view class="zk-product-load">
                  <view class="container_box" v-for="(item,index) in list" :key="index">
                    <img src="http://img1.imgtn.bdimg.com/it/u=2149872741,714407608&fm=26&gp=0.jpg">
                    <view class="name_load">
                      <span>产品模板</span>
                      <span>立即下载</span>
                    </view>
                  </view>
                </view>
              </view>
            </swiper-item>
            <swiper-item>
              <view class="swiper-item">
                <view class="zk-product-load">
                  <view class="container_box" v-for="(item,index) in list" :key="index">
                    <img src="http://img1.imgtn.bdimg.com/it/u=2149872741,714407608&fm=26&gp=0.jpg">
                    <view class="name_load">
                      <span>产品模板</span>
                      <span>立即下载</span>
                    </view>
                  </view>
                </view>
              </view>
            </swiper-item>
          </swiper>
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
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        indicatorDots: false,
        autoplay: false,
        duration: 500,
        interval: 2000,
        windowHeight: 0,
        swiperIndex: 0,
        loadNav: ['头像', '微视频', '相册封面', '产品分享']
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
        this.windowHeight = this.$api.getSystemInfoSync().windowHeight - 100
      },
      navClick (navIndex) {
        this.swiperIndex = navIndex
      },
      intervalChange (e) {
        this.interval = e.target.value
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>

