<template>
  <x-border :title="title" color="danger">
    <div v-if="async">
      <div v-for="(widget,widgetIndex) in viewModel" :key="widgetIndex">
        <div v-if="widget.autoReportChart">
          <x-border :title="widget.name" color="success">
            <zk-report-chart :widget="widget"></zk-report-chart>
          </x-border>
        </div>
        <div v-if="widget.autoReprotData">
          <x-border :title="widget.name" color="info">
            <zk-report-data :widget="widget"></zk-report-data>
          </x-border>
        </div>
      </div>
    </div>
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
          var type = this.$crud.getType(this.$route)
          var para = {
            type: type
          }
          var response = await this.$api.httpGet('/Api/auto/report', para)
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

