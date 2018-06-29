<template>
  <div class="container">
    <x-icon name="zk-classification" link='/index'></x-icon>
  </div>
</template>

<script>
  // import api from '@/utils/api'
  export default {
    data () {
      return {

      }
    },
    mounted () {
      // this.ApiGet()
    },
    methods: {
      async  ApiGet () {
        // var data = api.getNewsList()
        // console.info('fly', data)
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
  }
</style>
