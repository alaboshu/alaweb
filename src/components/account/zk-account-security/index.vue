<template>
  <view class="zk-account-security">
    <view class="account-security">
      <view class="account_head">
        <view class="head-box_conter">
          <view class="account_head-box">
            <image src="" alt="" class="account_head-img" />
          </view>
          <view class="account-intro">为保障您账户安全&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尽快完成平台安全认证</view>
        </view>
      </view>
      <view class="account_conter">
        <ul>
          <li v-for="(item,index) in accoutList" :key="index">
            <router-link to="" class="router-a">
              <view class="left-box">
                <view class="left-box_top">{{item.title}}</view>
                <view class="left-box_bottom">{{item.intro}}</view>
              </view>
              <view class="right-box">
                <view v-if="item.text=='未认证'">
                  <x-icon name="icon-zk-warning" size="18" :color="'#c91230'"></x-icon>
                </view>
                <view class="right-box_title" :class="{'unverified':item.text=='未认证'}">{{item.text}}</view>
                <view>
                  <x-icon name="icon-zk-jiantou" size="12" color="#999999"></x-icon>
                </view>
              </view>
            </router-link>
          </li>
        </ul>
      </view>
      <view class="account-foot">阿拉博数和您一起同进</view>
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
        accoutList: [
          { title: '手机号绑定', intro: '绑定后实时短信验证', text: '未认证' },
          { title: '身份证审核', intro: '确保账户财产安全', text: '已验证' },
          { title: '企业认证', intro: '确保自定义商城规范', text: '未认证' },
          { title: '登录密码', intro: '账户登录安全可靠', text: '去修改' },
          { title: '交易密码', intro: '确保个人账户资产安全', text: '已验证' },
          { title: '人脸识别', intro: '账户唯一性', text: '未认证' }
        ]
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
