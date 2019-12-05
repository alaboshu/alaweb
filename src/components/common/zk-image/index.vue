<template>
  <view v-if="widgetModel && asyns" class="zk-image" :style="{padding:padding+'px'}">
    <view :title="widgetModel.name" @click="goLinks(widgetModel.link)" :style="{height:height+'px'}">
      <image :src="widgetModel.imgupload" :alt="widgetModel.name" class="zk-image-bg" :class="{isActive:padding != 0}" />
    </view>
  </view>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: null,
        height: 100,
        padding: 0,
        asyns: false
      }
    },
    props: {
      widget: {}
    },
    onLoad () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = this.widget.value
        if (this.widgetModel.height > 0) {
          this.height = this.widgetModel.height
        }
        if (this.widgetModel.imagePad) {
          this.padd = this.widgetModel.imagePad
        }
        this.asyns = true
      },
      goLinks (url) {
        this.$api.to(url)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-image {
    a {
      display: block;
      width: 100%;
      height: 93px;
    }
    .zk-image-bg {
      width: 100%;
      height: 100%;
      &.isActive {
        border-radius: 5px;
      }
    }
  }
</style>
