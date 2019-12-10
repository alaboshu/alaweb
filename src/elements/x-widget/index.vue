<template>
  <zk-scroll-view @change="scrollChange">
    <scrollItem ref="scrollItem" :option="option"></scrollItem>
  </zk-scroll-view>
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
        // console.info('aaaaaaaaaaaaa', )
        service.scrollChange(this)
      }
    }
  }
</script>
