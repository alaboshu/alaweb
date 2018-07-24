<template>
  <div class="common-x-box  weui-form-preview" element-path="common/x-box">
    {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-box',
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
  .common-x-box {
  	font-size: @font-size-base;
  }
</style>
