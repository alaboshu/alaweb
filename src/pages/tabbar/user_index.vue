<template>
  <div>
    <view v-if="isNotIosApp">
      <view :style="'height:'+statusBarHeight+'px'"></view>
      <view :style="'height:'+statusBarHeight+'px'" class="zk-head-statusbar" v-if="showHead"></view>
    </view>
    <div class="scroll-head" v-if="scrollHeadShow&&isNotIosApp" :style="'top:'+statusBarHeight+'px'">
      {{loginUser.name}} <span>({{loginUser.gradeName}})</span>
    </div>
    <div v-if="async" style="width:100%;overflow: hidden">
      <div v-for="(widget,index) in viewModel.widgets" :key="index" :style="widget.style && widget.style.css" :class="widget.borderClass">
        <widgetItem :widget="widget" v-if="!widget.border&&!widget.layout"></widgetItem>
        <div class="border-header" v-if="widget.border">
          <x-icon class="border-header-icon" v-if="widget.border.icon" :icon="widget.border" :color="widget.border.icon.color"></x-icon>
          <view class="border-header-title" v-if="widget.border.title">{{widget.border.title}}</view>
          <view class="border-header-desc" v-if="widget.border.intro">{{widget.border.intro}}</view>
        </div>
        <view class="border-body" v-if="widget.border">
          <widget-item :widget="widget" :model="viewModel" />
        </view>
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
        showHead: true,
        loginUser: '',
        scrollHeadShow: false,
        isNotIosApp: true
      }
    },
    components: {
      widgetItem
    },
    onShow () {
      this.isLogin()
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
      if (this.$api.client() === 'AppPlus') {
        if (e.scrollTop > 50) {
          this.scrollHeadShow = true
        } else {
          this.scrollHeadShow = false
        }
      }
    },
    onPullDownRefresh () {
      this.isLogin()
      uni.stopPullDownRefresh()
    },
    methods: {
      async   init () {
        console.info('就是这里了')
        if (this.$user.isLogin() === true) {
          this.$api.historys('/pages/tabbar/user_index')
          var option = {
            path: 'user_index'
          }
          // this.viewModel = await this.$api.themePage(option)
          if (this.$api.client() === 'AppPlus') {
            uni.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#c81432'
            })
            this.isNotIosApp = false
            this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
          }
          this.viewModel = await this.$api.themePage(option)
          console.log(this.viewModel.name, this.viewModel)
          this.loginUser = this.$user.loginUser()
          this.async = true
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
  .zk-head-statusbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    background: $gl-themeColor;
  }
  .scroll-head {
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 999;
    text-align: center;
    line-height: 40px;
    background: #c70f2c;
    color: #fff;
    font-size: 16px;
    span {
      font-size: 12px;
    }
  }
</style>
