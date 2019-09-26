<template>
  <view>
    <view class="zk-mobile-content">
      <view class="zk-mobile-text">为了您的账户安全，请绑定手机号</view>
    </view>
    <view class="input_box">
      <view class="phone_text reg_ju">
        <view class="mobei_conter reg_view">
          <view class="text_1">
            <i class="icon iconfont zk-mobilephone icontsty"></i>
          </view>
          <view class="text_2 borderleft">
            <input class="phope border-bottom" placeholder="+86  请输入手机号" />
          </view>
        </view>
      </view>
    </view>
    <view class="verification_code">
      <view class="text_1">
        <i class="icon iconfont zk-thekey yaosi"></i>
      </view>
      <view class="yanzhm">
        <input class="phope" type="number" placeholder="验证码" maxlength="6" />
      </view>
      <view class="reg_box">
        <view class="reg_buttom">获取验证码</view>
      </view>
    </view>
    <view class="qued_ces">
      <button class="conter_list" :class="{'buttombac':check==true}">确定</button>
    </view>
  </view>

</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        check: true
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
                  this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      onchec () {
        this.check = !this.check
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-mobile-text {
    text-align: center;
    margin-top: 30px;
    font-size: 13px;
    color: rgba(153, 153, 153, 1);
  }
  .zk-reg1 {
    font-size: $gl-size-base;
  }
  .input_box {
    padding: 0px 20px;
  }
  .phone_text {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 1px 15px $gl-border1;
    padding: 6px 10px;
  }
  .mobei_conter {
    display: flex;
    align-items: center;
  }
  .topmar {
    margin-top: 15px;
  }
  .icontsty {
    font-size: 22px;
    color: $gl-text3;
  }
  .phope {
    font-size: 15px;
    flex: 1;
  }
  .text_1 {
    padding-right: 10px;
  }
  .text_2 {
    flex: 1;
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  .border-bottom {
    height: 40px;
  }
  .reg_view {
    margin-top: 15px;
  }
  .reg_view:nth-child(1) {
    margin-top: 0px;
  }
  .yanzhm {
    flex: 1;
  }
  .reg_ju {
    margin-top: 30px;
  }
  .verification_code {
    box-shadow: 0px 1px 15px $gl-border1;
    margin: 20px;
    display: flex;
    align-items: center;
    border-radius: 5px;
  }
  .yaosi {
    font-size: 26px;
    padding-left: 15px;
    color: $gl-text3;
  }
  .reg_buttom {
    font-size: 15px;
    color: $gl-light;
    background-color: $gl-brand;
    width: 95px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .qued_ces {
    padding: 10px 20px;
  }
  .conter_list {
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: $gl-light;
    background-color: #dddddd;
  }
  .buttombac {
    background-color: $gl-brand;
  }
  .checkgr {
    margin-top: 5px;
  }
  .lables {
    color: $gl-text2;
  }
  .fuwu_xiy {
    color: $gl-brand;
  }
  .vertop {
    vertical-align: -2px;
  }
</style>
