<template>
  <div>
    <view v-if="isNotIosApp">
      <view :style="'height:'+statusBarHeight+'px'"></view>
      <view :style="'height:'+statusBarHeight+'px'" class="zk-head-statusbar-press" v-if="showHead"></view>
    </view>
    <div v-if="async&&isNotIosApp" style="width:100%;overflow: hidden">
      <div v-for="(widget,index) in viewModel.widgets" :key="index">
        <widgetItem :widget="widget"></widgetItem>
      </div>
    </div>
    <zk-store-dynamic v-if="!isNotIosApp"></zk-store-dynamic>
  </div>
</template>
<script>
  import widgetItem from '../../elements/all/x-widget/widget-item'
  export default {
    data () {
      return {
        async: false,
        viewModel: null,
        statusBarHeight: 0,
        showHead: true,
        isNotIosApp: true
      }
    },
    components: {
      widgetItem
    },
    onShow () {
      this.isLogin()
    },
    onLoad (option) {

    },
    onReady () {
      // this.init()
    },
    onPageScroll (e) {
      if (this.isNotIosApp === true) {
        if (e.scrollTop === 0) {
          this.showHead = true
        } else if (e.scrollTop > 1) {
          this.showHead = true
        } else if (e.scrollTop < 1) {
          this.showHead = false
        }
      }
    },
    onPullDownRefresh () {
      this.isLogin()
      uni.stopPullDownRefresh()
    },
    methods: {
      async   init () {
        if (this.$user.isLogin() === true) {
          this.$api.historys('/pages/tabbar/press')
          let option = {
            path: 'press'
          }
          this.viewModel = await this.$api.themePage(option)
          this.async = true
        }
        if (this.$api.client() === 'AppPlus') {
          // if (this.$api.payType() === 3) {
          uni.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#c81432'
          })
          this.isNotIosApp = false
          // }
          this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
        }
      },
      isLogin () {
        if (this.$user.isLogin() === false) {
          uni.showModal({
            title: '未登录',
            content: '请先登录',
            success: function (res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: '/pages/index?path=user_login'
                })
              } else if (res.cancel) {
                uni.reLaunch({
                  url: '/pages/default'
                })
              }
            }
          })
        } else {
          if (this.viewModel === null) {
            this.init()
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/style/variable.scss";
  .zk-head-statusbar-press {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    background: #fff;
  }
</style>
