<template>
  <div class="pages--test3">
    <zk-head backText="首页" title="首页" v-if="asyncFlag"></zk-head>
    <zk-buy-address></zk-buy-address>
    <!-- <zk-cell></zk-cell> -->
    <!-- <x-cell value="qwe" title="123" icon="http://zqingchun.yiqipingou.com//wwwroot/static/images/avator/man_64.png" isLink></x-cell> -->
    <!-- <zk-list v-if="asyncFlag" :widget="widget"></zk-list> -->
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  export default {
    config: {
      'navigationBarTitleText': '测试三'
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
        this.asyncFlag = true
      }
    }
  }
</script>

<style scoped lang="less">
  .pages--test3 {
  	width: 100%;
  }
</style>

