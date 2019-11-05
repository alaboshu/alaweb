<template>
  <x-widget :option="option"></x-widget>
</template>

<script>

  export default {
    data () {
      return {
        option: {}
      }
    },
    onLoad (option) {
      this.option = option
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
