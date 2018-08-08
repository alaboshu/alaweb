<template>
  <div class="zk-swiper" :style="styles">
    <x-swiper :elementData="viewModel" v-if="asyncflag"></x-swiper>
  </div>
</template>

<script>
  import { THEME_GETVALUE_GET } from '@/service/api/apiUrl'
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
    props: ['dataId'],
    mounted () {
      this.ApiGet()
    },
    methods: {
      async  ApiGet () {
        const para = {
          dataId: this.dataId,
          defaultId: '5b406cddfef00000a0000004'
        }
        this.viewModel = await this.$api.get(THEME_GETVALUE_GET, para)
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

