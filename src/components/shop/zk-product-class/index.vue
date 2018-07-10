<template>
  <div class="zk-product-class" :style="styles">
    <x-searchbar></x-searchbar>
    <e-tab-swiper></e-tab-swiper>
    <zk-footer></zk-footer>
  </div>
</template>

<script>
  import { PRODUCT_CLASS_GET } from '@/service/api/apiUrl' // 引入Api接口常量
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {} // 可视化编辑样式
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.viewModel = await this.$api.get(PRODUCT_CLASS_GET)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zk-product-class {
    font-size: @font-size-base;
  }
</style>

