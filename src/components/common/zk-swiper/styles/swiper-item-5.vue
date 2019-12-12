<template>
  <view class="swiper-item-5">这是为什么啊</view>
</template>

<script>
  export default {
    mounted () {
      console.info('为什么不显示啊')
    }
  }
</script>


<style lang="scss" scoped>
  .swiper-item-5 {
    background: yellow;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 999;
  }
</style>
