<template>
  <view class="zk-card-bank-a">
    <view class="zk-card-bank">
      <view class="container_box">
        <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120" scroll-with-animation="true" indicator-dots="true">
          <swiper duration="500" circular="true" style="height:180px" @change="wiperImg" previous-margin="15px" next-margin="15px">
            <swiper-item id="demo1" @click="swiper" class="scroll-view-item_H " v-for="(item,index) in widgetModel" :key="index">
              <view class="scroll_img" :style="{ 'background-image': 'url('+ item.backGroundImage + ')','background-repeat':'no-repeat' }">
                <view class="card_top">
                  <view class="top_left" :style="{color:item.themeColor}">
                    <span>{{item.name}}</span>
                    <span>{{item.intro}} 专享{{count}}大权益功能</span>
                  </view>
                  <view class="top_right">
                    <img :src="item.icon" class="top_right-box">
                  </view>
                </view>
                <view class="card_bottom">
                  <view class="bottom_left">
                    <span>{{item.totalUseCount}}/{{item.totalCount}}</span>
                    <span>{{item.name}}端口</span>
                  </view>
                </view>
                <!--  <view class="click_left" style="position:absolute;top:40%;left:20px;">
                  <i class="icon iconfont zk-return" style="font-size:20px;color:#fff"></i>
                </view>
                <view class="click_right" style="position:absolute;top:40%;right:20px">
                  <i class="icon iconfont zk-jiantou" style="font-size:20px;color:#fff"></i>
                </view> -->
              </view>
            </swiper-item>
          </swiper>
          <zk-data-column-list :widget="listContent"></zk-data-column-list>
          <zk-qiniuniu-btn :widget="btnText" :index="index"></zk-qiniuniu-btn>
        </scroll-view>
      </view>
    </view>
    <br />
    <br />
    <br />
  </view>
</template>

<script>
 
  import apiUrl from '@/service/config.js'
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        async: false,
        widgetModel: {},
        scrollTop: 0,
        old: {
          scrollTop: 0
        },
        api: '',
        index: 0,
        listContent: [],
        btnText: '',
        count: ''
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
        if (this.$user.isLogin()) {
          var para = {
            userId: this.$user.loginUser().id
          }
          this.widgetModel = await this.$crud.widget(this, 'SuggestWidget', para)
          this.api = apiUrl.apiBaseUrl
          this.listContent = this.widgetModel[this.index]
          this.btnText = this.widgetModel[this.index]
          this.count = this.widgetModel[this.index].privileges.length
          this.async = true
        }
      },
      scroll: function (e) {
        this.old.scrollTop = e.detail.scrollTop
      },
      wiperImg (e) {
        this.index = e.detail.current
        this.listContent = this.widgetModel[this.index]
        this.btnText = this.widgetModel[this.index]
        this.count = this.widgetModel[this.index].privileges.length
      }
    }
  }
</script>
