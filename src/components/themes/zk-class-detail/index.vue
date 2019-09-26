<template>
  <view class="zk-class-detail-a">
    <view class="zk-class-detail">
      <view class="container_box" v-for="item in list" :key="item">
        <view class="detail_title">三天两夜(密训)大会</view>
        <view class="detail_video">
          <zk-video-list></zk-video-list>
        </view>
        <view class="class_count_price">
          <span>已报名566人/共1000名额</span>
          <span>￥99</span>
        </view>
        <view class="detail_info">
          <view class="class_address">
            <span>地点：深圳宝安</span>
            <span>时间：2019-08-12</span>
          </view>
          <view class="paid_btn">确定付费</view>
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
        list: [1, 2, 3]
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
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>

