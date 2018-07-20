<template>
  <div class="common-x-upload  weui-form-preview" element-path="common/x-upload">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-upload',
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
  .common-x-upload {
  	font-size: @font-size-base;
  }
</style>
