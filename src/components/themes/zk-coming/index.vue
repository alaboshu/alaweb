<template>
  <view v-if="async" class="zk-coming" :style="'height:'+unHeight+'px;'">
    <a :title="widgetModel.name">
      <img :src="widgetModel.image" :alt="widgetModel.name" class="zk-coming-bg" />
    </a>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        async: false,
        widgetModel: null,
        height: 240,
        unHeight: ''
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
        this.async = false
        this.widgetModel = this.widget.value
        if (this.widgetModel.height > 0) {
          this.height = this.widgetModel.height
        }
        if (this.$api.client() === 'WeChatLite') {
          this.unHeight = this.$api.getSystemInfoSync().windowHeight - 101
        } else {
          this.unHeight = this.$api.getSystemInfoSync().screenHeight - 95
        }
        this.async = true
      }
    }
  }
</script>

<style lang="scss">
  .zk-coming {
    width: 100vw;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      .zk-coming-bg {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
