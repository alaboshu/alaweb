<template>
  <view v-if="widgetModel && asyns" class="zk-image">
    <view :title="widgetModel.name" @click="goLinks(widgetModel.link)" :style="{height:height+'px'}">
      <image :src="widgetModel.imgupload" :alt="widgetModel.name" class="zk-image-bg" />
    </view>
  </view>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: null,
        height: 100,
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
    padding: 8px;
    a {
      display: block;
      width: 100%;
      height: 93px;
    }
    .zk-image-bg {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
</style>
