<template>
  <div class="common-x-verifiy  weui-form-preview" element-path="common/x-verifiy">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-verifiy',
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
  .common-x-verifiy {
  	font-size: @font-size-base;
  }
</style>
