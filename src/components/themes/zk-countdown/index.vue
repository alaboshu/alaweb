<template>
  <view>
    <x-countdown :elementData="widgetModel.value"></x-countdown>
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
