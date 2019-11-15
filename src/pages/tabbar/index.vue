<template>
  <x-widget :option="option"></x-widget>
</template>

<script>
  import minx from '../mix/wedget'
  export default {
    mixins: [minx],
    data () {
      return {
        option: [{ path: '' }]
      }
    },
    onLoad (option) {
      this.option[0].path = '/tabbar/index'
      // this.option.path = '/tabbar/index'
    },
    mounted () {
      this.init()
    }
  }
</script>
