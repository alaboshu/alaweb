<template>
  <view>
    <searchItem1 v-if="type == 1"></searchItem1>
    <searchItem2 v-if="type == 2" :css="css"></searchItem2>
    <searchItem3 v-if="type == 3"></searchItem3>
  </view>
</template>

<script>
  import searchItem1 from './search-item-1'
  import searchItem2 from './search-item-2'
  import searchItem3 from './search-item-3'
  export default {
    components: {
      searchItem1,
      searchItem2,
      searchItem3
    },
    props: {
      type: {
        default: 1
      },
      css: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        // this.$bus.$off('sreach_view_list').$on('sreach_view_list', ev => {
        //   console.info('ev', ev.detail.scrollTop)
        // })
      }
    }
  }
</script>
