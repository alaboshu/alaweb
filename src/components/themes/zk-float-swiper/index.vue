<template>
  <view class="zk-float-swiper">
    <view class="container_box">
      <view class="float_swiper_top">
        <view @click="goBack">
          <x-icon name="icon-zk-return" color="#666"></x-icon>
        </view>
        <view class="swiper_top_name">{{Title}}</view>
        <view @click="goCart">
          <x-icon name="icon-zk-cart" color="#666"></x-icon>
        </view>
      </view>
      <view v-for="(item,index) in colors" :key="index" class="float_banner" :style="'background:'+item.color" v-show="index===num">
      </view>
      <!-- <view class="bg_search_input">
        <x-icon name="icon-zk-search" size="20" color="#666"></x-icon>
        <input type="text" placeholder="请输入搜索内容">
      </view> -->
      <view class="float_swiper">
        <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" indicator-color="rgba(255, 255, 255, .5)" circular="true" indicator-active-color="rgba(255, 255, 255)" @change="durationChange">
          <swiper-item v-for="(item,index) in contentList" :key="index">
            <img :src="item.image" @click="goLinks(item.url.value)">
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
        colors: [
          {
            text: '1',
            color: '#86BBE4'
          },
          {
            text: '2',
            color: '#E4D7CE'
          },
          {
            text: '3',
            color: '#DBDEE5'
          }
        ],
        contentList: [],
        num: 0,
        Title: ''
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
        if (this.widgetModel.value !== undefined) {
          this.contentList = this.widgetModel.value.links
          this.Title = this.widgetModel.value.title
        }
      },
      durationChange (e) {
        this.num = e.detail.current
      },
      goLinks (url) {
        this.$api.to(url)
      },
      goBack () {
        this.$api.back()
      },
      goCart () {
        this.$api.to('/pages/order/order_cart')
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>

