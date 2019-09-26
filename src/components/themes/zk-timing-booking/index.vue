<template>
  <view class="zk-timing-booking-a">
    <view class="zk-timing-booking">
      <view class="all_box" v-for="(item,index) in contentList" :key="index">
        <view class="booking_left">
          <img :src="item.img" alt="">
        </view>
        <view class="booking_right">
          <p class="list_name">{{item.name}}</p>
          <div class="cut_down_time">
            <span>{{date}}</span>
            <span>天</span>
            <span>{{hours}}</span>
            <span>时</span>
            <span>{{miniute}}</span>
            <span>分</span>
          </div>
          <p class="count_overplus">库存剩余{{item.count}}件</p>
          <div class="out_rate">
            <div class="in_rate"></div>
          </div>
          <p class="amzing_price"><span>体验价</span><span>￥{{item.price}}</span></p>
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
        contentList: [
          {
            name: '美的 (Midea) M1-L213B',
            count: '5000',
            img: 'https://img12.360buyimg.com/evalpic/s500x500_jfs/t25330/138/1882232745/304525/1d2c0785/5bbd89d7N012d5e0b.jpg!q70.dpg',
            price: '843'
          },
          {
            name: '百雀羚套装 三生花青春紧弹提拉紧致补水滋润保湿控油官方旗舰店 美容液100ml+乳液100ml+面霜50g',
            count: '200',
            img: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t26143/280/1895829574/72509/a04b4059/5bf21dddNd1e377ca.jpg!q80.dpg.webp',
            price: '788'
          },
          {
            name: '正品授权AHC水乳套装 爱和纯 韩国玻尿酸女男士补水保湿控油套盒组合装 水乳套装两件套爽肤水乳液120ml*2',
            count: '200',
            img: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/16069/11/10311/128914/5c872cafE3a5d3350/7e17694affa0afae.jpg!q80.dpg',
            price: '788'
          },
          {
            name: '九阳（Joyoung）豆浆机家用免滤多功能小型全自动可加热1.2L 粉色 DJ12E-N66',
            count: '200',
            img: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/22210/12/10670/172715/5c887e89E75f73459/78bfceb29c29a3f4.jpg!q80.dpg.webp',
            price: '788'
          },
          {
            name: '美的 (Midea) M1-L213B',
            count: '5000',
            img: 'https://img12.360buyimg.com/evalpic/s500x500_jfs/t25330/138/1882232745/304525/1d2c0785/5bbd89d7N012d5e0b.jpg!q70.dpg',
            price: '843'
          },
          {
            name: '百雀羚套装 三生花青春紧弹提拉紧致补水滋润保湿控油官方旗舰店 美容液100ml+乳液100ml+面霜50g',
            count: '200',
            img: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t26143/280/1895829574/72509/a04b4059/5bf21dddNd1e377ca.jpg!q80.dpg.webp',
            price: '788'
          },
          {
            name: '正品授权AHC水乳套装 爱和纯 韩国玻尿酸女男士补水保湿控油套盒组合装 水乳套装两件套爽肤水乳液120ml*2',
            count: '200',
            img: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/16069/11/10311/128914/5c872cafE3a5d3350/7e17694affa0afae.jpg!q80.dpg',
            price: '788'
          },
          {
            name: '九阳（Joyoung）豆浆机家用免滤多功能小型全自动可加热1.2L 粉色 DJ12E-N66',
            count: '200',
            img: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/22210/12/10670/172715/5c887e89E75f73459/78bfceb29c29a3f4.jpg!q80.dpg.webp',
            price: '788'
          }
        ],
        bookingWidth: ''
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
        this.widgetModel = await this.$api.httpGet('Api/PreSells/List')
        await this.$api.httpGet('/Api/TimeLimitBuy/GetList')
        var this_ = this
        uni.getSystemInfo({
          success: function (res) {
            this_.bookingWidth = res.screenWidth - 20
          }
        })
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
<style lang="scss">
  @import "./styles/a.scss";
</style>

