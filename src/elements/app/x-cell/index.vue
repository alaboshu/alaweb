<template>
  <div class="app-x-cell  weui-form-preview" element-path="app/x-cell">
  {{elementData}}
  </div>
</template>

<script>
  export default {
    name: 'x-cell',
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
  .app-x-cell {
  	font-size: @font-size-base;
  }
</style>
