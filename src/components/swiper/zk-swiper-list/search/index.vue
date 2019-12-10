<template>
  <view>
    <searchItem1 v-if="type == 1"></searchItem1>
    <searchItem2 v-if="type == 2"></searchItem2>
  </view>
</template>

<script>
  import searchItem1 from './search-item-1'
  import searchItem2 from './search-item-2'
  export default {
    components: {
      searchItem1,
      searchItem2
    },
    props: {
      type: {
        default: 1
      }
    }
  }
</script>
