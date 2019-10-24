<template>
  <view v-if="async">
    <zk-news-details :widget="viewModel"></zk-news-details>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        viewModel: null,
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var para = {
          id: this.$route.query.id
        }
        var response = await this.$api.httpGet('/Api/TopLine/QueryById', para)
        this.viewModel = response.result
        this.async = true
      }
    }
  }
</script>
