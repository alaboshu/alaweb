<template>
  <x-widget :option="option" ref="xWidget"></x-widget>
</template>

<script>

  export default {
    data () {
      return {
        option: {},
        viewModel: '',
        statusBarHeight: 0,
        isNotIosApp: true
      }
    },
    onLoad (option) {
      this.option = option
      console.info('index getCurrentPages', getCurrentPages())
      console.info('fullPath', this.$base.fullPath())
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {

      }
    }
  }
</script>
