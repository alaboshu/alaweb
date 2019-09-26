<template>
  <div v-if="widgetModel && async">
    <component :is="item" v-for="(item,index) in widgetModel" :type="widgetType" :widget="widget" :key="index" />
  </div>
</template>
<script>

  export default {

    data () {
      return {
        widgetModel: [],
        widget: {},
        widgetType: {},
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var type = this.$route.query.type
        if (type === undefined) {
          this.$alert('类型不能为空', '提示', {
            confirmButtonText: '确定'
          })
        }
        this.widgetType = type
        var res = await this.$api.httpGet('/Api/Type/GetComponentPath?type=' + type)
        if (res.status === 1) {
          res.result.forEach(element => {
            var item = element.replace('admin-', 'zk-')
            if (item === 'zk-auto-form') {
              this.widget.apiUrl = 'Api/Auto/From?Type=' + type
              this.widget.componentPath = '/themes/zk-auto-form'
              this.widget.name = 'zk-auto-form'
            }
            this.widgetModel.push(item)
          })
        }
        this.async = true
      }
    }
  }
</script>
<style lang="scss">
</style>
