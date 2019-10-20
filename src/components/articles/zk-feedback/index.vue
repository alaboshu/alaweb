<template>
  <view>
    <view class="input_box">
      <view class="phone_text">
        <view class="mobei_conter">
          <!-- <view class="text_1">
            <i class="icon iconfont zk-mobilephone icontsty"></i>
          </view>-->
          <view class="text_2 borderleft">
            <textarea class="phope" placeholder="请输入问题描述" v-model="description" />
            </view>
        </view>
      </view>
    </view>
    <view class="bottom_le">
      <button class="buttoms" @click="bindLogin">提交</button>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        description: ''
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
      async bindLogin () {
        var para = {
          description: this.description,
          userId: this.$user.loginUser().id
        }
        var res = await this.$api.httpPost('/api/workorder/add', para)
        if (res.status !== 1) {
          this.$api.toastWarn(res.message)
        } else {
          uni.showModal({
            title: '已提交',
            content: '您的问题反馈已提交至后台',
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                uni.reLaunch({
                  url: '/pages/default'
                })
              }
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-login1 {
    font-size: $gl-size-base;
  }
  .login_list {
    width: 100%;
    text-align: center;
    padding: 45px 0px;
  }
  .login_images {
    width: 150px;
    height: 60px;
  }
  .input_box {
    padding: 0px 20px;
  }
  .phone_text {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 1px 15px $gl-border1;
    padding: 15px 10px;
  }
  .mobei_conter {
    display: flex;
    align-items: center;
  }
  .icontsty {
    font-size: 22px;
    color: $gl-text3;
  }
  .phope {
    font-size: 12px;
    flex: 1;
    height: 160px;
    input {
      height: 160px;
    }
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
  .borderleft {
    box-sizing: border-box;
    position: relative;
  }
  .borderleft::before {
    content: "";
    width: 1px;
    height: 35px;
    border-left: 1px solid #e5e5e5;
    position: absolute;
    left: 0px;
    top: 0px;
    transform: scaleY(0.5);
  }
  .bottom_le {
    padding: 0px 20px;
    margin-top: 30px;
  }
  .buttoms {
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: $gl-light;
    background-color: $gl-brand;
    &:active {
      opacity: 0.8;
    }
  }
  .posiconter {
    margin-top: 5px;
    overflow: hidden;
  }
  .wanmma {
    color: $gl-text2;
    float: left;
  }
  .zuce {
    color: $gl-brand;
    float: right;
  }
  .foot_bot {
    padding: 0px 20px;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    display: none;
  }
  .bor_bott {
    text-align: center;
    flex: 1;
  }
  .fontsizes {
    font-size: 50px;
  }
  .zk-vxpay {
    color: #52c43c;
  }
  .zk-qq {
    color: #429ffc;
  }
  .conter_wx {
    color: $gl-text3;
    margin-top: -15px;
  }
</style>
