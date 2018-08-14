<template>
  <zk-page :pageinfo="pageInfo"></zk-page>
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
        this.pageInfo = await this.$themeApi.pageInfo(this.$client, this.$route.path)
      }
    }
  }
</script>
<style >
</style>


