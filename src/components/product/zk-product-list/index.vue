<template>
  <scroll-view scroll-y="true" :style="'height:'+screen.height+'px;overflow-y: auto;'" @scrolltolower="scrolltolower" v-if="async &&allDataList.length!==0">
    <view class="global" v-for="(item,index) in allDataList" :key="index">
      <view @click="$api.to(item.url)">
        <view class="mobile-x-list">
          <view class="box">
            <div class="xlist_box1">
              <img :src="item.image" alt class="box1_img">
            </div>
          </view>
          <view></view>
          <view class="x-list_box2">
            <view class="linhegt widthtext">
              <view class="conters fontsize">{{item.title}}</view>
              <view class="youce" v-if="item.value">{{item.value}}</view>
            </view>
            <view class="linhegt conters conters_botoom">{{item.intro}}</view>
          </view>
        </view>
      </view>
    </view>
    <div class="loading-box" v-if="loading.show">
      {{loading.text}}
    </div>
  </scroll-view>
</template>

<script>


  import props from './props'
  export default {
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
        console.info('商品参数', this.widgetPara)
        var response = await this.$api.httpGet('/Api/Product/List', this.queryPara)
        console.info('商品列表', this.queryPara, response.result)
        if (response.status === 1) {
          this.viewModel = response.result
          this.allDataList = [...this.allDataList, ...this.viewModel.data.result]
        } else {
          this.$api.toastWarn('数据获取失败')
        }
        console.info('获取数据', response)
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
        if (this.viewModel.searchOptions.advancedForms !== null && this.viewModel.searchOptions.advancedForms.length !== 0) {
          this.screen.height = this.$api.screenHeight() - 46
        } else {
          this.screen.height = this.$api.screenHeight() - 46
        }
        if (this.viewModel.tabs !== null && this.viewModel.tabs.length !== 0) {
          this.screen.height = this.$api.screenHeight() - 46 - 44
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

