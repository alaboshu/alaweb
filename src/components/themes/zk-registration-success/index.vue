<template>
  <view class="zk-registration-success" v-if="widgetModel">
    <view class="function-page">
      <view class="function-page_top">
        <view class="page-icon">
          <view class="page-icon_box">
            <img class="page-image_box" src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-04-22/5cbd842c1b479c11ec3084c7.png" />
          </view>
        </view>
      </view>
      <view class="conter_text">
        <p class="p1" v-if="widgetModel !== null||widgetModel.length > 0">操作成功</p>
        <p class="p1" v-else>操作失败</p>
      </view>
    </view>
    <view class="registration_teable">
      <view class="teable-box">
        <view class="registration_teable-head">
          <view class="head-list serial-number">序号</view>
          <view class="head-list serial-name">姓名</view>
          <view class="head-list serial-moblie">手机号</view>
        </view>
        <view class="registration_teable-conter" v-for="(item,index) in widgetModel" :key="index">
          <view class="conter-list serial-number">{{index+1}}</view>
          <view class="conter-list serial-name">{{item.name}}</view>
          <view class="conter-list serial-moblie">{{item.mobile}}</view>
        </view>
      </view>
    </view>
    <view class="page-buttom">
      <view class="page-but" @click="goDefault()">返回首页</view>
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
      goDefault () {
        uni.reLaunch({
          url: '/pages/default'
        })
      },
      async init () {
        var para = {
          id: this.widget.route.id
        }
        var respone = await this.$api.httpGet('/api/BookingSignup/GetOrderUserByOrderId', para)
        this.widgetModel = respone.result
      }
    }
  }
</script>
