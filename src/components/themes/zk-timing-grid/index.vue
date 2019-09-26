<template>
  <view class="zk-timing-grid">
    <view class="container_box">
      <view class="item_left" :style="'width:'+tylistHeight+'px;'">
        <view class="item_time">
          <view class="item_name">限时优选</view>
          <!--   <div class="cut_down_time">
            <span>{{hours}}</span>
            <span>:</span>
            <span>{{miniute}}</span>
            <span>:</span>
            <span>{{second}}</span>
          </div> -->
        </view>
        <ul class="item_list">
          <li v-for="(item,index) in contentList" :key="index" @click="goLinks(item.url.value)">
            <view v-if="index<2">
              <view class="item_img"> <img :src="item.image"></view>
              <view class="item_price" v-if="$api.showPrice()">￥{{item.price}}</view>
              <view class="item_price" v-else>￥{{item.marketPrice}}</view>
            </view>
          </li>
        </ul>
      </view>
      <view class="item_right" :style="'width:'+tylistHeight+'px;'">
        <view class="item_name">优选新货</view>
        <view class="right_content">
          <view class="buy_btn">立即购买 > </view>
          <view class="content" @click="goNext()">
            <view>
              <img :src="twoList.image">
              <view class="content_name">{{twoList.name}}</view>
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
        date: '',
        hours: '',
        miniute: '',
        second: '',
        contentList: [],
        twoList: [],
        tylistHeight: 0,
        isLogin: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.countTime()
    },
    methods: {
      async init () {
        if (this.$user.isLogin() && this.$user.loginUser().gradeName !== '免费会员') {
          this.isLogin = true
        }
        this.tylistHeight = (this.$api.getSystemInfoSync().windowWidth - 24) / 2
        this.widgetModel = await this.$api.themeWidget(this.widget)
        if (this.widgetModel.value !== undefined) {
          this.contentList = this.widgetModel.value.links
        }
        this.twoList = this.contentList[2]
      },
      countTime () {
        var date = new Date()
        var now = date.getTime()
        var endDate = new Date('2019-4-29 24:00:00')
        var end = endDate.getTime()
        var leftTime = end - now
        if (leftTime >= 0) {
          this.date = Math.floor(leftTime / 1000 / 60 / 60 / 24)
          this.hours = Math.floor(leftTime / 1000 / 60 / 60 % 24)
          this.miniute = Math.floor(leftTime / 1000 / 60 % 60)
          this.second = Math.floor(leftTime / 1000 % 60)
        } else {
          this.date = '00'
          this.hours = '00'
          this.miniute = '00'
          this.second = '00'
        }
        setTimeout(this.countTime, 1000)
      },
      goLinks (url) {
        this.$api.to(url)
      },
      goNext () {
        this.$api.to(this.twoList.url.value)
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>
