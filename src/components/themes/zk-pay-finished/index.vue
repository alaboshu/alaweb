<template>
  <view class="zk-pay-finished">
    <view class="pay_finished_top">
      <view class="finished_button" @click="goBack">完成</view>
    </view>
    <view class="finished_img">
      <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-30/5cefb9f2732b6722d4e9f9c8.png" alt="">
      <view class="pay_status">付款成功</view>
    </view>

  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {}
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
      goBack () {
        this.$api.to('index')
      }
    }
  }
</script>
