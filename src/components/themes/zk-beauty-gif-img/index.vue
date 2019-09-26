<template>
  <view class="zk-beauty-gif-img">
    <view class="zk-beauty-img-container">
      <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-12/5d00e3287d430d0ffc832377.png" alt="">
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
