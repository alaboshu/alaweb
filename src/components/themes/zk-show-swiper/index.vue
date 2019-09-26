<template>
  <view class="zk-show-swiper">
    <view class="container_box">
      <swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="2000" indicator-active-color="#c81432" indicator-color="#F0F0F0">
        <swiper-item v-for="(item,index) in list" :key="index">
          <view class="item_img">
            <view class="item_title" @click="goBigLink(item.urlss.value)">
              <span style="display:flex">{{item.title}} <x-icon name="zk-jiantou" color="#666" size="11" style="margin-top:2px;"></x-icon></span>
              <span></span>
            </view>
            <view class="item_list" @click="goLink(item.url.value)">
              <img :src="item.image">
              <view class="item_name">{{item.name}}</view>
            </view>
            <view class="item_list" @click="goLinks(item.urls.value)">
              <img :src=" item.images">
              <view class="item_name">{{item.names}}</view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class=" stack box_shadow1"></view>
    <view class=" stack box_shadow2"></view>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        title: '',
        list: []
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
          this.title = this.widgetModel.value.class
          this.list = this.widgetModel.value.links
        }
      },
      goLink (url) {
        this.$api.to(url)
      },
      goLinks (url) {
        this.$api.to(url)
      },
      goBigLink (url) {
        this.$api.to(url)
      }
    }
  }
</script>
