<template>
  <div v-if="async">
    <!-- <view :style="'height:'+statusBarHeight+'px'"></view>
    <view :style="'height:'+statusBarHeight+'px'" class="zk-head-statusbar-recommend" v-if="showHead"> </view> -->
    <div v-if="async" style="width:100%;overflow: hidden">
      <div v-for="(widget,index) in viewModel.widgets" :key="index">
        <widgetItem :widget="widget"></widgetItem>
      </div>
    </div>
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
        showHead: true
      }
    },
    components: {
      widgetItem
    },
    onShow () {
      // this.isLogin()
      this.init()
    },
    onLoad (option) {
      // uni.setNavigationBarColor({
      //   frontColor: '#ffffff',
      //   backgroundColor: '#c81432'
      // })
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
        this.$api.historys('/pages/tabbar/user_scholl')
        var option = {
          path: 'user_school'
        }
        if (this.$api.client() === 'AppPlus') {
          this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
        }
        this.viewModel = await this.$api.themePage(option)
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
          this.init()
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/style/variable.scss";
  .zk-head-statusbar-recommend {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    background: #fff;
  }
</style>
