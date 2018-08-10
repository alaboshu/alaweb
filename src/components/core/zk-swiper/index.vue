<template>
  <div class="zk-swiper" :style="styles" component-path="core/zk-swiper" v-if="asyncflag" :data-id="dataId">
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
        viewModel: '', // 数据模型
        styles: {},
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 900,
        circular: true,
        asyncflag: false
      }
    },
    props: {
      dataId: {
        type: String,
        default: '5b406cddfef00000a0000004'
      }
    },
    mounted () {
      this.ApiGet()
    },
    methods: {
      async  ApiGet () {
        this.viewModel = await this.$api.get(THEME_GETLINK_GET, 'dataId=' + this.dataId)
        console.info('组件数据swiper', this.viewModel)
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

