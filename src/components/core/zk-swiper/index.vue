<template>
  <div class="zk-swiper" :style="styles">
    <x-swiper></x-swiper>
  </div>
</template>

<script>
  import { DIY_GETLINK_GET } from '@/service/api/apiUrl' // 引入Api接口常量
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {}, // 可视化编辑样式
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 900,
        circular: true,
        imgUrls: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        const para = {
          diyKey: 'grid_index'
        }
        this.viewModel = await this.$api.get(DIY_GETLINK_GET, para)
      },
      swiperChange (e) {
        console.log('第' + e.mp.detail.current + '张轮播图发生了滑动')
      },
      animationfinish (e) {
        console.log('第' + e.mp.detail.current + '张轮播图滑动结束')
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
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

