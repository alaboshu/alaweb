<template>
  <view class="zk-limited-time-buy-a">
    <view class="zk-limited-time-buy">
      <view class="container_box">
        <view class="limited_top">
          <view v-for="(item, index) in list" :key="index" class="buy_type" :class="{current:num==index}" @click="getIndex(index)">
            <span>{{item.time}}</span>
            <span>{{item.text}}</span>
          </view>
        </view>
        <zk-timing-booking></zk-timing-booking>
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
        list: [
          {
            time: '14:00',
            text: '已开抢'
          },
          {
            time: '08:00',
            text: '即将开抢'
          },
          {
            time: '14:00',
            text: '即将开抢'
          },
          {
            time: '14:00',
            text: '即将开抢'
          },
          {
            time: '14:00',
            text: '即将开抢'
          }
        ],
        num: 0
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
      getIndex (index) {
        this.num = index
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>
