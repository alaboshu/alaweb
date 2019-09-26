<template>
  <view class="zk-image-scroll-a">
    <view class="zk-image-scroll">
      <scroll-view class="scroll-view_H" scroll-x="true">
        <view class="scroll-view_box" v-for="(item,index) in widget.value.links" :key="index" @click="getImage(item)">
          <image :src="item.image" />
        </view>
      </scroll-view>
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
      },
      getImage (coter) {
        this.$api.to(coter.url.value)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./styles/a.scss";
</style>

