<template>
  <div class="pages-product-search">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <x-searchbar v-model="searchValue" @on-submit="submit()"></x-searchbar>
    <zk-keyword></zk-keyword>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '商品搜索'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        searchValue: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.$loading = true
        this.pageInfo = await this.$api.get(THEME_GETPAGEINFO_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      },
      submit () {
        console.log('提交')
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-product-search {
    width: 100%;
  }
</style>

