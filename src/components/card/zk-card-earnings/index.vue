<template>
  <view class="zk-card-earnings">
    <view class="card-earnings-box">
      <image :src="urlIamg" alt="" class="back-img" />
      <view class="supernatant">
        <view class="earnings-box_head">
          <view class="box_head-left">
            <view class="left-one left-title">账户余额</view>
            <view class="left-two left-title">{{widgetModel.account}}</view>
            <view class="left-three left-title">最新一笔收益 +{{widgetModel.lastEarnings}}</view>
          </view>
          <view class="box_head-right">
            <view class="head-right-img">
              <image src="https://s-open.qiniuniu99.com/wwwroot/uploads/image/20190330/foot-login.png" alt="" class="right-img_box" />
            </view>
            <view class="head-right-buttom">
              <view class="head-right_but">营销中心</view>
            </view>
          </view>
        </view>
        <view class="yield-list">
          <view class="yield-list_box">
            <view class="list_box-conter">
              <p>+{{widgetModel.todayEarnings}}</p>
              <p>今日收益</p>
            </view>
            <view class="list_box-conter">
              <p>+{{widgetModel.monthEarnings}}</p>
              <p>本月收益</p>
            </view>
            <view class="list_box-conter">
              <p>￥{{widgetModel.totalEarnings}}</p>
              <p>累计收益</p>
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
        urlIamg: 'https://s-open.qiniuniu99.com/wwwroot/uploads/image/20190330/card3.png'
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
        var data = {
          userId: 1
        }
        this.widgetModel = await this.$crud.widget(this, 'AmountWidget', data)
      }
    }
  }
</script>
