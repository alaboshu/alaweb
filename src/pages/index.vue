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
      if (this.$api.client() === 'WeChatLite') {
        this.option = []
        this.option.push(option)
      } else {
        this.option = option
      }
      console.info('optionsabcdefghijk', this.option)
      console.info('index getCurrentPages', getCurrentPages())
      console.info('fullPath', this.$base.fullPath())
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        console.info('触发不')
      }
    }
  }
</script>
