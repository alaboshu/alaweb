<template>
  <view class="button">
    <view class="cont" @click="addressClick">添加地址</view>
  </view>
</template>
<script>
  export default {
    methods: {
      addressClick () {
        this.$emit('change', 'edit')
      }
    }
  }
</script>


<style lang="scss" scoped>
  .button {
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 100%;
    padding: 10px 0;
    .cont {
      height: 40px;
      width: 90% !important;
      background: #c70f2c;
      color: #fff;
      text-align: center;
      line-height: 40px;
      font-size: 1rem;
      margin: 0 auto;
    }
  }
</style>
