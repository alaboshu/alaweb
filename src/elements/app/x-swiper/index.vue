<template>
  <div class="app-x-swiper  weui-form-preview" element-path="app/x-swiper">
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
  .app-x-swiper {
  	font-size: @font-size-base;
  }
</style>
