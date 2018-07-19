<template>
  <div class="pages-order-buy">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-buy-address></zk-buy-address>
    <!-- <x-divider></x-divider> -->
    <x-group>
      <x-cell title="志伟" class="border-bottom"></x-cell>
    </x-group>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '购买'
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
  @import '~_style/index.less';
  .pages-order-buy {
    width: 100%;
  }
  .flex_one {
    flex: 1;
  }
  .flex {
    display: flex;
  }
</style>

