<template>
  <x-grid :col="columnCount" :elementData="viewModel" v-if="asyncflag"></x-grid>
</template>
<script>
  import { THEME_GETVALUE_GET } from '@/service/api/apiUrl'
  export default {
    name: 'zk-grid',
    data () {
      return {
        viewModel: '',
        asyncflag: false
      }
    },
    props: {
      dataId: {
        type: String
      },
      columnCount: {
        type: Number,
        default: 4
      }
    },
    created () {
      this.ApiGet()
    },
    methods: {
      async  ApiGet () {
        const para = {
          dataId: this.dataId,
          defaultId: '5b406cddfef00000a0000001'
        }
        this.viewModel = await this.$api.get(THEME_GETVALUE_GET, para)
        // console.info('组件数据', this.viewModel)
        this.asyncflag = true
      }
    }
  }
</script>

<style  lang="less">
  @import '~_style/index.less';
</style>
