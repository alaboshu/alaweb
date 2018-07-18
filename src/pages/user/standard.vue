<template>
  <div class="pages-user-standard">
    <zk-head backText="首页" goBackUrl="/baidu.com"></zk-head>
    <div class="container">
      <div class="doc-title zan-hairline--bottom zan-hairline--bottom">BADGE</div>
      <div class="demo">
        <div class="demo__item">
          <div class="demo__icon zan-badge">
          </div>
        </div>
        <div class="demo__item">
          <div class="demo__icon zan-badge">
            <div class="zan-badge__count">9</div>
          </div>
        </div>
        <div class="demo__item">
          <div class="demo__icon zan-badge">
            <div class="zan-badge__count">19</div>
          </div>
        </div>
        <div class="demo__item">
          <div class="demo__icon zan-badge">
            <div class="zan-badge__count">99+</div>
          </div>
        </div>
      </div>
    </div>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
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
    beforeMount () {
      this.init()
    },
    methods: {
      async init () {
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.asyncFlag = true
        console.info('页面信息', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-user-standard {
  	height: 100%;
  }
</style>
