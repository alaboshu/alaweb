<template>
  <view class="x-button" @click="submint">
    <view class="x-button-icon" v-if="loading"></view>
    <view class="x-button-text">{{btnText}}</view>
  </view>
</template>

<script>
  export default {
    props: {
      loading: {
        default: false
      }, // 是否使用加载中,默认为false不使用
      btnText: {},
      bgColor: {
        default: '#C81432'
      }
    },
    data () {
      return {
        isLoading: true
      }
    },
    mounted () {
    },
    methods: {
      submint () {
        if (this.loading === false) {
          this.$emit('change')
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./var.scss";
</style>
