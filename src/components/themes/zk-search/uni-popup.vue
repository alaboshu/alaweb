<template>
  <view>
    <view class="uni-mask" v-show="show" :style="{top:offsetTop + 'px'}" @click="hide"></view>
    <view :class="['uni-popup','uni-popup-'+type]" v-show="show">
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        // top - 顶部， middle - 居中, bottom - 底部
        default: 'middle'
      },
      msg: {
        type: String,
        default: ''
      }
    },
    data () {
      let offsetTop = 0
      // #ifdef H5
      offsetTop = 44
      // #endif
      return {
        offsetTop: offsetTop
      }
    },
    methods: {
      hide: function () {
        this.$emit('hidePopup')
      }
    }
  }
</script>
<style>
</style>
