<template>
  <x-widget :option="option"></x-widget>
</template>

<script>
  import minx from '../mix/wedget'
  export default {
    mixins: [minx],
    data () {
      return {
        option: [{ path: '/tabbar/two' }]
      }
    },
    onLoad (option) {
      this.option[0].path = '/tabbar/two'
    },
    mounted () {
      this.init()
    }
  }
</script>
