<template>
  <div class="pages-index">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-grid></zk-grid>
    <zk-foot></zk-foot>
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

<style lang="less">
  .pages-index {
    width: 100%;
    diy {
      position: relative;
    }
    .diy_box {
      position: absolute;
      width: 500px;
      height: 500px;
      z-index: 99999;
      outline: 1px solid #4aa3cc;
      background: rgba(192, 222, 237, 0.5);
      .diy_box-item {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        li {
          background: #666;
          border-right: 1px solid #000;
          font-size: 14px;
          color: #fff;
          padding: 2px 5px;
          cursor: pointer;
        }
      }
    }
  }
</style>

