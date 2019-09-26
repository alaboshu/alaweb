<template>
  <view class="zk-logout">
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: ''
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
        this.$api.localRemove('wechat_logincount')
          this.widgetModel = await this.$api.themeWidget(this.widget)
        uni.showModal({
          title: '',
          content: '是否退出登录',
          showCancel: true,
          confirmText: '确定',
          success: (val) => {
            if (val.confirm) {
              this.$api.localRemove(this.$user.userKey())
              this.$api.localRemove('wechat_openId') // 移除当前openId
              uni.reLaunch({
                url: '/pages/default'
              })
            }
            if (val.cancel) {
              uni.reLaunch({
                url: '/pages/tabbar/user_index'
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-logout {
    font-size: $gl-size-base;
  }
</style>
