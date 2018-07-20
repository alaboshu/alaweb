<template>
  <div class="app-x-grid  weui-form-preview" element-path="app/x-grid">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-grid',
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
  .app-x-grid {
  	font-size: @font-size-base;
  }
</style>
