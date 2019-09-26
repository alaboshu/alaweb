<template>
  <view class="zk-school-head">
    <view class="class_grid_header">
      <x-icon name="icon-zk-return" color="#202020"></x-icon>
      <span>百家案例</span>
    </view>
    <view class="bg_tag"></view>
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
      widget: {},
      title: {
        default: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
      }
    }
  }
</script>
