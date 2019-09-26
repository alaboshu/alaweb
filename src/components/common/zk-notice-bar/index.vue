<template>
  <view class="zk-notice-bar">
    <view>
      <uni-notice-bar single="true" text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"></uni-notice-bar>
      <uni-notice-bar text="[多行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"></uni-notice-bar>
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'

  export default {

    data () {
      return {
        widgetModel: {}
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
      }
    }
  }
</script>
