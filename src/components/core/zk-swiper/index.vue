<template>
  <div class="zk-swiper" :style="styles">
    <x-swiper :elementData="widgetModel.value"></x-swiper>
  </div>
</template>

<script>
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        widgetModel: '',
        styles: {}
      }
    },
    props: {
      dataId: {
        type: String,
        default: editSetting.configs.defaultDataId
      },
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$themeApi.widgetInfo(this.widget, editSetting.configs)
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less';
  .zk-swiper {
    font-size: @font-size-base;
    .tips {
      display: flex;
      height: 100%;
      color: white;
      justify-content: center;
      align-items: center;
    }
    .tipsImg {
      width: 100%;
      height: 100%;
    }
  }
  .slide-image {
    width: 100%;
  }
</style>

