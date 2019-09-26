<template>
  <view class="zk-shop-bank">
    <view class="shop_bank_container" :style="'height:'+unHeight+'px;'">
      <view class="shop_bank_top_title" @click="goBack()">
        <x-icon name="zk-return" size="18"></x-icon>
        <span>会员卡</span>
      </view>
      <view class="bank_swiper">
        <view class="swiper-item_text ">
          <view class="swiper_content_item">
            <span>自定义商城会员卡</span>
            <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-11/5cd63be6162a3d06e4d158e6.png" alt="" class="tip_title_img">
          </view>
          <view class="text_line">
            <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-11/5cd63be6162a3d06e4d158eb.png" alt="" class="line_img">
            <view class="text_line_title">打造一张您定义的会员特权卡</view>
            <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-11/5cd63be6162a3d06e4d158eb.png" alt="" class="line_img">
          </view>
          <view class="bank_content_img">
            <swiper class="swiper" :indicator-dots="true" :autoplay="false" circular="true" indicator-color="#CDCDCD" indicator-active-color="#939594">
              <swiper-item v-for="(item,index) in widgetModel" :key="index" :style="{ 'background-image': 'url('+ item.cardImage + ')','background-repeat':'no-repeat','background-size':'100% 100%','background-position':'center center' }">
                <span>{{item.name}}</span>
                <span>{{item.name}}专属VIP特权+专属特权</span>
                <!-- <span>8888 8888 8888 8888</span> -->
              </swiper-item>
            </swiper>
          </view>
        </view>
      </view>
      <view class="dicoude_news">
        <view class="dicoude_news_item" v-for="(item,index) in tipData" :key="index">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-11/5cd68c25162a3d06e4d2f4be.png" alt="">
          <span>{{item}}</span>
        </view>
      </view>
      <!-- <view class="apply_btn">立即申请</view> -->
      <view class="bank_tip_img1">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-11/5cd63be6162a3d06e4d158e4.png" alt="">
      </view>
      <view class="bank_tip_img2">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-11/5cd63be6162a3d06e4d158e3.png" alt="">
      </view>
      <view class="bank_tip_img3">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-11/5cd63be6162a3d06e4d158e5.png" alt="">
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
        unHeight: '',
        tipData: [
          '会员特权尊享多重权益',
          '积分抽奖满减活动不断',
          '现场自提好礼相送',
          '兑换优惠券好劵不停'
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
        var res = await this.$api.httpGet('/Api/Auto/Table?type=UserCardSetting')
        if (res.status === 1) {
          this.widgetModel = res.result.result.result
        }
        this.unHeight = this.$api.getSystemInfoSync().screenHeight
      },
      goBack () {
        this.$api.back('index')
      }
    }
  }
</script>
