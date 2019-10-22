<template>
  <div>
    <view :style="'height:'+statusBarHeight+'px'"></view>
    <view :style="'height:'+statusBarHeight+'px'" class="zk-head-statusbar-class"></view>
    <div v-if="async" style="width:100%;overflow: hidden">
      <div v-for="(widget,index) in viewModel.widgets" :key="index">
        <widgetItem :widget="widget" :model="viewModel"></widgetItem>
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
        statusBarHeight: 0
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
    },
    onReady () {
      // this.init()
    },
    // onPullDownRefresh () {
    //   var _this = this
    //   setTimeout(() => {
    //     _this.isLogin()
    //     uni.stopPullDownRefresh()
    //   }, 1000)
    // },
    mounted () {
      this.init()
    },
    methods: {
      async   init () {
        // if (this.$user.isLogin() === true) {
        this.$api.historys('/pages/customTabbar/free_convertibility_index')
        let option = {
          path: 'fracture_mall_index'
        }
        this.viewModel = await this.$api.themePage(option)

        this.async = true
        if (this.$api.client() === 'AppPlus') {
          this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
        }
        // }
        // this.$user.checkLogin(this.option)
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
<style lang="scss" scoped>
  @import "@/assets/style/variable.scss";
  .zk-head-statusbar-class {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    background: #dcd3cf;
  }
</style>

