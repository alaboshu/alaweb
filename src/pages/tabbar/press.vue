<template>
  <view v-if="async">
    <zk-school-headlines :widget="viewModel"></zk-school-headlines>
  </view>
</template>


<script>
  import pressJson from './json/press.json'
  export default {
    data () {
      return {
        pressData: pressJson.apiDataList,
        viewModel: null,
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        // 加载中
        console.info('/Api/TopLine/QueryPageList')
        var respone = await this.$api.httpGet('/Api/TopLine/QueryPageList')
        this.viewModel = respone.result
        this.async = true
      }
    }
  }
</script>
