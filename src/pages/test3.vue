<template>
  <div class="pages--test3">

    <zk-list v-if="asyncFlag" :widget="widget"></zk-list>
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

