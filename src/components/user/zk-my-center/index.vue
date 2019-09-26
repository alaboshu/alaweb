<template>
  <view class="zk-my-center">
    <view>
      <view class="header" v-bind:class="{'status':isH5Plus}">
        <view class="userinfo">
          <view class="face">
            <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" />
          </view>
          <view class="info">
            <view class="username">{{userinfo.username}}</view>
            <view class="integral">积分:{{userinfo.mount}}</view>
          </view>
        </view>
        <view class="setting"><i class="el-icon-setting"></i></view>
      </view>
      <view class="orders">
        <view class="box">
          <view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover" @tap="toOrderType(index)">
            <view class="icon">
              <view class="badge" v-if="row.badge>0">{{row.badge}}</view>
              <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" />
            </view>
            {{row.name}}
          </view>
        </view>s
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
        isH5Plus: true,
        userinfo: {},
        orderTypeLise: [
          {
            name: '待付款',
            icon: 'el-icon-date',
            badge: 1
          },
          {
            name: '待发货',
            icon: 'el-icon-printer',
            badge: 2
          },
          {
            name: '待收货',
            icon: 'el-icon-menu',
            badge: 6
          },
          {
            name: '待评价',
            icon: 'el-icon-picture',
            badge: 9
          },
          {
            name: '退换货',
            icon: 'el-icon-picture-outline',
            badge: 0
          }
        ]
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.userinfo = {
        face: '../../static/HM-PersonalCenter/face.jpeg',
        username: 'VIP会员10240',
        mount: '1435'
      }
    },
    methods: {
      async init () {
                  this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      toOrderType (index) {
        uni.showToast({ title: this.orderTypeLise[index].name })
      }

    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  @import "./styles/a.scss";
</style>
