<template>
  <view>
    <view class="h5-x-list" v-if="async">
      <view>
        <list-search :widget="data" @searchPar="searchPar" v-if="data.searchOptions.advancedForms!==null&&data.searchOptions.advancedForms.length!==0 && false"></list-search>
        <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft" style="height:45px" v-if="data.tabs!==null&&data.tabs.length!==0">
          <view v-for="(tab,index) in data.tabs" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'navActive' : '']" :id="index" :data-current="index" @tap="tapTab(tab,index)">{{tab.value}}</view>
        </scroll-view>
      </view>
      <scroll-view scroll-y="true" :style="'height:'+windowHeight+'px;overflow-y: auto;'" @scrolltolower="scrolltolower" v-if="viewModel.length!==0">
        <view class="global" v-for="(item,index) in viewModel" :key="index">
          <view @click="$api.to(item.url)">
            <view class="mobile-x-list">
              <view class="box">
                <!-- <navigator class="xlist_box1">
                <img :src="item.image" alt class="box1_img">
              </navigator> -->
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
        <div class="loading-box" v-if="loadingShow">
          {{loadingTxt}}
        </div>
      </scroll-view>
    </view>
    <view class="temporarily_box" v-if="!viewModel || viewModel.length===0" :style="'height:'+windowHeight+'px;'">
      <view class="temporarily">
        <img class="temporarily_img" src="http://ui.5ug.com/static/demo/imageList/02.png">
      </view>
    </view>
  </view>
</template>

<script>

  import listSearch from './search'
  export default {

    data () {
      return {
        async: false,
        tabIndex: 0,
        windowHeight: 0,
        serachOption: {
          tab: {},
          form: {}
        },
        scrollLeft: 0,
        para: {},
        widgetModel: '',
        viewModel: [],
        newViewModel: [],
        data: '',
        loadingTxt: '暂无更多数据...',
        loadingShow: false,
        appendPara: {
          pageIndex: 1
        }
      }
    },
    props: {
      widget: {}
    },
    components: {
      listSearch
    },
    onLoad (option) {
      this.option = option
    },
    created () {
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.$bus.$emit('stopPullDownRefresh')
        this.widget.isApiRequest = true
        this.appendPara.userId = this.$user.loginUser().id
        if (this.widget.route.path.indexOf('admin') !== -1) {
          this.appendPara.userId = this.$user.loginUser(true).id
        }
        this.widgetModel = await this.$api.themeWidget(this.widget, this.appendPara)
        if (this.viewModel.length === 0) {
          this.viewModel = this.widgetModel.value.result.result.result
        } else if (this.widget.route.path === 'admin_user_list') {
          this.viewModel = this.widgetModel.value.result.result.result
        } else {
          this.viewModel = [...this.viewModel, ...this.widgetModel.value.result.result.result]
        }
        this.data = this.widgetModel.value.result
        this.windowHeight = uni.getSystemInfoSync().screenHeight - 46
        if (this.data.searchOptions.advancedForms !== null && this.data.searchOptions.advancedForms.length !== 0) {
          this.windowHeight = uni.getSystemInfoSync().screenHeight - 46
        } else {
          this.windowHeight = uni.getSystemInfoSync().screenHeight - 46
        }
        if (this.data.tabs !== null && this.data.tabs.length !== 0) {
          this.windowHeight = uni.getSystemInfoSync().screenHeight - 46 - 44
        }
        this.async = true
      },
      scrolltolower () {
        if (!this.loadingShow) {
          if (this.appendPara.pageIndex === undefined) {
            this.appendPara.pageIndex = 2
          } else {
            this.appendPara.pageIndex += 1
          }
          if (this.viewModel.length >= this.data.result.recordCount) {
            this.loadingShow = true
          } else {
            this.init()
          }
        }
      },
      async tapTab (tab, index) {
        if (this.tabIndex === index) {
          return false
        } else {
          this.appendPara.pageIndex = 1
          this.tabIndex = index
          let tabPara = {}
          tabPara[tab.name] = tab.key
          this.appendPara = {
            ...this.appendPara,
            ...tabPara
          }
          this.viewModel = []
          this.init()
        }
      },
      async   searchPar (par) {
        this.appendPara.pageIndex = 1
        this.appendPara = {
          ...this.appendPara,
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

