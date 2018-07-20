<template>
  <div class="pc-x-swiper  weui-form-preview" element-path="pc/x-swiper">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-swiper',
    props: {
      elementData: {}
    },
    data () {
      return {
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
      }
    }
  }
</script>
<style scoped lang="less">
  @import '~_style/index.less';
  .pc-x-swiper {
  	font-size: @font-size-base;
  }
</style>
