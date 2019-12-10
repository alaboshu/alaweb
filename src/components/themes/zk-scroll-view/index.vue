<template>
  <view class="zk-scroll-view">
    <scroll-view :scroll-y="true" @scroll="scrollView" class="scroll" :style="'height:'+height+'px'">
      <slot name="scrollView"></slot>
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
        var getSystemInfoSync = uni.getSystemInfoSync()
        this.height = getSystemInfoSync.windowHeight
      },
      scrollView (ev) {
        if (ev.target.scrollTop > 50) {
          this.$bus.$emit('bk_search_view', true)
        } else {
          this.$bus.$emit('bk_search_view', false)
        }
        if (ev.target.scrollHeight - (this.height + ev.target.scrollTop) < 6) {
          this.$emit('change')
        }
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
