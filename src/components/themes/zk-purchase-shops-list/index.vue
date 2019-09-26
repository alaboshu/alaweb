<template>
  <view class="zk-purchase-shops-list-a">
    <view class="zk-purchase-shops-list">
      <view class="container_box" v-for="(item,index) in list" :key="index">
        <view class="list_img">
          <img src="http://img5.imgtn.bdimg.com/it/u=4182826200,1870095159&fm=26&gp=0.jpg" />
        </view>
        <view class="list_name">小米 (MI小米电视4A 32英寸)</view>
        <view class="list_reduce_price">直降￥500</view>
        <view class="list_bottom">
          <view class="test_price">体验价<span>￥1600</span></view>
          <view class="sale_count">5253件已预售</view>
        </view>
        <view class="count_tag">{{item}}
          <view class="tragier_white"></view>
        </view>
        <view class="cut_down_time">
          <span>{{date}}</span>
          <span>天</span>
          <span>{{hours}}</span>
          <span>时</span>
          <span>{{miniute}}</span>
          <span>分</span>
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
        list: [1, 2, 3, 4]
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
                  this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      countTime () {
        var date = new Date()
        var now = date.getTime()
        var endDate = new Date('2019-3-29 24:00:00')
        var end = endDate.getTime()
        var leftTime = end - now
        if (leftTime >= 0) {
          this.date = Math.floor(leftTime / 1000 / 60 / 60 / 24)
          this.hours = Math.floor(leftTime / 1000 / 60 / 60 % 24)
          this.miniute = Math.floor(leftTime / 1000 / 60 % 60)
        } else {
          this.date = '00'
          this.hours = '00'
          this.miniute = '00'
        }
        setTimeout(this.countTime, 1000)
      }
    }
  }
</script>

