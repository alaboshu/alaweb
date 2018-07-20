<template>
  <div class="pages-user-standard">
    <zk-head backText="首页" goBackUrl="/baidu.com" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-grid></zk-grid>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  import { setTitle } from '@/utils'
  export default {
    config: {
      'navigationBarTitleText': 'this.title'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        title: '标准'
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
        setTitle(this.pageInfo.title)
        console.info('页面信息', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-user-standard {
    width: 100%;
  }
</style>
