<template>
  <view class="x-button" @click="submint" :style="'background:'+ bgColor">
    <view class="x-button-icon" v-if="loading"></view>
    <view class="x-button-text">{{btnText}}</view>
  </view>
</template>

<script>
  export default {
    model: {
      event: 'click'
    },
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
          this.$emit('click')
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./var.scss";
</style>
