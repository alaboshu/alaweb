<template>
  <view v-if="async">
    <page-item v-if="widget.isPage"></page-item>
    <common-item :viewModel="viewModel.productItems" :widget="widget" v-else></common-item>
  </view>
</template>

<script>
  import props from './props'
  import commonItem from './styles/common.vue'
  import pageItem from './styles/paging.vue'
  export default {
    components: {
      commonItem,
      pageItem
    },
    data () {
      return {
        async: false,
        screen: {
          height: 0,
          left: 0
        }, // 屏幕相关信息
        allDataList: [], // 所有数据,每次刷新以后获取的数据叠加
        viewModel: {}, // 视图模型
        loading: {
          text: '暂无更多数据...',
          show: false
        }, // 加载数据
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
        this.height()
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
      // 内容宽度
      height () {
        this.screen.height = this.$api.screenHeight() - 46
        console.info('内容宽度？', this.viewModel)
        if (this.viewModel.searchOptions && this.viewModel.searchOptions.advancedForms !== null && this.viewModel.searchOptions.advancedForms.length !== 0) {
          this.screen.height = this.$api.screenHeight() - 46
        } else {
          this.screen.height = this.$api.screenHeight() - 46
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

