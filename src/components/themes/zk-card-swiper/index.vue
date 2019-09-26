<template>
  <view class="zk-card-swiper">
    <view class="zk-card_swiper_container">
      <view class="zk-card-swiper_head">
        百家案例
      </view>
      <view class="shop-list_content">
        <swiper :autoplay="false" :circular="true" :indicator-dots="false" next-margin="30px" indicator-color="rgb(102,102,102,.5)" indicator-active-color="rgb(255,255,255,.9)" @change="goIndex">
          <swiper-item v-for="(item,index) in widgetModel" :key="index" class="list_content-swiper">
            <view class="bgImg" :class="index===currentIndex?'ImgActive':''">
              <view class="swiper_top">
                <view class="swiper_top_L">
                  <img :src="item.image" class="avtor" alt="">
                  <view class="swiper_top_L_text">
                    <span>{{item.name}}</span>
                    <span>领先品牌 值得信赖</span>
                  </view>
                </view>
                <view class="swiper_top_R">经典</view>
              </view>
              <view class="swiper_bottom">
                <view class="swiper_bottom_Img">
                  <img :src="item.image" alt="">
                  <span class="bottom_case" v-html="item.detail">{{item.tags}}</span>
                </view>
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
        currentIndex: 0
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
        var par = {
          TableName: this.widget.value.name
        }
        var response = await this.$api.httpGet('Api/LightApp/getList', par)
        if (response.status === 1) {
          this.widgetModel = response.result
        }
      },
      goIndex (event) {
        this.currentIndex = event.target.current
      }
    }
  }
</script>
