<template>
  <div class="common-x-more  weui-form-preview" element-path="common/x-more">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-more',
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
<style lang="less">
  @import '~_style/index.less';
  .common-x-more {
  	font-size: @font-size-base;
  }
</style>
