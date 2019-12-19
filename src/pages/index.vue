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
      if (this.$api.client() !== 'WapH5') {
        this.option = []
        this.option.push(option)
      } else {
        this.option = option
      }
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
