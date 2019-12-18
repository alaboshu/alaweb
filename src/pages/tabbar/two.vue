<template>
  <x-widget ref="xWidget" :option="option"></x-widget>
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
    onShow () {
      this.$nextTick(() => {
        this.$refs.xWidget.$refs.scrollItem.init()
      })
    },
    onLoad (option) {
      this.option[0].path = '/tabbar/two'
    },
    mounted () {
      this.init()
    }
  }
</script>
