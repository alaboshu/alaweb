<template>
  <div class="h5-x-keyword" element-path="h5/x-keyword">
    <ul>
      <li>关键爱</li>
    </ul>
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
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.elementData !== undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .h5-x-keyword {
    font-size: @font-size-base;
  }
</style>
