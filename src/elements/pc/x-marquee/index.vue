<template>
  <div class="pc-x-marquee" element-path="pc/x-marquee">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-marquee',
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
        if (this.elementData === undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .pc-x-marquee {
  	font-size: @font-size-base;
  }
</style>
