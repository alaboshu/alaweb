<template>
  <view v-if="async">
    <page-item v-if="widget.isPage"></page-item>
    <common-item :viewModel="viewModel.productItems" :widget="widget" v-else></common-item>
  </view>
</template>

<script>
  import props from './props'
  import commonItem from './common-style.vue'
  import pageItem from './page-style.vue'
  export default {
    components: {
      commonItem,
      pageItem
    },
    data () {
      return {
        async: false,
        allDataList: [], // 所有数据,每次刷新以后获取的数据叠加
        viewModel: {}, // 视图模型
        queryPara: {
          pageIndex: 1,
          pageSize: this.pageSize
        }// 查询参数
      }
    },
    props,
    onLoad (option) {
      this.option = option
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        var widgetPara = this.widget
        this.queryPara = {
          ...this.queryPara,
          ...widgetPara
        }
        var response = await this.$api.httpGet('/Api/Product/List', this.queryPara)
        if (response.status === 1) {
          this.viewModel = response.result
          this.allDataList = [...this.allDataList, ...this.viewModel.productItems]
        } else {
          this.$api.toastWarn('数据获取失败')
        }
        this.async = true
      },
      scrolltolower () {
        if (!this.loading.show) {
          this.queryPara.pageIndex += 1
          if (this.allDataList.length >= this.viewModel.data.recordCount) {
            this.loading.show = true
          } else {
            this.init()
          }
        }
      },
      // 标签切换
      async tapTab (tab, index) {
        if (this.serachOption.tabIndex === index) {
          return false
        } else {
          this.queryPara.pageIndex = 1
          this.serachOption.tabIndex = index
          let tabPara = {}
          tabPara[tab.name] = tab.key
          this.queryPara = {
            ...this.queryPara,
            ...tabPara
          }
          this.allDataList = []
          this.init()
        }
      },
      // 搜索
      async   search (par) {
        this.queryPara.pageIndex = 1
        this.queryPara = {
          ...this.queryPara,
          ...par
        }
        this.init()
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "./var.scss";
</style>

