<template>
  <div>
    <x-page :pageInfo="pageInfo" v-if="pageInfo"></x-page>
    <div v-if="pageInfo">
      <zk-head backText="首页" :title="pageInfo.title"></zk-head>
      <zk-auto-form :viewApi="viewApi" :postApi="postApi"></zk-auto-form>
      <zk-foot></zk-foot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageInfo: '',
        viewApi: 'Api/WorkOrder/GetSupportForm',
        postApi: 'Api/UserAddress/add'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.pageInfo = await this.$themeApi.pageInfo(this.$client, this.$route.path)
      }
    }
  }
</script>

