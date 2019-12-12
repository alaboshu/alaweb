<template>
  <x-scroll-view @change="scrollChange">
    <scrollItem ref="scrollItem" :option="option"></scrollItem>
  </x-scroll-view>
</template>

<script>
  import service from './service'
  import scrollItem from './scroll-item'
  export default {
    name: 'x-widget',
    components: {
      scrollItem
    },
    props: {
      option: {}
    },
    methods: {
      scrollChange () {
        service.scrollChange(this)
      }
    }
  }
</script>
