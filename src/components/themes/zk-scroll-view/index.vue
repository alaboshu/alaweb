<template>
  <view class="zk-scroll-view">
    <scroll-view :scroll-y="true" @scroll="scrollView" class="scroll" :style="'height:'+height+'px'">
      <slot></slot>
    </scroll-view>
  </view>
</template>


<script>
  export default {
    data () {
      return {
        height: '100'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        // uni.getSystemInfoSync
        var getSystemInfoSync = uni.getSystemInfoSync()
        this.height = getSystemInfoSync.windowHeight
        console.info('uni.getSystemInfoSync', getSystemInfoSync.windowHeight)
      },
      scrollView (ev) {
        console.info('ev', ev)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .zk-scroll-view {
    .scroll {
      width: 100%;
    }
  }
</style>
