<template>
  <div class="common-x-lightbox  weui-form-preview" element-path="common/x-lightbox">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-lightbox',
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
  .common-x-lightbox {
  	font-size: @font-size-base;
  }
</style>
