<template>
  <div>
    <view v-if="isNotIosApp">
      <view :style="'height:'+statusBarHeight+'px'"></view>
      <view :style="'height:'+statusBarHeight+'px'" class="zk-head-statusbar-class" v-if="showHead"></view>
    </view>
    <div v-if="async" style="width:100%;overflow: hidden">
      <div v-for="(widget,index) in viewModel.widgets" :key="index">
        <widgetItem :widget="widget"></widgetItem>
      </div>
    </div>
  </div>
</template>
<script>
  import widgetItem from '../../elements/all/x-widget/widget-item'
  // import pagesInfo from '@/build.json'
  // import theme from '@/service/all/theme.js'
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
    onLoad (option) {
      this.option = option
    },
    onShow () {
      // this.isLogin()
      this.init()
    },
    onReady () {

    },
    onPageScroll (e) {
      if (this.isNotIosApp === true) {
        if (e.scrollTop === 0) {
          this.showHead = true
          return false
        } else if (e.scrollTop > 1) {
          this.showHead = true
          return false
        } else if (e.scrollTop < -50) {
          this.showHead = false
          return false
        }
      }
    },
    // onPullDownRefresh () {
    //   this.isLogin()
    //   uni.stopPullDownRefresh()
    // },
    methods: {
      async   init () {
        // if (this.$user.isLogin() === true) {
        this.$api.historys('/pages/tabbar/product_class')
        var option = {
          path: 'product_class'
        }
        if (this.$api.client() === 'AppPlus') {
          this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
          uni.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#c81432'
          })
          this.isNotIosApp = false
        }
        this.viewModel = await this.$api.themePage(option)
        console.log('viewmodel', this.viewModel)
        this.async = true
      },
      isLogin () {
        if (this.$user.isLogin() === false) {
          uni.showModal({
            title: '未登录',
            content: '请先登录',
            success: function (res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: '/pages/user/login'
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
  .zk-head-statusbar-class {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    background: #fff;
  }
</style>

