<template>
  <view>
    <view class="h5-x-list" v-if="async">
      <view>
        <list-search :widget="data" @search="search" v-if="viewModel.searchOptions.advancedForms!==null&&viewModel.searchOptions.advancedForms.length!==0 && false"></list-search>
        <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="screen.left" style="height:45px" v-if="viewModel.tabs!==null&&viewModel.tabs.length!==0">
          <view v-for="(tab,index) in viewModel.tabs" :key="index" :class="['swiper-tab-list',serachOption.tabIndex==index ? 'navActive' : '']" :id="index" :data-current="index" @tap="tapTab(tab,index)">{{tab.value}}</view>
        </scroll-view>
      </view>
      <scroll-view scroll-y="true" :style="'height:'+screen.height+'px;overflow-y: auto;'" @scrolltolower="scrolltolower" v-if="allDataList.length!==0">
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
    </view>
    <view class="temporarily_box" v-if="allDataList.length===0" :style="'height:'+screen.height+'px;'">
      <view class="temporarily">
        <!-- <img class="temporarily_img" src="../../static/img/nodata.png">  -->
      </view>
    </view>
  </view>
</template>

<script>

  import listSearch from './search'
  import props from './props'
  export default {

    data () {
      return {
        async: false,
        apiUrl: null, // api网址信息,通过type和widget属性来设置，type的优先级高于widget
        screen: {
          height: 0,
          left: 0
        }, // 屏幕相关信息
        serachOption: {
          tab: {},
          tabIndex: 0,
          form: {}
        }, // 搜索相关选项
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
    components: {
      listSearch
    },
    onLoad (option) {
      this.option = option
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.type) {
          this.apiUrl = '/Api/Auto/List?type=' + this.type // 通过type来设置Url
        }
        console.info('apiUrl', this.apiUrl)
        if (!this.type && this.widget.apiUrl) {
          this.apiUrl = this.widget.apiUrl
        }
        var response = await this.$api.httpGet(this.apiUrl, this.queryPara)

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

