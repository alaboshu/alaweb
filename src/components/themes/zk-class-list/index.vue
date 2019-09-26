<template>
  <view class="zk-class-list-a">
    <view class="zk-class-list">
      <view class="container_box" v-for="item in list" :key="item">
        <view class="class_video">
          <view class="class_video_title">三天两夜(密训)大会</view>
          <zk-video-list></zk-video-list>
        </view>
        <view class="class_content">
          <view class="class_title">胡老师经典案例视频《5》</view>
          <view class="class_news">
            <view class="class_data">
              <span>地点：深圳保安</span>
              <span>时间：2019-08-12</span>
            </view>
            <view class="click_btn">立即报名</view>
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

