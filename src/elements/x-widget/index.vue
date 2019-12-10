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
    async mounted () {
      this.init()
    },
    methods: {
      async init () {

      },
      scrollChange () {
        // console.info('aaaaaaaaaaaaa', )
        service.scrollChange(this)
      }
    }
  }
</script>
