<template>
  <x-border :title="title">
    <x-table :config="viewModel" v-if="async"></x-table>
  </x-border>
</template>

<script>
  export default {
    data () {
      return {
        async: false,
        viewModel: null,
        title: '数据编辑'
      }
    },

    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.async = false
        if (this.viewModel === null) {
          var para = {
            type: this.$route.query.type
          }
          var response = await this.$api.httpGet('/Api/auto/intro', para)
          if (response.status === 1) {
            this.viewModel = response.result
            this.title = this.viewModel.name
            this.async = true
          } else {
            this.$alert(response.message, '类型输入错误', {
              confirmButtonText: '确定'
            })
          }
        }
      },
      getPath () {
        this.init()
      }
    },
    watch: {
      '$route': 'getPath'
    }
  }
</script>

