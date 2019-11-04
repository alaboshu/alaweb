<template>
  <view v-if="windowsData" class="zk-scroll-view">
    <scroll-view scroll-y :style="{height:windowsData.windowHeight+'px'}" @scroll="pageScroll" @scrolltolower="pagesTolower">
      <slot></slot>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        windowsData: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        // 获取屏幕宽高
        this.windowsData = uni.getSystemInfoSync()
        console.info('windowsData', this.windowsData)
      },
      pageScroll () {
        // 轮播滚动事件
      },
      pagesTolower () {
        // 触底事件
        this.$bus.$emit('pagesTouch')
      }
    }
  }
</script>
