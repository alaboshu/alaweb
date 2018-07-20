<template>
  <div class="h5-x-toast  weui-form-preview" element-path="h5/x-toast">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-toast',
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
  .h5-x-toast {
  	font-size: @font-size-base;
  }
</style>
