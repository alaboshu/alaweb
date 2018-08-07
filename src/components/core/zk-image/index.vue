<template>
  <x-image :elementData="viewModel" v-if="asyncflag"></x-image>
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
        // console.info('组件数据image', this.viewModel)
        this.asyncflag = true
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less';
  .zk-image {
    font-size: @font-size-base;
    .lazyload-list {
      display: block;
      overflow: hidden;
      width: 100%;
      padding: 0;
      margin: 0;
      text-align: center;
      list-style: none;
      margin: 5px 0;
      .lazyload-list-item {
        width: 100%;
      }
      .lazyload-image {
        display: block;
        width: 100%;
        height: 180px;
        // &[lazy='loading'] {
        //   width: 40px;
        //   height: 300px;
        //   margin: auto;
        // }
      }
    }
  }
</style>
