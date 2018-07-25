<template>
  <div>
    tabel
  </div>
</template>

<script>
  // import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '测试'
    },
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
        this.$toast.succee('成功')
        // this.$loading = true
        // this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        // this.$loading = false
        // this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped>
  .title {
  	font-size: 72px;
  	padding: 50px;
  	width: 750px;
  	color: #309bf8;
  	text-align: center;
  }
</style>
