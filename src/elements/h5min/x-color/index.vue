<template>
  <div class="common-x-color  weui-form-preview" element-path="common/x-color">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-color',
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
  .common-x-color {
  	font-size: @font-size-base;
  }
</style>
