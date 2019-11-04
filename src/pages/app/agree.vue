<template>
  <view class="agree">
    <rich-text :nodes="viewModel.content"></rich-text>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var response = await this.$api.httpGet('/api/Contract/QuerySingle?type=member')
        this.viewModel = response.result
      }
    }
  }
</script>
<style lang="scss" scoped>
  .agree {
    margin: 10px;
  }
</style>
