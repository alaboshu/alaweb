<template>
  <x-widget :option="option" ref="xWidget"></x-widget>
</template>

<script>

  export default {
    data () {
      return {
        option: {},
        viewModel: ''
      }
    },
    onLoad (option) {
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
