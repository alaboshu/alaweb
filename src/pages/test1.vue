<template>
  <div>
    <zk-keyword></zk-keyword>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageInfo: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        console.info('test1')
        // this.pageInfo = await this.$themeApi.pageInfo(this.$client, this.$route.path)
      }
    }
  }
</script>
<style >
</style>


