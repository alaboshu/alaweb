<template>
  <div class="zk-product-class" :style="styles">
    <!-- <x-searchbar></x-searchbar> -->
    <e-tab-swiper></e-tab-swiper>
    <zk-foot :placeholderHeight=0></zk-foot>
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
        viewModel: '',
        styles: {} 
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

<style  lang="less">
  @import '~_style/index.less';
  .zk-product-class {
  	font-size: @font-size-base;
  }
</style>

