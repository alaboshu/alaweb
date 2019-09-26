<template>
  <view class="zk-class-item-list-a">
    <view class="zk-class-item-list">
      <view class="container_box" v-for="item in list" :key="item">
        <view class="item_list_left">
          <zk-video-list></zk-video-list>
        </view>
        <view class="item_list_right">
          <view class="right_title">胡老师经典案例视频</view>
          <view class="right_text">利用吃亏的思维方式，把这种思维方式 动用到企业的经营活动当中</view>
          <view class="class_item_info">
            <view class="item_info">
              <span>地点：深圳宝安</span>
              <span>时间：2019-08-12</span>
            </view>
            <view class="item_btn">立即报名</view>
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

