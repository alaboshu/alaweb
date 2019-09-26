<template>
  <view class="zk-address">{{widgetModel}}</view>
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

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-address {
    font-size: $gl-size-base;
  }
</style>
