<template>
  <view class="zk-enlarge-swiper" v-if="widget">
    <view class="enlarge-swiper-container">
      <view class="shop-list_content">
        <swiper :autoplay="false" :circular="true" :indicator-dots="false" next-margin="40px" @change="goIndex">
          <swiper-item v-for="(item,index) in widget.value.links" :key="index" class="list_content-swiper" @click="$api.to(item.url.value)">
            <view class="bgImg" :class="index===currentIndex?'ImgActive':''">
              <img :src="item.image" class="bgImg-images images_avtice" />
              <view class="list_content-text text_active" :class="index!==currentIndex?'DistanceTop':''">
                <view class="bgImgText">{{item.name}}</view>
                <view class="bgImgTextTag">热销好货</view>
              </view>
            </view>
          </swiper-item>
        </swiper>
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
        currentIndex: 0,
        imgList: [
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-10/5cfe04bf57d1ff2024866233.jpg',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf76ee631109e232cc9d0cc.jpg',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf7a21131109e232cca16db.png'
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
      },
      goIndex (event) {
        this.currentIndex = event.target.current
      }
    }
  }
</script>
