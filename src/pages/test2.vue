<template>
  <div class="pages--test2">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-preview v-if="asyncFlag" :widget="widget" :previewId="previewId"></zk-preview>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  export default {
    config: {
      'navigationBarTitleText': '测试二'
    },
    data () {
      return {
        pageInfo: '',
        widget: '',
        previewId: '',
        asyncFlag: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widget = {
          apiUrl: 'Api/User/Preview'
        }
        this.previewId = 42
        this.asyncFlag = true
      }
    }
  }
</script>

<style scoped lang="less">
  .pages--test2 {
  	width: 100%;
  }
</style>

