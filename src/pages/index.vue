<template>
  <div v-if="pageInfo">
    <zk-swiper :widget="pageInfo.widgets[0]"></zk-swiper>
    <zk-grid :widget="pageInfo.widgets[1]"></zk-grid>
    <zk-image :widget="pageInfo.widgets[2]"></zk-image>
    <!-- <zk-product-item></zk-product-item>
    <zk-foot></zk-foot> -->
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
        this.pageInfo = await this.$themeApi.pageInfo(this.$client, this.$route.path)
      }
    }
  }
</script>

<style >
</style>
