<template>
  <view>
    <x-nodata :elementData="widgetModel.value"></x-nodata>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
          this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>
