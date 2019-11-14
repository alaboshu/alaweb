<template>
  <view>
    <view v-if="statusBar">
      <view :style="'height:' + statusBarHeight + 'px'"></view>
      <view :style="
          'height:' + statusBarHeight + 'px;background:' + statusBarBackGround
        " class="zk-head-statusbar zk-head-statusbar-fixed"></view>
    </view>
    <view v-if="headClient">
      <view class="zk-head_fiex" :style="'top:' + statusBarHeight + 'px'">
        <view class="zk-nav-bar" :style="'background:' + bgColor">
          <view class="nav-bar-title" v-if="title">{{ title }}</view>
          <view class="nav-bar-return" @click="onClickLeft()">
            <x-icon name="icon-zk-return" :size="15" color="#ffffff"></x-icon>
          </view>
        </view>
      </view>
      <view class="zk-head_top" v-if="false"></view>
    </view>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        widgetModel: '',
        async: false,
        headClient: false,
        statusBar: false,
        statusBarHeight: 0,
        statusBarBackGround: '#ffffff',
        control: false,
        showControl: true,
        bgColor: '#c81432'
      }
    },
    props: {
      widget: {},
      title: {},
      showHead: {
        default: false
      },
      color: {}
    },
    mounted () {
      this.init()
      this.$nextTick(() => {
        this.$on('control', type => {
          if (type === 'negative') {
            this.statusBar = false
          } else {
            this.statusBar = true
            this.control = type
          }
        })
      })
    },
    methods: {
      async init () {
        if (this.color) {
          this.bgColor = this.color
        }
        if (this.$api.client() === 'WeChatLite') {
          this.headClient = false
        } else {
          this.headClient = this.showHead
        }
        if (this.$api.client() === 'AppPlus') {
          this.statusBar = false
        } else {
          this.statusBar = false
        }
        if (this.showHead !== true) {
          this.statusBarBackGround = '#ffffff'
        }
        if (this.$api.client() === 'AppPlus') {
          this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
        }
        this.async = true
      },
      onClickLeft () {
        if (this.widget && this.widget.url !== undefined) {
          this.$api.back(this.widget.url)
        } else {
          uni.navigateBack({
            delta: 1
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "@/assets/style/variable.scss";
  .zk-head-statusbar {
    width: 100%;
    background: $gl-themeColor;
  }
  .zk-head-statusbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .min-x-head {
    font-size: $gl-size-base;
  }

  .zk-nav-bar {
    background-color: $gl-brand;
    height: 46px;
    position: relative;
  }
  .nav-bar-title {
    text-align: center;
    line-height: 46px;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
  }
  .nav-bar-return {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translate(0, -50%);
    width: 30px;
    height: 30px;
  }
  .van-nav-bar {
    background-color: $gl-brand;
  }
  .van-nav-bar__title {
    color: #ffffff;
    font-size: 1.25rem;
  }
  .zk-head_fiex {
    width: 100%;
    height: 45px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9999;
  }
  .zk-head_top {
    height: 45px;
  }
  .van-nav-bar .van-icon {
    color: $gl-light;
  }
</style>
