<template>
  <view>
    <swiperClassItem1 :widget="widget"></swiperClassItem1>
  </view>
</template>

<script>
  import swiperClassItem1 from './swiper-class-item-1'
  export default {
    components: {
      swiperClassItem1
    },
    props: {
      widget: {}
    }
  }
</script>
