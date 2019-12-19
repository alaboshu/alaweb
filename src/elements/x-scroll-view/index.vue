<template>
  <view class="x-scroll-view" v-if="async">
    <scroll-view :scroll-y="true" @scroll="scrollView" class="scroll" :style="'height:'+height+'px'">
      <slot></slot>
    </scroll-view>
  </view>
</template>


<script>
  export default {
    data () {
      return {
        height: '100',
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        var getSystemInfoSync = uni.getSystemInfoSync()
        this.height = getSystemInfoSync.windowHeight
        this.async = true
      },
      scrollView (ev) {
        this.$bus.$emit('sreach_view_list', ev)
        if (ev.detail.scrollTop > 50) {
          this.$bus.$emit('bk_search_view', true)
        } else {
          this.$bus.$emit('bk_search_view', false)
        }
        if (ev.detail.scrollHeight - (this.height + ev.detail.scrollTop) < 6) {
          this.$emit('change')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .x-scroll-view {
    width: 100%;
    box-sizing: border-box;
    .scroll {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
