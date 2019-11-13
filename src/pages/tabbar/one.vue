<template>
  <x-widget :option="option"></x-widget>
</template>

<script>
  import minx from '../mix/wedget'
  export default {
    mixins: [minx],
    data () {
      return {
        option: {}
      }
    },
    onLoad (option) {
      this.option.path = '/tabbar/index'
    },
    mounted () {
      this.init().then(() => {
        console.info('this.widgetModel', this.widgetModel)
      })
    }
  }
</script>
