<template>
  <view class="zk-sign-desk">
    <view class="sign-desk_head">
      <img src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-21/5ce3abe4e6649394e8d5c1d2.jpg" class="sign-desk_img" />
    </view>
    <view class="sign-desk_conter">
      <view class="sign-desk_box">
        <view class="sign-desk_lable">姓名：</view>
        <view class="sign-desk_text"><input v-model="user.name" class="desk_text-input" placeholder="请输入姓名" /></view>
      </view>
      <view class="sign-desk_box">
        <view class="sign-desk_lable">手机号：</view>
        <view class="sign-desk_text"><input v-model="user.mobile" class="desk_text-input" placeholder="请输入手机号" /></view>
      </view>
      <!-- <view class="resume-load" @click="resumeLoad">重新输入</view> -->
    </view>
    <view class="sign-immediately" @click="sign">
      <img class="sign-immediately_img" src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-21/5ce3b12ee6649394e8d5c1f8.jpg" />
    </view>
    <view class="desk-text_foot" v-if="false">还没有报名？<span class="text_foot-span">马上报名</span></view>
    <view class="sign-successfully" v-if="signSuccessfully">
      <view class="sign-box">
        <view class="sign-box_top">
          <view class="sign-top_list">
            <img class="sign-top_img" src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-21/5ce3c1eca32d48694c905b83.png" />
          </view>
          <view class="sign-top_text">恭喜！签到成功！</view>
        </view>
        <view class="got-roger" @click="gotRoger">知道了</view>
      </view>
    </view>
    <view class="sign-successfully" v-if="signFailed">
      <view class="sign-box">
        <view class="sign-box_top">
          <view class="sign-top_list">
            <img class="sign-top_img" src="http://s-test.qiniuniu99.com//wwwroot/uploads/api/2019-05-21/5ce3c455a32d48694c906803.png" />
          </view>
          <view class="sign-top_text">抱歉！签到失败，请重新核对信息后输入。</view>
        </view>
        <view class="got-roger" @click="resumeLoad">重新输入</view>
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
        user: {
          name: '',
          mobile: ''
        },
        signSuccessfully: false,
        signFailed: false
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

      },
      resumeLoad () {
        this.user.name = ''
        this.user.mobile = ''
        this.signFailed = false
      },
      gotRoger () {
        this.signSuccessfully = false
      },
      async sign () {
        var par = {
          name: this.user.name,
          mobile: this.user.mobile
        }
        var result = await this.$api.httpGet('Api/BookingSignupOrder/UserSign', par)

        if (result.result.succeeded === true) {
          this.signSuccessfully = true
        } else {
          this.signFailed = true
        }
      }
    }
  }
</script>
