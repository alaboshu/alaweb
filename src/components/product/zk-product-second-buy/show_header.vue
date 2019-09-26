

<template>
  <view>
    <div class="show_header" id="showHeader">
      <ul>
        <li @click="rolling('showHeader')" class="active">头部</li>
        <li @click="rolling('showRecommended')">详情</li>
        <li @click="rolling('showIntro')">推荐</li>
      </ul>
    </div>
    <div style="height:40px"></div>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        boxWeird: false,
        arrows: 'zk-arrows-left_white',
        activesIndex: 1,
        scroll: 0,
        imgAge: {
          showRecommended: '',
          showIntro: ''
        }
      }
    },
    onReady: function () {
      uni.getSystemInfo({ // 获取屏幕高度
        success: res => {
        }
      })
    },
    onPageScroll (e) {
      var that = this
      that.scroll = e.scrollTop
    },
    methods: {
      init () {

      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  @import "@/assets/style/theme.scss";
  .show_header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $gl-themeColor;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    ul {
      display: flex;
      align-items: center;
      height: 30px;
      li {
        padding: 3px 5px;
        margin: 0 5px;
        color: #fff;
      }
      .active {
        border-bottom: 2px solid #fff;
      }
    }
  }
</style>
