<template>
  <div class="common-x-table  weui-form-preview" element-path="common/x-table">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-table',
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
  .common-x-table {
  	font-size: @font-size-base;
  }
</style>
