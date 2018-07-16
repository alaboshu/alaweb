<template>
  <div class="zk-product-class" :style="styles">
    <!-- <x-searchbar></x-searchbar> -->
    <e-tab-swiper></e-tab-swiper>
    <zk-footer :placeholderHeight=0></zk-footer>
  </div>
</template>

<script>
  import { THEME_GETLINK_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    props: ['widgetDataId'],
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
        this.viewModel = await this.$api.get(THEME_GETLINK_GET, this.widgetDataId)
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

