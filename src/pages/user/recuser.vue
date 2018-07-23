<template>
  <div class="pages-user-recuser">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-list v-if="asyncFlag" :widget="widget"></zk-list>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '我的会员'
    },
    data () {
      return {
        pageInfo: '',
        widget: '',
        asyncFlag: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widget = {
          apiUrl: 'Api/User/Recommend'
        }
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.asyncFlag = true
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-user-recuser {
    width: 100%;
  }
</style>

