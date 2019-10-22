<template>
  <view v-if="async" style="width:100%;overflow: hidden">
    <zk-head :title="viewModel.name" :widget="viewModel" :showHead="viewModel.setting.showHead" ref="zkHead" v-if="isNotIosApp"></zk-head>
    <div v-if="modelAsync">
      <view v-for="(widget, index) in viewModel.widgets" :key="index" :id="widget.widgetTheme" :style="widget.style && widget.style.css" :class="widget.borderClass">
        <widget-item :widget="widget" v-if="!widget.border&&!widget.layout" :model="viewModel" />
        <div class="border-header" v-if="widget.border">
          <x-icon class="border-header-icon" v-if="widget.border.icon" :icon="widget.border" :color="widget.border.icon.color"></x-icon>
          <view class="border-header-title" v-if="widget.border.title">{{widget.border.title}}</view>
          <view class="border-header-desc" v-if="widget.border.intro">{{widget.border.intro}}</view>
        </div>
        <view class="border-body" v-if="widget.border">
          <widget-item :widget="widget" :model="viewModel" />
        </view>
        <div v-if="widget.layout==='tab-layer'">
          <view class="uni-tab-bar">
            <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
              <view v-for="(columns,columnsIndex) in widget.columns" :key="columnsIndex" :class="['swiper-tab-list',tabIndex==columnsIndex ? 'active' : '']" :id="columnsIndex" :data-current="columnsIndex" @click="tabIndex=columnsIndex">{{columns.option.name}}</view>
            </scroll-view>
            <swiper :current="tabIndex" duration="300">
              <swiper-item v-for="(tab,tabIndex) in widget.columns" :key="tabIndex">
                <div v-for="(tabWidget,tabWidgetIndex) in tab.widgets" :key="tabWidgetIndex">
                  <widget-item :widget="taaWidget" />
                </div>
              </swiper-item>
            </swiper>
          </view>
        </div>
      </view>
    </div>
  </view>
</template>

<script>
  import widgetItem from './widget-item'
  export default {
    name: 'x-widget',
    components: {
      widgetItem
      // MescrollUni
    },
    data () {
      return {
        windowHieght: 0,
        viewModel: {
          widgets: []
        },
        async: false,
        modelAsync: true,
        isNotIosApp: true
      }
    },
    props: {
      option: {}
    },
    onShow () {
    },
    onLoad (option) {
      this.option = option
    },
    async  mounted () {
      this.init()
      this.$nextTick(() => {
        // this.$on('xWidget', (msg) => {
        //   if (this.$user.isLogin() === false) {
        //     this.init()
        //   }
        // })
        this.$on('downRefresh', () => {
          this.init()
        })
        this.$on('newPath', (viewModel) => {
          this.viewModel = viewModel
        })
      })
    },
    methods: {
      async init () {
        if (this.$user.isLogin()) {
          if (this.$user.loginUser().gradeName !== '免费会员') {
            this.$store.state.showPrice = true
          } else {
            this.$store.state.showPrice = false
          }
        }
        if (this.$api.client() === 'AppPlus') {
          this.isNotIosApp = false
        }
        // if (this.option.path === undefined) {
        //   this.option.path = '/index'
        // }
        this.windowHieght = uni.getSystemInfoSync().windowHeigh
        this.viewModel = await this.$api.themePage(this.option)
        this.$api.vuexSet('viewModelItem', this.viewModel)
        if (this.viewModel.name !== '首页') {
          uni.setNavigationBarTitle({
            title: this.viewModel.name
          })
        }
        console.log(this.viewModel.name, this.viewModel)
        this.async = true
      },
      async scrolltolower () {
        this.$bus.$emit('zkIndexTypeList')
        this.$bus.$emit('onBottomBurst', true)
        this.$bus.$emit('onBottom', true)
      }
    }
  }
</script>
