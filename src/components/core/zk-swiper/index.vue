<template>
  <div class="zk-swiper" :style="styles" :component-path="diySetting.path" v-if="asyncflag" :data-id="dataId" :widget-id="diySetting.defaultWidtetId">
    <x-swiper :elementData="viewModel"></x-swiper>
  </div>
</template>

<script>
  import { THEME_GETLINK_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        viewModel: '',
        diySetting: editSetting.configs,
        styles: {},
        asyncflag: false
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
      this.ApiGet()
    },
    methods: {
      async  ApiGet () {
        this.viewModel = await this.$api.get(THEME_GETLINK_GET, 'dataId=' + this.dataId)
        console.info('组件数据swiper', this.widget)
        this.asyncflag = true
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

