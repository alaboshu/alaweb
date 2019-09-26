<template>
  <view class="zk-index-new-top">
    <view class="body-bg">
      <!-- <div class="index-advertising-box">
        <view class="advertising-img" @click="$api.to('/pages/index?path=mall_explosive')">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf76f6731109e232cc9d167.gif" alt="">
        </view>
        <view class="advertising-placeholder"></view>
        <view class="advertising-img" @click="$api.to('/pages/index?path=mall_new_brand')">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf76f9631109e232cc9d1b2.gif" alt="">
        </view>
      </div> -->
      <div class="inde-grid_text">
        <view class="inde-grid-box">
          <view class="grid-item" v-for="(item,index) in dataList" :key="index" @click="goLinks(item.url.value)">
            <view class="grid_img">
              <img :src="item.image" alt="">
            </view>
            <p class="grid_info">{{item.name}}</p>
          </view>
        </view>
      </div>
      <div class="index-banner">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf76fcd31109e232cc9d290.gif" alt="">
      </div>
    </view>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        title: 'swiper',
        widgetModel: {},
        scrollLeft: 0,
        isClickChange: false,
        tabIndex: 0,
        newsitems: [],
        ShowTag: true,
        tabBars: [
          {
            name: '首页',
            id: 'guanzhu'
          }, {
            name: '爆品区',
            id: 'tuijian'
          }, {
            name: '优选区',
            id: 'tiyu'
          }, {
            name: '品牌区',
            id: 'redian'
          }, {
            name: '数码相机',
            id: 'caijing'
          }, {
            name: '母婴用品',
            id: 'yule'
          }, {
            name: '商品百货',
            id: 'junshi'
          }
        ],
        dataList: [
          {
            name: '爆款',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf7702131109e232cc9d7b7.png'
          },
          {
            name: '优选区',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8d8c536b9570878c709b9.png'
          },
          {
            name: '品牌区',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8d8c536b9570878c709b8.png'
          },
          {
            name: '新闻',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8d8b836b9570878c709b0.png'
          },
          {
            name: '新品',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8d8b836b9570878c709b1.png'
          },
          {
            name: '商学院',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8d8c436b9570878c709b6.png'
          },
          {
            name: '营销中心',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8d8c436b9570878c709b3.png'
          },
          {
            name: '学习',
            Image: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-06/5cf8d8c436b9570878c709b5.png'
          }
        ],
        background: ['color1', 'color2', 'color3'],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        height: 0,
        imgWidth: 0,
        topPadding: 0
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
        this.dataList = this.widget.value.links
        var infoSync = this.$api.getSystemInfoSync()
        this.height = infoSync.windowHeight
        this.imgWidth = infoSync.screenWidth
        this.topPadding = this.imgWidth + 40
      },
      changeIndicatorDots (e) {
        this.indicatorDots = !this.indicatorDots
      },
      changeAutoplay (e) {
        this.autoplay = !this.autoplay
      },
      intervalChange (e) {
        this.interval = e.target.value
      },
      durationChange (e) {
        this.duration = e.target.value
      },
      async topClick (index) {
        this.tabIndex = index
      },
      goLinks (url) {
        this.$api.to(url)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
