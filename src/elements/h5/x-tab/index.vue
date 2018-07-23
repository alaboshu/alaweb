<template>
  <div class="common-x-tab  weui-form-preview" element-path="common/x-tab">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-tab',
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
  .common-x-tab {
  	font-size: @font-size-base;
  }
</style>
