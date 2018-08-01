<template>
  <div class="pages--test3">
    <zk-head backText="首页" title="首页" v-if="asyncFlag"></zk-head>
    <!-- <zk-buy-address></zk-buy-address> -->
    <zk-grid></zk-grid>
    <zk-cell></zk-cell>
    <div class="height:50px" @click="popupVisible1=true">
      jsiodjaioshdaioshdio
    </div>
    <zk-list v-if="asyncFlag" :widget="widget"></zk-list>
    <!-- <x-popup :visible.sync="popupVisible1" class="popup-radio">
      123123132123123132
    </x-popup> -->
    <!-- <zk-foot></zk-foot> -->
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
        asyncFlag: false,
        popupVisible1: false
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

