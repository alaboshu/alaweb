<template>
  <view class="zk-card-marking-center-a" v-if="async">
    <view class="zk-card-marking-center">
      <view style="height:232px;width:100%;">
        <view class="container_box">
          <view class="container-img_box">
            <image class="container-img" :src="viewModel.rightsInfo.backGroundImage" alt="" />
          </view>
          <view class="card-marking_box">
            <view class="marking_return" @click="onRetrn">
              <i class="icon iconfont zk-return"></i>
            </view>
            <view class="marking_content">
              <view class="content_left">
                <img :src="userModel.avator" alt="" class="left_img">
                <view class="content_middle">
                  <view class="us er_name" v-if="userModel.userName!=null">{{userModel.userName}}</view>
                  <view class="user_text">
                    <img :src="userModel.gradeIcon" style="width:15px;height:15px;vertical-align: -3px;" />
                    <span>{{userModel.gradeName}}</span>
                    <view class="user_code" v-if="false">邀请码 {{viewModel.inviteCard}}</view>
                  </view>
                </view>
              </view>
              <view class="content_right" @click="immediateBut">
                立即提现
              </view>
            </view>
          </view>
          <view class="marking_content_count">
            <view class="content_count_left">
              <span>￥{{viewModel.cashAmount}}</span>
              <span>账户余额(元)</span>
            </view>
            <view class="content_count_left">
              <span>{{viewModel.serviceCount}}</span>
              <span>已服务(家)</span>
            </view>
            <view class="content_count_left">
              <span>{{viewModel.weekNewCount}}</span>
              <span>本周新增(家)</span>
            </view>
          </view>
        </view>
      </view>
    </view>
    <zk-card-center-list :widget="brandImgList.value.links"></zk-card-center-list>
    <zk-data-brand-list v-if="list" :widget="list"></zk-data-brand-list>
    <zk-card-merchant-count v-if="viewModel" :widget="viewModel"></zk-card-merchant-count>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: {},
        viewModel: '',
        list: [],
        async: false,
        brandImgList: [],
        userModel: ''
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
        this.userModel = this.$user.loginUser()
        var para = {
          loginUserId: this.$user.loginUser().id
        }
        var response = await this.$crud.widget(this, 'BusinessCenterWidget', para)
        this.viewModel = response
        if (this.viewModel.isBusinessCenter === false) {
          var this_ = this
          uni.showModal({
            title: '提示',
            showCancel: false,
            content: '您的等级不足',
            success: function (res) {
              if (res.confirm) {
                this_.async = false
                // this_.$api.to('/pages/default', true)
                uni.reLaunch({
                  url: '/pages/default'
                })
              }
            }
          })
        } else {
          this.list = this.viewModel.items
          this.brandImgList = await this.$api.themeWidget(this.widget)
          this.async = true
        }
      },
      onRetrn () {
        this.$api.back()
      },
      immediateBut () {
        uni.showModal({
          title: '提示',
          showCancel: true,
          content: '请登录分润小程序操作',
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss">
</style>
