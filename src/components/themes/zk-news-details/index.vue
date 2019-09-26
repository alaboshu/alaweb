<template>
  <view class="zk-news-details">
    <view class="mobile-zk-details" v-if="viewModel">
      <h1 class="page__title pagetitle">{{viewModel.title}}</h1>
      <p class="page__title__desc pagetitle">
        <span class="subTitle" v-if="viewModel.subTitle">{{viewModel.subTitle}}</span>
        <span class="createTime">{{viewModel.createTime}}</span>
      </p>
      <view class="uni-common-mt" style="background:#FFF; font-size:16px;margin-bottom:50px;">
        <rich-text :nodes="showHtml" class="uni-box" style="text-index:20px"></rich-text>
      </view>
    </view>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        viewModel: '',
        showHtml: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var response = await this.$api.httpGet('/api/article/ArticleDetail', { id: this.widget.route.id })
        if (response.status === 1) {
          this.viewModel = response.result
        }
        this.showHtml = this.viewModel.content
        // eslint-disable-next-line
        this.showHtml = this.showHtml.replace(/\<img/gi, '<img style="width:100%;height:auto;"')
        // eslint-disable-next-line
        this.showHtml = this.showHtml.replace(/\<table width="677"/gi, '<table width="100%"')
      }
    }
  }
</script>
