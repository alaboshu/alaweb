<template>
  <div class="pages-test">
    <div class="title">宋和珈 ！</div>
    <zk-help-row></zk-help-row>
    <zk-foot></zk-foot>
    <zk-backtop></zk-backtop>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    data () {
      return {
        pageInfo: '',
        asyncFlag: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.$loading = true
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-test {
    width: 100%;
  }
</style>

